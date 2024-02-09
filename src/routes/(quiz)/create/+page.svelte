<script>
  import { enhance } from "$app/forms";
  import Loading from "./Loading.svelte";
  import MainFields from "$lib/components/form/MainFields.svelte";
  import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";

  export let data, form;

  const { LIMITS } = data;
  const acceptedFileTypes = LIMITS.filetypes.map((type) => `.${type}`).join(", ");

  let loading = false;

  const onSubmit = async () => {
    loading = true;

    if (form?.message) {
      form.message = "";
    }

    await new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" }).then((t) => {
          document.cookie = `token=${t}; path=/; max-age=3600`;
          resolve();
        });
      });
    });

    return async ({ update }) => {
      await update();
    };
  };

  $: if (form?.message) {
    loading = false;
  }
</script>

<section>
  <div class="container">
    <!-- loading screen -->
    {#if !form?.message}
      <div class="row" class:d-none={!loading}>
        <div class="col-md-10 offset-md-1">
          <Loading />
        </div>
      </div>
    {/if}

    <!-- normal screen -->
    <div class="row normal-row" class:d-none={loading}>
      <div class="col-md-10 offset-md-1">
        {#if form?.message}
          <div class="alert alert-danger" role="alert">
            {form?.message}
          </div>
        {/if}

        <form method="POST" enctype="multipart/form-data" use:enhance={onSubmit}>
          <h1 class="display-4 text-center">
            <i class="fas fa-hammer" />
            New Perceptron
          </h1>

          <MainFields />

          <div class="note">
            <div class="title">Initialize your Perceptron</div>
            <div class="description">
              Generate questions based on your image and/or notes. Leave these fields blank to start from scratch.
            </div>
          </div>

          <div class="mb-4">
            <label for="file">
              Upload an image
              <small class="text-muted">(max {LIMITS.file / 1024 / 1024} MB)</small>
              <br />
              <small class="text-muted">Supported file types: {acceptedFileTypes}</small>
            </label>
            <input class="form-control" type="file" id="file" name="fileToUpload" accept={acceptedFileTypes} />
          </div>

          <div class="mb-4">
            <label for="notes">
              Notes
              <small class="text-muted">(max {LIMITS.notes} chars)</small>
            </label>
            <!-- cannot resize -->
            <textarea
              class="form-control"
              id="notes"
              name="notes"
              rows="3"
              maxlength={LIMITS.notes}
              placeholder="Paste any notes you have"
              style="resize: none;"
            />
          </div>

          <br />

          <span class="row-of-buttons">
            <button class="btn btn-main btn-lg" formaction="?/play">Create and Play</button>
            <button class="btn btn-secondary btn-lg" formaction="?/preview">Preview</button>
            <button class="btn btn-secondary btn-lg" formaction="?/edit">Edit</button>
          </span>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .note {
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .note .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .note .description {
    font-size: 1rem;
  }
</style>
