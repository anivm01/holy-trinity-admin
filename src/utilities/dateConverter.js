export const dateInputConverter = (date) => {
    const splitDate = date.split("-")
    const newDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2])
    const timestamp = newDate.getTime()
    const convertedDate = timestamp/1000
    return convertedDate
} 

export const dateOutputConverter = (date) => {
    const newDate = new Date(date*1000)
    const dateString = newDate.toLocaleString()
    const finalDate = dateString.split(",")
    const deconstructed = finalDate[0].split("/")
    let month = deconstructed[0]
    let day = deconstructed[1]
    if(month.length<2){
        month = `0${month}`
    }
    if(day.length<2) {
        day = `0${day}`
    }
     return `${deconstructed[2]}-${month}-${day}`
}

