import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { isLoading, loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      navigate("/organization");
    } else {
      loginWithRedirect({
        appState: {
          targetUrl: `/organization`,
        },
      });
    }
  }, [loginWithRedirect, isAuthenticated, isLoading, navigate]);
};

export default Login;
