import { Button, Card, Divider, Form, Input, Space } from "antd";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUploadNote } from "../hooks/api/useUploadNote";
import { useEffect, useState } from "react";
import { useGetFileData } from "../hooks/api/useGetFileData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteNote } from "../hooks/api/useDeleteNote";

// Define the schema for form validation using zod
const noteSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Note must be at least 3 characters long" }),
});

// Infer the form data type from the zod schema
type NoteFormData = z.infer<typeof noteSchema>;

// Define the component's props
interface NotesProps {
  notes: { text: string; userId: string; createdAt: Date }[];
  id: string;
}

function Notes({ id }: NotesProps) {
  const { getFileData } = useGetFileData();
  const { deleteNote, isPending } = useDeleteNote();

  // State to manage the notes
  const [notesState, setNotesState] = useState<
    { text: string; userId: string; createdAt: Date; _id: string }[]
  >([]);

  useEffect(() => {
    getFileData({ id }).then((data) => {
      setNotesState(data?.notes || []);
    });
  }, [id, getFileData]);

  const { uploadNote } = useUploadNote();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (data: NoteFormData) => {
    try {
      const updatedNotes = await uploadNote({ id, text: data.text });
      setNotesState([...updatedNotes]);
      reset(); // Reset form fields
    } catch (error) {
      console.error("Failed to upload note:", error);
    }
  };

  const onDeleteNote = async (noteId: string) => {
    try {
      const newNotes = await deleteNote({ id, noteId });
      setNotesState(newNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl mx-auto text-center mb-3">Notes</h1>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className="!w-full !flex !justify-start !items-start"
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            allowClear
            {...register("text")}
            placeholder="Type a note"
            onChange={(e) => setValue("text", e.target.value)}
          />
          <Button htmlType="submit" type="primary">
            Add Note
          </Button>
        </Space.Compact>
        {errors.text && <p>{errors.text.message}</p>}
      </Form>
      <Divider />
      {notesState.map((note) => (
        <Card
          style={{
            marginBottom: "10px",
            width: "100%",
          }}
          key={note._id}
        >
          <div className="flex flex-col">
            <span
              className="underline text-red-500 self-end cursor-pointer"
              onClick={() => onDeleteNote(note._id)}
            >
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 rounded-full border-b-4 border-blue-500"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Delete"
              )}
            </span>
            <p className="text-lg mb-1">{note.text}</p>
            <span className="text-sm text-slate-500/70">
              {new Date(note.createdAt).toLocaleString()}{" "}
            </span>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Notes;
