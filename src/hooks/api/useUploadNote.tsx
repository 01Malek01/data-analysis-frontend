import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type NoteData = {
  id?: string;
  text?: string;
  userId?: string;
  createdAt?: string | Date;
  noteId?: string;
  _id?: string;
};
export const useUploadNote = () => {
  const { getAccessTokenSilently } = useAuth0();
  const uploadNoteRequest = async (data) => {
    const token = await getAccessTokenSilently();
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/file-data/${data.id}/note`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync: uploadNote } = useMutation({
    mutationFn: (data: NoteData) => uploadNoteRequest(data),
  });

  return { uploadNote };
};
