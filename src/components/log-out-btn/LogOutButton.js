import React, { useContext } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { setUserRole } from "../../redux/user/userSlice";

import { ReactComponent as LogOutIcon } from "../../assets/svg/iconoLogOut.svg";

export const LogOutButton = () => {
  const { authtoken, dispatch, setCurrentUser } = useContext(ReactReduxContext);

  const LogOut = async () => {
    const data = await fetch(
      `https://ec2-3-20-255-18.us-east-2.compute.amazonaws.com/api/logout?token=${authtoken}`,
      {
        headers: {
          Authorization: `Token ${authtoken}`,
        },
        mode: "no-cors",
      }
    );

    dispatch(setCurrentUser(null));
    dispatch(setUserRole(null));
  };

  return (
    <div
      style={{
        width: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LogOutIcon onClick={LogOut} style={{ cursor: "pointer" }} />
    </div>
  );
};
