<script lang="ts">
  export let data;

  $: ({ characters, session } = data);
</script>

{#if session !== null}
  <a href="/chara/new">Add new character</a>
{/if}
<article>
  <ul>
    {#if characters}
      {#each characters as chara (chara.id)}
        <li><a href={`/chara/${chara.id}`}>{chara.name}</a></li>
      {/each}
    {/if}
  </ul>
</article>