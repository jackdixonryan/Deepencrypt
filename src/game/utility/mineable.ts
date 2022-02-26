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
    name: "dataFragments",
    requiredLevel: 1,
    xp: 1.4,
    timeToComplete: 0.1,
    yields: [
      {
        item: { 
          name: "dataFragment",
        },
        quantity: 1,
        probabilityToLoot: 0.5,
      }
    ]
  },
  {
    name: "encryptedReferences",
    requiredLevel: 11,
    xp: 4.5,
    timeToComplete: 1, 
    yields: []
  }, 
  {
    name: "corruptedMetadata",
    requiredLevel: 11,
    xp: 4.5,
    timeToComplete: 1,
    yields: []
  }
];