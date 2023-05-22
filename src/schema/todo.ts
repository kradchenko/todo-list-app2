export interface ToDo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    createdAt: string;
    deadline: string | null;
}
