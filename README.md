# Productbot Eval

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Technologies used
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Run this with `pnpm dev`

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:
- [Documentation](https://create.t3.gg/)


# Instructions:
    Create a simple ai chatbot using [OpenAI's api](https://platform.openai.com/docs/api-reference/chat)

## Front End
- Create a new page at `/chat`
- The front end should be a simple form that allows a user to input a message in a text field.
- It should display a thread with messages from the user and responses from the ai in order
- Styling is at your discretion

## Back End
- Should contain an endpoint that recieves messages from the user then using Open AI's node sdk sends those messages to Open AI and recieves chat completions to return to the front end.
- Open AI api key will be provided by Productbot.
- Example endpoints can be found here: src/server/api/routers/post.ts