import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getUserRequest = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };
  const { data: user,isLoading,isError } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUserRequest,
  });
  return { user,isLoading,isError };
};
