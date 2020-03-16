import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { tasksMock } from "./task.mock";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { SearchTaskDto } from "./dto/search-task.dto";

@Injectable()
export class TasksService {

    tasks:Task[] = tasksMock;

    getTasks(): Task[]{
        return this.tasks;
    }

    searchTask(searchTaskDto: SearchTaskDto): Task[] {
        const {status, search } = searchTaskDto;
        let result: Task[];

        if (status) {
            result =  this.tasks.filter(task => task.status === status);
        }

        if (search) {
            result = this.tasks.filter (task =>
                task.title.includes(search) || task.content.includes(search)
            )
        }

        return result;
    }

    getTask(id: string): Task {
        const task = this.tasks.find(task => task.id === id);

        if(!task) {
            // throw new NotFoundException();
            throw new NotFoundException(`Task with ${id} not found`);
        }

        return task;
    }

    updateTask(id: string, status: TaskStatus): Task {
        // const task = this.tasks.find(task => task.id === id);

        let task = this.getTask(id);
        task.status = status;
        return task;
    }

    /*
    * Service createTask use DTO
    * */
    createTask(taskDto: CreateTaskDto): Task {
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

        if(!index) {
            throw new NotFoundException(`Can not found the task with Id ${id}`);
        }

        this.tasks.splice(index, 1);
        return this.tasks.length;
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
}
