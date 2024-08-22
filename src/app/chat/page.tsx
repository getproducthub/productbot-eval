import AskAnything from "~/app/_components/AskAnything";
import Messages from "~/app/_components/Messages";
import { api, HydrateClient } from "~/trpc/server";

export default async function Chat() {
  void api.message.getList.prefetch();

  return (
    <HydrateClient>
      <main className="flex h-screen overflow-scroll flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container h-full py-6 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold tracking-tight mb-6">
            Ask anything from your Assistant
          </h1>

          <div className="flex flex-1 min-h-0 gap-10 max-w-3xl w-full">
            <AskAnything />

            <div className="h-full overflow-scroll flex-1">
              <Messages />
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
