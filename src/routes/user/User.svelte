<script lang="ts">
  import { user, pb } from "$lib/utils/pocketbase";
  import { triggerToast } from "$lib/utils/stores";
  import Avatar from "$lib/components/Avatar.svelte";
  import { onMount } from "svelte";
  import { goto } from "elegua";

  onMount(() => {
    if ($user === null) goto("/login");
  });

  const requestVerify = async () => {
    try {
      await pb.collection("users").requestVerification($user?.email as string);
      triggerToast({
        message: "Success! Check your inbox for the verification email.",
        type: "success",
        timeout: 8000,
      });
    } catch (err) {
      // toast if theres an error
      console.error(err);
      triggerToast({
        message: "Something went wrong with verifying your email!",
        type: "error",
        timeout: 5000,
      });
    }
  }

  const formData = new FormData();
  let files: FileList;

  $: if (files) {
    for (let file of files) {
      formData.append("avatar", file);
    }
  }

  const uploadAvatar = async () => {
    try {
      const file = formData.getAll("avatar")[0];
      return await pb.collection("users").update($user!.id, { avatar: file });
    } catch (err) {
      console.error(err);
      triggerToast({
        message: "Something went wrong with uploading your avatar!",
        type: "error",
        timeout: 5000,
      });
    }
  }
</script>

{#if $user !== null}
  <h1>Welcome back, {$user.username}!</h1>
  <section>
    <div class="float-left mr-5 mb-5">
      <Avatar />
    </div>
    <h2>Update Avatar</h2>
    <div class="flex flex-col gap-2">
      <input type="file" bind:files class="input file-input focus:border-black" />
      <button class="btn btn-primary" on:click={uploadAvatar}>Upload</button>
    </div>
    <div class="clear-both"></div>
    <h2>Info</h2>
    <p>Joined on: {new Date($user.created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <pre>{JSON.stringify($user, null, 2)}</pre>
    {#if $user.emailVisibility}
      <p>{$user.email} is visible</p>
      <button>hide email?</button>
    {:else}
      <p>{$user.email} is not visible</p>
      <button>show email?</button>
    {/if}
    {#if !$user.verified}
      <button class="btn btn-outline" on:click={requestVerify}>Verify me</button>
    {/if}
  </section>
{/if}