import { gameStore } from "src/stores";

const key = {};
export { key };

export function getMenuOptions(e) {
  const { target } = e;

  const dataElement = target.getAttribute("data-element");

  if (dataElement) {
    gameStore.update((gameState) => {
      return { ...gameState, targetId: dataElement }
    });
    handleElement(dataElement);
  }
}

function handleElement(dataElement: string): any[] {

  let menuOptions: any[];

  if (dataElement === "mineable") {
    const mineableOptions = getMineableOptions();
    menuOptions.push(mineableOptions);

  } else if (dataElement === "scriptable") {
    const scriptableOptions = getScriptableOptions();
    menuOptions.push(scriptableOptions);

  } else if (dataElement === "page") {
    const pageOptions = getPageOptions();
    menuOptions.push(pageOptions);

  } else if (dataElement === "encryptable") {
    const encryptableOptions = getEncryptableOptions();
    menuOptions.push(encryptableOptions);
  }

  return menuOptions;
}

function getMineableOptions() {

}

function getScriptableOptions() {

}

function getPageOptions() {
  
}

function getEncryptableOptions() {

}