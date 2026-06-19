import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page, request }) => {
    const taskName = ('Ler um livro de TypeScript')
    await request.delete('http://localhost:8080/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)
    await inputTaskName.press('Enter')
});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page, request }) => {
    const taskName = ('Ler um livro de JavaScript')
    await request.delete('http://localhost:8080/helper/tasks/' + taskName)
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill(taskName)

    await page.click('css=button >> text=Create')
});

test('deve poder deletar uma tarefa', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill('Teste de Exclusão de Tafera via Botão')

    const deleteButtonsTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonsTask.last().click()

});