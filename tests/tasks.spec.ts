import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {
    const taskName = ('Teste validado: cadastro de tarefa via tecla Enter')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)
    await inputTaskName.press('Enter')
});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
    const taskName = ('Teste validado: cadastro de uma tarefa via botão')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')
});

test('deve poder riscar uma tarefa', async ({ page, request }) => {
    const taskName = ('Teste validado: checkBox funcionando')
    await request.delete('http://localhost:3333/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)
    await page.click('css=button >> text=Create')

    const checkBoxTask = page.locator('button[class*="_listItemToggle"]')
    await checkBoxTask.last().click()
});

test('deve poder deletar uma tarefa', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill('Teste Validado de Exclusão de Tafera via Botão')
    await page.click('css=button >> text=Create')

    const deleteButtonsTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonsTask.last().click()

});