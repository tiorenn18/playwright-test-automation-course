import { Locator, Page, expect } from "@playwright/test"
import { TaskModel } from "../../../task.model"

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[class*="InputNewTask"]')
    }

    async goTo() {
        await this.page.goto('http://localhost:8080')
    }

    async createTaskUsingButton(task: TaskModel) {
        await this.inputTaskName.fill(task.name)

        await this.page.click('css=button >> text=Create')
    }

    async createTaskUsingEnter(task: TaskModel) {
        await this.inputTaskName.fill(task.name)
        await this.inputTaskName.press('Enter')
    }

    async shouldHaveText(taskName: string) {
        const taskTarget = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(taskTarget).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async validateTaskCheckbox() {
        const checkBoxTask = this.page.locator('button[class*="_listItemToggle"]')
        await checkBoxTask.last().click()
    }

    async validateDeleteTaskByButton() {
        const deleteButtonsTask = this.page.locator('button[class*="_listItemDeleteButton"]')
        await deleteButtonsTask.last().click()
    }
}