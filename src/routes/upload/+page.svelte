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
      <div class="group mb-3">
        <label for="title">Title<span class="required">*</span></label>
        <input class="form-control" type="text" id="title" name="title" required />
      </div>

      <div class="group mb-3">
        <label for="description">Description</label>
        <input class="form-control" type="text" id="description" name="description" />
      </div>

      <div class="group mb-3">
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

      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</section>
