import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Правильный путь

@Module({
  imports: [PrismaModule], // Добавьте импорт
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}