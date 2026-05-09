import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";

@UseGuards(JwtAuthGuard)
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Post()
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateBookingDto
  ) {
    return this.bookings.create(user.id, dto);
  }

  @Get()
  list() {
    return this.bookings.list();
  }

  @Get(":invoiceId")
  findByInvoice(@Param("invoiceId") invoiceId: string) {
    return this.bookings.findByInvoice(invoiceId);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateBookingStatusDto
  ) {
    return this.bookings.updateStatus(id, dto);
  }
}
