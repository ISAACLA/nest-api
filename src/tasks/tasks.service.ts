import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { tasksMock } from "./task.mock";
import { Task, TaskStatus } from "./task.model";
import { TaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {

    tasks:Task[] = tasksMock;

    getTasks(): Task[]{
        return this.tasks;
    }

    getTask(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    /*
    * Service create function without using DTO
    * */
    // createTask(title: string, content: string): Task {
    //     const task:Task = {
    //         id: uuidv4(),
    //         title,
    //         content,
    //         status: TaskStatus.OPEN
    //     };
    //
    //     this.tasks.push(task);
    //
    //     return task;
    // }

    /*
    * Service createTask use DTO
    * */

    createTask(taskDto: TaskDto): Task {
        const { title, content } = taskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            content,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): number {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index, 1);
        return this.tasks.length;
    }
}
