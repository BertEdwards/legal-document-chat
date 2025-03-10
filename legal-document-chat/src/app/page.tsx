import Header from "@/app/components/header"
import ChatScreen from "./components/chatScreen";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <ChatScreen />
    </main>
  );
}
