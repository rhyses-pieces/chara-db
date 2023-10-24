<script lang="ts">
  import type { Snapshot } from "./$types";
  import type { JSONContent } from '@tiptap/core';
  import Editor from "$lib/components/editor/Editor.svelte";

  let content: JSONContent;

  export const snapshot: Snapshot<JSONContent> = {
    capture: () => content,
    restore: (data) => (content = data),
  }
</script>

<section>
  <form>
    <input type="text" name="name" id="name" />
    <Editor bind:json={content} />
    <input type="hidden" id="content" value={JSON.stringify(content)} />
    <button>Add Character</button>
  </form>
</section>