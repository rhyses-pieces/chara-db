<script lang="ts">
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";

  let updateChara = false;
  export let data;
  
  $: ({ user, chara } = data);
  $: json = JSON.parse(chara.data);
</script>

<section>
  <h1>{chara.name}</h1>
  {JSON.stringify(chara)}

  {#if chara.creator_id == user?.id}
    {#if updateChara}
      <form action="?/update" method="post">
        <WyisygEditor bind:json />
        <button>Update</button>
      </form>
    {:else}
      <button on:click={() => updateChara = !updateChara}>Edit</button>
    {/if}
  {/if}
  
  <!-- if delete, make confirm modal -->
</section>