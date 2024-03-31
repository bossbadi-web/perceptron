<h1 align="center">
  <img src="https://perceptron.gopubby.com/favicon.png" width="100" height="100">
  <br>
  Perceptron
</h1>
<p align="center">
  Convert your handwritten notes into an interactive study guide
  <br>
  https://perceptron.gopubby.com
</p>

> [!TIP]
> The following commands are designed for a Linux environment. You may need to adjust them for your operating system.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/bossbadi/perceptron
   ```

1. Install the dependencies

   ```bash
   npm install
   ```

1. Create a Supabase project

   - Complete steps 1-3 in the [restoration instructions](#restore)

1. Add environment variables

   - Rename `.env.example` to `.env`
   - Follow the instructions in the file

1. Run the application in development mode

   ```bash
   npm run dev
   ```

   or in production mode

   ```bash
   npm run build
   npm run preview
   ```

## Hosting

Vercel is the obvious choice here, but keep in mind that Vercel functions have a 10 second timeout limit. If the images you upload are too large, the question generation will be stuck on the loading screen.

Therefore, I recommend hosting the app on a private server. I'm currently using Fly.io and everything works great.

### Fly.io

To automatically redeploy the app on Fly.io every time you push changes, add the following action secrets to your repository:

- `ENV_FILE` - Copy and paste the contents of `.env`
- `FLY_API_TOKEN` - Create a Fly.io access token and add it here

## Backup

1. Install PostgreSQL

   ```bash
   sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   sudo apt update
   sudo apt install -y postgresql-15
   ```

1. Set environment variables

   ```bash
   export PGPASSWORD="YOUR_DATABASE_PASSWORD"
   export CONNECTION_STRING="YOUR_DATABASE_CONNECTION_STRING"
   ```

1. Backup the schema (structure of the database)

   ```bash
   pg_dumpall -f backups/schema.sql -d $CONNECTION_STRING --schema-only --no-owner --clean
   ```

1. Backup the data (contents of the database)

   ```bash
   pg_dumpall -f backups/data.sql -d $CONNECTION_STRING --data-only --disable-triggers
   ```

## Restore

You can restore to a hosted Supabase project or a local one.

1. Install PostgreSQL

   ```bash
   sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   sudo apt update
   sudo apt install -y postgresql-15
   ```

1. Set environment variables

   ```bash
   export PGPASSWORD="YOUR_DATABASE_PASSWORD"
   export CONNECTION_STRING="YOUR_DATABASE_CONNECTION_STRING"
   ```

1. Restore the schema

   ```bash
   psql -d $CONNECTION_STRING -f backups/schema.sql
   ```

1. Restore the data

   ```bash
   psql -d $CONNECTION_STRING -f backups/data.sql
   ```

1. If you're restoring to a hosted Supabase project, you may need to manually update some configurations, such as enabling auth providers.

## Run Supabase Locally

1. Start

   ```bash
   npm exec supabase start
   ```

1. Stop

   ```bash
   npm exec supabase stop
   ```

1. Reset to a clean state

   ```bash
   npm exec supabase db reset
   ```
