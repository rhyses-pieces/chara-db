<script lang="ts">
  import { user, pb } from "$lib/utils/pocketbase";
  import { triggerToast } from "$lib/utils/stores";
  import { loginSuite } from "$lib/utils/suite";
  import { onMount } from "svelte";
  import { goto } from "elegua";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import { reporter, ValidationMessage } from "@felte/reporter-svelte";
  
  onMount(() => {
    if ($user !== null) goto("/user");
    window.onbeforeunload = event => {
      if (event) suite.reset();
      suite.reset();
    }
  });

  const suite = loginSuite;
  const { form } = createForm({
    onSubmit: async (values) => {
      await pb.collection("users").authWithPassword(values.username as string, values.password as string);
      suite.reset();
    },
    onSuccess: () => {
      triggerToast({
        message: "Successfully logged in! Redirecting you to your profile page...",
        type: "success",
        timeout: 5000,
      });
      goto("/user");
      suite.reset();
    },
    onError: (error) => {
      console.error(error);
      triggerToast({
        message: "Log in failed! Check to see if you misspelled anything.",
        type: "error",
        timeout: 5000,
      });
      suite.reset();
    },
    extend: [validator({ suite }), reporter],
  });
</script>

<h1>Login</h1>
<form use:form>
  <label class="form-control">
    <span class="label-text">Username</span>
    <input type="text" id="username" name="username" autocomplete="username" />
    <ValidationMessage for="username" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
  </label>
  <label class="form-control">
    <span class="label-text">Password</span>
    <input type="password" id="password" name="password" autocomplete="current-password" />
    <ValidationMessage for="password" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
  </label>
  <button type="submit" class="btn btn-primary place-self-end w-1/2">Login</button>
  <a href="/register" class="place-self-start">Need an account? Register here!</a>
</form>
