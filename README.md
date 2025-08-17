# MindNote - A simple web-based note-taking app

## Technologies used:

Next.js

React

Clerk for authentication

Convex as the backend (complete with type safety and no need for an ORM)

TailwindCSS and ShadCN UI for a pleasant UI and UX

## Features

📜 A notion-style editor, complete with / commands, rich text edtiing, highlighting, etc. as well as the ability to add images

🗑️ Ability to add notes to trash and restore from trash or remove them permanently

📄 Custom document IDs in the URL for each document

🌙 Dark and light mode

🔁 Real-time sync with the backend using Convex

## Running the app locally

Clone the repository: `git clone <repository link>`

Run `npm i`

Add environment variables for Clerk and Convex in `env.local`

Run `npx convex start`

Open a second terminal and run `npm run dev`
The app should now be working on `localhost:3000`!

## Notes on this project

This project was taken from a YouTube tutorial that was intended to teach how to build a Notion clone. As such, the way this code is organised is not necessarily how I would organise this codebase.
