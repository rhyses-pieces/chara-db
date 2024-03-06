<script lang="ts">
  import { user } from "$lib/utils/pocketbase";

</script>

<h1>Settings</h1>
{#if $user !== null}
<h2>Change Password</h2>
  <form action="">
    <label class="form-control">
      <span class="label-text">Change password:</span>
      <input type="password" id="password" name="password" autocomplete="new-password" />
    </label>
    <label class="form-control">
      <span class="label-text">Confirm new password:</span>
      <input type="password" id="confirm" name="confirm" autocomplete="off" />
    </label>
    <button type="submit" class="btn btn-primary w-1/2 place-self-end">Submit</button>
  </form>
{/if}

<h2>Select Theme</h2>
<p>hi</p>