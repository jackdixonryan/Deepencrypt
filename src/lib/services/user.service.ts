import User from "$lib/classes/user";
import Inventory from "$lib/classes/user/inventory";
import type { SkillMatrix } from "$lib/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import db from "../db";

export async function getUser(userId: string): Promise<User> {
  try {

    const { error, data } = await db.from("players")
      .select("*")
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    } 

    const userRecord = data[0];
    const skillMatrix = await getUserSkills(userId);
    const inventory = new Inventory(JSON.parse(userRecord.inventory));

    const user: User = new User({
      id: userRecord.id,
      skillMatrix, 
      name: "",
      inventory
    });

    return user;

  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserSkills(userId: string): Promise<SkillMatrix> {
  try {

    const { error, data } = await db.from("skill_trees")
      .select("*")
      .eq("id", userId);

    if (error) {
      throw new Error(error.message);
    }

    const { id, ...skillTree } = data[0];
    return skillTree; 

  } catch(error) {
    throw new Error(error);
  }
}

export async function createUser(user: SupabaseUser) {
  const skills = await createUserSkills(user.id);
  const gameUser: User = new User({
    name: null,
    id: user.id,
    skillMatrix: skills,
    inventory: new Inventory()
  });

  try {
    const { data, error } = await db.from("players")
      .insert([{
        id: gameUser.id,
        skill_tree_id: skills.id,
        inventory: JSON.stringify(gameUser.inventory.slots)
      }]);

      if (error) {
        throw new Error(error.message);
      }

      return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createUserSkills(userId: string) {
  const { data, error } = await db.from("skill_trees")
    .insert([{ "id": userId }]);

  if (error) {
    console.log(error);
    return null;
  } else {
    return data[0];
  }
}

export async function updateUserInventory(userId: string) {
  const { error, data } = await db.from("players")
    .select("inventory")
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  } 

  console.log(data);

}

export async function updateUserExperience(userId: string, skill: string, xp: number) {
  const skillMatrix = await getUserSkills(userId);
  let newExperienceQuantity: number;
  if (skillMatrix) {
    newExperienceQuantity = skillMatrix[skill] + xp;
    try {
      const { data, error } = await db.from("skill_trees")
        .update({ [skill]: newExperienceQuantity })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      } 

      return data;

    } catch (error) {
      throw new Error(error);
    }
  }
}

export async function deleteUser() {

}