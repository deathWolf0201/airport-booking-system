import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  @Get(':ref')
  findOne(@Param('ref') ref: string) {
    return this.bookingService.getBookingByReference(ref);
  }

  @Patch(':ref')
  update(@Param('ref') ref: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBookingStatus(ref, dto);
  }

  @Get('flight/:flightId')
  getFlightBookings(@Param('flightId') flightId: string) {
    return this.bookingService.getFlightBookings(parseInt(flightId));
  }
}