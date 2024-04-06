import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  async hashCredential(credential: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(credential, salt);
    return hash;
  }

  compareCredential(
    credential: string,
    hashedcredential: string,
  ): Promise<boolean> {
    return bcrypt.compare(credential, hashedcredential);
  }

  generateRandomToken() {
    // Generate a random buffer of 32 bytes
    const tokenBuffer = crypto.randomBytes(32);
    // Convert the buffer to a hexadecimal string
    const token = tokenBuffer.toString('hex');

    return token;
  }
}
