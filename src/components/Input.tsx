import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/solid";
import Image from "next/image";


export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
        <Image src={''} alt="user img" className="rounded-full cursor-pointer hover:brightness-95 bg-slate-300 h-10 w-10"/>
        <div className="flex flex-col w-full divide-y divide-gray-200">
            <textarea placeholder="What's happening" rows="3" className="w-full border-none  focus:ring-0 text-lg placeholder-gray-700 text-gray-700 tracking-wide min-h-[50px]"></textarea>
            <div className="flex py-3">
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                <button className="bg-blue-400 ml-auto rounded-full text-white px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50" disabled>Tweet</button>
            </div>
            

        </div>
        
    </div>
  )
}