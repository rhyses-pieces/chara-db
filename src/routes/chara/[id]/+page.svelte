<script lang="ts">
  let updateChara = false;

  export let data;
  export let form;
</script>

<section>
  <h1>character name here</h1>
  {JSON.stringify(data.chara)}

  {#if updateChara}
    <form action="?/update" method="post">
      <input type="text" name="content" id="content" value={form?.updateChara ?? ''}>
      <button>Update</button>
    </form>
  {:else}
    <button on:click={() => updateChara = !updateChara}>Edit</button>
  {/if}

  <!-- if delete, make confirm modal -->
</section>