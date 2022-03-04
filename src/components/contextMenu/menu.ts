import type Craftable from "$lib/classes/resources/craftable";
import type Mineable from "$lib/classes/resources/mineable";
import type Page from "$lib/classes/resources/page";
import type User from "$lib/classes/user";
import { updateUserExperience, updateUserInventory } from "$lib/services/user.service";
import type { Yield } from "$lib/types";
import { userStore } from "../../stores";

const key = {};
export { key };
let isMining: boolean; 
let miningIntervalId;

interface Context { 
  resources: (Mineable|Craftable)[];
  page: Page;
  user: User;
}

interface MenuOptions { 
  type: string;
  resourceId: string;
  resource: (Mineable|Craftable);
  options: { name: string; method: Function }[];
  user: User;
}


export function getMenuOptions(e, context: Context): MenuOptions {
  const { target } = e;
  const id = target.getAttribute("data-element");
  if (id) {
    const elements = id.split(":");

    // in the event that the element's Id can be construed as a clickable ID, we can use it.
    if (elements.length === 2) {
      const type = elements[0];
      const resourceId = elements[1];
      const resource = context.resources.find((resource) => resource.id === resourceId);

      switch(type) {
        case "mineable": 
          return {
            type,
            resourceId,
            resource,
            user: context.user,
            options: [
              { name: "mine", method: harvest },
              { name: "stop mining", method: stopHarvesting }
            ]
          };
        default:
          break;
      }
    }
  }
}

function harvest(resource: Mineable, user: User) {
  isMining = true;
  miningIntervalId = setInterval(async () => {
    const loot: Yield[] = resource.harvest();
    if (loot.length > 0) {
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

// function inspect(resource: Mineable) {
//   // return resource.description;
// }

function stopHarvesting() {
  clearInterval(miningIntervalId);
  isMining = false;
}