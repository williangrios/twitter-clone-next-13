import CommentModal from "@/components/CommentModal";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { createArticle, createFollow } from "@/utils/functions";

export default async function Home() {
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

  return (
    <main className="flex min-h-screen mx-auto">
      {/* sidebar */}
      <Sidebar />

      {/* feed */}
      <Feed />

      {/* widgets */}
      <Widgets articleList={articleList} followList={followList} />

      {/* modal */}
      <CommentModal />
    </main>
  );
}
