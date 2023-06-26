import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

interface PostProps {
  post: {
    id: number;
    name: string;
    userName: string;
    userImage: string;
    img: string;
    text: string;
    timestamp: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-b-gray-200">
      <img
        src={post.userImage}
        alt="user image"
        //   width={48}
        //   height={48}
        className="rounded-full h-11 w-11 mr-4"
      />

      <div className="w-full">
        <div className="flex items-center justify-between ">
          <div className="flex  space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post.userName} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">{post.timestamp}</span>
          </div>
          {/* icone */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 ml-3" />
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.text}</p>
        <img src={post.img} alt={post.text}  className="rounded-2xl mr-2 w-full" />
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-9  hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
