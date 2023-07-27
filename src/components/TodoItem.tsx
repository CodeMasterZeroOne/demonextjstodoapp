"use client"

type TodoItemProps = {
    id: string
    title: string
    completed: boolean
    toggleTodo: (id: string, completed: boolean) => void
    removeTodo: (id: string) => void
}
export function TodoItem({ id, title, completed, toggleTodo, removeTodo }: TodoItemProps) {
    return (
        <li className="flex gap-1 items-center">
            <input id={id} type="checkbox" defaultChecked={completed} onChange={e => toggleTodo(id, e.target.checked)} className="cursor-pointer peer" />
            <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">{title}</label>
            {/* <input type="button" value="remove" onClick={e => removeTodo(id)} /> */}
            <div className="tooltip tooltip-right tooltip-error" data-tip="Remove Todo">
                <button type="button" className="m-1 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Delete" onClick={e => removeTodo(id)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>

        </li>
    )
}
