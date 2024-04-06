import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Seat extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Location', required: true }) // Reference to the Location schema
  locationId: Types.ObjectId;

  @Prop({ required: true })
  zone: string;

  @Prop({ required: true })
  row: string;

  @Prop({ required: true })
  seatNumber: number;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
