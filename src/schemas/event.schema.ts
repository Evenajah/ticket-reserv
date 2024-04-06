import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventDetail } from 'src/api/event/dto/create-event.dto';
import { EVENT_STATUS } from 'src/shared/enums';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: EVENT_STATUS;

  @Prop([
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      totalSeats: { type: Number, required: true },
    },
  ])
  eventDetail: EventDetail[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
