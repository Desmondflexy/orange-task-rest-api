import { Request, Response } from "express";
import * as validators from '../validators'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTask(req: Request, res: Response) {
  try {
    const { error } = validators.createTask.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Bad request',
        message: error.message
      });
    }
    const { title, description } = req.body;
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        status: 'pending',
        createdAt: new Date(),
      }
    });
    return res.status(201).json({
      message: 'task created successfully',
      task
    });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await prisma.tasks.findMany();
    return res.json(tasks);

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export async function getTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { error } = validators.updateTask.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Bad request',
        message: error.message
      });
    }

    const { title, description, status } = req.body;

    const task = await prisma.tasks.update({
      where: { id },
      data: {
        title,
        description,
        status,
      }
    });

    return res.json({
      message: 'task updated successfully',
      task
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const task = await prisma.tasks.delete({
      where: { id }
    });

    return res.json({
      message: 'task deleted successfully',
      task
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}