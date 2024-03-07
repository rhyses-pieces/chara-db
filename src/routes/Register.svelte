<script lang="ts">
  import { user, pb, doesUserExist } from "$lib/utils/pocketbase";
  import { triggerToast } from "$lib/utils/stores";
  import { registerSuite } from "$lib/utils/suite";
  import { onMount } from "svelte";
  import { goto } from "elegua";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import { reporter, ValidationMessage } from "@felte/reporter-svelte";

  onMount(() => {
    if ($user !== null) goto("/user");
    window.onbeforeunload = (event) => {
      if (event) suite.reset();
      suite.reset();
    }
  });

  const suite = registerSuite;
  const { form, isValid } = createForm({
    onSubmit: async (values) => {
      await pb.collection("users").create(values);
      await pb.collection("users").authWithPassword(values.username as string, values.password as string);
      suite.reset();
    },
    onSuccess: () => {
      triggerToast({
        message: "Registration success! Redirecting you to your new profile page...",
        type: "success",
        timeout: 5000,
      });
      goto("/user");
      suite.reset();
    },
    onError: (error) => {
      console.error(error);
      triggerToast({
        message: "There was an error signing up!",
        type: "error",
        timeout: 5000,
      });
      suite.reset();
    },
    extend: [validator({ suite }), reporter],
    debounced: {
      validate: async (values) => {
        const errors = { username: "" };
        try {
          await doesUserExist(values.username as string);
          errors.username = "Username already exists!";
        } catch (err) {
          return;
        }
        return errors;
      },
    },
  });
</script>

<h1>Register</h1>
<form use:form>
  <label class="form-control">
    <span class="label-text">Username</span>
    <input type="text" id="username" name="username" autocomplete="username" />
    <ValidationMessage for="username" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
  </label>
  <label class="form-control">
    <span class="label-text">Email</span>
    <input type="text" id="email" name="email" autocomplete="email" />
    <ValidationMessage for="email" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
  </label>
  <label class="form-control">
    <span class="label-text">Password</span>
    <input type="password" id="password" name="password" autocomplete="new-password" />
    <ValidationMessage for="password" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
    <ValidationMessage for="password" level="warning" let:messages={warning}>
      <span aria-live="polite" class="label-text-alt place-self-end">{warning || ""}</span>
    </ValidationMessage>
  </label>
  <label class="form-control">
    <span class="label-text">Confirm Password</span>
    <input type="password" id="passwordConfirm" name="passwordConfirm" autocomplete="off" />
    <ValidationMessage for="passwordConfirm" let:messages={message}>
      <span aria-live="polite" class="label-text-alt mt-2 place-self-end">{message || ""}</span>
    </ValidationMessage>
  </label>
  <button type="submit" class="btn btn-primary place-self-end w-1/2" disabled={!$isValid}>Register</button>
  <a href="/login" class="place-self-start">Already have an account? Log in here!</a>
</form>