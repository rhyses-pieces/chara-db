<script lang="ts">
  import Editor from "$lib/components/editor/Editor.svelte";
  let content = '';
</script>

<section>
  <form>
    <input type="text" name="name" id="name" />
    <Editor json={{}} />
    <button>Add Character</button>
  </form>
</section>