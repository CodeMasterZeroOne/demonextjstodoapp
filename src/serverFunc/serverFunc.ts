"use server"

import { prisma } from "@/db"
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()

    if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid Title.")
        // return <div className="toast toast-center">
        //     <div className="alert alert-info">
        //         <span>New mail arrived.</span>
        //     </div>
        //     <div className="alert alert-success">
        //         <span>Message sent successfully.</span>
        //     </div>
        // </div>
    }
    console.log('title is', title)
    const newTodo = await prisma.todos.create({
        data: {
            title: title,
            completed: false
        }
    })
    // console.log('added new todo:', newTodo)
    // revalidateTag('todos')
    redirect("/")
}