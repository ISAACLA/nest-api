import {Body, Controller, Get, Post} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService ) {
    }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('content') content: string
    ): Task {
        return this.tasksService.createTask(title, content);
    }
}
