import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
// import { tasksMock } from "./task.mock";
import { TaskStatus } from "./task.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilterTaskDto } from "./dto/fitler-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(filterDto: FilterTaskDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Can not find task with ID: ${id}`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

   async deleteTask(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Can not found the task with Id ${id}`);
        }

        await this.taskRepository.remove(task);

        return task;
    }

    async updateTask(id: string, status: TaskStatus) {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Can not found the task with Id ${id}`);
        }

        task.status = status;
        await task.save();

        return task;
    }

}



/*
* Sample Service without TypeOrm
* */

//     tasks:Task[] = tasksMock;
//
//     getTasks(): Task[]{
//         return this.tasks;
//     }
//
//     searchTask(searchTaskDto: SearchTaskDto): Task[] {
//         const {status, search } = searchTaskDto;
//         let result: Task[];
//
//         if (status) {
//             result =  this.tasks.filter(task => task.status === status);
//         }
//
//         if (search) {
//             result = this.tasks.filter (task =>
//                 task.title.includes(search) || task.content.includes(search)
//             )
//         }
//
//         return result;
//     }
//
//     getTask(id: string): Task {
//         const task = this.tasks.find(task => task.id === id);
//
//         if(!task) {
//             throw new NotFoundException(`Task with ${id} not found`);
//         }
//
//         return task;
//     }
//
//     updateTask(id: string, status: TaskStatus): Task {
//         // const task = this.tasks.find(task => task.id === id);
//
//         const task = this.getTask(id);
//         task.status = status;
//         return task;
//     }
//
//     /*
//     * Service createTask use DTO
//     * */
//     createTask(taskDto: CreateTaskDto): Task {
//         const { title, content } = taskDto;
//
//         const task: Task = {
//             id: uuidv4(),
//             title,
//             content,
//             status: TaskStatus.OPEN
//         };
//
//         this.tasks.push(task);
//
//         return task;
//     }
//
//     deleteTask(id: string): number {
//         const index = this.tasks.findIndex(task => task.id === id);
//
//         if(!index) {
//             throw new NotFoundException(`Can not found the task with Id ${id}`);
//         }
//
//         this.tasks.splice(index, 1);
//         return this.tasks.length;
//     }
//
//     /*
// * Service create function without using DTO
// * */
//     // createTask(title: string, content: string): Task {
//     //     const task:Task = {
//     //         id: uuidv4(),
//     //         title,
//     //         content,
//     //         status: TaskStatus.OPEN
//     //     };
//     //
//     //     this.tasks.push(task);
//     //
//     //     return task;
//     // }
