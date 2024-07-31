import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyUser } from "../hooks/api/useVerifyUser";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
//this is the page that handles the callback from the auth0 login
export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const hasCreatedUser = useRef(false);
  const { verifyUser } = useVerifyUser();
  useEffect(() => {
    console.log("user", user);
    const timeout = setTimeout(() => {
      if (user?.name && user?.sub && !hasCreatedUser.current && user?.email) {
        verifyUser({
          auth0Id: user?.sub,
          email: user?.email,
          name: user?.nickname || user?.name,
        });
        hasCreatedUser.current = true;
      } else {
        navigate("/");
      }
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [user, navigate, verifyUser]);
  return (
    <div className="w-full h-full text-center mx-auto mt-[4rem] loading">
      <LoadingSpinner />
      <br /> Please be patient
    </div>
  );
}
