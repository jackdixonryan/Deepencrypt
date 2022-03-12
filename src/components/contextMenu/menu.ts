import { gameStore } from "../../stores";
import { getMineable, mine, stopMining, canHarvest } from "$lib/services/mineable.service";
import type { GameStore } from "../../stores";
import type Mineable from "$lib/classes/resources/mineable";

const key = {};
export { key };

export async function getMenuOptions(e): Promise<any> {
  const { target } = e;

  const elementId = target.getAttribute("data-element");
  const dataType = target.getAttribute("data-type");

  if (elementId) {
    gameStore.update((gameState) => {
      return { ...gameState, targetId: elementId, targetType: dataType }
    });
    const menuOptions = await handleElement(elementId, dataType);
    return menuOptions;
  } else {
    return [];
  }
}

async function handleElement(elementId: string, dataType: string): Promise<any[]> {

  const menuOptions: any[] = [];
  let gameState: GameStore; 
  gameStore.subscribe((store: GameStore) => {
    gameState = store;
  });

  if (dataType === "mineable") {
 
    const mineableOptions = await getMineableOptions(gameState);
    menuOptions.push(...mineableOptions);

  } else if (dataType === "scriptable") {

    const scriptableOptions = getScriptableOptions(gameState);
    menuOptions.push(...scriptableOptions);

  } else if (dataType === "page") {

    const pageOptions = getPageOptions(gameState);
    menuOptions.push(...pageOptions);

  } else if (dataType === "encryptable") {

    const encryptableOptions = getEncryptableOptions(gameState);
    menuOptions.push(...encryptableOptions);
  }

  return menuOptions;
}

// the following methods need to manage two things: 
// 1. What MenuOptions are loaded to the menu? 
// 2. What do the MenuOptions do? 
// 3. Which Menu Options are selectable? 
async function getMineableOptions(gameState: GameStore): Promise<any[]> {
  // 1. Determine the options.   Remains to be seen whether the EXAMINE option belongs in the game options, or in the tabulation menus. 
  const mineable: Mineable = await getMineable(gameState.targetId);
  console.log({ mineable });
  console.log(canHarvest(mineable));

  const menuOptions = [
    { 
      text: "mine", 
      disabled: !canHarvest(mineable), 
      method: async () => { await mine(mineable) }
    }, 
    { 
      text: "stop mining", 
      disabled: true, 
      method: () => { stopMining }
    }, 
    { 
      text: "examine", 
      disabled: false, 
      method: () => { console.log("Method init"); } 
    }
  ];
  return menuOptions;
}

function getScriptableOptions(gameState: GameStore): any[] {
  return [];
}

function getPageOptions(gameState: GameStore): any[] {
  return [];
}

function getEncryptableOptions(gameState: GameStore): any[] {
  return [];
}
