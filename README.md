# 🐝 TaskHive Client

> Frontend for the TaskHive freelance marketplace platform. Built with Next.js 16 and React 19.

## 🎯 Purpose

TaskHive connects clients who need tasks done with freelancers who can complete them. The client provides a full-featured web interface for browsing tasks, submitting proposals, managing projects, processing payments, and administering the platform.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (canary, breaking changes — see `AGENTS.md`)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Component Library:** HeroUI (`@heroui/react`)
- **Icons:** Lucide React, React Icons, Gravity UI Icons
- **Authentication:** better-auth (email/password + Google OAuth)
- **Payments:** Stripe (Checkout Sessions)
- **Database:** MongoDB 7 (via better-auth adapter and raw connection)
- **Linting:** ESLint with `eslint-config-next/core-web-vitals`

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

The client will be running on `http://localhost:3000`.

> **Note:** The backend server must also be running on `http://localhost:9000` (see `../taskhive-server/`).

## 🔐 Key Workflows

### 1. Authentication Flow
Handled completely by **better-auth** interacting directly with MongoDB. Sessions are verified in the frontend via Next.js middleware and server-side utilities.

### 2. Job Hiring Flow
1. **Client** creates a Task → *Status: Open*
2. **Freelancers** submit Proposals to the Task → *Status: Pending*
3. **Client** accepts a Proposal → *Proposal status: Accepted* (Task status: In Progress)
4. **Freelancer** submits the work (Project URL) → *Task status: Completed*

### 3. Payment Flow
Initiated on the client, processed through Next.js API route (`/api/checkout_sessions`) communicating with Stripe, and recorded in the Express backend (`/payments`).

## ✨ Features

### Route Groups
- `(main)/` — Public pages with Navbar and Footer (landing, tasks, freelancers, auth, payment success)
- `(dashboard)/` — Authenticated pages with DashboardSidebar (role-specific dashboards)

### Authentication
- Sign up / sign in with email/password or Google
- Role-based access: `client`, `freelancer`, `admin`
- Session helpers: `getUserSession()`, `requireRole(role)` in `@/lib/core/session.js`

### 🗺️ Pages Overview

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with hero, stats, how it works, categories, features |
| `/tasks` | Public | Browse open tasks with search, category filter, pagination |
| `/tasks/:id` | Public | Task details |
| `/freelancers` | Public | Browse freelancers |
| `/freelancers/:id` | Public | Freelancer profile |
| `/auth/login` | Public | Sign in |
| `/auth/register` | Public | Sign up |
| `/dashboard/client` | Client | Client dashboard |
| `/dashboard/client/tasks` | Client | Manage tasks (CRUD) |
| `/dashboard/client/tasks/new` | Client | Create task |
| `/dashboard/client/proposals` | Client | View/review proposals |
| `/dashboard/client/payments` | Client | Payment history |
| `/dashboard/client/profile` | Client | Edit profile |
| `/dashboard/freelancer` | Freelancer | Freelancer dashboard with stats |
| `/dashboard/freelancer/proposals` | Freelancer | Submitted proposals |
| `/dashboard/freelancer/projects` | Freelancer | Active/in-progress projects |
| `/dashboard/freelancer/earnings` | Freelancer | Earnings overview |
| `/dashboard/freelancer/profile` | Freelancer | Edit profile (bio, skills, hourly rate) |
| `/dashboard/admin` | Admin | Admin dashboard with platform stats |
| `/dashboard/admin/users` | Admin | Manage users (block/unblock) |
| `/dashboard/admin/tasks` | Admin | Manage all tasks (delete) |
| `/dashboard/admin/payments` | Admin | View all payments |
| `/payment/success` | Public | Stripe checkout success page |

### 🔌 API & Integrations

- **Server API Integration:** API calls use `serverFetch()` and `serverMutation()` from `@/lib/core/server.js`, which target `NEXT_PUBLIC_SERVER_URL` (default: `http://localhost:9000`).
- **Stripe Payments:** Checkout session creation at `app/api/checkout_sessions/route.js`. Uses Stripe Checkout with redirect to `/payment/success`.

## ⚙️ Environment Variables

All variables are in committed `.env` (development only — rotate for production).

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | better-auth encryption secret |
| `BETTER_AUTH_URL` | Auth callback URL (`http://localhost:3000`) |
| `MONGOBD_URI` | MongoDB connection string |
| `USER_DB_NAME` | Database name (`taskhive`) |
| `NEXT_PUBLIC_SERVER_URL` | Backend API URL (`http://localhost:9000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## 🌐 Deployment

Deployed on Vercel.
