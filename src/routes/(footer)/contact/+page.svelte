<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<section>
  <div class="container">
    <div class="col-md-8 offset-md-2">
      <div class="row normal-row">
        <h1 class="text-center display-4">Get in touch</h1>
        <form class="mb-3" method="POST" use:enhance>
          {#if form?.message}
            <div
              class="alert"
              role="alert"
              class:alert-success={form.status === 200}
              class:alert-danger={form.status !== 200}
            >
              {form?.message}
            </div>
          {/if}
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
