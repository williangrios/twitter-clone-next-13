"use client";
import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WidgetsProps {
  articleList: [
    {
      title: string;
      date: string;
      urlToImage: string;
      url: string;
    }
  ];
  followList: [
    {
      picture: string;
      name: string;
      userName: string;
    }
  ];
}

export default function Widgets(props: WidgetsProps) {
  const [articleNumber, setArticleNumber] = useState(3);
  const [followNumber, setFollowNumber] = useState(3);

  return (
    <div className="md:w-[300px] xl:w-[600px] hidden lg:inline ml-8">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search on twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Whats happening</h4>
        <AnimatePresence>
          
          {props.articleList.slice(0, articleNumber).map((article) => (
            <motion.div key={article.title} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
            <a
              // key={article.title}
              href={article.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
                <div className="flex flex-col space-y-0.5 w-[70%]">
                  <h6 className="text-sm font-bold ">{article.title}</h6>
                  <p className="text-sm font-medium text-gray-500">
                    {article.date}
                  </p>
                </div>
                <div className="w-[30%]">
                  <img
                    src={article.urlToImage}
                    alt="article image"
                    className="rounded-xl"
                    width="100px"
                    height="100px"
                  />
                </div>
              </div>
            </a>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setArticleNumber(articleNumber + 3)}
        >
          Show more
        </button>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] mt-3">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
        {props.followList.slice(0, followNumber).map((follow) => (
          <motion.div key={follow.userName} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
          
          <div
            key={follow.userName}
            className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <img
              className="rounded-full"
              width="40"
              src={follow.picture}
              alt="user image"
            />
            <div className="truncate ml-4 leading-5 w-full">
              <h4 className="font-bold hover:underline text-[14px] truncate">
                {follow.userName}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {follow.name}
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3 py-2 font-bold">
              Follow
            </button>
          </div>
          </motion.div>
        ))}
        </AnimatePresence>
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setFollowNumber(followNumber + 3)}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
