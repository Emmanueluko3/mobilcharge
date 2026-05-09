import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(customerId: string, dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        customerId,
        invoiceId: `MC-${Date.now()}`,
        rechargeAddress: dto.rechargeAddress,
        reservationAt: new Date(dto.reservationAt),
        carModel: dto.carModel,
        batteryLevel: dto.batteryLevel,
        kilometresLeft: dto.kilometresLeft,
        chargingTimeEstimate: dto.chargingTimeEstimate,
        comments: dto.comments,
        isEmergency: dto.isEmergency ?? false
      }
    });
  }

  list() {
    return this.prisma.booking.findMany({
      include: {
        customer: true,
        driver: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async findByInvoice(invoiceId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { invoiceId },
      include: {
        customer: true,
        driver: true
      }
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    return booking;
  }

  updateStatus(id: string, dto: UpdateBookingStatusDto) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: dto.status }
    });
  }
}
