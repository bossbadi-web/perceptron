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

2. Install the dependencies

   ```bash
   npm install
   ```

3. Run the application in development mode

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
