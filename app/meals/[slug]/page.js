import Image from "next/image"

import classes from "./page.module.css"
import { getMeal } from "@/lib/meal"

export async function generateMetadata({params}) {
    const meal = getMeal(params.slug);
    return {
        title: meal.title,
        description: meal.summary,
    }
}
export default function MealsDetailPage( {params} ) {

    const meal = getMeal(params.slug);

    meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto ${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
            </header>
            <main>
                <p 
                    className={classes.instructions} 
                    dangerouslySetInnerHTML={{
                        __html:meal.instructions
                    }}
                ></p>
            </main>
        </>
    )
}