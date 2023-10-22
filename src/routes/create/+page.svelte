<script>
  import MainFields from "$lib/components/form/MainFields.svelte";
  import { enhance } from "$app/forms";

  export let data, form;

  const { LIMITS } = data;
  const acceptedFileTypes = LIMITS.filetypes.map((type) => `.${type}`).join(", ");
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        {#if form?.message}
          <div class="alert alert-danger" role="alert">
            {form?.message}
          </div>
        {/if}

        <form method="POST" enctype="multipart/form-data" use:enhance>
          <h1 class="display-4 text-center">New Perceptron</h1>

          <MainFields />

          <div class="mb-3">
            <label for="file">
              <b>Upload your file</b>
              <small class="text-muted">(max {LIMITS.file / 1024 / 1024} MB)</small>
              <br>
              <small class="text-muted">Supported file types: {acceptedFileTypes}</small>
              <br />
              <small class="text-muted">Leave this blank to start from scratch</small>
            </label>
            <input class="form-control" type="file" id="file" name="fileToUpload" accept={acceptedFileTypes} />
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
