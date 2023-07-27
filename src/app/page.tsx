import { TodoItem } from '@/components/TodoItem'
import { prisma } from '@/db'
import { revalidateTag } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getTodos() {
  "use server"
  const res = await prisma.todos.findMany()
  // console.log('returned res:', res)
  return res
}
async function toggleTodo(id: string, completed: boolean) {
  "use server"
  // console.log(id, completed)
  await prisma.todos.update({ where: { id }, data: { completed } })
}
async function removeTodo(id: string) {
  "use server"
  console.log('remove', id)
  await prisma.todos.delete({ where: { id } })
  revalidateTag('todos')
  // redirect('/')
}
export default async function Home() {
  const allTodos = await getTodos()

  // await prisma.todos.create({ data: { title: 'Get this to working', completed: false } }) //to add stuff to database
  return (
    <>
      <header className='flex justify-between items-center mb-4 p-8'>
        <h1 className='text-2xl'>ToDo&apos;s</h1>
        <Link href="/addToDo" className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Add ToDo</Link>

      </header>
      <ul className='pl-4'>
        {allTodos ? allTodos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        ))
          : null}
      </ul>
    </>
  )
}
