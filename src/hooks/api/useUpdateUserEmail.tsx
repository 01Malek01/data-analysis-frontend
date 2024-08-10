import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateUserEmail = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateEmailRequest = async (email: string) => {
    const token = await getAccessTokenSilently();
 await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/users`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const { mutateAsync } = useMutation({
    mutationFn: ( email: string ) => updateEmailRequest( email ),
    onSuccess: () => {
      toast.success("Email updated successfully");
    },
  });
  return {
    updateUserEmail: mutateAsync,
  };
};
