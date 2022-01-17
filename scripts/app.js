// import =============== 
import {Dates, dataArray, archiveArray, counterArray} from "./storage.js"
import {showForm,showNote, ArchiveTable, MainTable, countTable} from "./render.js"

import {rootReducer} from "./redux/rootReducer"
import {createStore} from "redux"
// funcs =============== 
function getUniques(data) {
    const arr = []
    data.forEach(item=>arr.push(item[2]))
    return new Set(arr)
}

export function fastCreate(parent, element, content, className) {
    const newElement = document.createElement(element)
    if(Array.isArray(content) && content.length > 0)
        newElement.innerHTML = content.map(item=> item.toLocaleDateString())
    else if(Array.isArray(content) && content.length == 0)
        newElement.innerHTML = "No dates"
    else if(!Array.isArray(content) && typeof(content) ===  "object") 
        newElement.innerHTML = content.toLocaleDateString()  
    else {
        newElement.innerHTML = content
    }
    if(className !== undefined)
        newElement.classList.add(className)
    parent.appendChild(newElement)
} // Быстрое создание нового элемента, с присваиванием ему класса, и добавлением к родителю
function notesCounter() {
    counterArray.splice(0,counterArray.length)
    const items = countTable.querySelectorAll(".table-item")
    items.forEach(item=> item.remove())
    const newSet = getUniques(dataArray)
    const archiveSet = getUniques(archiveArray)
    for(let item of archiveSet)
        newSet.add(item)
    for(let elem of newSet) {
        const auxArray=[
            elem, 
            dataArray.filter(item => item[2] === elem).length,
            archiveArray.filter(item => item[2] === elem).length,
        ]
        counterArray.push(auxArray)
    }
    counterArray.forEach(item=> showNote(item, countTable))
}
function createItem(values) {
    const auxArray = []
    values.forEach(value => auxArray.push(value))
    showNote(values, MainTable)
    dataArray.push(auxArray)
    notesCounter()
} // Создание новых элементов таблицы
function tableControls(e,table, oppositeTable, array, oppositeArray) {
        const target = e.target.classList[0]
        const tableItem = e.target.parentElement.parentElement
        if(target === "delBtn") {
            array.splice(tableItem.dataset.id,1)
            tableItem.remove()
            notesCounter()
        }   
        if(target === "archBtn") {
            oppositeArray.push(dataArray[tableItem.dataset.id])
            array.splice(tableItem.dataset.id,1)
            oppositeTable.appendChild(tableItem)
            notesCounter()
        }
        if(target === "editBtn") {
            showForm(editForm)
            const now = new Date
            const div = tableItem.childNodes
            nameInputEdit.value = div[0].innerHTML
            categoryOptionsEdit.value = div[2].innerHTML
            noteContentEdit.value = div[3].innerHTML
            editNoteBtn.addEventListener("click", e=> {
                e.preventDefault()
                let auxArray = [nameInputEdit.value, now.toLocaleDateString(),
                                 categoryOptionsEdit.value, noteContentEdit.value,
                                 Dates(noteContentEdit.value).map(date=> date.toLocaleDateString())]

                auxArray.forEach((item, index)=>div[index].innerHTML = item)
                auxArray[1] = now
                auxArray[4] = Dates(noteContentEdit.value)
                auxArray.forEach((item, index)=> array[tableItem.dataset.id][index] = item)
                notesCounter()
            })
        }
        if(target === "deleteAll") {
            array.splice(0,array.length)
            table.querySelectorAll(".table-item").forEach(item=> {item.remove()}) 
            notesCounter()
        }
        if(target === "archiveAll") {
            array.forEach(item=> oppositeArray.push(item))
            array.splice(0,dataArray.length)
            table.querySelectorAll(".table-item").forEach(item=> {oppositeTable.appendChild(item)})
            notesCounter()
        }
} // Управление таблицами

// variables ===============

    const store = createStore(rootReducer, dataArray)

    const toggleTable = document.querySelector("#toggleTable")


    const createNoteForm = document.querySelector("#createNoteForm")
    const editForm = document.querySelector("#editForm")
    const showNoteFormBtn = document.querySelector("#showNoteForm")
    const nameInputCreate = createNoteForm.querySelector("input[name=name")
    const noteContentCreate = createNoteForm.querySelector("textarea")
    const categoryOptionsCreate = createNoteForm.querySelector("select")

    const nameInputEdit = editForm.querySelector("input[name=name")
    const noteContentEdit = editForm.querySelector("textarea")
    const categoryOptionsEdit = editForm.querySelector("select")
    const editNoteBtn = editForm.querySelector("#editNote")
    const closeForm = document.querySelectorAll(".closeForm")

// main code =============
store.subscribe(()=> {
    console.log(store.getState()) 
})
store.dispatch({type:"INIT"})
dataArray.forEach(item=> showNote(item, MainTable))
archiveArray.forEach(item=> showNote(item, ArchiveTable))
notesCounter()
closeForm.forEach(btn=> {
    btn.addEventListener("click", e=> {
        e.preventDefault()
        btn.parentElement.classList.remove("active")
    })
})
    // event listeners
toggleTable.addEventListener("click", ()=> {
        if(ArchiveTable.classList.contains("active")) {
            toggleTable.innerHTML = "Show archive"
            ArchiveTable.classList.remove("active")
        } else {
            toggleTable.innerHTML = "Hide archive"
            ArchiveTable.classList.add("active")
        }
})

showNoteFormBtn.addEventListener("click", ()=> showForm(createNoteForm))

createNoteForm.addEventListener("submit", e=> {
    e.preventDefault()
    const auxArray=[
                        nameInputCreate.value, 
                        new Date(),
                        categoryOptionsCreate.value,
                        noteContentCreate.value,
                        Dates(noteContentCreate.value)
                    ]
    createItem(auxArray)
})
MainTable.addEventListener("click", e=> tableControls(e, MainTable, ArchiveTable, dataArray, archiveArray))
ArchiveTable.addEventListener("click", e=> tableControls(e, ArchiveTable, MainTable, archiveArray, dataArray))