import { useState, useEffect } from "react";
import apiService from "../../api/apiServices";

const useFetch = (url: string, method: string = "GET") => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiService(url, method);
      if (response) {
        setData(response.data);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method]);

  return { data, isLoading, error };
};

export default useFetch;
