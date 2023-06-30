import React, { useContext, useEffect } from "react";

import { ReactReduxContext } from "../../context/reactReduxContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { setUserRole } from "../../redux/user/userSlice";
import { userTypeLinks } from "../../utils/navigationLinks";
import { fetchData } from "../../utils/fetchData";

import { Header } from "../../components/header/Header";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { MainSectionCover } from "../../components/main-section-cover/MainSectionCover";
import { MobileMenuButtons } from "../../components/mobile-menu-buttons/MobileMenuButtons";
import { ErrorBoundary } from "../../components/error-boundary/ErrorBoundary";

import "./HomePage.styles.scss";

export const HomePage = () => {
  const { authtoken, dispatch, setCurrentUser, userRol } =
    useContext(ReactReduxContext);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(
        process.env.REACT_APP_API_CONCRECO_BACKEND_URL + "/api/users/my_role/",
        authtoken,
        dispatch,
        setCurrentUser
      );

      dispatch(setUserRole("Administracion"));
    })();
  }, []);

  return (
    <div className="homepage-container">
      {isDesktop && (
        <div className="sidebar-maincontent-container">
          <Sidebar navigationLinks={userTypeLinks[userRol] || []} />
        </div>
      )}
      <div className="header-content-container">
        <Header title="Bienvenido" />
        <div className={`${isDesktop ? "main-content" : "mobile-content"}`}>
          <ErrorBoundary>
            {isDesktop ? (
              <MainSectionCover text="Bienvenido" />
            ) : (
              <div className="mobile-main-content">
                <div>
                  {userTypeLinks[userRol] &&
                    userTypeLinks[userRol].map((userLink) => (
                      <MobileMenuButtons
                        key={userLink.id}
                        userLinkObj={userLink}
                      />
                    ))}
                </div>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
