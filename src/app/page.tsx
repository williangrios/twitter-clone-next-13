import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default async function Home() {

  const articleResponse = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
  const articleData = await articleResponse.json()
  const articleList = articleData.articles.map((article: any) => createArticle(article.title,  new Date( article.publishedAt).toString().slice(0,15), article.urlToImage, article.url))

  const followResponse = await fetch('https://randomuser.me/api/?results=50&inc=name,login,picture')
  const followData = await followResponse.json()
  const followList = followData.results.map((follow: any) => createFollow(follow.name.first + follow.name.last, follow.login.username, follow.picture.thumbnail))

  function createArticle(title: string, date: string, urlToImage: string, url: string){
    return{
      title,
      date, 
      urlToImage,
      url
    }
  }

  function createFollow(name: string, userName: string, picture: string){
    return{
      picture,
      name,
      userName,
    }
  }

  return (
    <main className="flex min-h-screen mx-auto">
      {/* sidebar */}
      <Sidebar />

      {/* feed */}
      <Feed />

      {/* widgets */}
      <Widgets articleList={articleList} followList={followList}/>

      {/* modal */}
    </main>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
