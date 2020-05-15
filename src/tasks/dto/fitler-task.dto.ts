import { TaskStatus } from "../task.interface";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class FilterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
