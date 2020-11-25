import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { Calendar } from './entities/calendar.entity';
import { CalendarController } from './calendar.controller';

@Module({
  providers: [CalendarService],
  imports: [TypeOrmModule.forFeature([Calendar])],
  controllers: [CalendarController],
})
export class CalendarModule {}
