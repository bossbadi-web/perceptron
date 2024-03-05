<script>
  import { enhance } from "$app/forms";
  import { submitCaptcha } from "$lib/recaptchaClient";
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Get in touch</h1>
        <p class="text-center lead">
          Questions? Comments? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <form class="mb-3" method="POST" use:enhance={submitCaptcha}>
          <div class="mb-3">
            <label for="subjectInput" class="form-label">Subject</label>
            <select class="form-select" id="subjectInput" name="subject" required>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="msgInput" class="form-label">Message</label>
            <textarea class="form-control" id="msgInput" name="msg" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn btn-main">Submit</button>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .display-4 {
    margin-bottom: 1rem;
  }

  .lead {
    margin-bottom: 2rem;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    .lead {
      padding: 0;
      font-size: 1rem;
    }
  }
</style>
