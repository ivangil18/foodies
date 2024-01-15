import Link from "next/link";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

//STANDARD WAY TO GET DATA:
// export default function MealsPage() {
//   const meals = getMeals();

//DUE TO THE ALTERATION TO THE GETMEALS() FUNCTION TO TURN IT INTO A PROMISE TO ADD THE DELAY THIS IS FUNCION
// TO BE DONE ASYNC FOR TRAINING PURPOSES ONLY:
export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
