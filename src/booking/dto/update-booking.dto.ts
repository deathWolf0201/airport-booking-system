import { BookingStatus, PaymentStatus } from '@prisma/client';

export class UpdateBookingDto {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  seatNumber?: string;
}