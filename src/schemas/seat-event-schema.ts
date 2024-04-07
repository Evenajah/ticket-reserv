import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SEAT_STATUS } from 'src/shared/enums';

@Schema()
export class SeatEvent extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EventDate', required: true })
  eventDateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seat', required: true })
  seatId: Types.ObjectId;

  @Prop({ required: true })
  status: SEAT_STATUS;

  @Prop({ required: true })
  price: number;
}

export const SeatEventSchema = SchemaFactory.createForClass(SeatEvent);
