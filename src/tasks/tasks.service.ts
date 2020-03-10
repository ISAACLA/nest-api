import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from "uuid";
import {tasksMock} from "./task.mock";
import {Task, TaskStatus} from "./task.model";

@Injectable()
export class TasksService {

    getTasks(): Task[]{
        return tasksMock;
    }

    createTask(title: string, content: string): Task {
        // tasksMock.push(task);

        return {
            id: uuidv4(),
            title,
            content,
            status: TaskStatus.OPEN
        };
    }
}
