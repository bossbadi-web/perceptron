<script>
  import { LIMITS } from "$lib/consts";
  export let data;
</script>

<label for="description">
  Description<span class="required">*</span>
  <small class="text-muted">(max {LIMITS.description} chars)</small>
</label>

{#if data?.description}
  <input
    class="form-control"
    type="text"
    id="description"
    name="description"
    maxlength={LIMITS.description}
    bind:value={data.description}
    required
  />
{:else}
  <input class="form-control" type="text" id="description" name="description" maxlength={LIMITS.description} required />
{/if}
