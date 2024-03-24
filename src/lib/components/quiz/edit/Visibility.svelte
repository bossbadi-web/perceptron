<script>
  export let quiz;
</script>

<span>Visibility<span class="required">*</span></span>

<br />

{#each ["public", "unlisted", "private"] as visibility}
  <div class="form-check form-check-inline">
    {#if quiz !== undefined}
      <input
        class="form-check-input"
        type="radio"
        id={visibility}
        name="visibility"
        bind:group={$quiz.visibility}
        value={visibility}
        required
      />
    {:else}
      <input class="form-check-input" type="radio" id={visibility} name="visibility" value={visibility} required />
    {/if}
    <label class="form-check-label" for={visibility}>{visibility}</label>
  </div>
{/each}
