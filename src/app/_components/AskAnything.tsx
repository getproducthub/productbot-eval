"use client";

import { useCallback } from "react";
import { api } from "~/trpc/react";
import { toast } from 'react-toastify';

const AskAnything: React.FC = () => {
  const utils = api.useUtils();
  
  const createMessage = api.message.create.useMutation({
    onSuccess: () => utils.message.invalidate(),
    onError: (error) => {
      toast.error(
        error.data?.zodError == null ? error.message: error.data.zodError.fieldErrors.question?.[0]
      );       
    },
  });

  const handleOnSumbit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void  => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const question = formData.get('message') as string;
      createMessage.mutate({ question });
    },
    [createMessage],
  );

  return (
    <form
      onSubmit={handleOnSumbit}
      className="flex flex-col gap-4 w-[400px]"
    >
      <label htmlFor="message" className="text-sm">
        Your message
      </label>

      <textarea
        id="message"
        rows={5}
        title="OpenAI text box"
        className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write anything you want OpenAI to ask"
        name="message"
        required
      />

      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createMessage.isPending}
      >
        {createMessage.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AskAnything;
