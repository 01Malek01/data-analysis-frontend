import { Button } from 'antd';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';


type Props = {
 title: string;
 onClick?: () => void;
 styles?: string;
};

export default function CustomButton({title, onClick,styles} : Props) {
  return (
    <Button
    onClick={onClick}
      htmlType="submit"
      className={`!min-w-60 !h-[3rem] !bg-blue-500 !text-white font-bold py-2 px-4 rounded !flex !items-center !justify-center mx-auto mt-8 hover:scale-105 ${styles} `}
    >
    {title} <FaRegArrowAltCircleRight size={20} />
    </Button>
  );
}
