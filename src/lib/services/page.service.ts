import type User from "$lib/classes/user";
import Page from "$lib/classes/resources/page";
import db from "$lib/db";
import Mineable from "$lib/classes/resources/mineable";
import { updateUserExperience } from "$lib/services/user.service";

export async function createPage(type: string, user: User) {
  try {
    const page = new Page({
      type,
      numberOfResources: 0
    });

    const { data: pageData, error: pageError } = await db.from("pages")
      .insert([{
        created_by: user.id,
        type: type,
        xpForConstruction: page.xpForConstruction,
        numberOfResources: 0
      }]);

    page.id = pageData[0].id; 
    
    const resources = generateRandomResources(page);

    await db.from("resources")
      .insert(resources);

    await db.from("pages")
      .update({ numberOfResources: resources.length })
      .eq("id", page.id);

    await updateUserExperience(user.id, "webmastering", page.xpForConstruction);

    return { page, user }
    
  } catch (error) {
    console.error(error);
  }
}

export async function getPage(pageId: string): Promise<{ page: Page, resources: Mineable[] }> {
  try {

    const { error, data } = await db.from("pages")
      .select("*")
      .eq("id", pageId);

    if (error) {
      throw new Error(error.message);
    }

    const pageRecord = data[0];
    const page = new Page({
      id: pageRecord.id,
      type: pageRecord.type,
      numberOfResources: pageRecord.numberOfResources
    });

    const { error: resourceError, data: resourceData } = await db.from("resources")
      .select("*")
      .eq("page_id", page.id);

    const resources: Mineable[] = resourceData.map((datum) => {
      return new Mineable({
        type: datum.type,
        id: datum.id
      });
    });

    return { page, resources }
    
  } catch (error) {
    throw new Error(error);
  }
}

function generateRandomResources(page: Page): any[] {
  const resourceMax = Math.ceil(page.type.resourceMax);
  const resourceMin = Math.floor(page.type.resourceMin);
  const randomResourceAmount = Math.floor(Math.random() * (resourceMax - resourceMin + 1)) + resourceMin;
  const resources = [];
  console.log({ randomResourceAmount });
  for (let i = 0; i < randomResourceAmount; i++) {
    const mineable = new Mineable({ type: generateRandomPermissibleType(page.type) });
    resources.push(mineable);
  }

  const resourcesForSupabase = resources.map((resource) => { 
    return {
      type: resource.type.name,
      page_id: page.id
    }
  });

  return resourcesForSupabase;
}

function generateRandomPermissibleType(pageType) {
  const { availableResources } = pageType;
  const len = availableResources.length;
  const index = Math.floor(Math.random() * len);
  return availableResources[index];
}
