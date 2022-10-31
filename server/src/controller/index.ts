import { todoType } from './../type/todo';
import { Request, Response, NextFunction } from 'express'

import Todo1 from "../db/models/todo1";
// import Todo2 from "../db/models/todo2";

export const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const todos: todoType[] = await Todo1.find();
        res.status(200).json({ todos })
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const addTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, description, isCompleted } = req.body as Pick<todoType, 'name' | 'description' | 'isCompleted'>
        const checkData: todoType | null = await Todo1.findOne({ name });
        if (checkData) throw new Error('Task already exists');

        const createData = await Todo1.create({ name, description, isCompleted });
        if (!createData) throw new Error('Error creating task');

        const todos: todoType[] = await Todo1.find();
        if (!todos?.length) throw new Error('No Data found');

        res.status(201).json({ todos });
    } catch (error) {
        res.status(401).json({ message: (error as Error)?.message });
    }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id }, body } = req;
        const updateTodo: todoType | null = await Todo1.findByIdAndUpdate({ _id: id }, body, { new: true });
        if (!updateTodo) throw new Error('Error updating task');

        const todos: todoType[] = await Todo1.find();
        if (!todos?.length) throw new Error('No Data found');

        res.status(200).json({ todos });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedTodo: todoType | null = await Todo1.findByIdAndRemove(req.params.id);
        if (!deletedTodo) throw new Error('Error deleting task');

        const todos: todoType[] = await Todo1.find();
        if (!todos?.length) throw new Error('No Data found');

        res.status(200).json({ todos });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}