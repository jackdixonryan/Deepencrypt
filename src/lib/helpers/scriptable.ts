import type { HarvestableType, ItemSummary } from "../types";

export interface ScriptableType extends HarvestableType {
  itemsRequired: ItemSummary[];   
}

export const types: ScriptableType[] = [
  {
    name: "if-then-statement",
    itemsRequired: [
      { itemId: "basic-data-packet", quantity: 1 },
      { itemId: "snarled-data-packet", quantity: 1 },
    ],
    yields: [{ name: "if-then-statement", quantity: 1, probabilityToLoot: 1}],
    xp: 1,
    requiredLevel: 1, 
    skill: "crafting",
    description: "isn't this what programming is, basically?",
    timeToComplete: 1,
  },
  { 
    name: "very-weak-firewall",
    itemsRequired: [
      { itemId: "if-then-statement", quantity: 5 },
    ],
    yields: [{ name: "very-weak-firewall", quantity: 1, probabilityToLoot: 1 }],
    xp: 75,
    requiredLevel: 1,
    skill: "crafting", 
    description: "if user !== me, then: !let in.",
    timeToComplete: 10,
  }
]