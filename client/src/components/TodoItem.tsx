import React from 'react'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
    const checkTodo: string = todo.isCompleted ? `line-through` : ''
    return (
        <div className='Card'>
            <div className='Card--text'>
                <h1 className={checkTodo}>{todo.name}</h1>
                <span className={checkTodo}>{todo.description}</span>
            </div>
            <div className='Card--button'>
                <button
                    onClick={() => updateTodo(todo)}
                    className={todo.isCompleted ? `hide-button` : 'Card--button__done'}
                >
                    Complete
                </button>
                <button
                    onClick={() => deleteTodo(todo._id)}
                    className='Card--button__delete'
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Todo