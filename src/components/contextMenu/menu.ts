import type Craftable from "$lib/classes/resources/craftable";
import type Mineable from "$lib/classes/resources/mineable";
import type Page from "$lib/classes/resources/page";
import type User from "$lib/classes/user";
import { updateUserExperience, updateUserInventory } from "$lib/services/user.service";
import type { Yield } from "$lib/types";
import { contextMenuStore, userStore } from "../../stores";

const key = {};
export { key };
let isMining: boolean; 
let miningIntervalId;
let context;

contextMenuStore.subscribe((value) => context = value);

interface Context { 
  resources: (Mineable|Craftable)[];
  page: Page;
  user: User;
}

interface MenuOptions { 
  type: string;
  resourceId: string;
  resource: (Mineable|Craftable);
  options: { name: string; method: Function, disabled: boolean }[];
  user: User;
}

export function getMenuOptions(e): MenuOptions {
  console.log(context);
  const { target } = e;

  const dataElement = target.getAttribute("data-element");
  if (dataElement) {
    const [ type, resourceId ] = dataElement.split(":");

    // in the event that the element's Id can be construed as a clickable ID, we can use it.
    if (type && resourceId) {
      const resource = context.resourcesAvailable.find((resource) => resource.id === resourceId);
      console.log({ resource, type, resourceId });

        switch(type) {
          case "mineable": 
            return {
              type,
              resourceId,
              resource,
              user: context.user,
              options: [
                { name: "mine", method: harvest, disabled: canHarvest(resource) },
                { name: "stop mining", method: stopHarvesting, disabled: canStopHarvesting() }
              ]
            };
          default:
            break;
        }
    } else {
      console.error("The context menu did not target a resource.");
    }
  }
}

function harvest(resource: Mineable, user: User) {
  isMining = true;
  miningIntervalId = setInterval(async () => {
    const loot: Yield[] = resource.harvest();
    if (loot.length > 0) {
      console.log("LOOT DISCOVERED!")
      loot.forEach(async (item: Yield) => {
        user.inventory.addItem({ itemId: item.name, quantity: item.quantity });
        await updateUserInventory(user.id, user.inventory);
      });        
    }
    await updateUserExperience(user.id, "mining", resource.type.xp);
    user.addXp("mining", resource.type.xp);
    userStore.set(user);
  }, resource.type.timeToComplete * 1000);
}

function stopHarvesting() {
  clearInterval(miningIntervalId);
  isMining = false;
}

function canHarvest(resource) {
  if (context.userLevels["mining"] < resource.type.requiredLevel || context.userCurrentlySkilling) {
    return true;
  } else {
    return false;
  }
}

function canStopHarvesting() {
  if (context.userCurrentlySkilling) {
    return false;
  } else {
    return true;
  }
}