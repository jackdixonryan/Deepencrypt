import type Inventory from "../lib/classes/user/inventory";

export interface CharacterOptions { 
  name: string;
  skillMatrix?: SkillMatrix;
  id: string;
  inventory: Inventory;
}

export interface Daemon {
  name: string;
  id: string;
  level: number;
  lifepoints: number;
  defense: number;
  attack: number;
  xp: number;
  slayerLevel: number;
  slayerCategory: string;
  attackable: boolean;
  aggressive: boolean;
  description: string;
}

export interface SkillMatrix {
  [key: string]: number
}

export interface ResourceType {
  requiredLevel: number;
  xp: number;
  name: string;
  timeToComplete: number;
}

export interface HarvestableType extends ResourceType {
  yields: Yield[];
}

export interface Yield { 
  name: string;
  quantity: number;
  probabilityToLoot: number;
}

export interface Item {
  name: string; 
  equippable: boolean;
  equipSlot: string;
}