<script lang="ts">
  import DOMPurify from "dompurify";
  import ace from "brace";
  import "brace/ext/language_tools";
  import "brace/ext/emmet";
  import "brace/snippets/html";
  import "brace/mode/html";
  import "brace/theme/chrome";
  import Dialog from "../Dialog.svelte";
  import { onDestroy, onMount } from "svelte";

  let triggerDialog = $state(false);
  let editor: ace.Editor;
  interface Props {
    value?: string;
    label?: string;
    input: CallableFunction;
  }

  let { value = $bindable(""), label = "", input }: Props = $props();
  let contentBackup: string = "";
  let element = $state() as HTMLElement;

  onDestroy(() => {
    if (editor) {
      editor.destroy();
      editor.container.remove();
    }
  });

  function watchValue(val: string) {
    if (contentBackup !== val && editor && typeof val === "string") {
      editor.session.setValue(val);
      contentBackup = val;
    }
  }

  onMount(() => {
    editor = ace.edit(element);
    editor.getSession().setMode("ace/mode/html");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false,
      enableEmmet: true,
    });
    editor.$blockScrolling = Infinity;
    editor.setValue(value, 1);
    contentBackup = value;
    handleChange();
  });

  function handleChange() {
    editor.on("change", () => {
      const content = editor.getValue();
      value = content;
      input(content);
      contentBackup = content;
    });
  }

  $effect(() => { watchValue(value); });
</script>

<div role="toolbar" id="code-editor" class="mt-[-1rem]">
  <button class="btn btn-success">Save</button>
  <button class="btn btn-neutral mt-2" onclick={() => triggerDialog = true}>Preview</button>
</div>
<div style="height: 300px;">
  <div 
    id="editor" 
    class="textarea bordered" 
    aria-labelledby={label} 
    style="height: 300px;" 
    bind:this={element}
  >
  </div>
</div>

<Dialog bind:triggerDialog id="preview" width="big">
  {#snippet title()}
    <h2 >Preview</h2>
  {/snippet}
  <div class="bg-base-200 p-2 rounded min-h-48">
    {@html DOMPurify.sanitize(value, { USE_PROFILES: { html: true } })}
  </div>
  {#snippet button()}
    <div >
      <form method="dialog" class="modal-action">
        <button class="btn bg-gray-500">Close</button>
      </form>
    </div>
  {/snippet}
</Dialog>

<style lang="postcss">
  #code-editor {
    @apply flex flex-wrap items-baseline justify-end gap-2;
  }
</style>