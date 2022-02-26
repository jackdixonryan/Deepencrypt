import type { Yield } from "../../types";
import { types } from "../../utility/mineable";
import type { MineableType } from "../../utility/mineable";

type MineableOptions = {
  type: string;
  id: string;
}

class Mineable {
  type: MineableType;
  id: string;

  constructor(mineableOptions?: MineableOptions) {
    if (mineableOptions) {
      // deconstruct the type from the options. 
      const { type, id } = mineableOptions
      const specifiedType = types.find((typeObj) => typeObj.name === type);
      // if the specified type is in the type library, it can be used.
      if (specifiedType) {
        this.type = specifiedType;
        this.id = id;
        // if the specified type is not in the type library, it cannot be generated. 
      } else {
        throw new Error(`Type ${type} is not available.`);
      }
    }
  }

  async harvest(): Promise<{ xp: number; haul: Yield[] }> {
    return new Promise((resolve, reject) => {
      const haul: Yield[] = [];
      this.type.yields.forEach((item) => {
        const randomRoll: number = Math.random();
        if (item.probabilityToLoot >= randomRoll) { 
          haul.push(item);
        }
      });

      const timeToComplete = this.type.timeToComplete;

      setTimeout(() => {
        resolve({
          xp: this.type.xp,
          haul
        });
      }, timeToComplete * 100);
    });
  }
}

export default Mineable;