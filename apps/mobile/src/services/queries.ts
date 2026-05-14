import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterDto!) {
    register(input: $input) {
      access
      refresh
      user { id email firstName lastName role }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(input: $input) {
      access
      refresh
      user { id email firstName lastName role phoneNumber profileImage }
    }
  }
`;

export const GET_USER_INFO = gql`
  query Me {
    me { id email firstName lastName role phoneNumber profileImage }
  }
`;

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($input: CreateBookingDto!) {
    createBooking(input: $input) {
      id
      invoiceId
      status
      estimatedPrice
    }
  }
`;

export const GET_BOOKINGS = gql`
  query BookingsList {
    bookingsList {
      id
      invoiceId
      status
      rechargeAddress
      reservationAt
      carModel
      estimatedPrice
      createdAt
    }
  }
`;

export const GET_BOOKING_BY_INVOICE = gql`
  query BookingByInvoice($invoiceId: String!) {
    bookingByInvoice(invoiceId: $invoiceId) {
      id
      invoiceId
      status
      rechargeAddress
      reservationAt
      carModel
      estimatedPrice
      createdAt
      customer { id firstName lastName phoneNumber profileImage }
      driver { id firstName lastName phoneNumber profileImage }
    }
  }
`;

export const GET_VEHICLES = gql`
  query MyVehicles {
    myVehicles {
      id
      brand
      model
      year
      batteryCapacity
      portType
      plateNumber
    }
  }
`;

export const CREATE_VEHICLE_MUTATION = gql`
  mutation CreateVehicle($input: CreateVehicleDto!) {
    createVehicle(input: $input) { id brand model }
  }
`;
