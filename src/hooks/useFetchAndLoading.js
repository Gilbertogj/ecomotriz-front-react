import { useContext, useEffect, useState } from "react";

import { ReactReduxContext } from "../context/reactReduxContext";
import { fetchData } from "../utils/fetchData";

export const useFetchAndLoading = (url, id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(
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
