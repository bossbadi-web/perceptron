<script>
  import { enhance } from "$app/forms";
  import { getFlash } from "sveltekit-flash-message";
  import { LIMITS } from "$lib/consts";
  import { page } from "$app/stores";
  import { submitCaptcha } from "$lib/recaptchaClient";
  import Loading from "$lib/components/quiz/create/Loading.svelte";

  let loading = false;

  const onSubmit = async () => {
    loading = true;

    await submitCaptcha();

    return async ({ update }) => {
      await update();
    };
  };

  const flash = getFlash(page);

  $: if ($flash) {
    loading = false;
  }
</script>

<section>
  <div class="container">
    <!-- loading screen -->
    <div class="row" class:d-none={!loading}>
      <div class="col-md-10 offset-md-1">
        <Loading />
      </div>
    </div>

    <!-- normal screen -->
    <div class="row normal-row" class:d-none={loading}>
      <div class="col-md-10 offset-md-1">
        <form method="POST" enctype="multipart/form-data" use:enhance={onSubmit}>
          <h1 class="display-4 text-center">
            <i class="fas fa-upload" />
            Import Perceptron
          </h1>

          <div class="mb-4">
            <label for="file">
              Upload a save file
              <small class="text-muted">(max {LIMITS.file / 1024 / 1024} MB)</small>
              <br />
              <small class="text-muted">Supported file types: .json</small>
            </label>
            <input class="form-control" type="file" id="file" name="fileToUpload" accept=".json" required />
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
