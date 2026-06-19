import { test, expect } from '@playwright/test';

test('deve poder cadastrar uma nova tarefa utilizando Enter', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill('ler Um livro de TypeScript')
    await inputTaskName.press('Enter')
});

test('deve poder cadastrar uma nova tarefa utilizando o botão', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill('Ler Um livro de Java')

    await page.click('css=button >> text=Create')

    const deleteButtonTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonTask.last().click()
});

test('deve poder deletar uma tarefa', async ({ page }) => {
    await page.goto('http://localhost:8080')
    const deleteButtonsTask = page.locator('button[class*="_listItemDeleteButton"]')
    await deleteButtonsTask.last().click()

});