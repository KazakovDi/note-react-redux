
const now = new Date()
const content = "Lorem ipsum12/06/1982 dolor sit 01/02/2022 amet, consectetur adipiscing elit 11/12/1956"
const altContent = "15/10/2001Lorem ipsum dolor sit amet"
export function Dates(content) {
    let dates = content.match(/\d{2}[/]\d{2}[/]\d{4}/g)
    if(!dates) return []
    dates = dates.map(date => {
        const dateParts = date.split("/");
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    })
    return Array.from(dates)
}
export let dataArray = [
                        ["Idea", now, "Idea", content, Dates(content)],
                        ["Another idea", now, "Idea", content, Dates("Текст без дат")],
                        ["Task1", now, "Task", altContent, Dates(altContent)],
                        ["Thought", now, "Random Thought", altContent, Dates(altContent)],
                        ["quote", now, "Quote", content, Dates(content)],
                        ["Task2", now, "Task", altContent, Dates(altContent)],
                        ["Another quote", now, "Quote", content, Dates(content)]
                       ]
export let archiveArray = [
                           ["Archive Idead", now, "Idea", content, Dates(content)],
                           ["Archive Task", now, "Task", content, Dates("Текст без дат")]
                        ]
export let counterArray = []