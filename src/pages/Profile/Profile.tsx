import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Form, Input } from "antd";
import { useGetUser } from "../../hooks/api/useGetUser";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { UserData } from "../../types/userTypes";
import { formatDate } from "../../utils/FormatDate";
import { useGetFilesCount } from "../../hooks/api/useGetFilesCount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateUserEmail } from "../../hooks/api/useUpdateUserEmail";

const emailSchema = z.object({
  email: z.string().email(),
});

type EmailFormData = z.infer<typeof emailSchema>;
function Profile() {
  const { isAuthenticated, logout } = useAuth0();
  const { user, isLoading, isError } = useGetUser();
  const [userState, setUserState] = useState<UserData>();
  const [disabled, setDisabled] = useState(true);
  const [editing, setEditing] = useState(false);
  const { filesCount } = useGetFilesCount();
const { updateUserEmail } = useUpdateUserEmail();

  const { register, handleSubmit,setValue, formState: { errors } } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: userState?.email },
  });
  useEffect(() => {
    if (isAuthenticated) {
      console.log("user", user);
      setUserState(user);
    }
  }, [user, isAuthenticated]);
const onSaveEmail = async (data: EmailFormData) => {
  await updateUserEmail(data.email);
  setEditing(!editing);
  setDisabled(!disabled);
 
}
  if (isLoading) return <LoadingSpinner />;
  if (isError) return toast.error("Failed to fetch user data");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input value={userState?.name} disabled />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              {...register("email")}
              onChange={(e) => setValue("email", e.target.value)}
              required
              placeholder={userState?.email}
              disabled={disabled}
              addonAfter={
                editing ? (
                  <Button
                    size="middle"
                    type="primary"
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "100px",
                    }}
                    onClick={
                      handleSubmit(onSaveEmail)
                    }
                  > Save</Button>
                ) : (
                  <Button
                    size="middle"
                    type="primary"
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "100px",
                    }}
                    onClick={() => {
                      setEditing(!editing);
                      setDisabled(!disabled);
                    }}
                  > Edit</Button>
                )
              }
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </Form.Item>
          <Form.Item label="Joined">
            <span>{formatDate(userState?.createdAt)}</span>
          </Form.Item>
          <Divider />
          <Form.Item label="Number of Uploads">
            <span>{filesCount && filesCount.userFilesCount} Uploads</span>
          </Form.Item>
        </Form>
        <Button type="primary" block onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
