import { useState, useEffect } from "react";
import { globalAxios } from "../../api/globalAxios";

// NOTE: This hook is ONLY for billing/invoice/PDF REST endpoints.
// All other data fetching must use Apollo GraphQL hooks (useQuery / useMutation).
const useBillingFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!url.includes("billing") && !url.includes("invoice") && !url.includes("pdf")) {
      console.error(`useBillingFetch: Blocked non-billing REST call to ${url}. Use useQuery instead.`);
      return;
    }
    try {
      setIsLoading(true);
      const response: any = await globalAxios({ url, method: "GET" });
      if (response) setData(response.data);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useBillingFetch;
