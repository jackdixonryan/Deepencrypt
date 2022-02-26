import { types } from "../../utility/page";
import type { PageType } from "../../utility/page";
import type User from "../user";

type PageOptions = {
  numberOfResources: number;
  type: string;
  id?: string;
}

class Page {
  numberOfResources: number;
  id: string;
  type: PageType;
  xpForConstruction: number;
  
  constructor(options: PageOptions) {
    const { type, id, numberOfResources } = options;

    const pageType = types.find((presetType) => presetType.name === type);
    if (!pageType) {
      throw new Error("Page type not found.");
    } else {
      this.type = pageType;
    }

    this.id = id;
    this.xpForConstruction = pageType.xp;
    this.numberOfResources = numberOfResources;

  }
}

export default Page;