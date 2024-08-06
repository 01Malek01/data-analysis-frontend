export interface File extends Blob {
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  fileType: string;
  userId: string;
  __v?: number;
  data: object[];
  lastModified: number;
  webkitRelativePath?: string;
}
