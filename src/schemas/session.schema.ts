import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Session extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
