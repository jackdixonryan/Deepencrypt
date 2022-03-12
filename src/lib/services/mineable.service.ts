import Mineable from "$lib/classes/resources/mineable";
import type User from "$lib/classes/user";
import db from "$lib/db";
import type { Yield } from "$lib/types";
import { userStore } from "../../stores";
import { updateUserExperience, updateUserInventory } from "./user.service";

let miningIntervalId;

export async function getMineable(mineableId: string): Promise<Mineable|null> {
  const { data, error } = await db.from("resources").select("*").eq("id", mineableId);

  if (error) {
    throw new Error(error.message);
  } 

  if (data) {
    const mineableData = data[0];
    return new Mineable({
      id: mineableData.id,
      type: mineableData.type,
    });
  } else {
    return null;
  }
}

export async function mine(mineable: Mineable): Promise<void> {
  let user;
  userStore.subscribe((state) => user = state);
  miningIntervalId = setInterval(async () => {
    const loot: Yield[] = mineable.harvest();
    if (loot.length > 0) {
      loot.forEach(async (item: Yield) => {
        user.inventory.addItem({ itemId: item.name, quantity: item.quantity });
        await updateUserInventory(user.id, user.inventory);
      });        
    }
    await updateUserExperience(user.id, "mining", mineable.type.xp);
    user.addXp("mining", mineable.type.xp);
    userStore.set(user);
  }, mineable.type.timeToComplete * 1000);
}

export function stopMining(): void {
  clearInterval(miningIntervalId);
}

export function canHarvest(mineable: Mineable): boolean {
  let user: User; 
  userStore.subscribe((userState) => user = userState);
  if (user.getLevels()["mining"] < mineable.type.requiredLevel) {
    return false;
  } else {
    return true;
  }
}