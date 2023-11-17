<script lang="ts">
  import { page } from "$app/stores";
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";
  import CodeEditor from "$lib/components/editor/CodeEditor.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import { enableCodeKey } from "$lib/store-keys"; 
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store"
  import type { PageData } from "./$types";
    import { redirect } from "@sveltejs/kit";

  export let data: PageData;
  let updateChara = false;
  let chara = data.chara!;

  const enableCode = getContext<Writable<string>>(enableCodeKey);
  const confirmDelete = async () => {
    await fetch(`/chara/${$page.params.id}`, {
      method: 'DELETE',
    }).then(() => redirect(303, '/chara'));
  }

  $: user = data.session?.user;
  $: name = chara!.name as string;
  $: html = chara!.data as string;
</script>

<section>
  {#if updateChara}
    <!-- svelte-ignore a11y-autofocus -->
    <form action="?/update" method="post">
      <label for="name">Name</label>
      <input autofocus={(updateChara) ? true : false} type="text" name="name" id="name" bind:value={name} />
      
      {#if $enableCode === 'true'}
        <CodeEditor value={html} />
        <input type="hidden" name="content" id="content" bind:value={html} />
      {:else}
        <WyisygEditor bind:html />
        <input type="hidden" name="content" id="content" bind:value={html} />
      {/if}
      <button type="button" on:click={() => updateChara = false}>Cancel</button>
      <button type="submit">Update</button>
    </form>
  {:else}
    <h1>{chara.name}</h1>
    <p>{chara.created_at}</p>
    <p><a href="/user/{chara.users.username}">{chara.users.username}</a></p>
    {@html chara.data}
    {#if chara.updated_at}
    <p>Last edited at {chara.updated_at}</p>
    {/if}
  {/if}
  {#if chara.creator_id == user?.id}
    {#if !updateChara}
      <button on:click={() => updateChara = true}>Edit</button>
    {/if}
    
    <Dialog confirm={true}>
      <button slot="trigger" let:trigger use:trigger.action {...trigger} class="btn variant-filled-error">
        Delete
      </button>

      <h2 slot="title" let:title use:title.action {...title} class=" max-w-lg">
        Are you sure you want to delete this?
      </h2>
      <p slot="description" let:description use:description.action {...description} class="mt-2">
        This action cannot be undone.
      </p>

      <button 
        slot="confirm" 
        let:close 
        use:close.action 
        {...close} 
        class="btn variant-filled-error"
        on:m-click={confirmDelete}
      >
        Yes, I want to delete
      </button>
    </Dialog>
  {/if}
  
</section>

<style lang="postcss">

</style>