<script>
  import { page } from "$app/stores";
  export let data;

  const { quiz } = data;
  $: ({ session } = data);

  $: iLiked = quiz.likers.includes(session?.user?.id);
  $: iDisliked = quiz.dislikers.includes(session?.user?.id);
  $: likes = quiz.likers.length;
  $: dislikes = quiz.dislikers.length;
</script>

<form method="POST">
  <button
    class="btn btn-sm btn-trans"
    disabled={session?.user === undefined}
    formaction="/vote?/like"
    data-sveltekit-preload-data="tap"
    title={iLiked ? "Remove like" : "I like this"}
  >
    {#if iLiked}
      <i class="fas fa-thumbs-up"></i>
    {:else}
      <i class="far fa-thumbs-up"></i>
    {/if}
    {#if likes > 0}
      {likes}
    {/if}
  </button>
  <button
    class="btn btn-sm btn-trans"
    disabled={session?.user === undefined}
    formaction="/vote?/dislike"
    data-sveltekit-preload-data="tap"
    title={iDisliked ? "Remove dislike" : "I dislike this"}
  >
    {#if iDisliked}
      <i class="fas fa-thumbs-down"></i>
    {:else}
      <i class="far fa-thumbs-down"></i>
    {/if}
    {#if dislikes > 0}
      {dislikes}
    {/if}
  </button>
  <input type="hidden" name="quizId" value={quiz.id} />
  <input type="hidden" name="referrer" value={$page.url.href} />
</form>
