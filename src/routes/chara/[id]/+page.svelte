<script lang="ts">
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";
  import CodeEditor from "$lib/components/editor/CodeEditor.svelte";
  import { enableCodeKey } from "$lib/store-keys"; 
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { createDialog } from "@melt-ui/svelte";

  let updateChara = false;
  export let data;

  $: ({ chara } = data);
  $: user = data.session?.user;
  $: html = chara!.data;

  const enableCode = getContext<Writable<string>>(enableCodeKey);

  const {
    elements: { trigger, }
  } = createDialog();
</script>

<section>
  <h1>{chara.name}</h1>
  {JSON.stringify(chara)}
  <p><a href="/user/{chara.users.username}">{chara.users.username}</a></p>

  {#if chara.creator_id == user?.id}
    {#if updateChara}
      <form action="?/update" method="post">
        {#if $enableCode === 'true'}
          <CodeEditor value={html} />
          <input type="hidden" name="content" id="content" value={html} />
        {:else}
          <WyisygEditor bind:html />
          <input type="hidden" name="content" id="content" value={html} />
        {/if}
        <button type="submit">Update</button>
      </form>
    {:else}
      <button on:click={() => updateChara = !updateChara}>Edit</button>
    {/if}

    <form action="?/delete" method="post">
      <input type="hidden" name="id" value={chara.id} />
      <button>Delete</button>
    </form>
  {/if}
  
  <!-- if delete, make confirm modal -->
</section>