import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./../controller/index";

const router: Router = Router();

router.get("/todos", getTodos);

router.post("/add-task", addTodo);

router.put("/update-task/:id", updateTodo);

router.delete("/delete-task/:id", deleteTodo);

export default router;
