import Link from "next/link";
import classes from "./page.module.css"
import MealGrid from "@/components/meals/meals-grid";

import { getMeals } from "@/lib/meal";
import { Suspense } from "react";

export async function Meals({}){
    const meals = await getMeals();
    return (<MealGrid meals={meals}/>);
}
export const metadata = {
    title: 'All Meal',
    description: 'Delicious meals, shared by a food-loving community.',
};

export default async function MealPage(){
    const meals = await getMeals();
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals created <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun.
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Meal.
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching Meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}