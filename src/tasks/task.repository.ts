import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilterTaskDto } from "./dto/fitler-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, content } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.content = content;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const {status, search} = filterTaskDto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere(`task.status = :status`, {status});
        }

        if (search) {
            query.andWhere(`task.title LIKE :search OR task.content LIKE :search`, {search: `%${search}%`});
        }

        const tasks = await query.getMany();
        return tasks;
    }
}
