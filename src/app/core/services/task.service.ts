import { BehaviorSubject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITask } from '../../domain/tasks/interfaces/task.interface';
import { TaskStatusEnum } from '../../domain/tasks/enums/task-status.enum';
import { IComment } from '../../domain/tasks/interfaces/comment.interface';
import { TaskStatus } from '../../domain/tasks/types/task-status';
import { generateUniqueIdWithTimestamp } from '../../shared/utils/generate-unique-id-with-timestamp';
import { ITaskFormControls } from '../interfaces/task-form-controls.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Tarefas em A fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.TODO),
  );
  readonly todoTasks = this.todoTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.TODO, tasks)),
  );

  // Tarefas em Fazendo
  private doingTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.DOING),
  );
  readonly doingTasks = this.doingTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.DOING, tasks)),
  );

  // Tarefas em Concluído
  private doneTasks$ = new BehaviorSubject<ITask[]>(
    this.loadTasksFromLocalStorage(TaskStatusEnum.DONE),
  );
  readonly doneTasks = this.doneTasks$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.DONE, tasks)),
  );

  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    const currentList = this.todoTasks$.value;
    this.todoTasks$.next([...currentList, newTask]);
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      // Atualiza o status da tarefa
      currentTask.status = taskNextStatus;

      // Remove a tarefa da lista atual
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      // Adiciona a tarefa na nova lista
      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  updateTaskNameAndDescription(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskName: string,
    newTaskDescription: string,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };

      currentTaskList.next(updatedTaskList);
    }
  }

  updateTaskComments(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskComments: IComment[],
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        comments: newTaskComments,
      };

      currentTaskList.next(updatedTaskList);
    }
  }

  deleteTask(taskId: string, taskCurrentStatus: TaskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);

    const newTaskList = currentTaskList.value.filter(
      (task) => task.id !== taskId,
    );
    currentTaskList.next(newTaskList);
  }

  private loadTasksFromLocalStorage(key: string) {
    try {
      const storedTasks = localStorage.getItem(key);
      return storedTasks ? (JSON.parse(storedTasks) as ITask[]) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  }

  private saveTasksOnLocalStorage(key: string, tasks: ITask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  private getTaskListByStatus(taskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };

    return taskListObj[taskStatus];
  }
}
