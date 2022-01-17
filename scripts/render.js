
export const countTable = document.querySelector("#count-table")
export const MainTable = document.querySelector("#main-table")
export const ArchiveTable = document.querySelector("#archive-table")

import {fastCreate} from "./app.js"

export function showForm(form) {
    formContainer.classList.add("active")
    form.classList.add("active")
}
export function showNote(values, table) {
    const div = document.createElement("div")
    div.classList.add("table-item")
    div.setAttribute("data-id", table.childNodes.length - 3)
    values.forEach(value=> {
        fastCreate(div, "p", value)
    })
    if(table !== countTable) {
        const controls = document.createElement("div")
        controls.classList.add("controls")
        fastCreate(controls, "button", "✎", "editBtn")
        fastCreate(controls, "button", "🗂", "archBtn")
        fastCreate(controls, "button", "🗑", "delBtn")
        div.appendChild(controls)
    }
    table.appendChild(div)
}

