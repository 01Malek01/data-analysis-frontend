import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosErrorResponse, UserData } from "../../types/userTypes";
export const useVerifyUser = () => {


  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const verifyUserRequest = async (data: UserData) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/verify",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
      console.log(res.data);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<AxiosErrorResponse>;
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      throw new Error(errorMessage);
    }
  };

  const { mutateAsync: verifyUser } = useMutation({
    mutationFn: (data: { auth0Id: string; email: string; name: string }) =>
      verifyUserRequest(data),
    mutationKey: ["verify-user"],
    onSettled: () => {
      toast.success("Welcome Back!");
      navigate("/dashboard");
    },
  });

  return {
    verifyUser,
  };
};
