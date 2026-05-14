import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterDto!) {
    register(input: $input) {
      access
      refresh
      user {
        id
        email
        firstName
        lastName
        role
        phoneNumber
        profileImage
        is_superuser
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($input: PasswordResetRequestDto!) {
    requestPasswordReset(input: $input)
  }
`;

export const VERIFY_RESET_CODE_MUTATION = gql`
  mutation VerifyResetCode($input: VerifyResetCodeDto!) {
    verifyResetCode(input: $input)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordDto!) {
    resetPassword(input: $input)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginDto!) {
    login(input: $input) {
      access
      refresh
      user {
        id
        email
        firstName
        lastName
        role
        phoneNumber
        profileImage
        is_superuser
      }
    }
  }
`;

export const GET_USER_INFO = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
      phoneNumber
      profileImage
      is_superuser
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileDto!) {
    updateProfile(input: $input) {
      id
      email
      firstName
      lastName
      phoneNumber
      profileImage
      role
      is_superuser
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($input: UpdatePasswordDto!) {
    updatePassword(input: $input) {
      id
    }
  }
`;

export const GET_PRICING_PLANS = gql`
  query PricingPlans {
    pricingPlans {
      id
      key
      name
      description
      priceLabel
      features
      sortOrder
      isActive
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
      originLat
      originLng
      destLat
      destLng
      reservationAt
      carModel
      isEmergency
      estimatedPrice
      distance
      createdAt
      customer {
        firstName
        lastName
      }
      vehicle {
        brand
        model
      }
    }
  }
`;

export const GET_BOOKING_BY_INVOICE = gql`
  query BookingByInvoice($invoiceId: String!) {
    bookingByInvoice(invoiceId: $invoiceId) {
      id
      invoiceId
      status
      booking_type: isEmergency
      paid: status
      rechargeAddress
      vehicle_image: vehicleImageBase64
      driver {
        first_name: firstName
        last_name: lastName
      }
    }
  }
`;

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($input: CreateBookingDto!) {
    createBooking(input: $input) {
      id
      invoiceId
      status
      rechargeAddress
      reservationAt
      carModel
      isEmergency
      estimatedPrice
    }
  }
`;

export const UPDATE_BOOKING_STATUS_MUTATION = gql`
  mutation UpdateBookingStatus($id: String!, $input: UpdateBookingStatusDto!) {
    updateBookingStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

export const GET_AVAILABLE_DRIVERS = gql`
  query AvailableDrivers {
    availableDrivers {
      id
      isAvailable
      truckName
      plateNumber
      latitude
      longitude
      user {
        id
        firstName
        lastName
        phoneNumber
        profileImage
      }
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
    createVehicle(input: $input) {
      id
      brand
      model
    }
  }
`;

export const REMOVE_VEHICLE_MUTATION = gql`
  mutation RemoveVehicle($id: ID!) {
    removeVehicle(id: $id) {
      id
    }
  }
`;
