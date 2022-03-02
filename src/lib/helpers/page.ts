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
    timeToComplete: 4,
    resourceMin: 1,
    resourceMax: 5,
    availableResources: [
      "chainRemains",
      "dataFragments"
    ],
  },
  {
    name: "beginner",
    requiredLevel: 5,
    xp: 114.5,
    timeToComplete: 40,
    resourceMin: 1, 
    resourceMax: 6,
    availableResources: [
      "chainRemains",
      "dataFragments",
      "encryptedReferences"
    ],
  },
  {
    name: "portal",
    requiredLevel: 7,
    xp: 125,
    timeToComplete: 40,
    resourceMin: 2,
    resourceMax: 6,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ],
  },
  {
    name: "documentation",
    requiredLevel: 15,
    xp: 481.3,
    timeToComplete: 160,
    resourceMin: 4,
    resourceMax: 10,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ]
  },
  {
    name: "intactBlock",
    requiredLevel: 30,
    xp: 1481.5,
    timeToComplete: 240,
    resourceMin: 8,
    resourceMax: 16,
    availableResources: [
      "encryptedReferences",
      "corruptedMetadata"
    ]
  }
];