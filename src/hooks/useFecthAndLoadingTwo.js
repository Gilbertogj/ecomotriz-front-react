import { useContext, useEffect, useState } from "react";
import { ReactReduxContext } from "../context/reactReduxContext";
import { fetchData } from "../utils/fetchData";

export const useFetchAndLoadingTwo = (urls, ids) => {
  const [data, setData] = useState(Array(urls.length).fill(null));
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  useEffect(() => {
    const fetchDataForAllUrls = async () => {
      const fetchDataPromises = urls.map((url, index) => fetchData(url, authtoken, dispatch, setCurrentUser, isLoading, setIsLoading));

      try {
        const fetchedData = await Promise.all(fetchDataPromises);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchDataForAllUrls();
  }, [urls, authtoken, dispatch, setCurrentUser, isLoading]);

  return { data, isLoading };
};