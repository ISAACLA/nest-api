import {Task, TaskStatus} from "./task.model";
import { v4 as uuidv4 } from "uuid";

export const tasksMock: Task[] = [
    {id: uuidv4(), title: "Reading", content: "I should read more books", status: TaskStatus.IN_PROCESS},
    {id: uuidv4(), title: "Work Out", content: "I should work out more", status: TaskStatus.OPEN },
    {id: uuidv4(), title: "Study", content: "Learn More Cool stuff", status: TaskStatus.IN_PROCESS},
    {id: uuidv4(), title: "House", content: "I should buy a house", status: TaskStatus.DONE},
]
