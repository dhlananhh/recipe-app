#  Culinary Companion: The Modern Recipe App

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-4-3982CE?logo=prisma)](https://www.prisma.io/)

**Culina** is a modern, full-stack recipe application designed to provide a seamless and delightful cooking experience. Users can browse, search, and save their favorite recipes from a vast collection. Built with a powerful, modern tech stack, this project showcases best practices in web development with Next.js App Router.

**[➡️ View Live Demo](<Link-to-Live-Demo>)** 

![Culina Homepage Screenshot](</path/to/your/screenshot.png>) 

---

## ✨ Features

-   **🍽️ Comprehensive Recipe Library**: Access to over 300 unique recipes from TheMealDB API.
-   **🔍 Powerful Search**: Instantly find recipes by name.
-   **📚 Category Exploration**: Discover recipes by meal categories (e.g., Seafood, Vegan, Dessert).
-   **📖 Full Recipe Collection**: Browse all available recipes with smart pagination.
-   **👤 User Authentication**: Secure sign-up and sign-in functionality powered by Clerk.
-   **❤️ Save Favorite Recipes**: Logged-in users can save and manage their favorite recipes.
-   **📱 Fully Responsive Design**: A beautiful and intuitive user interface that works perfectly on desktop, tablet, and mobile devices.
-   **⚡ High Performance**: Built with Next.js Server Components, Server Actions, and intelligent caching strategies for a fast user experience.

---

## 🛠️ Tech Stack & Architecture

This project is built on a modern, type-safe, and highly performant technology stack.

-   **Framework**: [Next.js](https://nextjs.org/) 15 (with App Router & Turbopack)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 with [Shadcn UI](https://ui.shadcn.com/) for beautiful, accessible components.
-   **Authentication**: [Clerk](https://clerk.com/) for complete user management.
-   **Database**: [MariaDB](https://mariadb.org/) (compatible with MySQL).
-   **ORM**: [Prisma](https://www.prisma.io/) for type-safe database access and migrations.
-   **Data Fetching**: TheMealDB (free and public API for food recipes).
-   **Deployment**: [Vercel](https://vercel.com/)
-   **Local Development**: [Localtunnel](https://localtunnel.github.io/www/) for testing Clerk Webhooks.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [Yarn](https://yarnpkg.com/) (or npm/pnpm)
-   A free [Clerk](https://clerk.com/) account
-   A free cloud-based MySQL/MariaDB database (e.g., [TiDB Cloud Serverless](https://tidbcloud.com/), [Aiven](https://aiven.io/))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<Your-GitHub-Username>/culina.git
    cd culina
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add the following variables.

    ```env
    # Database Connection (from your cloud provider like TiDB Cloud)
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict"
    SHADOW_DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?sslaccept=strict"

    # Clerk Authentication Keys (from your Clerk dashboard)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    CLERK_WEBHOOK_SECRET=whsec_...
    ```

4.  **Sync the database schema with Prisma:**
    This command will read your `prisma/schema.prisma` file and apply the changes to your database.
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the development server:**
    ```bash
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🌐 Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

1.  **Push your code** to a GitHub repository.
2.  **Import the repository** into Vercel.
3.  **Configure Environment Variables:** Add the same environment variables from your `.env.local` file to the Vercel project settings. **Ensure you use your production database URL.**
4.  **Deploy!** Vercel will automatically detect the Next.js framework and run the `build` command (`prisma generate && next build`).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgements

-   **TheMealDB API** for providing the recipe data.
-   **The teams behind Next.js, Prisma, Clerk, and Shadcn UI** for creating amazing developer tools.
