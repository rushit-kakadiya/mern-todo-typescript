import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api/v1'

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get('/todos')
        return todos;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const addTodo = async (
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, '_id'> = {
            name: formData.name,
            description: formData.description,
            isCompleted: false,
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post('/add-task', todo)
        return saveTodo
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const updateTodo = async (
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, 'isCompleted'> = {
            isCompleted: true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(`/update-task/${todo._id}`, todoUpdate)
        return updatedTodo
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(`/delete-task/${_id}`)
        return deletedTodo
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}