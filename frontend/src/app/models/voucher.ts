import { User } from './user';
import { Event } from './event';

export interface Voucher {
  id: number;
  userId: User;
  eventId: Event;
  quantity: number;
  avaliable: boolean;
}
