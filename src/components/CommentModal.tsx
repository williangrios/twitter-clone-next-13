"use client";
import { useRecoilState } from "recoil";
import { modalState, postIDState } from "../atom/modalAtom";
import Modal from "react-modal";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { createPost, createUser } from "@/utils/functions";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {useRouter} from 'next/navigation';

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postID, setPostID] = useRecoilState(postIDState);
  const [post, setPost] = useState(createPost(""));
  const [input, setInput] = useState("");
  const [user, setUser] = useState(createUser());
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   console.log(postID);
    
  //   onSnapshot(doc(db, "posts", postID), (snapshot) => {
  //     setPost(
  //       createPost(
  //         postID,
  //         // snapshot.data()?.name || "",
  //         // snapshot.data()?.userName || "",
  //         // snapshot.data()?.userImage || "",
  //         // snapshot.data()?.image || "",
  //         // snapshot.data()?.text || "",
  //         // snapshot.data()?.timestamp.seconds || "",
  //         // snapshot.data()?.timestamp.nanoseconds || ""
  //       )
  //     );
      
  //   });
    
  //   let email = "";
  //   let expires = "";
  //   let name = "";
  //   let image = "";
  //   if (session){
  //     email = 'session?.user?.email' || "",
  //     expires = session?.expires,
  //     name = session?.user?.name || "",
  //     image = session?.user?.image || ""
  //   }
  //   setUser(createUser(email, name, email, image, email, expires));

  // }, [postID, session, setPostID]);

  async function sendComment(){
    await addDoc(collection(db, 'posts', postID.toString(), 'comments'), {
      comment: input,
      name: session?.user?.name,
      userImg: session?.user?.image,
      timestamp: serverTimestamp()
    })
    setOpen(false);
    setInput('');
    router.push(`posts/${postID}`)
  }

  return (
    <div>

      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className={
            "p-2 max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 outline-none rounded-xl shadow-md "
          }
        >
          {postID}
          <div className=" border-b border-gray-200 ">
            <div
              className="bg-slate-100 hoverEffect w-10 h-10 flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <XIcon className="h-8 text-gray-700" />
            </div>
          </div>
          <div className="p-1 flex items-center space-x-1 relative">
            <span className="w-0.5 h-full z-[-1] absolute left-7 top-11 bg-gray-300" />
            <img
              src={post.userImage}
              alt="user image"
              className="rounded-full h-11 w-11 mr-4"
            />
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="hidden md:inline-flex text-sm sm:text-[15px]">
              {post.userName} -{" "}
            </span>
            <Moment fromNow>
              {new Date(post.seconds * 1000 + post.nanoseconds / 1000000)}
            </Moment>
          </div>
          <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.text}</p>
          <div className="">
            <>
              <div className="flex p-3 space-x-3">
                <Image
                  src={user?.user.image || ""}
                  width={40}
                  height={40}
                  alt={user?.user.image}
                  className="rounded-full cursor-pointer hover:brightness-95 bg-slate-300 h-10 w-10"
                />
                <div className="flex flex-col w-full divide-y divide-gray-200">
                  <textarea
                    placeholder="Tweet your reply"
                    rows={3}
                    className="w-full border-none  focus:ring-0 text-lg placeholder-gray-700 text-gray-700 tracking-wide min-h-[50px]"
                    value={input}
                    // readOnly={loading}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                  {/* {selectedFile && (
                    <div className="relative">
                      <XIcon
                        className="h-7 p-1 text-gray-800 absolute mt-3 ml-3 cursor-pointer shadow-md shadow-white rounded-full"
                        onClick={() => setSelectedFile("")}
                      />
                      <img
                        src={selectedFile}
                        alt="selected file"
                        width="100%"
                        className={`rounded-xl border-none outline-none my-2 ${
                          loading && "animate-pulse"
                        }`}
                      />
                    </div>
                  )} */}
                    <div className="flex py-3">
                      {/* <div className="" onClick={() => filePickerRef.current.click()}> */}
                      {/* <PhotographIcon
                        className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                        onClick={() => filePickerRef.current?.click()}
                      /> */}
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageRef}
                      /> */}
                      {/* </div> */}
                      <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <button
                        className="bg-blue-400 ml-auto rounded-full text-white px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                        disabled={!input.trim()}
                        onClick={() => sendComment()}
                      >
                        Tweet
                      </button>
                    </div>
                </div>
              </div>
            </>
          </div>
        </Modal>
      )}
    </div>
  );
}
