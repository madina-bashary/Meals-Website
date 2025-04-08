'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meal";
import { revalidatePath } from "next/cache";

function isInvalidText(text){
    return !text || text.trim() === '';
}

export async function ShareMeal(prevData, formData) {
    const meal ={
        title : formData.get('title'),
        creator : formData.get('name'),
        creator_email : formData.get('email'),
        summary : formData.get('summary'),
        instructions : formData.get('instructions'),
        image : formData.get('image'),
    }

    if(
        isInvalidText(meal.title)||
        isInvalidText(meal.instructions)||
        isInvalidText(meal.creator)||
        isInvalidText(meal.creator_email)||
        isInvalidText(meal.summary)||
        !(meal.creator_email.includes('@'))||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid Text'
        }
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}

