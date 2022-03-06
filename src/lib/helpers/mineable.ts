import type { HarvestableType } from "../types";

export interface MineableType extends HarvestableType {

}

export const types: MineableType[] = [ 
  {
    name: "chainRemains",
    requiredLevel: 1,
    xp: 1.4,
    timeToComplete: 5,
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
    timeToComplete: 5,
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
    requiredLevel: 10,
    xp: 4.5,
    timeToComplete: 1, 
    yields: [
      { 
        name: "nice-data-packet", 
        quantity: 1, 
        probabilityToLoot: 0.1,
      }
    ],
    skill: "mining",
    description: "a good codebreaker might be able to crack these."
  }, 
  {
    name: "corruptedMetadata",
    requiredLevel: 20,
    xp: 4.5,
    timeToComplete: 1,
    yields: [
      {
        name: "corrupted-data-packet",
        quantity: 1, 
        probabilityToLoot: 0.1
      }
    ],
    skill: "mining",
    description: "at least only the metadata got corrupted"
  },
  {
    name: "intactBlock",
    requiredLevel: 30,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "preserved-data-packet",
        quantity: 1,
        probabilityToLoot: 0.1,
      }
    ],
    skill: "mining",
    description: "but where is the old chain?"
  }, 
  {
    name: "securedBlock",
    requiredLevel: 40,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "well-secured-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      }
    ],
    skill: "mining"
  },
  {
    name: "pristineMetadata",
    requiredLevel: 40,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "pristine-data-packet",
        quantity: 1,
        probabilityToLoot: 0.1,
      }
    ],
    skill: "mining"
  },
  {
    name: "unbreakableBlock",
    requiredLevel: 50,
    xp: 1, 
    timeToComplete: 1,
    yields: [
      {
        name: "immutable-packet",
        quantity: 1,
        probabilityToLoot: 0.1,
      }
    ], 
    skill: "mining"
  },
  {
    name: "executiveBlock",
    requiredLevel: 60,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "vip-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      },
      {
        name: "uncommon-encryption",
        quantity: 1,
        probabilityToLoot: 0.01,
      }
    ],
    skill: "mining"
  },
  {
    name: "erwdMetadata", 
    requiredLevel: 60,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "erwd-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      }
    ],
    skill: "mining"
  },
  {
    name: "classifiedBlock",
    requiredLevel: 70,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "classified-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      },
      {
        name: "rare-encryption",
        quantity: 1,
        probabilityToLoot: 0.01,
      }
    ],
    skill: "mining"
  },
  {
    name: "mightyHash",
    requiredLevel: 70,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "might-hash-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      }
    ],
    skill: "mining"
  },
  {
    name: "foundationalBlock",
    requiredLevel: 80,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "foundational-data-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      },
      {
        name: "epic-encryption",
        quantity: 1,
        probabilityToLoot: 0.01
      }
    ],
    skill: "mining"
  },
  {
    name: "legendaryBlock",
    requiredLevel: 90,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "legendary-data-packet",
        quantity: 1,
        probabilityToLoot: 0.1
      }, 
      {
        name: "legendary-encryption",
        quantity: 1,
        probabilityToLoot: 0.01,
      },
    ],
    skill: "mining"
  },
  {
    name: "legendaryMetadata",
    requiredLevel: 90,
    xp: 1,
    timeToComplete: 1,
    yields: [
      {
        name: "legendary-metadata-packet",
        quantity: 1,
        probabilityToLoot: 0.1,
      }
    ],
    skill: "mining"
  }
];