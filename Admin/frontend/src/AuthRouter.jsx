import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
const CODE_RE = /[?&]code=[^&]+/;
const STATE_RE = /[?&]state=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  const hasAuthParams = (searchParams = window.location.search) => {
    return (
      (CODE_RE.test(searchParams) || ERROR_RE.test(searchParams)) &&
      STATE_RE.test(searchParams)
    );
  };

  const getIsHandlingLoginCallback = () =>
    hasAuthParams() && window.location.pathname.indexOf("/organization") > -1;

  const isHandlingLoginCallback = getIsHandlingLoginCallback();

  if (isLoading || isHandlingLoginCallback) {
    return <div>Loading</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default AuthRoute;
