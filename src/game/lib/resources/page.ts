import { types } from "../../utility/page";
import type { PageType } from "../../utility/page";
import type User from "../user";
// import Mineable from "./mineable";

type PageOptions = {
  // resources?: Mineable[];
  name: string;
  type: string;
  user: User;
  id?: string;
}

class Page {
  // resources: Mineable[];
  name: string;
  id: string;
  type: PageType;
  userId: string;
  xpForConstruction: number;
  
  constructor(options: PageOptions) {
    const { name, type, user, id } = options;

    const pageType = types.find((presetType) => presetType.name === type);
    if (!pageType) {
      throw new Error("Page type not found.");
    } else {
      this.type = pageType;
    }

    if (user.getLevels()["webmastering"] < this.type.requiredLevel) {
      throw new Error("INSUFFICIENT_LEVEL");
    } else { 
      this.name = name; 
      this.id = id;
      this.userId = user.name;
      this.xpForConstruction = pageType.xp;
      
      // generate the resources on the page.

      const resourceMax = Math.ceil(pageType.resourceMax);
      const resourceMin = Math.floor(pageType.resourceMin);
      const randomResourceAmount = Math.floor(Math.random() * (resourceMax - resourceMin + 1)) + resourceMin;

      // this.resources = [];
      // this.addRandomMineables(randomResourceAmount);
      
    }
  }

  // addRandomMineables(quantity: number): void {
  //   for (let i = 0; i < quantity; i++) {
  //     const mineable = new Mineable();
  //     this.resources.push(mineable);
  //   }
  // }
}

export default Page;