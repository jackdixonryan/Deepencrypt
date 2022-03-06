import type { ResourceType } from "../types";

export interface PageType extends ResourceType {
  resourceMin: number;
  resourceMax: number;
  availableResources: string[]
}

export const types: PageType[] = [ 
  {
    name: "basic",
    requiredLevel: 1,
    xp: 98,
    timeToComplete: 10,
    resourceMin: 1,
    resourceMax: 4,
    availableResources: [
      "chainRemains",
      "dataFragments"
    ],
    description: "it's not much but it's a living.",
    skill: "webmastering",
  },
  {
    name: "beginner",
    requiredLevel: 5,
    xp: 114.5,
    timeToComplete: 10,
    resourceMin: 2, 
    resourceMax: 8,
    availableResources: [
      "chainRemains",
      "dataFragments",
      "encryptedReferences"
    ],
    description: "more stuff, more of the time!",
    skill: "webmastering",
  },
  {
    name: "portal",
    requiredLevel: 7,
    xp: 125,
    timeToComplete: 10,
    resourceMin: 2,
    resourceMax: 6,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ],
    skill: "webmastering",
    description: "it goes to other places"
  },
  {
    name: "documentation",
    requiredLevel: 15,
    xp: 481.3,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ],
    description: "we could read this, but we never do.",
    skill: "webmastering"
  },
  {
    name: "corruptedChain",
    requiredLevel: 20,
    xp: 1000,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ],
    skill: "webmastering",
    description: "it's no chain, but it's a start."
  },
  {
    name: "intactChain",
    requiredLevel: 30,
    xp: 1481.5,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "intactBlock"
    ],
    skill: "webmastering",
  },
  {
    name: "wellSecuredChain",
    requiredLevel: 40,
    xp: 2586,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "securedBlock",
      "pristineMetadata"
    ],
    skill: "webmastering"
  },
  {
    name: "unbrokenChain",
    requiredLevel: 50,
    xp: 4791.7,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "unbreakableBlock"
    ],
    skill: "webmastering"
  },
  {
    name: "erwdExecutiveChain",
    requiredLevel: 60,
    xp: 7150.9,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "executiveBlock",
      "erwdMetadata"
    ],
    skill: "webmastering"
  },
  {
    name: "classifiedChain",
    requiredLevel: 70,
    xp: 10509.6,
    timeToComplete: 10,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "classifiedBlock",
      "mightyHash"
    ],
    skill: "webmastering"
  },
  {
    name: "foundationalChain",
    requiredLevel: 75,
    xp: 13913,
    timeToComplete: 10,
    resourceMax: 16,
    resourceMin: 8,
    availableResources: [
      "foundationalBlock"
    ],
    skill: "webmastering"
  },
  {
    name: "legendaryChain",
    requiredLevel: 90,
    xp: 20000,
    timeToComplete: 10,
    resourceMax: 16,
    resourceMin: 8,
    availableResources: [
      "legendaryBlock",
      "legendaryMetadata"
    ],
    skill: "webmastering"
  }
];