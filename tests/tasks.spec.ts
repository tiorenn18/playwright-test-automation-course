import { test } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteByTaskHelper, postTask } from './fixtures/support/helpers';
import { TasksPage } from './fixtures/support/pages/tasks';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    const task: TaskModel = {
        name: 'Teste validado: cadastro de tarefa via tecla Enter',
        is_done: false
    }

    await deleteByTaskHelper(request, task.name)
    await tasksPage.goTo()
    await tasksPage.createTaskUsingEnter(task)
    await tasksPage.shouldHaveText(task.name)
});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    const task: TaskModel = {
        name: 'Teste validado: cadastro de uma tarefa via botão',
        is_done: false
    }

    await deleteByTaskHelper(request, task.name)

    await tasksPage.goTo()
    await tasksPage.createTaskUsingButton(task)
    await tasksPage.shouldHaveText(task.name)
});

test('deve poder riscar uma tarefa', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    const task: TaskModel = {
        name: 'Teste validado: checkBox funcionando',
        is_done: false
    }

    await deleteByTaskHelper(request, task.name)

    await tasksPage.goTo()
    await tasksPage.createTaskUsingButton(task)
    await tasksPage.shouldHaveText(task.name)
    await tasksPage.validateTaskCheckbox()
});

test('deve poder deletar uma tarefa', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    const task: TaskModel = {
        name: 'Teste validado: botão de deletar uma tarefa funcionando',
        is_done: false
    }

    await deleteByTaskHelper(request, task.name)

    await tasksPage.goTo()
    await tasksPage.createTaskUsingButton(task)
    await tasksPage.shouldHaveText(task.name)
    await tasksPage.validateDeleteTaskByButton()
});

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const tasksPage: TasksPage = new TasksPage(page)

    const task: TaskModel = {
        name: 'Teste Validado: não permite tarefa duplicada',
        is_done: false
    }

    await deleteByTaskHelper(request, task.name)
    await postTask(request, task)

    await tasksPage.goTo()
    await tasksPage.shouldHaveText(task.name)
    await tasksPage.createTaskUsingButton(task)
    await tasksPage.alertHaveText('Task already exists!')
});