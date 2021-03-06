import type { ItemSummary, Yield } from "../../types";
import { types } from "../../helpers/scriptable";
import type { ScriptableType } from "../../helpers/scriptable";

type ScriptableOptions = {
  type: string;
  id?: string;
}

type ItemsSatisfied = {
  itemId: string;
  quantity: number;
  currentQuantity: number;
}

class Scriptable {
  type: ScriptableType;
  id?: string;

  constructor(scriptableOptions: ScriptableOptions) {
    const { type, id } = scriptableOptions;
    if (id) {
      this.id = id;
    }

    const specifiedType: ScriptableType = types.find((typeObj: ScriptableType) => typeObj.name === type);
    if (specifiedType) {
      this.type = specifiedType;
    } else {
      throw new Error(`Type ${type} is not available.`);
    }
  }

  // the two arrays - inputs and itemsRequired - are structurally the same. 
  // how do we compare them? 

  craft(inputs: ItemSummary[]): Yield[] {
    const { itemsRequired, yields } = this.type;
    const itemsSatisfied: ItemsSatisfied[] = [];

    // create satisfaction array.
    for (let i = 0; i < itemsRequired.length; i++) {
      itemsSatisfied.push({ ...itemsRequired[i], currentQuantity: 0 });
    }

    // determine quantity vis a vis required quantity.
    for (let j = 0; j < inputs.length; j++) {
      const { itemId, quantity } = inputs[j];
      const itemTargeted = itemsSatisfied.find((item) => item.itemId === itemId);
      if (itemTargeted) {
        itemTargeted.quantity += quantity;
      }
    }

    // if all requisite items were passed in.
    const itemRequirementsSatisfied = itemsSatisfied.every((item) => item.currentQuantity >= item.quantity);
    if (itemRequirementsSatisfied === true) {
      // scriptables don't have random item drops right now. They drop 100% of the time. So just return them.
      return yields;
    } else {
      throw new Error("REQUIREMENTS_NOT_SATISFIED");
    }
  }
}

export default Scriptable;