"use client";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { createUser } from "@/utils/functions";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(createUser());
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let email = "";
    let expires = "";
    let name = "";
    let image = "";
    if (session) {
      email = session?.user?.email || "";
      expires = session?.expires;
      name = session?.user?.name || "";
      image = session?.user?.image || "";
    }
    setUser(createUser(email, name, email, image, email, expires));
  }, [session]);

  async function sendPost() {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user?.email,
      text: input,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
      name: session?.user?.name,
      userName: session?.user?.email,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setInput("");
    setSelectedFile("");
    setLoading(false);
  }

  function addImageRef(event: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (typeof readerEvent.target?.result === "string") {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  }

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <Image
            src={user?.user.image || ""}
            width={40}
            height={40}
            alt={user?.user.image}
            className="rounded-full cursor-pointer hover:brightness-95 bg-slate-300 h-10 w-10"
            onClick={() => signOut()}
          />
          <div className="flex flex-col w-full divide-y divide-gray-200">
            <textarea
              placeholder="What's happening"
              rows={3}
              className="w-full border-none  focus:ring-0 text-lg placeholder-gray-700 text-gray-700 tracking-wide min-h-[50px]"
              value={input}
              readOnly={loading}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            {selectedFile && (
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
            )}
            {!loading && (
              <div className="flex py-3">
                {/* <div className="" onClick={() => filePickerRef.current.click()}> */}
                <PhotographIcon
                  className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                  onClick={() => filePickerRef.current?.click()}
                />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageRef}
                />
                {/* </div> */}
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                <button
                  className="bg-blue-400 ml-auto rounded-full text-white px-4 py-2 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  disabled={!input.trim()}
                  onClick={() => sendPost()}
                >
                  Tweet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
