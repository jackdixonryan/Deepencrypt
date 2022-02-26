import User from "../game/lib/user";
import supabase from "./supabase";
import type { User as SupabaseUser }from "@supabase/supabase-js"


// takes a supabase user and returns one of ours.
export async function createGameUser(user: SupabaseUser) {

  const skills = await createUserSkills(user);

  const gameUser: User = new User({
    name: null,
    id: user.id,
    skillMatrix: skills,
  });

  console.log(gameUser);

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
    const tree = data[0];
    return tree; 
  }
}

