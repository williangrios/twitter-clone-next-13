'use client'
import { SparklesIcon } from "@heroicons/react/solid";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Feed() {

  const [posts, setPost] = useState([createPost(0, "", "", "", "", '', '')]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setPost(
          snapshot.docs.map((post: any) =>
          // console.log(post)
          
          // createPost(0, "", "", "", "", '', '')
            createPost(
              post.id,
              post.data().name,
              post.data().userName,
              post.data().userImage,
              post.data().image,
              post.data().text,
              post.data().timestamp,
            )
          )
        );
      }
    );
  }, []);

  function createPost(
    id: number,
    name: string,
    userName: string,
    userImage: string,
    img: string,
    text: string,
    timestamp: {
      seconds: number;
      nanoseconds: number;
    },
  ) {
    return {
      id,
      name,
      userName,
      userImage,
      img,
      text,
      timestamp,
    };
  }


  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 ">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
