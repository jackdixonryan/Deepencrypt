import type { HarvestableType } from "../types";

export interface MineableType extends HarvestableType {

}

export const types: MineableType[] = [ 
  {
    name: "chainRemains",
    requiredLevel: 1,
    xp: 1.4,
    timeToComplete: 1,
    yields: [
      { 
        item: {
          name: "chainRemain",
        },
        quantity: 1,
        probabilityToLoot: 0.5,
      }
    ]
  },
  {
    name: "brokeAssChain",
    requiredLevel: 1,
    xp: 1.4,
    timeToComplete: 0.1,
    yields: [
      {
        item: { 
          name: "brokeAssChain",
        },
        quantity: 1,
        probabilityToLoot: 0.5,
      }
    ]
  },
];