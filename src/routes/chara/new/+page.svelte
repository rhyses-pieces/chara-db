<script lang="ts">
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";
  import CodeEditor from "$lib/components/editor/CodeEditor.svelte";
  import { enableCodeKey } from "$lib/store-keys"; 
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  const enableCode = getContext<Writable<string>>(enableCodeKey);

  let value = '';
</script>

<section>
  <form method="post">
    <input type="text" name="name" id="name" required />
    {#if $enableCode === 'true'}
      <CodeEditor value={value} />
      <input type="hidden" name="content" id="content" value={value} />
    {:else}
      <WyisygEditor bind:html={value} />
      <input type="hidden" name="content" id="content" value={value} />
    {/if}
    <button type="submit">Add Character</button>
  </form>
</section>