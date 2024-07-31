import { InboxOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UploadProps } from "antd";
import { Button, Form, Upload } from "antd";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { read, utils, WorkBook, WorkSheet } from "xlsx";
import { z } from "zod";
import { storage } from "../../firebaseConfig";

import { useAuth0 } from "@auth0/auth0-react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "excelFile",
  multiple: false,
  accept: ".xlsx, .xls",

  // prevent antd auto uploading
  customRequest: () => {
    return;
  },
};

const excelFileSchema = z.object({
  excelFile: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Please upload a valid Excel file",
      }
    ),
});

type FormData = z.infer<typeof excelFileSchema>;

const FileUpload = ({
  nextStep,
  setFileData,
}: {
  nextStep: () => void;
  setFileData: (data: any[] | null) => void; // Update type here if you expect a specific type of JSON
}) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<any[] | null>(null); // Update type if needed

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      excelFile: undefined, // Adjust default value to undefined for optional File input
    },
    resolver: zodResolver(excelFileSchema),
    mode: "onChange",
  });

  const onChange = (info: { file: { originFileObj: File } }) => {
    try {
      const reader = new FileReader();

      reader.readAsArrayBuffer(info.file.originFileObj);

      reader.onload = (e) => {
        const arrayBuffer = e?.target?.result as ArrayBuffer;

        const workbook: WorkBook = read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];

        const worksheet: WorkSheet = workbook.Sheets[sheetName];

        const jsonData = utils.sheet_to_json(worksheet);

        setJsonData(jsonData);
        setFileData(jsonData);
        setSelectedFile(info.file.originFileObj);
        setValue("excelFile", info.file.originFileObj);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: FormData) => {
    const file = data.excelFile;
    if (!file) return; // Handle case where file might be undefined

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle upload progress if needed
      },
      () => {
        toast.error("File upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const token = await getAccessTokenSilently();
          axios
            .post(
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
            )
            .catch(() => {
              toast.error("Failed to store file URL.");
            });
        });
        nextStep();
      }
    );
  };

  return isAuthenticated ? (
    <Form
      layout="vertical"
      style={{ marginTop: "3rem", padding: "1.25rem" }}
      onFinish={handleSubmit(onSubmit)}
      className="upload mt-5 p-5 h-96"
    >
      <Controller
        control={control}
        name="excelFile"
        render={({ field }) => (
          <Dragger
            {...props}
            onChange={(info) => {
              onChange(info);
              field.onChange(info.file.originFileObj); // Sync with react-hook-form
            }}
          >
            {selectedFile ? (
              <>
                <p className="text-xl pb-5">
                  Selected file :{" "}
                  <span className="text-blue-600">{selectedFile.name}</span>
                </p>
                <p className="text-xl">
                  File type :{" "}
                  <span className="text-blue-600">{selectedFile.type}</span>
                </p>
              </>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file here to upload
                </p>
                <p className="ant-upload-hint">
                  Only Excel files are allowed <br />
                  .xls, .xlsx
                </p>
              </>
            )}
          </Dragger>
        )}
      />
      <span className="m-5">
        {errors.excelFile && (
          <p className="text-red-500 text-md">{`${errors.excelFile?.message} or you have not selected any file.`}</p>
        )}
      </span>
      <Form.Item>
        <Button
          htmlType="submit"
          className="!min-w-60 !h-[3rem] !bg-blue-500 !text-white font-bold py-2 px-4 rounded !flex !items-center !justify-center mx-auto mt-8 hover:scale-105 "
        >
          Proceed to Next Step <FaRegArrowAltCircleRight size={20} />
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Please sign in to continue</h1>
    </div>
  );
};

export default FileUpload;
