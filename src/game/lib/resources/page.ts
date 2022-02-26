import { types } from "../../utility/page";
import type { PageType } from "../../utility/page";
import type User from "../user";
import Mineable from "./mineable";

type PageOptions = {
  // resources?: Mineable[];
  type: string;
  id?: string;
}

class Page {
  resources: Mineable[];
  id: string;
  type: PageType;
  xpForConstruction: number;
  
  constructor(options: PageOptions) {
    const { type, id } = options;

    const pageType = types.find((presetType) => presetType.name === type);
    if (!pageType) {
      throw new Error("Page type not found.");
    } else {
      this.type = pageType;
    }

    this.id = id;
    this.xpForConstruction = pageType.xp;
      
    // generate the resources on the page.

    const resourceMax = Math.ceil(pageType.resourceMax);
    const resourceMin = Math.floor(pageType.resourceMin);
    const randomResourceAmount = Math.floor(Math.random() * (resourceMax - resourceMin + 1)) + resourceMin;

    this.resources = [];
    this.addRandomMineables(randomResourceAmount);
      
  }

  addRandomMineables(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      const mineable = new Mineable();
      this.resources.push(mineable);
    }
  }
}

export default Page;