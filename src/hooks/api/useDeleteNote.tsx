import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteData } from "./useUploadNote";

export const useDeleteNote = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteNoteRequest = async (data: NoteData) => {
    const token = await getAccessTokenSilently();
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/file-data/${data.id}/note`,
      {
        data: { noteId: data.noteId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  const { mutateAsync: deleteNote, isPending } = useMutation({
    mutationFn: (data: NoteData) => deleteNoteRequest(data),
  });

  return { deleteNote, isPending };
};
