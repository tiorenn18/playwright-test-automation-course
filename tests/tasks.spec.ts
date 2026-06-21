import { test, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { taskModel } from './fixtures/Task.model';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {
    const taskJson: taskModel = {
        name: 'Teste validado: cadastro de tarefa via tecla Enter',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + taskJson.name)

    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskJson.name)
    await inputTaskName.press('Enter')

    const taskTarget = page.locator(`css=.task-item p >> text=${taskJson.name}`)
    await expect(taskTarget).toBeVisible()
});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
    const taskJson: taskModel = {
        name: 'Teste validado: cadastro de uma tarefa via botão',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + taskJson.name)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskJson.name)

    await page.click('css=button >> text=Create')

    const taskTarget = page.locator(`css=.task-item p >> text=${taskJson.name}`)
    await expect(taskTarget).toBeVisible()
});

test('deve poder riscar uma tarefa', async ({ page, request }) => {
    const taskJson: taskModel = {
        name: 'Teste validado: checkBox funcionando',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + taskJson.name)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskJson.name)
    await page.click('css=button >> text=Create')

    const taskTarget = page.locator(`css=.task-item p >> text=${taskJson.name}`)
    await expect(taskTarget).toBeVisible()

    const checkBoxTask = page.locator('button[class*="_listItemToggle"]')
    await checkBoxTask.last().click()
});

test('deve poder deletar uma tarefa', async ({ page, request }) => {
    const taskJson: taskModel = {
        name: 'Teste validado: botão de deletar uma tarefa funcionando',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + taskJson.name)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskJson.name)

    await page.click('css=button >> text=Create')

    const taskTarget = page.locator(`css=.task-item p >> text=${taskJson.name}`)
    await expect(taskTarget).toBeVisible()

    const deleteButtonsTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonsTask.last().click()
});

test.only('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const taskJson: taskModel = {
        name: 'Teste Validado: não permite tarefa duplicada',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + taskJson.name)

    const newTask = await request.post('http://localhost:3333/tasks/', { data: taskJson })
    expect(newTask.ok).toBeTruthy()

    await page.goto('http://localhost:8080')

    const taskTarget = page.locator(`css=.task-item p >> text=${taskJson.name}`)
    await expect(taskTarget).toBeVisible()

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskJson.name)

    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
});