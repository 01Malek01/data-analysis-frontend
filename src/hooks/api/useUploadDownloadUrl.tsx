import { useAuth0 } from "@auth0/auth0-react";
import {
  useMutation,
  UseMutateAsyncFunction,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface FileData {
  name: string;
  type: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
}

export default function useUploadDownloadUrl(): {
  uploadDownloadUrl: UseMutateAsyncFunction<
    UploadResponse,
    Error,
    { downloadURL: string; file: FileData },
    unknown
  >;
} {
  const { getAccessTokenSilently } = useAuth0();

  const uploadRequest = async (
    downloadURL: string,
    file: FileData
  ): Promise<UploadResponse> => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post<UploadResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/data-source/upload`,
        {
          uploadUrl: downloadURL,
          name: file.name,
          type: file.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err: unknown) {
      toast.error("Something went wrong. Please try again.");
      throw err;
    }
  };

  const { mutateAsync: uploadDownloadUrl } = useMutation<
    UploadResponse,
    Error,
    { downloadURL: string; file: FileData },
    unknown
  >({
    mutationFn: (data) => uploadRequest(data.downloadURL, data.file),
  });

  return {
    uploadDownloadUrl,
  };
}
