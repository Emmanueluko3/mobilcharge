import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";

@UseGuards(GqlAuthGuard)
@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookings: BookingsService) {}

  @Mutation(() => Booking)
  createBooking(
    @CurrentUser() user: { id: string },
    @Args("input") dto: CreateBookingDto
  ) {
    return this.bookings.create(user.id, dto);
  }

  @Query(() => [Booking])
  bookingsList() {
    return this.bookings.list();
  }

  @Query(() => Booking, { nullable: true })
  bookingByInvoice(@Args("invoiceId") invoiceId: string) {
    return this.bookings.findByInvoice(invoiceId);
  }

  @Mutation(() => Booking)
  updateBookingStatus(
    @Args("id") id: string,
    @Args("input") dto: UpdateBookingStatusDto
  ) {
    return this.bookings.updateStatus(id, dto);
  }
}
