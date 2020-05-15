import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/fitler-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from "./task.entity";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }

  @Put('/:id')
  updateTask(
      @Param('id') id,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }
}


/*
* Sample controller without using TypeOrm
* */

// @Get()
// getTasks(@Query(ValidationPipe) searchTaskDto: SearchTaskDto): Task[] {
//   if (Object.keys(searchTaskDto).length) {
//     return this.tasksService.searchTask(searchTaskDto);
//   } else {
//     return this.tasksService.getTasks();
//   }
// }
//
// @Get('/:id')
// getTask(@Param('id') id): Task {
//   return this.tasksService.getTask(id);
// }
//
// // @Patch()
// // patchTask(){}
//
// @Put('/:id')
// updateTask(
//   @Param('id') id,
//   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
// ): Task {
//   return this.tasksService.updateTask(id, status);
// }
//
// /*
//  * Post using DTO
//  * */
// @Post()
// @UsePipes(ValidationPipe)
// createTask(@Body() taskDto: CreateTaskDto) {
//   return this.tasksService.createTask(taskDto);
// }
//
// @Delete('/:id')
// deleteTask(@Param('id') id): number {
//   return this.tasksService.deleteTask(id);
// }
//
// /*
//  * Post without using DTO
//  * */
// // @Post()
// //     // createTask(
// //     //     @Body('title') title: string,
// //     //     @Body('content') content: string
// //     // ): Task {
// //     //     return this.tasksService.createTask(title, content);
// //     // }
