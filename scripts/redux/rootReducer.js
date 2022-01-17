import { ADD, REMOVE } from "./Types"
export function rootReducer(state, action) {
    if(action.type === ADD ) {
        state.push(action.content)
    }
    else if(action.type === REMOVE) {
        state.splice(action.content, 1)
    }
    return state
}