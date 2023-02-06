export const dateInputConverter = (date) => {
    const splitDate = date.split("-")
    const newDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2])
    const timestamp = newDate.getTime()
    const convertedDate = timestamp/1000
    return convertedDate
} 

export const dateOutputConverter = (date) => {
    const newDate = new Date(date*1000) 
    return newDate.toLocaleString()
}