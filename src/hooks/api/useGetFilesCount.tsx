import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFilesCount = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getFilesCountRequest = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/files-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };
  const {
    data: filesCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFilesCount"],
    queryFn: getFilesCountRequest,
  });
  return { filesCount, isLoading, isError };
};
