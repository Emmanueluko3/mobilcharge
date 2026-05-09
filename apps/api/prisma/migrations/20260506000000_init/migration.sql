CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'DRIVER');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "phoneNumber" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'USER',
  "profileImage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DriverProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "truckName" TEXT,
  "plateNumber" TEXT,
  "isAvailable" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DriverProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Booking" (
  "id" TEXT NOT NULL,
  "invoiceId" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "driverId" TEXT,
  "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
  "isEmergency" BOOLEAN NOT NULL DEFAULT false,
  "rechargeAddress" TEXT NOT NULL,
  "reservationAt" TIMESTAMP(3) NOT NULL,
  "carModel" TEXT NOT NULL,
  "batteryLevel" INTEGER,
  "kilometresLeft" INTEGER,
  "chargingTimeEstimate" TEXT,
  "comments" TEXT,
  "vehicleImageUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PricingPlan" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "priceLabel" TEXT NOT NULL,
  "features" TEXT[],
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PricingPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "DriverProfile_userId_key" ON "DriverProfile"("userId");
CREATE UNIQUE INDEX "Booking_invoiceId_key" ON "Booking"("invoiceId");
CREATE UNIQUE INDEX "PricingPlan_key_key" ON "PricingPlan"("key");

ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
