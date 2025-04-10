import { BookingStatus, PaymentStatus } from '@prisma/client';

export class CreateBookingDto {
  passengerId: number;
  flightId: number;
  seatNumber: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  staffId?: number;
}