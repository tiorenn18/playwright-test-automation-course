import { expect, test, type TestInfo } from '@playwright/test';

import { TaskModel } from './fixtures/task.model';
import { deleteByTaskHelper, postTask } from './fixtures/support/helpers';
import { TasksPage } from './fixtures/support/pages/tasks';

import data from './fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
    tasksPage = new TasksPage(page)
})

function taskForProject(task: TaskModel, testInfo: TestInfo): TaskModel {
    return {
        ...task,
        name: `${task.name} [${testInfo.project.name}]`
    }
}

test.describe('cadastro', () => {
    test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ request }, testInfo) => {
        const task = taskForProject(data.createTaskWithEnterValidation as TaskModel, testInfo)

        await deleteByTaskHelper(request, task.name)
        await tasksPage.goTo()

        await tasksPage.createTaskUsingEnter(task)
        await tasksPage.shouldHaveText(task.name)
    });

    test('deve poder cadastrar uma nova tarefa utilizando o botao', async ({ request }, testInfo) => {
        const task = taskForProject(data.createTaskWithButtonValidation as TaskModel, testInfo)

        await deleteByTaskHelper(request, task.name)

        await tasksPage.goTo()
        await tasksPage.createTaskUsingButton(task)
        await tasksPage.shouldHaveText(task.name)
    });

    test('nao deve permitir tarefa duplicada', async ({ request }, testInfo) => {
        const task = taskForProject(data.duplicate as TaskModel, testInfo)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()
        await tasksPage.shouldHaveText(task.name)
        await tasksPage.createTaskUsingButton(task)
        await tasksPage.alertHaveText('Task already exists!')
    });

    test('campo Obrigatorio', async () => {
        const task = data.required as TaskModel

        await tasksPage.goTo()
        await tasksPage.createTaskUsingButton(task)

        const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('This is a required field')
    })
})

test.describe('atualizacao', () => {
    test('deve concluir uma tarefa', async ({ request }, testInfo) => {
        const task = taskForProject(data.completeTaskCheckboxValidation as TaskModel, testInfo)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()
        await tasksPage.shouldHaveText(task.name)
        await tasksPage.validateTaskCheckbox(task.name)
    });
})

test.describe('exclusao', () => {
    test('deve poder deletar uma tarefa', async ({ request }, testInfo) => {
        const task = taskForProject(data.deleteTaskUsingButtonValidation as TaskModel, testInfo)

        await deleteByTaskHelper(request, task.name)
        await postTask(request, task)

        await tasksPage.goTo()

        await tasksPage.shouldHaveText(task.name)
        await tasksPage.validateDeleteTaskByButton(task.name)
    });
})
