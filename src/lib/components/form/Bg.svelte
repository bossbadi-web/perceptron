<script>
  export let quiz;
</script>

<label for="bg">
  Background image
  <small class="text-muted">(from Unsplash)</small>
</label>

<input
  class="form-control"
  type="url"
  id="bg"
  name="bg"
  bind:value={$quiz.bg}
  placeholder="https://images.unsplash.com/photo-123"
/>
