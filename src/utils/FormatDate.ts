import dayjs from "dayjs";
export const formatDate = (createdAt: string | Date | undefined) => {
  const date = dayjs(createdAt);
  const formattedDate = date.format("DD/MM/YYYY HH:mm:ss");
  return formattedDate;
};
