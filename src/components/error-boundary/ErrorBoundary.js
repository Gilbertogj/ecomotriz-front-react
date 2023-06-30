import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentUser, setUserRole } from "../../redux/user/userSlice";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryErrorComponent />;
    }

    return this.props.children;
  }
}

const ErrorBoundaryErrorComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser(null));
    dispatch(setUserRole(null));
  }, []);

  return <h1>Ocurrío un error. Redirigiendo...</h1>;
};
