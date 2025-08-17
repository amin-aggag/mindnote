# MindNote - A simple web-based note-taking app

![MindNote Preview Image](/public/MindNote%20Preview%20Image.png)

![MindNote Note Editing Page](public/MindNote%20Note%20Editing%20Page.png)

## Technologies used:

Next.js

React

Clerk for authentication

Convex as the backend (complete with type safety and no need for an ORM)

TailwindCSS and ShadCN UI for a pleasant UI and UX

## Design patterns used

Zustand for global state management

Custom hooks

SOLID principles, including Single-Responsibility

## Features

📜 A notion-style editor, complete with / commands, rich text edtiing, highlighting, etc. as well as the ability to add images

🗑️ Ability to add notes to trash and restore from trash or remove them permanently

📄 Custom document IDs in the URL for each document

🌙 Dark and light mode

🔁 Real-time sync with the backend using Convex

## Running the app locally

Clone the repository: `git clone <repository link>`

Run `npm i`

Set up Clerk and add its environment variables in `.env.local` by following steps 1-9 in the following documentation article, replacing each variable's `VITE` word with `NEXT`: [Convex & Clerk | Convex Developer Hub](https://docs.convex.dev/auth/clerk)

Make a new Convex account [here](https://dashboard.convex.dev/login), create a new project and add the CONVEX_DEPLOYMENT environment variable in `.env.local`, setting it to the new Convex project's development url

Run `npx convex dev`

Open a second terminal and run `npm run dev`
The app should now be working on [http://localhost:3000](http://localhost:3000)!

## Notes on this project

This project was taken from a YouTube tutorial that was intended to teach how to build a Notion clone. I have another project that is completely my own that you can check out [here](https://github.com/amin-aggag/drawing-notepad). Since most of the code comes from a tutorial, the way this code is organised is not necessarily how I would organise this codebase, although it is organised quite well. I intended to add some features in addition to the tutorial's code, which is evident in some of my commits, but I have got rid of them for now to make the code more presentable as those features were not finished yet and those components were not yet optimised for UI design.
