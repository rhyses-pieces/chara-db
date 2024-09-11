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
      triggerToast({
        message: "Something went wrong with verifying your email!",
        type: "error",
        timeout: 5000,
      });
    }
  }

  let files: FileList;

  const uploadAvatar = async (event: Event) => {
    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const file = formData.getAll("avatar")[0];
      return await pb.collection("users").update($user!.id, { avatar: file });
    } catch (err) {
      triggerToast({
        message: "Something went wrong with uploading your avatar!",
        type: "error",
        timeout: 5000,
      });
    }
  }

  const changeEmailVisiblity = async (event: Event) => {
    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      const emailVisibility = formData.get("emailVisibility");
      console.log(emailVisibility === "on");
      return await pb.collection("users").update($user!.id, { emailVisibility: emailVisibility === "on" ? true : false });
    } catch (err) {
      triggerToast({
        message: "Something went wrong with updating your settings!",
        type: "error",
        timeout: 5000,
      });
    }
  }
</script>

{#if $user !== null}
  <h1>Welcome back, {$user.name !== "" ? $user.name : $user.username}!</h1>
  <section>
    <div class="float-left mr-5 mb-5">
      <Avatar />
    </div>
    <h2>Update Avatar</h2>
    <form on:submit|preventDefault={uploadAvatar}>
      <input type="file" bind:files name="avatar" id="avatar" class="input file-input focus:border-black" />
      <button class="btn btn-primary">Upload</button>
    </form>
    <div class="clear-both"></div>
    <h2>Info</h2>
    <p>Joined on: {new Date($user.created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    {#if $user.emailVisibility}
      <p>{$user.email} is visible</p>
    {:else}
      <p>{$user.email} is not visible</p>
    {/if}
    <form on:submit|preventDefault={changeEmailVisiblity}>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Set email to visible?</span>
          <input class="checkbox" type="checkbox" name="emailVisibility" id="emailVisibility" />
        </label>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
    {#if !$user.verified}
      <button class="btn btn-outline" on:click={requestVerify}>Verify me</button>
    {/if}
  </section>
{/if}