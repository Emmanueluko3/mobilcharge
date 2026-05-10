import { apolloClient } from "./apolloClient";
import { gql } from "@apollo/client";
import { 
  LOGIN_MUTATION, GET_USER_INFO, GET_PRICING_PLANS, GET_BOOKINGS, 
  REGISTER_MUTATION, UPDATE_PROFILE_MUTATION, UPDATE_PASSWORD_MUTATION, 
  CREATE_BOOKING_MUTATION, GET_AVAILABLE_DRIVERS,
  REQUEST_PASSWORD_RESET_MUTATION, VERIFY_RESET_CODE_MUTATION, RESET_PASSWORD_MUTATION 
} from "./queries";
import { globalAxios } from "./globalAxios"; // Keep for now if stripe needs it, but we'll try to remove it if unused.

const apiService = async (url: string, method: string, data?: any) => {
  try {
    // ─── Auth Mapping ────────────────────────────────────────────────────────
    if (url.includes("auth/signup") && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: REGISTER_MUTATION,
        variables: { input: data }
      });
      return { data: (response.data as any).register };
    }

    if ((url.includes("auth/token/") || url.includes("auth/login/")) && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { input: data }
      });
      return { data: (response.data as any).login };
    }

    if (url.includes("get-user-info") && method === "GET") {
      const response = await apolloClient.query({
        query: GET_USER_INFO,
        fetchPolicy: "network-only"
      });
      return { data: (response.data as any).me };
    }

    if (url.includes("update-profile") && method === "PATCH") {
      const response = await apolloClient.mutate({
        mutation: UPDATE_PROFILE_MUTATION,
        variables: { input: data }
      });
      return { data: { success: "Profile updated successfully" } };
    }

    // Password reset via GraphQL
    if (url.includes("password-reset/request") && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: REQUEST_PASSWORD_RESET_MUTATION,
        variables: { input: data }
      });
      return { data: { message: (response.data as any).requestPasswordReset } };
    }

    if (url.includes("verify-reset-code") && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: VERIFY_RESET_CODE_MUTATION,
        variables: { input: data }
      });
      return { data: { message: (response.data as any).verifyResetCode } };
    }

    if (url.includes("reset-password") && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: { input: data }
      });
      return { data: { detail: (response.data as any).resetPassword } };
    }

    // ─── Bookings Mapping ────────────────────────────────────────────────────
    if (url.includes("bookings") && method === "GET") {
      const response = await apolloClient.query({
        query: GET_BOOKINGS,
        fetchPolicy: "network-only"
      });
      return { data: (response.data as any).bookingsList };
    }

    if (url.includes("create-booking") && method === "POST") {
      const response = await apolloClient.mutate({
        mutation: CREATE_BOOKING_MUTATION,
        variables: { input: data }
      });
      return { data: { message: "Booking created successfully", booking: (response.data as any).createBooking } };
    }

    if (url.match(/\/api\/booking\/([^\/]+)\//) && method === "GET") {
      const match = url.match(/\/api\/booking\/([^\/]+)\//);
      const invoiceId = match ? match[1] : "";
      const response = await apolloClient.query({
        query: gql`
          query GetBookingByInvoice($invoiceId: String!) {
            bookingByInvoice(invoiceId: $invoiceId) {
              id
              invoiceId
              status
              rechargeAddress
              reservationAt
              carModel
              batteryLevel
              kilometresLeft
              chargingTimeEstimate
              comments
              isEmergency
              vehicleImageUrl
              customer {
                firstName
                lastName
              }
              driver {
                firstName
                lastName
              }
            }
          }
        `,
        variables: { invoiceId },
        fetchPolicy: "network-only"
      });
      return { data: (response.data as any).bookingByInvoice };
    }

    // ─── Drivers Mapping ─────────────────────────────────────────────────────
    if (url.includes("get-drivers") && method === "GET") {
      const response = await apolloClient.query({
        query: GET_AVAILABLE_DRIVERS,
        fetchPolicy: "network-only"
      });
      return { data: (response.data as any).availableDrivers };
    }

    // ─── Pricing Mapping ─────────────────────────────────────────────────────
    if (url.includes("pricing") && method === "GET") {
      const response = await apolloClient.query({
        query: GET_PRICING_PLANS,
        fetchPolicy: "network-only"
      });
      return { data: (response.data as any).pricingPlans };
    }

    // Fallback for non-migrated endpoints (like payment/stripe)
    const response = await globalAxios({
      url,
      method,
      data,
    });
    return response;
  } catch (error: any) {
    if (error?.message === "Network Error") {
      console.error("Please check your internet connection");
    }

    // Map Apollo/GraphQL errors to match the expected Axios error structure
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const gqlError = error.graphQLErrors[0];
      return Promise.reject({
        response: {
          data: {
            error: gqlError.message || "GraphQL Error",
            message: gqlError.message
          },
          status: gqlError.extensions?.code === "UNAUTHENTICATED" ? 401 : 400
        }
      });
    }

    if (error.networkError) {
      return Promise.reject({
        response: {
          data: {
            error: "Network error occurred. Please check your connection.",
          },
          status: 503
        }
      });
    }

    throw error;
  }
};

export default apiService;
