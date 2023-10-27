<script lang="ts">
  export let data;

  $: ({ characters } = data);
</script>

<article>
  <ul>
    {#if characters}
      {#each characters as chara (chara.id)}
        <li><a href={`/chara/${chara.id}`}>{chara.name}</a></li>
      {/each}
    {/if}
  </ul>
</article>