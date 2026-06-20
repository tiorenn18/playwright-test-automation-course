import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {

    // GArking ilustrativo

    // Dado que eu tenha uma nova tarefa
    const taskName = ('Teste validado: cadastro de tarefa via tecla Enter')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)

    // E que estou na pagina de cadastro                
    await page.goto('http://localhost:8080')

    // Quando faco o cadastro desta tarefa
    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)
    await inputTaskName.press('Enter')

    // Então esta tarefa deve ser exibida  na lista
    const target = page.getByTestId('task-item').getByText(taskName) // Utilizando TestId
    await expect(target).toHaveText(taskName)

});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
    const taskName = ('Teste validado: cadastro de uma tarefa via botão')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')

    const target = page.locator('.task-item').getByText(taskName) // Utilizando class com nome
    await expect(target).toHaveText(taskName)
});

test('deve poder riscar uma tarefa', async ({ page, request }) => {
    const taskName = ('Teste validado: checkBox funcionando')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)
    await page.click('css=button >> text=Create')

    const target = page.locator('div[class*=listItem]').getByText(taskName) // Utilizando class
    await expect(target).toHaveText(taskName)

    const checkBoxTask = page.locator('button[class*="_listItemToggle"]')
    await checkBoxTask.last().click()
});

test('deve poder deletar uma tarefa', async ({ page, request }) => {
    const taskName = ('Teste validado: botão de deletar uma tarefa funcionando')

    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')

    const target = page.locator('div[class*=listItem]').getByText(taskName) // Utilizando class
    await expect(target).toHaveText(taskName)

    const deleteButtonsTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonsTask.last().click()

});