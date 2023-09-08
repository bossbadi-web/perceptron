<form method="POST" enctype="multipart/form-data" action="/api/upload">
  <div class="group">
    <label for="file">Upload your file</label>
    <input type="file" id="file" name="fileToUpload" accept=".jpg, .jpeg, .png, .webp" required />
  </div>

  <button type="submit">Submit</button>
</form>
