import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { createArticle, createFollow, createPost } from "@/utils/functions";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = params.id;

  const articleResponse = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  );
  const articleData = await articleResponse.json();
  const articleList = articleData.articles.map((article: any) =>
    createArticle(
      article.title,
      new Date(article.publishedAt).toString().slice(0, 15),
      article.urlToImage,
      article.url
    )
  );

  const followResponse = await fetch(
    "https://randomuser.me/api/?results=50&inc=name,login,picture"
  );
  const followData = await followResponse.json();
  const followList = followData.results.map((follow: any) =>
    createFollow(
      follow.name.first + follow.name.last,
      follow.login.username,
      follow.picture.thumbnail
    )
  );

  // const unsub = onSnapshot(doc(db, "posts", postId), (snapshot) => {
  //   const post = createPost(
  //     postId,
  //     snapshot.data()?.name ,
  //     snapshot.data()?.userName ,
  //     snapshot.data()?.userImage ,
  //     snapshot.data()?.image ,
  //     snapshot.data()?.text ,
  //     snapshot.data()?.timestamp.seconds ,
  //     snapshot.data()?.timestamp.nanoseconds
  //   );
  // });

  return (
    <div className="flex min-h-screen mx-auto">
      {/* sidebar */}
      <Sidebar />

      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 items-center space-x-2 sticky top-0 z-50 bg-white border-b border-gray-200 ">
          <Link className="hoverEffect" href="/" passHref>
            <ArrowLeftIcon className="h-5" />
          </Link>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        {/* <Post post={post} /> */}
      </div>

      {/* widgets */}
      <Widgets articleList={articleList} followList={followList} />

      {/* modal */}
      {/* <CommentModal /> */}
    </div>
  );
}
