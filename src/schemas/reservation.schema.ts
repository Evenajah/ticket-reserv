import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EventDate', required: true })
  eventDateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  //TODO implement invoice in future
  // @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  // invoiceId: Types.ObjectId;

  @Prop({ required: true })
  seatEventIds: Types.ObjectId[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
