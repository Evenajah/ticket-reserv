import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_STATUS } from 'src/shared/enums';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  credential: string;

  @Prop()
  verificationToken: string;

  @Prop()
  forgotCredentialToken: string;

  @Prop({ required: true })
  status: USER_STATUS;

  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
