<script lang="ts">
  import { FileDropzone } from "@skeletonlabs/skeleton";
  import { File } from "lucide-svelte";

  export let uploadedImage: string;
  let files: FileList;

  const handleImageUpload = () => {
    const file = files[0];
    if (!file) return;
    uploadedImage = URL.createObjectURL(file);
  }
</script>

{#if uploadedImage}
  <figure>
    <img src={uploadedImage} alt="" />
    <figcaption></figcaption>
  </figure>
{/if}

<FileDropzone name="image" bind:files accept="image/*" on:change={handleImageUpload}>
  <svelte:fragment slot="lead"><File size={28} /></svelte:fragment>
  <svelte:fragment slot="message">Upload a file or drag and drop</svelte:fragment>
  <svelte:fragment slot="meta">You can upload up to 6 MB.</svelte:fragment>
</FileDropzone>