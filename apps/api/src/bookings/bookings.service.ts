import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PricingService } from "../pricing/pricing.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";
import { saveBase64Image } from "../common/utils/base64-upload.util";
import { RealtimeGateway } from "../realtime/realtime.gateway";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pricingService: PricingService,
    private readonly realtimeGateway: RealtimeGateway,
  ) {}

  async create(customerId: string, dto: CreateBookingDto) {
    const vehicleImageUrl = dto.vehicleImageBase64 ? saveBase64Image(dto.vehicleImageBase64, "uploads/vehicles") : null;
    
    let batteryCapacity = 75;
    if (dto.vehicleId) {
      const vehicle = await this.prisma.vehicle.findUnique({ where: { id: dto.vehicleId } });
      if (vehicle) batteryCapacity = vehicle.batteryCapacity;
    }

    if (dto.batteryLevel != null && dto.batteryTarget != null) {
      if (dto.batteryLevel >= dto.batteryTarget) {
        throw new BadRequestException("Target battery level must be greater than current battery level.");
      }
    }

    // Default depot destination if not provided
    const defaultDepotLat = 45.5017;
    const defaultDepotLng = -73.5673;

    const distance = this.calculateMockDistance(
      dto.originLat, 
      dto.originLng, 
      dto.destLat || defaultDepotLat, 
      dto.destLng || defaultDepotLng
    );

    const pricing = this.pricingService.calculatePrice({
      distanceKm: distance,
      batteryCapacity,
      currentBattery: dto.batteryLevel || 0,
      targetBattery: dto.batteryTarget || 80,
      isEmergency: !!dto.isEmergency,
    });

    const { vehicleImageBase64, ...restDto } = dto;

    return this.prisma.booking.create({
      data: {
        ...restDto,
        customerId,
        invoiceId: `MC-${Date.now()}`,
        reservationAt: new Date(dto.reservationAt),
        vehicleImageUrl,
        estimatedPrice: pricing.total,
        distance,
        duration: distance * 2,
      },
      include: { customer: true, vehicle: true }
    });
  }

  list() {
    return this.prisma.booking.findMany({
      include: {
        customer: true,
        driver: true,
        vehicle: true,
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async findByInvoice(invoiceId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { invoiceId },
      include: {
        customer: true,
        driver: true,
        vehicle: true,
      }
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    return booking;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: {
        customer: true,
        driver: true,
        vehicle: true,
      }
    });

    this.realtimeGateway.emitBookingStatusUpdate(booking.id, booking.status);

    return booking;
  }

  private calculateMockDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Basic Haversine or simple Euclidean for mock
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 100) / 100;
  }
}
