"use client";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Moment from "react-moment";
import { db, storage } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIDState } from "@/atom/modalAtom";
import { useEffect, useState } from "react";
import { create } from "domain";

interface PostProps {
  post: {
    id: string;
    name: string;
    userName: string;
    userImage: string;
    img: string;
    text: string;
    seconds: number;
    nanoseconds: number;
  };
}

export default function Post({ post }: PostProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postIDState);
  const [comments, setComments] = useState([createComment()]);

  async function deletePost() {
    if (window.confirm("Are you sure?")) {
      deleteDoc(doc(db, "posts", post.id.toString()));
      if (post.img) {
        deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  }

  function createComment(
    comment = "",
    name = "",
    timestamp = "",
    userImage = ""
  ) {
    return {
      comment,
      name,
      timestamp,
      userImage,
    };
  }

  useEffect(() => {
    console.log(post.id.toString());
    
    const unsubscribe = onSnapshot(collection(db, "posts", post.id.toString(), "comments"), (snapshot) => {
      let commentsData = [];
      commentsData = snapshot.docs.map((doc) => {
        const { comment, name, timsetamp, userImg } = doc.data();
        return createComment(comment, name, timsetamp, userImg);
      });
      setComments(commentsData);
    });
  }, [post.id]);

  return (
    <div className="flex p-3 cursor-pointer border-b border-b-gray-200">
      <img
        src={post.userImage}
        alt="user image"
        className="rounded-full h-11 w-11 mr-4"
      />
      <div className="w-full">
        <div className="flex items-center justify-between ">
          <div className="flex  space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">{post.userName} - </span>
            <Moment fromNow>
              {new Date(post.seconds * 1000 + post.nanoseconds / 1000000)}
            </Moment>
          </div>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 ml-3" />
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        <img
          src={post.img}
          alt={post.text}
          className="rounded-2xl mr-2 w-full"
        />
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              className="h-9  hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostID(post.id);
                  setOpen(!open);
                }
              }}
            />
            <span>{comments.length}</span>
          </div>
          {session?.user?.email === post.userName && (
            <TrashIcon
              className="h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              onClick={() => deletePost()}
            />
          )}
          <HeartIcon className="h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
