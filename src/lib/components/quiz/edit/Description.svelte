<script>
  import { LIMITS } from "$lib/consts";
  export let quiz;
</script>

<label for="description">
  Description<span class="required">*</span>
  <small class="text-muted">(max {LIMITS.description} chars)</small>
</label>

{#if quiz !== undefined}
  <input
    class="form-control"
    type="text"
    id="description"
    name="description"
    maxlength={LIMITS.description}
    bind:value={$quiz.description}
    required
  />
{:else}
  <input class="form-control" type="text" id="description" name="description" maxlength={LIMITS.description} required />
{/if}
