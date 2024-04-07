import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from 'src/shared/enums';
import { HashService } from 'src/shared/services/hash/hash.service';
import { HtmlService } from 'src/shared/services/html/html.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Session } from '../../schemas/session.schema';
import { User } from '../../schemas/user.schema';
import { AuthenDto } from './dto/authen.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetCredentialDto } from './dto/reset-credential.dto';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthenService {
  constructor(
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashService: HashService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly htmlService: HtmlService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUser: AuthenDto) {
    const existingUser = await this.userModel
      .findOne({ email: createUser.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const session = await this.userModel.db.startSession();

    session.startTransaction();

    try {
      const verificationToken = this.hashService.generateRandomToken();

      const hashedPassword = await this.hashService.hashCredential(
        createUser.credential,
      );

      const newUser = new this.userModel({
        ...createUser,
        credential: hashedPassword,
        status: USER_STATUS.INACTIVE,
        verificationToken,
        role: USER_ROLE.USER,
      });

      await newUser.save({ session });

      await this.mailerService.sendVerificationEmail(
        createUser.email,
        verificationToken,
      );

      await session.commitTransaction();
      session.endSession();

      return {
        statusCode: 201,
        message: 'User created and verification email sent successfully',
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(
        'Failed to create user and send verification email',
      );
    }
  }

  async verifyEmail(verificationToken: string) {
    const user = await this.userModel.findOne({ verificationToken });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.status = USER_STATUS.ACTIVE;

    await user.save();

    return this.htmlService.getVerifiedUserTemplate();
  }

  async signIn(user: AuthenDto) {
    const findedUser = await this.userModel.findOne({
      email: user.email,
      status: USER_STATUS.ACTIVE,
    });

    if (!findedUser) {
      throw new UnauthorizedException('Invalid email or unverified email');
    }

    const isPasswordMatched = await this.hashService.compareCredential(
      user.credential,
      findedUser.credential,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const jwtPayload: JwtPayload = {
      id: findedUser.id,
      email: findedUser.email,
      status: findedUser.status,
    };

    const token = await this.generateToken(jwtPayload);

    const session = await this.sessionModel.db.startSession();

    session.startTransaction();

    try {
      await this.sessionModel.deleteOne({ email: findedUser.email });
      const newSession = new this.sessionModel({
        ...token,
        email: findedUser.email,
      });
      await newSession.save({ session });

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException('Failed to Sign in');
    }

    return {
      ...token,
      userData: { email: findedUser.email, userId: findedUser._id },
    };
  }

  signOut(accessToken: string) {
    return this.sessionModel.deleteOne({ accessToken });
  }

  async refreshToken(refreshToken: string) {
    const decodedToken: JwtPayload = this.jwtService.decode(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token or expired');
    }

    await this.sessionModel.deleteOne({ refreshToken });

    const token = await this.generateToken({
      email: decodedToken.email,
      status: decodedToken.status,
      id: decodedToken.id,
    });

    return token;
  }

  private async generateToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRE'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRE'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async fotgotCredential({ email }: ForgotDto) {
    const session = await this.userModel.db.startSession();

    session.startTransaction();

    try {
      const forgotToken = this.hashService.generateRandomToken();

      const findUser = await this.userModel.findOne({ email });

      findUser.forgotCredentialToken = forgotToken;

      await findUser.save();

      await this.mailerService.sendVerificationEmail(email, forgotToken);

      await session.commitTransaction();

      session.endSession();

      return {
        statusCode: 200,
        message: 'Forgot email Already sent.',
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(
        'Failed to create user and send verification email',
      );
    }
  }

  async resetCredential(body: ResetCredentialDto) {
    const findUser = await this.userModel.findOne({
      forgotCredentialToken: body.forgotCredentialToken,
    });

    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    const newCredential = await this.hashService.hashCredential(
      body.credential,
    );

    findUser.credential = newCredential;

    findUser.save();
  }

  async findSessionByToken(accessToken: string) {
    const token = await this.sessionModel.findOne({ accessToken });
    return token;
  }
}
