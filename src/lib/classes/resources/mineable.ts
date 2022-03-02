import type { Yield } from "../../types";
import { types } from "../../helpers/mineable";
import type { MineableType } from "../../helpers/mineable";

type MineableOptions = {
  type: string;
  id?: string;
}

class Mineable {
  type: MineableType;
  id?: string;

  constructor(mineableOptions: MineableOptions) {
    if (mineableOptions) {
      // deconstruct the type from the options. 
      const { type, id } = mineableOptions
      if (id) {
        this.id = id;
      }
      const specifiedType = types.find((typeObj) => typeObj.name === type);
      // if the specified type is in the type library, it can be used.
      if (specifiedType) {
        this.type = specifiedType;
        // if the specified type is not in the type library, it cannot be generated. 
      } else {
        throw new Error(`Type ${type} is not available.`);
      }
    }
  }

  harvest(): Yield[] {
    const loot: Yield[] = [];
    this.type.yields.forEach((item) => {
      const randomRoll: number = Math.random();
      if (item.probabilityToLoot >= randomRoll) { 
        loot.push(item);
      }
    });
    return loot;
  }
}

export default Mineable;