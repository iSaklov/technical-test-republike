# Technical test Repub👍 by iSaklov

_Welcome to a streamlined journey through the development of a **social app** as envisioned for the Technical Test Republike._

## Task:

The essence of the task was to conceptualize and deploy a project featuring sign-up, login functionalities, message posting, and reactions with likes or dislikes.

For an in-depth look at the design and specifications set for the project, refer to the Figma design mockup: Figma Design Mockup [Figma Design Mockup](https://www.figma.com/file/V60Qs8UHxHzDZEO15h7UO8/Technical-Test-Republike?type=design&node-id=0%3A1&mode=design&t=QEUff3iiItGH0DIU-1).

Explore the deployed project here: [Republike by iSac](https://republike-technical-test-4c4cd53c2201.herokuapp.com/).

## Tech stack:

**Frontend**: Crafted with _**React**_, _**TypeScript**_, and styled by _**Tailwind CSS**_ for a responsive and intuitive user experience.

**Backend**: Engineered using _**Node.js**_ with _**Express**_ for server-side logic, and _**MongoDB**_ for database management, ensuring robust and scalable application performance.

**Authentication**: Secured with _**JWT**_ to safeguard user sessions and information.

## Getting Started:

Begin by cloning the repository:

`git clone https://github.com/iSaklov/technical-test-republike`

Enter the project directory:

`cd technical-test-republike`

Install dependencies for both client and server with a unified command:

`npm run install`

Prepare your `.env` file in the `/server` directory with MongoDB and JWT_SECRET. Here's how your configuration might look: 🤫

```
PORT=3001
MONGODB_URI=mongodb+srv://citizen:eHpssWPvARNp067i@isaklovfreeprojects.bphkywi.mongodb.net/republike?retryWrites=true&w=majority&appName=iSaklovFreeProjects
JWT_SECRET=freedom
```

Additionally, set up a `.env` file in the `/client` directory to define the base URL for API requests. Add the following line to ensure seamless connection during development:

`REACT_APP_API_BASE_URL=http://localhost:3001`

This configuration ensures that your client-side environment is correctly pointed to your local server for API calls.

With the `.env` setup complete, kickstart the application from the root directory of the project using :

`npm run dev`

This launches both the client and server sides concurrently for a seamless development experience. 👾

## Development Diary:

_A hypothetical week of undisturbed progress might have looked like this:_

- **Monday**: Task analysis, planning, project setup, and tooling. - 3 hours.
- **Tuesday**: Server development, including routing and database integration. - 4 hours.
- **Wednesday**: Implementing authentication and context management on the client side. - 4 hours.
- **Thursday**: Refining communication between server and client, enhancing type safety with TypeScript. - 4 hours.
- **Friday**: Developing post interactions, implementing like/dislike functionality. - 4 hours.
- **Saturday**: UI enhancements, post creation modal, and final adjustments. - 3 hours.
- **Sunday**: Testing, documentation, and preparing for presentation - 2 hours.

_**Bonus**_: Preparing for deployment involved script adjustments, redefining URLs, setting up express.static for serving built client files, and ensuring environment variables were properly configured for both development and production environments. Opting for Heroku as our hosting platform added a layer of learning and adaptation to our development process. - 3 hours.

_Realistically, achieving this streamlined progression was a challenge amidst the usual ebb and flow of daily responsibilities. The actual timeline extended as we balanced development with life's demands._

For a closer look at the project, visit the GitHub repository: [GitHub - Republike Technical Test](https://github.com/iSaklov/technical-test-republike). The README contains comprehensive instructions for running and exploring the application.

The project follows conventional structures for a _**React**_ and _**Node.js**_ application, focusing on clear component organization, secure authentication flows, and effective state management. For a deeper dive into the implementation details or inquiries, feel free to reach out. We're always ready to discuss and dissect the intricacies of our development journey.

**New Features and Enhancements:**

- Implemented visibility toggle for passwords, enhancing user experience during authentication.
- Introduced validation feedback for email and password fields, informing users of input expectations in real-time.
- Username input now automatically replaces spaces with underscores and converts characters to lowercase, streamlining user identification.
- Prepared the project for Heroku deployment, ensuring seamless transition from development to production.

This phase of the project was marked by an iterative process of refinement, driven by a commitment to both functionality and user experience.
