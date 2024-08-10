import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteData } from "./useUploadNote";

export const useUpdateNote = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateNoteRequest = async (data: NoteData) => {
    const token = await getAccessTokenSilently();
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/file-data/${data.id}/note}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync: updateNote } = useMutation({
    mutationFn: (data: NoteData) => updateNoteRequest(data),
    onSuccess: (data) => {
      console.log("Note updated:", data);
    },
  });

  return { updateNote };
};
