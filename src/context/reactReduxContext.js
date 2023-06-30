import React, { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInblockCurrentUser,
  selectInblockCurrentUserAccessToken,
  selectInblockCurrentUserRefreshToken,
  selectInblockUserRole,
} from "../redux/inblock/user/user.selectors";
import { setInblockCurrentUser } from "../redux/inblock/user/userSlice";

import {
  selectCurrentUser,
  selectUserRole,
  selectUserToken,
} from "../redux/user/user.selectors";
import { setCurrentUser } from "../redux/user/userSlice";

export const ReactReduxContext = createContext();

export const ReactReduxProvider = ({ children }) => {
  /* Concreco */

  const currentUser = useSelector(selectCurrentUser);
  const userRol = useSelector(selectUserRole);
  const authtoken = useSelector(selectUserToken);
  const dispatch = useDispatch();

  /* Inblock */

  const inblockCurrentUser = useSelector(selectInblockCurrentUser);
  const inblockUserRol = useSelector(selectInblockUserRole);
  const inblockCurrentUserAccessToken = useSelector(
    selectInblockCurrentUserAccessToken
  );
  const inblockCurrentUserRefreshToken = useSelector(
    selectInblockCurrentUserRefreshToken
  );

  const data = {
    currentUser,
    userRol,
    authtoken,
    dispatch,
    setCurrentUser,

    inblock: {
      inblockCurrentUser,
      inblockUserRol,
      setInblockCurrentUser,
      inblockCurrentUserAccessToken,
      inblockCurrentUserRefreshToken,
    },
  };

  return (
    <ReactReduxContext.Provider value={data}>
      {children}
    </ReactReduxContext.Provider>
  );
};
