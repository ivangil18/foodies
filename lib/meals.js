import sql from "better-sqlite3";

const db = sql("meals.db");

// export function getMeals() {
//   return db.prepare("SELECT * FROM meals").all();
// }

//THIS IS DONE FOR STUDY PURPOSE ONLY
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}
