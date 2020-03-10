export interface Task {
    id: string;
    title: string,
    content: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROCESS = "IN_PROCESS",
    DONE = "DONE"
}
