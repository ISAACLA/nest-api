import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Get('/:id')
    getTask(@Param('id') id ) : Task {
        return this.tasksService.getTask(id);
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

    @Delete('/:id')
    deleteTask(@Param('id') id) : number {
        return this.tasksService.deleteTask(id);
    }
}
