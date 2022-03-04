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
        name: "basic-data-packet", 
        quantity: 1, 
        probabilityToLoot: 0.1,
      }
    ],
    description: "looks like the blockchain has broken down a little bit.",
    skill: "mining"
  },
  {
    name: "dataFragments",
    requiredLevel: 1,
    xp: 1.4,
    timeToComplete: 0.1,
    yields: [
      {
        name: "snarled-data-packet",
        quantity: 1,
        probabilityToLoot: 0.1,
      }
    ],
    skill: "mining",
    description: "someone didn't refactor..."
  },
  {
    name: "encryptedReferences",
    requiredLevel: 11,
    xp: 4.5,
    timeToComplete: 1, 
    yields: [],
    skill: "mining",
    description: "a good codebreaker might be able to crack these."
  }, 
  {
    name: "corruptedMetadata",
    requiredLevel: 11,
    xp: 4.5,
    timeToComplete: 1,
    yields: [],
    skill: "mining",
    description: "at least only the metadata got corrupted"
  }
];