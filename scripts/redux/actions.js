import { ADD, REMOVE } from "./Types"

export function addToData(value) {
    return {type:ADD, content: value}
}
export function removeData(value) {
    return {type:REMOVE, content: value}
}