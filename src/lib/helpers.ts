import User from "../game/lib/user";
import supabase from "./supabase";
import type { User as SupabaseUser }from "@supabase/supabase-js"


// takes a supabase user and returns one of ours.
async function createGameUser(user: SupabaseUser) {

  const skills = await createUserSkills(user);

  const gameUser: User = new User({
    name: null,
    email: user.email,
    id: user.id,
    skillsId: skills.id;
  });
}

async function createUserSkills(user: SupabaseUser) {
  const { data, error } = await supabase.from("skill_trees")
    .insert([{ "id": user.id }]);

  if (error) {
    console.log(error);
    return null;
  } else {
    return data;
  }
}

async function fetchGameUser(userId) {
  let { data: players, error } = await supabase.from("users").select('*')
    .eq("id", userId);

  if (error) {
    console.log(error);
    return null;
  } else {
    if (players.length === 1) {
      // we found what we were seeking.
      return players[0];
    } else {
      return null;
    }
  }
}