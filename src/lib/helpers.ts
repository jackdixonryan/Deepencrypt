import User from "../game/lib/user";
import supabase from "./supabase";
import type { User as SupabaseUser }from "@supabase/supabase-js"
import Page from "../game/lib/resources/page";
import Mineable from "../game/lib/resources/mineable";


// takes a supabase user and returns one of ours.
export async function createGameUser(user: SupabaseUser) {

  const skills = await createUserSkills(user);

  const gameUser: User = new User({
    name: null,
    id: user.id,
    skillMatrix: skills,
  });

  try {
    await supabase.from("players") 
      .insert([{
        id: gameUser.id,
        skill_tree_id: skills.id,
      }]);
  } catch(error) {
    console.log(error);
  }
}

export async function createUserSkills(user: SupabaseUser) {
  const { data, error } = await supabase.from("skill_trees")
    .insert([{ "id": user.id }]);

  if (error) {
    console.log(error);
    return null;
  } else {
    return data[0];
  }
}

export async function fetchGameUser(userId) {
  let { data: players, error } = await supabase.from("players").select('*')
    .eq("id", userId);
  if (error) {
    console.log(error);
    return null;
  } else {
    if (players.length === 1) {
      const playerRecord = players[0];
      const skills = await getUserSkills(userId);
      const player = new User({
        name: null,
        id: playerRecord.id,
        skillMatrix: skills
      });
      return player;
    } else {
      return null;
    }
  }
}

export async function getUserSkills(userId: string) {
  const { data, error } = await supabase.from("skill_trees")
    .select("*")
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  } else {
    const { id, ...tree } = data[0];
    return tree; 
  }
}

export async function createPage(type: string, user: User) {
  try {
    const page = new Page({
      type,
      numberOfResources: 0
    });
    
    // creates the SB page.
    const response = await supabase.from("pages")
      .insert([{
        created_by: user.id,
        type: type,
        xpForConstruction: page.xpForConstruction,
        numberOfResources: 0
      }]);

    const resourceMax = Math.ceil(page.type.resourceMax);
    const resourceMin = Math.floor(page.type.resourceMin);
    const randomResourceAmount = Math.floor(Math.random() * (resourceMax - resourceMin + 1)) + resourceMin;
    const resources = [];
    for (let i = 0; i < randomResourceAmount; i++) {
      const mineable = new Mineable({ type: "chainRemains" });
      resources.push(mineable);
    }

    const resourcesForSupabase = resources.map((resource) => { 
      return {
        type: resource.type.name,
        page_id: response.data[0].id
      }
    });

    console.log(resourcesForSupabase);

    await supabase.from("resources")
      .insert(resourcesForSupabase);

    await supabase.from("pages")
      .update({ numberOfResources: resourcesForSupabase.length })
      .eq("id", response.data[0].id);

    user.addXp("webmastering", page.xpForConstruction);
    await addXp(user.id, "webmastering", page.xpForConstruction);
    
    return { page, user };

  } catch(error) {
    console.log(error);
    return error;
  }
} 

export async function getPage(pageId: string) {
  try {
    const { error, data } = await supabase.from("pages")
      .select("*")
      .eq("id", pageId);

    if (error) {
      console.log(error);
      return null;
    } else {
      if (data.length === 1) {
        const record = data[0];
        const page = new Page({
          id: record.id, 
          type: record.type,
          numberOfResources: record.numberOfResources
        });

        const resourceResponse = await supabase.from("resources")
          .select("*")
          .eq("page_id", page.id);

        
        const resources = resourceResponse.data.map((datum) => {
          return new Mineable({
            type: datum.type,
            id: datum.id
          });
        });

        return { page, resources };
      }
    }
  } catch(error) {
    console.log(error);
  }
}

export async function addXp(userId, skill, xp) { 
  const tree = await getUserSkills(userId);
  let newXp;
  if (tree) {
    newXp = tree[skill] + xp;
    // now find the appropriate value. 

    const { data, error } = await supabase
      .from("skill_trees")
      .update({ [skill]: newXp })
      .eq('id', userId);
    
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  } 
}
