import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useGetFileData = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getFileDataRequest = async (data:{id: string}) => {
    const token = await getAccessTokenSilently();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/file-data/get-data/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      toast.error("Failed to get file data.");
    }
  };
  const { mutateAsync: getFileData,isPending } = useMutation({
    mutationFn: (data:{id: string}) => getFileDataRequest(data),
    
  });

  return {
    getFileData,
    isPending
  };
};
