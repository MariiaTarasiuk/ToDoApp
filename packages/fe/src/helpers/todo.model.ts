export interface TODO {
  id: string;
  text: string;
  completed: boolean;
}

export enum TodoStatus {
  open,
  done,
  all,
}
