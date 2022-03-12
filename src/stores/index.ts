import type User from "$lib/classes/user";
import { writable, type Writable } from "svelte/store";

interface NavigationStore {
  currentPage: string;
}

interface TabulationStore {
  inventory: boolean;
  equipment: boolean;
  crafting: boolean;
}

export interface GameStore { 
  targetId: string;
  target: any;
  currentId: string;
  current: any;
  isMining: boolean;
  isScripting: boolean;
  isWebmastering: boolean;
  isHacking: boolean;
  isBotnetting: boolean;
  isBugHunting: boolean;
  isNetworking: boolean;
  isDaemoning: boolean;
  isEncrypting: boolean;
  isDecrypting: boolean;
  targetType: string;
  currentType: string;
}

export const userStore: Writable<User> = writable(null);

export const navigationStore: Writable<NavigationStore> = writable({
  currentPage: null,
});

export const tabulationStore: Writable<TabulationStore> = writable({
  inventory: false,
  equipment: false,
  crafting: false,
});

export const gameStore: Writable<GameStore> = writable({ 
  targetId: null,
  target: null,
  targetType: null,
  isMining: false,
  isScripting: false,
  isWebmastering: false,
  isHacking: false,
  isBotnetting: false,
  isBugHunting: false,
  isNetworking: false,
  isDaemoning: false,
  isEncrypting: false,
  isDecrypting: false,
  current: null,
  currentId: null,
  currentType: null,
});

