<script>
  export let quiz;
</script>

<label for="bg">
  Background image
  <small class="text-muted">(from Unsplash)</small>
</label>

{#if quiz !== undefined}
  <input
    class="form-control"
    type="url"
    id="bg"
    name="bg"
    bind:value={$quiz.bg}
    placeholder="https://images.unsplash.com/photo-123"
  />
{:else}
  <input class="form-control" type="url" id="bg" name="bg" placeholder="https://images.unsplash.com/photo-123" />
{/if}
