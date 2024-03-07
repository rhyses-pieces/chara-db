import PocketBase, { type AuthModel } from "pocketbase";
import { writable, type Writable } from "svelte/store";
import { goto } from "elegua";

export const pb = new PocketBase("https://chara.pockethost.io/");

const loggedInUser = localStorage.getItem("user");
export const user: Writable<AuthModel> = writable(JSON.parse(loggedInUser!) || null);
user.subscribe(user => localStorage.user = JSON.stringify(user));

pb.authStore.onChange(() => {
  user.set(pb.authStore.model);
});

export const logout = () => {
  pb.authStore.clear();
  user.set(null);
  goto("/");
}

export const doesUserExist = async (name: string) => {
  return await pb.collection("users").getFirstListItem(pb.filter('username = {:username}', { username: name }));
}

// edit user
export const uploadAvatar = (form: FormData) => {

}

// add chara


// edit chara


// delete chara

