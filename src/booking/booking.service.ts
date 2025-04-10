import { BookingStatus } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        ...dto,
        bookingReference: this.generateBookingReference(),
      },
      include: {
        passenger: true,
        flight: true,
        staff: true,
      },
    });
  }

  async getBookingByReference(ref: string) {
    return this.prisma.booking.findUnique({
      where: { bookingReference: ref },
      include: {
        passenger: true,
        flight: true,
        staff: true,
      },
    });
  }

  async updateBookingStatus(ref: string, dto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { bookingReference: ref },
      data: {
        status: dto.status,
        paymentStatus: dto.paymentStatus,
        ...(dto.seatNumber && { seatNumber: dto.seatNumber })
      },
    });
  }

  async getFlightBookings(flightId: number) {
    return this.prisma.booking.findMany({
      where: { flightId },
      include: {
        passenger: true,
      },
    });
  }

  private generateBookingReference(): string {
    return 'BR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}