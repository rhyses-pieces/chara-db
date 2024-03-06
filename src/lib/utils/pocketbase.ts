import PocketBase, { type AuthModel } from "pocketbase";
import { writable, type Writable } from "svelte/store";

export const pb = new PocketBase("https://chara.pockethost.io/");
export const user: Writable<AuthModel> = writable(null);

pb.authStore.onChange(auth => {
  console.log(`authStore changed: ${auth}`);
  user.set(pb.authStore.model);
});

export const logout = () => {
  pb.authStore.clear();
  user.set(null);
}

export const doesUserExist = async (name: string) => {
  await pb.collection("users").getFirstListItem(pb.filter('username = {:username}', { username: name }));
}

// edit user


// add chara


// edit chara


// delete chara

