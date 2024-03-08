import { useState } from "react";

type FetchingCallback<T> = (...args: any[]) => Promise<T>;

type UseFetchingReturn<T> = [FetchingCallback<T>, boolean, string];

export const useFetching = <T>(
  callback: FetchingCallback<T>
): UseFetchingReturn<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetching: FetchingCallback<T> = async (...args) => {
    try {
      setIsLoading(true);
      const result = await callback(...args);
      return result;
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error || ""];
};
