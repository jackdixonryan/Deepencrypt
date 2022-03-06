import type { ItemSummary } from "../../types";

class Inventory {
  slots: (ItemSummary|null)[];
  constructor(data?: ItemSummary[]) { 
    this.slots = new Array(25);
    this.slots.fill(null);
    Object.seal(this.slots);

    if (data) {
      const length = data.length;
      if (length > 50) {
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

  removeItem(itemId: string, quantity: number, removedSoFar: number = 0): number {
    const index = this.getItemIndex(itemId);
    if (index === -1) {
      throw new Error("CANNOT_REMOVE_WHAT_DOES_NOT_EXIST");
    } else {
      const { quantity: itemQuantity } = this.slots[index];
      const remainder = itemQuantity - quantity;
      if (remainder === 0) {
        this.slots[index] = null;
        return quantity;
      } else if (remainder < 0) {
        this.slots[index] = null;
        const remainingToRemove = Math.abs(remainder);
        // need to keep finding items because of multiple inventory stacks. 
        this.removeItem(itemId, remainingToRemove, removedSoFar + this.slots[index].quantity);
      } else {
        this.slots[index].quantity -= quantity;
        return quantity;
      }
    }
  } 

  getItem(itemId: string): ItemSummary|null {
    const item = this.slots.find((itemSummary) => itemSummary?.itemId === itemId);
    if (item) {
      return item;
    } else {
      return null;
    }
  }

  getItemIndex(itemId: string): number { 
    const index = this.slots.findIndex((itemSummary) => itemSummary?.itemId === itemId);
    return index;
  }
  
  carrying(): number { 
    return this.slots.filter((slot) => slot !== null).length;
  }
}

export default Inventory;