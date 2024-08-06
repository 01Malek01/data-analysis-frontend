import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the type for the download URL response
export interface DownloadUrlResponse {
  url?: string; // Adjust this according to the actual structure of the response
}

// Define the type for the hook's return value
interface UseGetDownloadUrlReturn {
  downloadUrl?: DownloadUrlResponse;
}

// Define the hook function with TypeScript types
const useGetDownloadUrl = (id: string | null | undefined): UseGetDownloadUrlReturn => {
  const { getAccessTokenSilently } = useAuth0();

  // Define the function to get the download URL
  const getDownloadUrlRequest = async (
    fileId: string
  ): Promise<DownloadUrlResponse> => {
    const token = await getAccessTokenSilently();
    const res = await axios.get<DownloadUrlResponse>(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/data-source/get-download-url/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  // Use the useQuery hook with TypeScript types
  const { data: downloadUrl } = useQuery<DownloadUrlResponse>({
    queryKey: ["getDownloadUrl", id],
    queryFn: () => getDownloadUrlRequest(id as string),
    enabled: !!id,
  });

  // Return the download URL data
  return { downloadUrl };
};

export default useGetDownloadUrl;
