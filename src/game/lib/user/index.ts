import type { CharacterOptions, SkillMatrix } from "../../types";
import { xpToLevel } from "../../utility/xp";
import type Inventory from "./inventory";

class User {
  name: string;
  titles: string[];
  skillMatrix: SkillMatrix;
  inventory: Inventory;
  id: string;
  constructor(options: CharacterOptions) {
    const { name, id, skillMatrix, inventory } = options;
    this.name = name;
    this.id = id;
    this.titles = [];
    this.inventory = inventory;
    if (skillMatrix) {
      this.skillMatrix = skillMatrix; 
    } else {
      this.skillMatrix = this.generateSkillTree();
    }
  }

  generateSkillTree(): SkillMatrix {
    const xpMatrix: SkillMatrix = {
      webmastering: 0,
      hacking: 0,
      bugHunting: 0,
      daemonology: 0, 
      mining: 0,
      scripting: 0,
      botnetting: 0,
      networking: 0,
      cryptography: 0
    }

    return xpMatrix;
  }

  getLevels() {
    const levelMatrix: any = {};
    for (let entry in this.skillMatrix) {
      const xpAmount: number = this.skillMatrix[entry];
      const level: number = xpToLevel(xpAmount);
      levelMatrix[entry] = level;
    }

    return levelMatrix;
  }

  addXp(skill: string, amount: number): void { 
    this.skillMatrix[skill] += amount;
  }
}

export default User;