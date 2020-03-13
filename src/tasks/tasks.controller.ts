import {Body, Controller, Get, Post} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { TaskDto } from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService ) {
    }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    /*
    * Post without using DTO
    * */
    // @Post()
    //     // createTask(
    //     //     @Body('title') title: string,
    //     //     @Body('content') content: string
    //     // ): Task {
    //     //     return this.tasksService.createTask(title, content);
    //     // }

    /*
    * Post using DTO
    * */
    @Post()
    createTask(@Body() taskDto: TaskDto) {
        return this.tasksService.createTask(taskDto)
    }
}
