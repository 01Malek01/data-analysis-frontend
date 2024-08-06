import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetFile = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getFileRequest = async () => {
    const token = await getAccessTokenSilently();
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/file-data/get-data/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  const {
    data: file,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["getFile", id],
    queryFn: getFileRequest,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!id,
  });

  return { file, isLoading, isSuccess, isError };
};

export default useGetFile;
