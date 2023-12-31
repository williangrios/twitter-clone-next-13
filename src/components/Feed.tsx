"use client";
import { SparklesIcon } from "@heroicons/react/solid";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";
import { createPost } from "@/utils/functions";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setPosts(
          snapshot.docs.map((post: any) =>
            createPost(
              post.id,
              post.data().name,
              post.data().userName,
              post.data().userImage,
              post.data().image,
              post.data().text,
              post.data().timestamp.seconds,
              post.data().timestamp.nanoseconds,
            )
          )
        );
      }
    );
  }, []);

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 ">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post, i) => (
          <motion.div key={i} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
            <Post  post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
