<section>
  <div class="container">
    <div class="col-md-10 offset-md-1">
      <div class="row">
        <h1 class="display-4 text-center">Privacy Policy</h1>

        <p class="a-paragraph">
          Throughout this document, "we", "us", and "our" refer to the creators of this website. "You" refers to the
          user of this website. "Perceptron" refers to a quiz that you create on this website.
        </p>

        <h2 class="a-heading">Data Collection</h2>
        <ol>
          <li class="a-paragraph">
            When you register an account directly on the website form, we collect your email address, username, and
            password. If you sign in with Google, we only collect your email address and username.
          </li>
          <li class="a-paragraph">
            When you create a Perceptron, we collect the title, description, and background image URL that you enter.
          </li>
          <li class="a-paragraph">
            You also have the option to upload an image of your notes. The image is processed by a <a
              class="hover-underline"
              href="https://ocr.space/ocrapi">third-party service</a
            >
            that extracts the text from the image. We use the extracted text and/or the additional notes that you enter to
            generate quiz questions using another
            <a class="hover-underline" href="https://api.gopubby.com/chatbot">third-party service</a>. Finally, we store
            the generated quiz questions in our database.
          </li>
        </ol>

        <h2 class="a-heading">Data Usage</h2>
        <ol>
          <li class="a-paragraph">
            We use your email address to send you a verification email when you register for an account. We use your
            email address to send you a password reset email when you request a password reset.
          </li>
          <li class="a-paragraph">
            We use your username to associate you with your Perceptrons. It may be visible to other users.
          </li>
        </ol>

        <h2 class="a-heading">Data Storage</h2>
        <ol>
          <li class="a-paragraph">We store your email address, username, and password in our Supabase database.</li>
          <li class="a-paragraph">
            The password is stored as a hash, which means that we cannot see your password. (If you signed in with
            Google, we do not store a password.)
          </li>
        </ol>

        <h2 class="a-heading">Data Deletion</h2>
        <ol>
          <li class="a-paragraph">To delete a Perceptron, you can click the "Delete" button on the edit page.</li>
          <li class="a-paragraph">
            To delete your account, you can click the "Delete Account" button on your profile page. This will delete all
            of your Perceptrons and your account. We will not be able to recover your profile or your Perceptrons after
            you delete them.
          </li>
        </ol>

        <p class="last-updated">Last updated February 16, 2024</p>
      </div>
    </div>
  </div>
</section>

<style>
  .a-heading {
    margin-top: 2rem;
  }

  .a-paragraph {
    margin-bottom: 0.5rem;
  }

  ol {
    margin-bottom: 0;
  }

  li {
    margin-left: 1.5rem;
  }

  .last-updated {
    margin-top: 2rem;
  }
</style>
