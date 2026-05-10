import { apolloClient } from "./apolloClient";
import { gql } from "@apollo/client";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

const LOGIN_MUTATION = gql`
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
      }
    }
  }
`;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (path.includes("auth/signup") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation Register($input: RegisterDto!) {
            register(input: $input) {
              access
              refresh
              user { id email firstName lastName role phoneNumber profileImage }
            }
          }
        `,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: (response.data as any).register } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("auth/login") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: (response.data as any).login } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("get-user-info") && options.method === "GET") {
    try {
      const response = await apolloClient.query({
        query: gql`
          query Me { me { id email firstName lastName role phoneNumber profileImage } }
        `,
        fetchPolicy: "network-only"
      });
      return (response.data as any).me as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("update-profile") && options.method === "PATCH") {
    try {
      await apolloClient.mutate({
        mutation: gql`
          mutation UpdateProfile($input: UpdateProfileDto!) {
            updateProfile(input: $input) { id }
          }
        `,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: { success: "Profile updated successfully" } } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("password-reset/request") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`mutation RequestPasswordReset($input: PasswordResetRequestDto!) { requestPasswordReset(input: $input) }`,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: { message: (response.data as any).requestPasswordReset } } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("verify-reset-code") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`mutation VerifyResetCode($input: VerifyResetCodeDto!) { verifyResetCode(input: $input) }`,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: { message: (response.data as any).verifyResetCode } } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("reset-password") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`mutation ResetPassword($input: ResetPasswordDto!) { resetPassword(input: $input) }`,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: { detail: (response.data as any).resetPassword } } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("create-booking") && options.method === "POST") {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation CreateBooking($input: CreateBookingDto!) {
            createBooking(input: $input) { id invoiceId status }
          }
        `,
        variables: { input: JSON.parse(options.body as string) }
      });
      return { data: { message: "Booking created successfully", booking: (response.data as any).createBooking } } as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  if (path.includes("bookings") && options.method === "GET") {
    try {
      const response = await apolloClient.query({
        query: gql`
          query BookingsList {
            bookingsList { id invoiceId status rechargeAddress reservationAt carModel createdAt }
          }
        `,
        fetchPolicy: "network-only"
      });
      return (response.data as any).bookingsList as any;
    } catch (error: any) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) throw new Error(error.graphQLErrors[0].message);
      throw error;
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`MobilCharge API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
