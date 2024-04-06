import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  totalSeats: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
