import type User from "$lib/classes/user";
import { writable, type Writable } from "svelte/store";

export const userStore = writable(null);

interface ContextMenuStore {
  userCurrentlySkilling: boolean;
  userLevels: any;
  lastUserTarget: string;
  lastUserMethod: string;
  currentPage: string;
  resourcesAvailable: any[];
  user: User;
}

export const contextMenuStore: Writable<ContextMenuStore> = writable({
  userCurrentlySkilling: false,
  userLevels: null,
  lastUserTarget: null,
  lastUserMethod: null,
  currentPage: null,
  resourcesAvailable: [],
  user: null,
});

