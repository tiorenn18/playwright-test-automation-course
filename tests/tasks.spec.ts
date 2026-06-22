import { expect, test } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteByTaskHelper, postTask } from './fixtures/support/helpers';
import { TasksPage } from './fixtures/support/pages/tasks';
import data from './fixtures/tasks.json'

test.describe('cadastro', () => {
    test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {
        const task = data.createTaskWithEnterValidation as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)

        await deleteByTaskHelper(request, task.name)
        await tasksPage.goTo()

        await tasksPage.createTaskUsingEnter(task)
        await tasksPage.shouldHaveText(task.name)
    });

    test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
        const task = data.createTaskWithButtonValidation as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)

        await deleteByTaskHelper(request, task.name)

        await tasksPage.goTo()
        await tasksPage.createTaskUsingButton(task)
        await tasksPage.shouldHaveText(task.name)
    });

    test('não deve permitir tarefa duplicada', async ({ page, request }) => {
        const task = data.duplicate as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()
        await tasksPage.shouldHaveText(task.name)
        await tasksPage.createTaskUsingButton(task)
        await tasksPage.alertHaveText('Task already exists!')
    });

    test('campo Obrigatório', async ({ page }) => {
        const task = data.required as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)
        await tasksPage.goTo()
        await tasksPage.createTaskUsingButton(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('atualizacão', () => {
    test('deve concluir uma tarefa', async ({ page, request }) => {
        const task = data.completeTaskCheckboxValidation as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()
        await tasksPage.shouldHaveText(task.name)
        await tasksPage.validateTaskCheckbox(task.name)
    });

    test('deve poder deletar uma tarefa', async ({ page, request }) => {
        const task = data.deleteTaskUsingButtonValidation as TaskModel

        const tasksPage: TasksPage = new TasksPage(page)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()

        await tasksPage.shouldHaveText(task.name)
        await tasksPage.validateDeleteTaskByButton(task.name)
    });
})