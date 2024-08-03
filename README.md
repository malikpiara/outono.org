Imagina poder encontrar e tomar café com portugueses que trabalham em tech, em qualquer parte do mundo.

Poder fazer perguntas antecipadamente quando estás a considerar uma mudança ou fazer crescer o teu produto ou startup por teres acesso a insights locais. E fazê-lo sem atrito. Mesmo quando só estás de passagem por uma semana. É o que estou a tentar tornar mais fácil com a Outono.

A Outono é uma comunidade de programadores, designers e empreendedores Portugueses que vivem lá fora. Com hubs em várias cidades, começando em Berlim.

## Tecnologias Utilizadas

Este projeto é construido com [Next.js](https://nextjs.org/), Supabase, Resend e Github Actions.

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/malikpiara/outono.org.git
   cd outono.org
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start Docker:
   Ensure Docker is running on your machine before proceeding.

4. Set up local Supabase:

   ```bash
   supabase init
   supabase start
   ```

5. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Update the values in `.env.local` with your local Supabase credentials

6. Set up a test user:

   - Access your local Supabase Studio at http://localhost:54323
   - Create a user with email 'malik@outono.org' in the Auth section

7. Update the mock user ID:

   - In `utils/supabase/server.js`, replace the `mockUserId` value with the ID of the test user you created

8. Run the development server:

   ```bash
   pnpm dev
   ```

9. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Docker and Supabase

Docker is used to run the local Supabase instance, which includes PostgreSQL, GoTrue (for authentication), PostgREST, and other Supabase services.

The `supabase start` command initializes and runs these Docker containers.
You can view running Supabase containers with `docker ps`.
To stop and remove Supabase containers, use `supabase stop`.

## Important Considerations

- Local Authentication: In development, the app uses a mock authentication system. Any login attempt will succeed and use the test user's credentials.
- Real Data: Despite using mock authentication, the app interacts with real data in your local Supabase instance.
- Environment Sync: Ensure your local Supabase schema matches your production environment.
- Testing: Always thoroughly test authentication flows in a staging environment before deploying to production.
- Security: Be cautious not to commit any real user IDs or sensitive information to version control.

## Stopping the Local Environment

To stop the local Supabase instance:

```bash
supabase stop
```

## Useful Commands

- `pnpm dev`: Starts the development server
- `pnpm build`: Builds the app for production
- `pnpm start`: Runs the built app in production mode
- `supabase db reset`: Resets your local database to its initial state

## Mais Informação

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com/)
