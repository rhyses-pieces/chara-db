<script lang="ts">
  import WyisygEditor from "$lib/components/editor/WYISYGEditor.svelte";
  import { enableCode } from "$lib/store";
  import type { Snapshot } from "./$types";
  import type { JSONContent } from "@tiptap/core";

  let json = {};

  export const snapshot: Snapshot<JSONContent> = {
    capture: () => json,
    restore: (data) => (json = data),
  }
</script>

<section>
  <form>
    <input type="text" name="name" id="name" />
    {#if $enableCode}
      this should be where the code editor goes
    {:else}
      <WyisygEditor bind:json />
      <input type="hidden" name="content" id="content" value={JSON.stringify(json)} />
    {/if}
    <button>Add Character</button>
  </form>
</section>