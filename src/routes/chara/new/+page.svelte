<script lang="ts">
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";
  import CodeEditor from "$lib/components/editor/CodeEditor.svelte";
  import { enableCodeKey } from "$lib/store-keys"; 
  import { getContext } from "svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";

  export let data: PageData;

  const enableCode = getContext<Writable<string>>(enableCodeKey);
  const { form, enhance, errors } = superForm(data.form);
</script>

<section>
  <form method="post" action="?/submit" use:enhance>
    <input type="text" name="name" id="name" bind:value={$form.name} required />
    {#if $errors.name}
      <span class="text-sm text-error-50-900-token">Name is required!</span>
    {/if}
    {#if $enableCode === 'true'}
      <CodeEditor value={$form.content} />
      <input type="hidden" name="content" id="content" bind:value={$form.content} />
    {:else}
      <WyisygEditor bind:html={$form.content} />
      <input type="hidden" name="content" id="content" bind:value={$form.content} />
    {/if}
    <button type="submit">Add Character</button>
  </form>
</section>