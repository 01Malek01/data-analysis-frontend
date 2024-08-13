
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: userState?.email },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserState(user);
    }
  }, [user, isAuthenticated]);

  const onSaveEmail = async (data: EmailFormData) => {
    try {
      await updateUserEmail(data.email);
      setEditing(false);
      setDisabled(true);
      toast.success("Email updated successfully!");
    } catch (error) {
      toast.error("Failed to update email");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error("Failed to fetch user data");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-slate-800 dark:text-white">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md dark:bg-slate-700 dark:text-white">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input
              value={userState?.name}
              disabled
              className="dark:bg-slate-600 dark:border-slate-500 dark:text-white"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              {...register("email")}
              onChange={(e) => setValue("email", e.target.value)}
              required
              placeholder={userState?.email}
              disabled={disabled}
              className="dark:bg-slate-600 dark:border-slate-500 dark:text-white"
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
                    onClick={handleSubmit(onSaveEmail)}
                  >
                    Save
                  </Button>
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
                      setEditing(true);
                      setDisabled(false);
                    }}
                  >
                    Edit
                  </Button>
                )
              }
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
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
