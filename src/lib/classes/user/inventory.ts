import type { Item } from "../../types";

interface ItemSummary {
  itemId: string;
  quantity: number;
}

class Inventory {
  slots: (ItemSummary|null)[];
  constructor(data?: ItemSummary[]) { 
    this.slots = new Array(25);
    this.slots.fill(null);
    Object.seal(this.slots);

    if (data) {
      const length = data.length;
      if (length > 25) {
        throw new Error("Too Many Items!");
      } else {
        for (let i = 0; i < data.length; i++) {
          const slotIndex = this.slots.findIndex((slot) => slot === null);
          this.slots[slotIndex] = data[i];
        }
      }
    }
  }

  addItem(item: ItemSummary) {

    // step 1: figure out if the item has already been registered, in which case we just need to modify quantity.
    const itemIndex = this.slots.findIndex((slot) => slot?.itemId === item.itemId);
    
    if (itemIndex !== -1) {
      const stackQuantity = this.slots[itemIndex].quantity;
      // cap the stacks at 500
      if (stackQuantity + item.quantity < 500) {
        this.slots[itemIndex].quantity += item.quantity;
      } else { 
        // if there's bleedover, add as much remainder as is needed. 
        const remainder = 500 - (stackQuantity + item.quantity);
        this.slots[itemIndex].quantity = 500;

        const slotIndex = this.slots.findIndex((slot) => slot === null);
        if (slotIndex === -1) {
          throw new Error("INVENTORY_FULL");
        } else {
          this.slots[slotIndex] = { itemId: item.itemId, quantity: remainder };
        }
      }
    } else {
      const slotIndex = this.slots.findIndex((slot) => slot === null);
      if (slotIndex === -1) {
        throw new Error("INVENTORY_FULL");
      } else {
        this.slots[slotIndex] = item;
      }
    }
  }
  
  carrying(): number { 
    return this.slots.filter((slot) => slot !== null).length;
  }
}

export default Inventory;