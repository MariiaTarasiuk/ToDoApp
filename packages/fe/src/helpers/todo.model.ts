export interface TODO {
  id: string;
  text: string;
  completed: boolean;
}

export enum TodoStatus {
  open = 0,
  done = 1,
  all = "",
}
