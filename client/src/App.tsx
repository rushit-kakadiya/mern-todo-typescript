import React, { FC, useEffect, useRef, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTask'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

const App: FC = () => {
    const ref = useRef<boolean>(false)
    const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        fetchTodos();
    }, [])

    const fetchTodos = (): void => {
        getTodos()
            .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
            .catch(err => console.log(err))
    }

    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault()
        addTodo(formData)
            .then(({ data: { todos } }) => setTodos(todos))
            .catch(err => console.log(err))
    }

    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then(({ data: { todos } }) => setTodos(todos))
            .catch((err) => console.log(err))
    }

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then(({ data: { todos } }) => setTodos(todos))
            .catch((err) => console.log(err))
    }

    return (
        <main className='App'>
            <h1>My Todos</h1>
            <AddTodo saveTodo={handleSaveTodo} />
            {todos.map((todo: ITodo) => (
                <TodoItem
                    key={todo._id}
                    updateTodo={handleUpdateTodo}
                    deleteTodo={handleDeleteTodo}
                    todo={todo}
                />
            ))}
        </main>
    )
}

export default App