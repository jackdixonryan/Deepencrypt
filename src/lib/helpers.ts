import User from "../game/lib/user";
import supabase from "./supabase";
import type { User as SupabaseUser }from "@supabase/supabase-js"
import Page from "../game/lib/resources/page";


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
      name: "",
      user: user,
      type
    });

    // creates the SB page.
    const response = await supabase.from("pages")
      .insert([{
        created_by: user.id,
        type: type,
        xpForConstruction: page.xpForConstruction
      }]);

    user.addXp("webmastering", page.xpForConstruction);
    await addXp(user.id, "webmastering", page.xpForConstruction);
    return { page, user };

  } catch(error) {
    return error;
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