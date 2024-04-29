<script>
  import { enhance } from "$app/forms";
  import { getFlash } from "sveltekit-flash-message";
  import { LIMITS } from "$lib/consts";
  import { page } from "$app/stores";
  import { submitCaptcha } from "$lib/recaptchaClient";
  import imageCompression from "browser-image-compression";
  import Loading from "$lib/components/quiz/create/Loading.svelte";
  import MainFields from "$lib/components/quiz/edit/MainFields.svelte";

  const ACCEPTED_FILETYPES = LIMITS.filetypes.map((type) => `.${type}`).join(", ");
  const COMPRESSION_OPTIONS = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

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

  const compressImage = async () => {
    const file = document.getElementById("file").files[0];
    if (!file) {
      return;
    }

    disableButtons();

    try {
      imageCompression(file, COMPRESSION_OPTIONS).then((output) => {
        const dataTransfer = new DataTransfer();
        const compressedFile = new File([output], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        dataTransfer.items.add(compressedFile);
        document.getElementById("file").files = dataTransfer.files;

        enableButtons();
      });
    } catch (error) {
      enableButtons();
    }
  };

  const disableButtons = () => {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  };

  const enableButtons = () => {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
  };
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
            <i class="fas fa-hammer" />
            New Perceptron
          </h1>

          <div class="note">
            <div class="title">Step 1: The basics</div>
            <div class="description">Fill out some basic information for your Perceptron.</div>
          </div>

          <MainFields />

          <div class="note">
            <div class="title">Step 2: Create your questions</div>
            <div class="description">
              Generate questions based on your image and/or notes. Leave these fields blank to start from scratch.
            </div>
          </div>

          <div class="mb-4">
            <label for="count">
              Number of questions<span class="required">*</span>
              <small class="text-muted">({LIMITS.countMin} - {LIMITS.countMax}) </small></label
            >
            <input
              class="form-control"
              type="number"
              id="count"
              name="count"
              min={LIMITS.countMin}
              max={LIMITS.countMax}
              value="10"
              required
            />
          </div>

          <div class="mb-4">
            <label for="file">
              Upload an image
              <small class="text-muted">(max {LIMITS.file / 1024 / 1024} MB)</small>
              <br />
              <small class="text-muted">Supported file types: {ACCEPTED_FILETYPES}</small>
            </label>
            <input
              class="form-control"
              type="file"
              id="file"
              name="fileToUpload"
              accept={ACCEPTED_FILETYPES}
              on:change={compressImage}
              required
            />
          </div>

          <div class="mb-4">
            <label for="notes">
              Notes
              <small class="text-muted">(max {LIMITS.notes} chars)</small>
            </label>
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
