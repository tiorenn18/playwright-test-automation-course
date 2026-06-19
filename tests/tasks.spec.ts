import { test, expect } from '@playwright/test';

test('deve poder cadastrar uma nova tarefa', async ({ page }) => {
    await page.goto('http://localhost:8080')

    const inputTaskName = page.locator('input[class*="InputNewTask"]')
    await inputTaskName.fill('ler Um livro de TypeScript')
    await inputTaskName.press('Enter')

});

test('deve poder deletar uma tarefa', async ({ page }) => {
    await page.goto('http://localhost:8080')

    await page.click('button[class*="_listItemDeleteButton"]')
});