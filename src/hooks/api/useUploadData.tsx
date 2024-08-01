import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { AxiosErrorResponse } from "../../types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFileContext } from "../../Context/FileContext";

const useUploadFileData = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {fileId,setFileId} = useFileContext();
  const uploadFileDataRequest = async (data: any) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/file-data/upload-data`,
        {
          name: data.name,
          data: data.data,
          fileType: data.fileType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      const error = err as AxiosError<AxiosErrorResponse>;

      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";

      throw new Error(errorMessage);
    }
  };
  const { mutateAsync: uploadFileData } = useMutation({
    mutationFn: (data: any) => uploadFileDataRequest(data),
    onSuccess: (data) => {
      toast.success("Data uploaded successfully");
      localStorage.setItem("processedFileId",data._id);
      setFileId(data._id);

    },
  });
  return { uploadFileData };
};

export default useUploadFileData;
