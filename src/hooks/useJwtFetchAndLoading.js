import { useContext, useEffect, useState } from "react";

import { ReactReduxContext } from "../context/reactReduxContext";
import { jwtFetchData } from "../utils/jwtFetchData";

export const useJwtFetchAndLoading = (url, id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    dispatch,
    inblock: {
      inblockCurrentUserAccessToken,
      inblockCurrentUserRefreshToken,
      setInblockCurrentUser,
    },
  } = useContext(ReactReduxContext);

  useEffect(() => {
    (async () => {
      const fetchedData = await jwtFetchData(
        url,
        `${process.env.REACT_APP_INBLOCK_BASE_URL}auth/token/refresh/`,
        inblockCurrentUserAccessToken,
        inblockCurrentUserRefreshToken,
        dispatch,
        setInblockCurrentUser,
        isLoading,
        setIsLoading
      );

      setData(fetchedData);
      setIsLoading(false);
    })();
  }, [id]);

  return { data, setData, isLoading };
};
