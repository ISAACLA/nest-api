import { IsNotEmpty } from "class-validator";

import { TaskStatus } from "../task.model";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}


