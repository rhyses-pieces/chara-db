<script lang="ts">
  import { user, pb } from "$lib/utils/pocketbase";
  import { triggerToast } from "$lib/utils/stores";
  import Avatar from "$lib/components/Avatar.svelte";
  import { onMount } from "svelte";
  import { goto } from "elegua";

  // grab user info
  // mount that shit
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
</script>

{#if $user !== null}
  <h1>Welcome back, {$user.username}!</h1>
  <section>
    <div class="float-left mr-5 mb-5">
      <Avatar />
    </div>
    <h2>Update Avatar</h2>
    <form>
      <input type="file" class="input file-input" />
    </form>
    <div class="clear-both"></div>
    <h2>Info</h2>
    <p>Joined on: {new Date($user.created).toLocaleDateString()}</p>
    <pre>{JSON.stringify($user, null, 2)}</pre>
    {#if !$user.verified}
      <button on:click={requestVerify}>Verify me</button>
    {/if}
  </section>
{/if}