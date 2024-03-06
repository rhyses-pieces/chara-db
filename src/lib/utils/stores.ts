import { writable, type Writable } from "svelte/store";

type Toast = {
  id: number;
  message: string;
  type: "info" | "success" | "error" | "warning";
  dismissable: boolean;
  timeout: number;
}

export const toasts: Writable<Toast[]> = writable([]);

export const dismissToast = (id: number) => {
  toasts.update(all => all.filter(toast => toast.id !== id));
}

export const triggerToast = (toast: any) => {
  const id = Math.floor(Math.random() * 10000);
  const defaults = {
    id,
    type: "info",
    dismissable: true,
    timeout: 3000,
  }
  
  const t = { ...defaults, ...toast };
  toasts.update(all => [t, ...all]);
  if (t.timeout) setTimeout(() => dismissToast(id), t.timeout);
}