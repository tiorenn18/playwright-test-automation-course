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
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async validateTaskCheckbox(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class,"Toggle")]`)
        await target.click()
        await this.shouldBeDone(taskName)
    }
    
    async shouldBeDone(taskName: string){
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async validateDeleteTaskByButton(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class,"Delete")]`)
        await target.click()

        await this.shouldNotExist(taskName)
    }
    
    async shouldNotExist(taskName: string){
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible()
    }
}