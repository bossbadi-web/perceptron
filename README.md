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

   - Go to the "SQL Editor" tab
   - Paste the contents of `supabase/roles.sql` into the editor
   - Run
   - Paste the contents of `supabase/schema.sql` into the editor
   - Run

1. Add environment variables

   - Rename `.env.example` to `.env`
   - Add the corresponding variables from your Supabase project
   - Create an OCR API account and add the API key

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

1. Link your Supabase project (only needs to be done once)

   ```bash
   cd node_modules/supabase/bin/ && supabase link --project-ref YOUR_PROJECT_REFERENCE_ID
   ```

2. Make sure Docker is running

3. Run the following commands:

   ```bash
   npm run dump-roles
   npm run dump-schema
   npm run dump-data
   ```
