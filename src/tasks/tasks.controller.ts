import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { SearchTaskDto } from "./dto/search-task.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService ) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) searchTaskDto: SearchTaskDto): Task[] {
        if(Object.keys(searchTaskDto).length) {
            return this.tasksService.searchTask(searchTaskDto);
        } else {
            return this.tasksService.getTasks();
        }
    }

    @Get('/:id')
    getTask(@Param('id') id ) : Task {
        return this.tasksService.getTask(id);
    }

    // @Patch()
    // patchTask(){}

    @Put('/:id')
    updateTask(
        @Param('id') id,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task{
        return this.tasksService.updateTask(id, status)
    }

    /*
    * Post using DTO
    * */
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() taskDto: CreateTaskDto) {
        return this.tasksService.createTask(taskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id) : number {
        return this.tasksService.deleteTask(id);
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
}
