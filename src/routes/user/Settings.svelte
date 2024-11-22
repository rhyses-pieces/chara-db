<script lang="ts">
  import { pb, user } from "$lib/utils/pocketbase";
  import { enableCode, theme, triggerToast } from "$lib/utils/stores";
  import { editEmailSuite } from "$lib/utils/suite";
  import Dialog from "$lib/components/Dialog.svelte";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import { createForm } from "felte";
  import { onMount } from "svelte";
  import { ValidationMessage, reporter } from "@felte/reporter-svelte";
  import { validator } from "@felte/validator-vest";

  let triggerDialog = $state(false);

  onMount(() => {
    window.onbeforeunload = event => {
      if (event) suite.reset();
      suite.reset();
    }
  });

  const suite = editEmailSuite;
  const { form } = createForm({
    onSubmit: async (values) => {
      await pb.collection("users").requestEmailChange(values.newEmail as string);
      suite.reset();
    },
    onSuccess: () => {
      triggerToast({
        message: "Successfully sent verification email to your new email address!",
        type: "success",
        timeout: 8000,
      });
      suite.reset();
    },
    onError: (error) => {
      console.error(error);
      triggerToast({
        message: "Something went wrong with verifying your email!",
        type: "error",
        timeout: 5000,
      });
      suite.reset();
    },
    extend: [validator({ suite }), reporter],
  });
</script>

<h1>Settings</h1>
{#if $user !== null}
<h2>Change editor modes</h2>
<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Code editing mode: {$enableCode ? "Enabled" : "Disabled"}</span>
    <button class="btn btn-square swap text-lg" class:swap-active={$enableCode} onclick={() => (triggerDialog = true)}>
      <div class="swap-on">&#10003;</div>
      <div class="swap-off">&nbsp;</div>
    </button>
  </label>
</div>

<Dialog bind:triggerDialog id="enable-code-confirm">
  {#snippet title()}
    <h2 >Are you sure?</h2>
  {/snippet}
  <p>If you switch now, there might be data loss.</p>
  {#snippet button()}
    <div>
      <form method="dialog" class="modal-action">
        <button class="btn btn-error" onclick={() => $enableCode = !$enableCode}>Yes</button>
        <button class="btn bg-gray-500">No</button>
      </form>
    </div>
  {/snippet}
</Dialog>

<h2>Change email</h2>
<form use:form class="mb-10">
  <label class="form-control">
    <div class="label">
      <span class="label-text">Email</span>
    </div>
    <input type="email" name="newEmail" id="newEmail" autocomplete="email" />
  </label>
  <ValidationMessage for="newEmail" >
    {#snippet children({ messages: message }: { messages: any })}
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    {/snippet}
  </ValidationMessage>
  <button class="btn btn-primary">Verify email</button>
</form>
{/if}

<h2>Select Theme</h2>
<div class="dropdown mb-72">
  <div tabindex="0" role="button" class="btn m-1">
    Theme <ChevronDown />
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
  </ul>
</div>