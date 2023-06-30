import React from "react";

import { useIsDesktop } from "../../hooks/useIsDesktop";

import { ErrorBoundary } from "../error-boundary/ErrorBoundary";
import { HeaderMobile } from "../header-mobile/HeaderMobile";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";

export const Layout = ({ children, sectionTitle, navLinksArr }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className="homepage-container">
      {isDesktop && (
        <div className="sidebar-maincontent-container">
          <Sidebar navigationLinks={navLinksArr} />
        </div>
      )}

      <div className="header-content-container">
        {isDesktop ? (
          <Header title={sectionTitle} />
        ) : (
          <HeaderMobile title={sectionTitle} links={navLinksArr} />
        )}

        <div className={`${isDesktop ? "main-content" : "mobile-content"}`}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
