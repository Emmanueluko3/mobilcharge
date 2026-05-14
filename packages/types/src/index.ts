export type UserRole = "USER" | "ADMIN" | "DRIVER";

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
  | "ACCEPTED"
  | "EN_ROUTE"
  | "CHARGING"
  | "COMPLETED"
  | "CANCELLED";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  batteryCapacity: number;
  portType: string;
  plateNumber?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  id: string;
  invoiceId: string;
  customerId: string;
  customer?: AuthUser;
  driverId?: string;
  driver?: AuthUser;
  status: BookingStatus;
  isEmergency: boolean;
  rechargeAddress: string;
  originLat?: number;
  originLng?: number;
  destLat?: number;
  destLng?: number;
  reservationAt: string;
  carModel: string;
  vehicleId?: string;
  vehicle?: Vehicle;
  batteryLevel?: number;
  batteryTarget?: number;
  kilometresLeft?: number;
  chargingTimeEstimate?: string;
  estimatedPrice?: number;
  actualPrice?: number;
  distance?: number;
  duration?: number;
  comments?: string;
  vehicleImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: string;
  key: string;
  name: string;
  description: string;
  features: string[];
  priceLabel: string;
}

export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  heading?: number;
}
