import { expect, APIRequestContext } from "@playwright/test"
import { taskModel } from "../task.model"

export async function deleteByTaskHelper(request: APIRequestContext, taskName: string) {
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
}

export async function postTask(request: APIRequestContext, taskJson: taskModel) {
    const newTask = await request.post('http://localhost:3333/tasks/', { data: taskJson })
    expect(newTask.ok).toBeTruthy()
}