import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

// export function getMeals() {
//   return db.prepare("SELECT * FROM meals").all();
// }

//THIS IS DONE FOR STUDY PURPOSE ONLY
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Fail to fetch data");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  //Creates a unique slug for each meal based on the title
  meal.slug = slugify(meal.title, { lower: true });
  // cleans the user input to prevent attacks since this content will be shown as HTML
  meal.instructions = xss(meal.instructions);

  //Prepare image information to store it in the file system
  // 1) Extract the extension
  const extension = meal.image.name.split(".").pop();
  // 2) Generate a file name based on the slug to make it unique
  const fileName = `${meal.slug}.${extension}`;
  // 3) Generate the stream where the image will be stored in the file system (fs most be imported from node:fs in order to perform this action)
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  // 4) Image must be buferred before it can be write in the file system
  const bufferedImage = await meal.image.arrayBuffer();
  // 5) Write the image and catch any errors that may occurr during this process

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("Saving image failed");
  });

  //Create image path to store in the db
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
