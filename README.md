# Technical test Republike by iSaklov

_Alright, let's keep it simple._

#### Task: Develop a streamlined social app. People can sign up, log in, post text messages, and hit like or dislike.

## Tech stack:

**Frontend**: React + TypeScript + Tailwind CSS.

**Backend**: Node.js + Express + MongoDB.

**For auth**: JWT.

How to run:

Clone the repo: `git clone` :

https://github.com/iSaklov/technical-test-republike

`cd technical-test-republike`

Install dependencies: `npm run install` (one command for both client and server, neat).

Set up `.env` in the server folder for MongoDB and JWT_SECRET.
.env example:

server/.env

```
PORT=3001
MONGODB_URI=mongodb+srv://citizen:eHpssWPvARNp067i@isaklovfreeprojects.bphkywi.mongodb.net/republike?retryWrites=true&w=majority&appName=iSaklovFreeProjects
JWT_SECRET=freedom
```

After setting up the .env file in the server folder, you're all set to get the application running. Simply execute the following command from the root of the project:

`npm run start`

This will start both the client and server simultaneously, thanks to the magic of concurrently. Now, sit back, relax, and enjoy the fully functional social media application you've just set up!

## Weekly grind without distractions:

- Monday: Analyzing the task, planning, setting up CRA, and ESLint/Prettier. - 3 hours.
- Tuesday: Server development, routes, controllers, MongoDB connection. - 4 hours.
- Wednesday: Client-side auth, AuthContext. - 4 hours.
- Thursday: Perfecting server-client communication, TypeScript interfaces. - 4 hours.
- Friday: Client-side posts handling, likes/dislikes. - 4 hours.
- Saturday: Adding post creation modal, final tweaks. - 3 hours.
- Sunday: Final testing, documentation. - 2 hours.

_Of course, if life and jobs didn't interfere, it would've been like that. Reality took a bit longer._

Git link: https://github.com/iSaklov/technical-test-republike

Check the README there for all the details on how to run and use it.

_Code-wise_: It's pretty standard for this stack. Components, routes, auth context, basic form handling. On the server side, there's CRUD for posts, registration/login, and token handling.

For _more details_, dive into the code. I tried to make it clear and commented where necessary. Hit me up if you've got questions. We'll sort it out.
