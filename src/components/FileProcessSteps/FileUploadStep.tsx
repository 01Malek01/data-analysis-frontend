import { InboxOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UploadProps } from "antd";
import { Button, Form, Upload } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { read, utils, WorkBook, WorkSheet } from "xlsx";
import { z } from "zod";
import { storage } from "../../firebaseConfig";

import { useAuth0 } from "@auth0/auth0-react";
import useUploadDownloadUrl from "../../hooks/api/useUploadDownloadUrl";
import CustomButton from "../UI/CustomButton";
import useUploadFileData from "../../hooks/api/useUploadData";
import { useFileContext } from "../../Context/FileContext";
import { File as FileType } from '../../types/FileType';

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

const FileUpload = ({ nextStep, setFileData }) => {
  const { uploadDownloadUrl } = useUploadDownloadUrl();
  const { isAuthenticated } = useAuth0();
  const { selectedFile, setSelectedFile } = useFileContext();
  const { uploadFileData } = useUploadFileData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [jsonData, setJsonData] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      excelFile: undefined,
    },
    resolver: zodResolver(excelFileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedFile) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setValue("excelFile", selectedFile);
    }
  }, [setValue, selectedFile]);
  const setFile = (info: { file: { originFileObj: FileType } }) => {
    try {
      const reader = new FileReader();

      reader.readAsArrayBuffer(info.file.originFileObj);

      reader.onload = async (e) => {
        const arrayBuffer = e?.target?.result as ArrayBuffer;

        const workbook: WorkBook = read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];

        const worksheet: WorkSheet = workbook.Sheets[sheetName];

        const jsonDataFromSheet = utils.sheet_to_json(worksheet);
        await uploadFileData({
          name: info.file.originFileObj.name,
          data: jsonDataFromSheet,
          fileType: info.file.originFileObj.type,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setJsonData(jsonDataFromSheet);
        setFileData(jsonDataFromSheet);
        setSelectedFile(info.file.originFileObj);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setValue("excelFile", info.file.originFileObj);
      };
    } catch (err) {
      console.log(err);
      toast.error("File upload failed.Please try again Later");
    }
  };

  const onChange = (info: { file: { originFileObj: FileType } }) => {
    setFile(info);
  };

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const file: FileType = data.excelFile;
    if (!file) return; // Handle case where file might be undefined

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (snapshot) => {
        // Handle upload progress if needed
      },
      () => {
        toast.error("File upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          uploadDownloadUrl({
            downloadURL,
            file,
          });
        });
        nextStep();
      }
    );
  };

  const { loginWithRedirect } = useAuth0();

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
            className=""
            {...props}
            onChange={(info) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              onChange(info);
              if (info.file.originFileObj && info.file) {
                field.onChange(info.file.originFileObj); // Sync with react-hook-form
              }
            }}
          >
            {selectedFile ? (
              <div className="flex flex-col">
                <p className="text-xl pb-5">
                  Selected file :{" "}
                  <span className="text-blue-600 text-center">
                    {selectedFile.name}
                  </span>
                </p>
                <p className="text-xl">
                  File type :{" "}
                  <span className="text-blue-600 text-center text-sm md:text-lg ">
                    {selectedFile.type}
                  </span>
                </p>
                <span className="text-xl text-slate-500/80 mt-5 text-center">
                  Click To Change File
                </span>
              </div>
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
        <CustomButton title="Proceed to next step" />
      </Form.Item>
    </Form>
  ) : (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <span className="text-3xl">
        Oh, you are not signed in. Please sign in to use this feature.{" "}
      </span>
      <Button
        type="primary"
        size="large"
        style={{ width: "200px" }}
        onClick={() => loginWithRedirect()}
      >
        Sign In
      </Button>
    </div>
  );
};

export default FileUpload;
