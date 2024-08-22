"use client";

import { Fragment } from "react";
import { api } from "~/trpc/react";

const Messages: React.FC = () => {
  const [messages] = api.message.getList.useSuspenseQuery();

  if (messages.length === 0) {
    return (
      <p className="text-lg">No question has been asked for now</p>
    );
  }

  return (
    <div className="w-full">
      <p className="text-lg">Recent questions:</p>

      <div className="flex flex-col gap-4 m-3">
        {messages.map((item) => (
          <div key={item.id}>
            <p>
              <span className="font-bold opacity-40">- You&apos;ve asked: </span>

              <span>
                {item.question.split('\n').map((line, idx) => (
                  <Fragment key={idx}>
                    {line}<br />
                  </Fragment>
                ))}
              </span>
            </p>
            <p>
              <span className="font-bold opacity-40">- Assistant: </span>
              <span>{item.answer ?? "Just a silence"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
