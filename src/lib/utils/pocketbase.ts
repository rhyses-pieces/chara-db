import PocketBase, { type AuthModel } from "pocketbase";
import { writable, type Writable } from "svelte/store";

const pb = new PocketBase("https://chara.pockethost.io/");

export const user: Writable<AuthModel> = writable(null);

pb.authStore.onChange(auth => {
  console.log(`authStore changed: ${auth}`);
  user.set(pb.authStore.model);
});

export const logout = () => {
  pb.authStore.clear();
  user.set(null);
}

// login
export const login = async (form: FormData) => {
  const data = { username: form.get("username") as string, password: form.get("password") as string };
  const response = await pb.collection("users").authWithPassword(data.username, data.password);
  console.log(response);
}

// register
export const register = async (form: FormData) => {
  try {
    const data = {
      username: form.get("username") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      passwordConfirm: form.get("confirm") as string,
    };
    const response = await pb.collection("user").create(data);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

// edit user


// add chara


// edit chara


// delete chara

