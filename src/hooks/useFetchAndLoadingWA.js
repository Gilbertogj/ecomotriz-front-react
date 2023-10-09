import { useContext, useEffect, useState } from "react";

import { ReactReduxContext } from "../context/reactReduxContext";
import { fetchDataWithoutAuthentication } from "../utils/fetchDataWithoutAuthentication";

export const useFetchAndLoadingWA = (url, id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchDataWithoutAuthentication(
        url,
        authtoken,
        dispatch,
        setCurrentUser,
        isLoading,
        setIsLoading
      );

      setData(fetchedData);
      setIsLoading(false);
    })();
  }, [id]);

  return { data, setData, isLoading };
};
