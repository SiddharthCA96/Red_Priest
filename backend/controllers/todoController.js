import zod from "zod";
import { Todo } from "../db/index.js";

//todo body
const todoBody = zod.object({
  title: zod.string().min(1),
  description: zod.string().optional(),
  isCompleted: zod.boolean().optional(),
});
//function to create a todo
export const createTodo = async (req, res) => {
  const { success } = todoBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please give Todo a Title",
    });
  }

  const existingTodo = await Todo.findOne({
    title: req.body.title,
    user: req.userid, // Ensure the todo title is unique for the user
  });

  if (existingTodo) {
    return res.status(411).json({
      message: "Todo already exists",
    });
  }

  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    isCompleted: false,
    user: req.userid, // Add the user ID from the authenticated request
  });

  if (todo) {
    res.json({
      msg: "Todo Created",
      todo,
    });
    return;
  }

  res.status(411).json({
    message: "Error while Creating Todo",
  });
};
//function to fetch all todos
export const getTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({ user: req.userid }); // Filter by user ID
    const todos = allTodos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    }));
    res.json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};
//function to delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await Todo.findOneAndDelete({ title, user: req.userid }); // Ensure the todo belongs to the user
    if (!result) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
