import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

 const useGetAllFiles = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getAllFilesRequest = async () => {
    const token = await getAccessTokenSilently();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/file-data/get-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      toast.error("Failed to get files");
    }
  };
  const { data: files, isLoading,isSuccess,isError } = useQuery({
    queryKey: ["getAllFiles"],
    queryFn: getAllFilesRequest,
    refetchOnWindowFocus: true,
  });

  return { files, isLoading,isSuccess,isError };
};


export default useGetAllFiles