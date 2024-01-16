import Image from "next/image";
import clasess from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={clasess.header}>
        <div className={clasess.image}>
          <Image src={meal.image} fill alt={meal.title}></Image>
        </div>
        <div className={clasess.headerText}>
          <h1>{meal.title}</h1>
          <p className={clasess.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={clasess.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={clasess.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
