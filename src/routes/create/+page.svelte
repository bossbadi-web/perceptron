<script>
  export let form;
</script>

<section>
  <div class="container">
    {#if form?.message}
      <div class="alert alert-danger" role="alert">
        {form?.message}
      </div>
    {/if}

    <form method="POST">
      <h1 class="display-4">New Perceptron</h1>

      <div class="mb-3">
        <label for="title">Title<span class="required">*</span></label>
        <input class="form-control" type="text" id="title" name="title" required />
      </div>

      <div class="mb-3">
        <label for="description">Description<span class="required">*</span></label>
        <input class="form-control" type="text" id="description" name="description" required />
      </div>

      <div class="mb-3">
        <label for="file">Upload your file<span class="required">*</span></label>
        <input
          class="form-control"
          type="file"
          id="file"
          name="fileToUpload"
          accept=".jpg, .jpeg, .png, .webp"
          required
        />
      </div>

      <button class="btn btn-main" formaction="?/play">Create and Play</button>
      <button class="btn btn-secondary" formaction="?/preview">Preview</button>
      <button class="btn btn-secondary" formaction="?/edit">Edit</button>
    </form>
  </div>
</section>
