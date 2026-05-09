export type UserRole = "user" | "admin" | "driver";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface VehicleDetails {
  make?: string;
  model: string;
  batteryLevel?: number;
  kilometresLeft?: number;
  imageUrl?: string;
}

export interface BookingRequest {
  id: string;
  invoiceId: string;
  customerId: string;
  driverId?: string;
  status: BookingStatus;
  isEmergency: boolean;
  rechargeAddress: string;
  reservationAt: string;
  chargingTimeEstimate?: string;
  comments?: string;
  vehicle: VehicleDetails;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: string;
  name: "VISITOR" | "MEMBERSHIP" | "TAILORED";
  description: string;
  features: string[];
  priceLabel: string;
}
