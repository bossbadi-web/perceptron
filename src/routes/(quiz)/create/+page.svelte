<script>
  import { enhance } from "$app/forms";
  import { getFlash } from "sveltekit-flash-message";
  import { LIMITS } from "$lib/consts";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { submitCaptcha } from "$lib/recaptchaClient";
  import imageCompression from "browser-image-compression";
  import Loading from "$lib/components/quiz/create/Loading.svelte";
  import MainFields from "$lib/components/quiz/edit/MainFields.svelte";
  import RowOfButtons from "$lib/components/quiz/create/RowOfButtons.svelte";

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

  // when image is uploaded from disk
  const compressImage = async () => {
    const file = document.getElementById("file").files[0];
    _compressImage(file);
  };

  // helper function to compress image
  const _compressImage = async (file) => {
    if (!file) {
      return;
    }

    _disableButtons();

    try {
      imageCompression(file, COMPRESSION_OPTIONS).then((output) => {
        const dataTransfer = new DataTransfer();
        const compressedFile = new File([output], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        dataTransfer.items.add(compressedFile);
        document.getElementById("file").files = dataTransfer.files;

        _enableButtons();
      });
    } catch (error) {
      _enableButtons();
    }
  };

  const _disableButtons = () => {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  };

  const _enableButtons = () => {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
  };

  // when image is pasted from clipboard
  onMount(() => {
    document.addEventListener("paste", async (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (let index in items) {
        const item = items[index];
        if (item.kind === "file") {
          const blob = item.getAsFile();
          const file = new File([blob], "clipboard.png", { type: "image/png" });
          _compressImage(file);
          break;
        }
      }
    });
  });
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
              Upload or paste an image
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

          <RowOfButtons />
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
