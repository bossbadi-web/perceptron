<script>
  export let form;
</script>

<section>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        {#if form?.message}
          <div class="alert alert-danger" role="alert">
            {form?.message}
          </div>
        {/if}

        <form method="POST" enctype="multipart/form-data">
          <h1 class="display-4 text-center">New Perceptron</h1>

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
</style>
