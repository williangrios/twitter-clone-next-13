import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto">
      {/* sidebar */}
      <Sidebar />

      {/* feed */}
      <Feed />

      {/* widgets */}

      {/* modal */}
    </main>
  );
}
