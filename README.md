# RLN - Referral System

The Referral System is a beneficial system for patients, doctors, nurses, and hospitals. It helps patients receive appropriate and timely care, reduces waiting times, distributes patients evenly across hospitals, and enables doctors and nurses to work together effectively.

## Tech-Stacks

| Type               | Technology     | Version | Documentation                                       |
| ------------------ | -------------- | ------- | --------------------------------------------------- |
| **Web Frameworks** | Next.js        | 14.0.4  | [Next.js](https://nextjs.org)                       |
| **ENV Validation** | T3-env         | 0.7.1   | [Create.t3.gg](https://env.t3.gg/docs/introduction) |
| **Authentication** | NextAuth.js    | 4.24.5  | [NextAuth.js](https://next-auth.js.org)             |
| **ORM**            | Prisma         | 5.6.0   | [Prisma](https://prisma.io)                         |
| **UI Components**  | ChakraUI       | 2.8.2   | [ChakraUI](https://chakra-ui.com/)                  |
| **Table package**  | TanStack-Table | 8.13.2  | [TanStack/react-table](https://chakra-ui.com/)      |
| **Validation**     | Zod            | 3.22.4  | [Zod](https://zod.dev/)                             |

## Run Locally

---

1. Clone the repository

```
git clone https://github.com/yottrakul/rln-referral.git
```

2. Install dependencies using Yarn

```
yarn
```

3. Copy the .env.example to .env and update the variables in root path

```
cp .env.example .env
```

4. Config following description in env.example

- [] Google OAuth Client ID and Client Secret [Documentation](https://developers.google.com/identity/protocols/oauth2), [Configuration](https://console.developers.google.com/apis/credentials)

- [] Connection String for Prisma
- [] NextAuth Secret

> Google Authorized JavaScript origins
>
> - For production: https://{YOUR_DOMAIN}
> - For development: http://localhost:3000

> Google Authorized redirect URIs
>
> - For production: https://{YOUR_DOMAIN}/api/auth/callback/google
> - For development: http://localhost:3000/api/auth/callback/google

5. Push Database Schema with Prisma

```
yarn db:push
```

6. Run Development Server

```
yarn dev
```

7. Go to localhost and Sign in with Google OAuth or Credentials and change **ROLE** in database to **ADMIN** for access into dashboard
