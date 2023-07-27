import { redirect } from "next/navigation"
import { prisma } from "@/db"
import Link from "next/link"
import { revalidatePath, revalidateTag } from "next/cache"
import Snackbar from "@/components/Snackbar"
import { useState } from "react"

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
    console.log('added new todo:', newTodo)
    redirect("/")
    // revalidateTag('todos')
}

export default function page() {
    // const { snackbar, setSnackbar } = useState({
    //     open: false,
    //     severity: 'success',
    //     message: 'teraz '
    // })
    return <>
        <header className='flex justify-between items-center mb-4 p-8'>
            <h1 className='text-2xl'>Add ToDo</h1>
        </header>
        <form action={createTodo} className="flex gap-2 flex-col">
            <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
            <div className="flex gap-1 justify-end">
                <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
                <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
            </div>
            {/* <button type="button" onClick={() => { setSnackbar({ ...snackbar, open: false, severity: 'success', message: 'Udalo sie' }) }} className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button> */}
            {/* <Snackbar snackbar={snackbar} /> */}
        </form>
    </>
}



// "use client"
// import Link from "next/link";
// import Snackbar from "@/components/Snackbar";
// import { useState } from "react";

// function createTodo(data: FormData): { open: boolean; severity: string; message: string } {

//     const title = data.get("title")?.valueOf();

//     if (typeof title !== "string" || title.length === 0) {
//         return {
//             open: true,
//             severity: "error",
//             message: "Invalid Title.",
//         };
//     }

//     console.log("title is", title);
//     // Perform other client-side operations as needed
//     return {
//         open: true,
//         severity: "success",
//         message: "Todo created successfully.",
//     };
// }

// export default function Page(): JSX.Element {
//     const [snackbar, setSnackbar] = useState<{ open: boolean; severity: string; message: string }>({
//         open: false,
//         severity: "success",
//         message: "teraz",
//     });

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);
//         const snackbarData = createTodo(formData);
//         setSnackbar(snackbarData);
//     };

//     return (
//         <>
//             <header className="flex justify-between items-center mb-4 p-8">
//                 <h1 className="text-2xl">Add ToDo</h1>
//             </header>
//             <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
//                 <input
//                     type="text"
//                     name="title"
//                     className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
//                 />
//                 <div className="flex gap-1 justify-end">
//                     <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
//                         Cancel
//                     </Link>
//                     <button
//                         type="submit"
//                         className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
//                     >
//                         Create
//                     </button>
//                 </div>
//             </form>
//             <Snackbar snackbar={snackbar} />
//         </>
//     );
// }


// import { redirect } from "next/navigation"
// import { prisma } from "@/db"
// import Link from "next/link"
// import { revalidateTag } from "next/cache"
// import Snackbar from "@/components/Snackbar"
// import { useState } from "react"

// async function createTodo(data: FormData) {
//     "use server"

//     const title = data.get("title")?.valueOf()

//     if (typeof title !== "string" || title.length === 0) {
//         // throw new Error("Invalid Title.")
//         return <div className="toast toast-center">
//             <div className="alert alert-info">
//                 <span>New mail arrived.</span>
//             </div>
//             <div className="alert alert-success">
//                 <span>Message sent successfully.</span>
//             </div>
//         </div>
//     }
//     console.log('title is', title)
//     const newTodo = await prisma.todos.create({
//         data: {
//             title: title,
//             completed: false
//         }
//     })
//     // console.log('added new todo:', newTodo)
//     // revalidateTag('todos')
//     redirect("/")
// }

// export default function page() {
//     // const { snackbar, setSnackbar } = useState({
//     //     open: false,
//     //     severity: 'success',
//     //     message: 'teraz '
//     // })
//     return <>
//         <header className='flex justify-between items-center mb-4 p-8'>
//             <h1 className='text-2xl'>Add ToDo</h1>
//         </header>
//         <form action={createTodo} className="flex gap-2 flex-col">
//             <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
//             <div className="flex gap-1 justify-end">
//                 <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
//                 <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
//             </div>
//             {/* <button type="button" onClick={() => { setSnackbar({ ...snackbar, open: false, severity: 'success', message: 'Udalo sie' }) }} className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button> */}
//             {/* <Snackbar snackbar={snackbar} /> */}
//         </form>
//     </>
// }
