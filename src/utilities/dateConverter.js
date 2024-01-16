export const dateInputConverter = (date) => {
    const splitDate = date.split("-")
    const newDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    const timestamp = newDate.getTime()
    const convertedDate = timestamp / 1000
    return convertedDate
}

export const dateOutputConverter = (date) => {
    const newDate = new Date(date * 1000)
    const dateString = newDate.toLocaleString()
    const finalDate = dateString.split(",")
    const deconstructed = finalDate[0].split("/")
    let month = deconstructed[0]
    let day = deconstructed[1]
    if (month.length < 2) {
        month = `0${month}`
    }
    if (day.length < 2) {
        day = `0${day}`
    }
    return `${deconstructed[2]}-${month}-${day}`
}

export const dateShorthandConverter = (date) => {
    const timestamp = new Date(date * 1000)
    const convertedDate = timestamp.toDateString()
    const dateArray = convertedDate.split(" ")
    return dateArray[1] + " " + dateArray[2]
}

export const dateObjectConverter = (date) => {
    const timestamp = new Date(date * 1000)
    const convertedDate = timestamp.toDateString()
    const dateArray = convertedDate.split(" ")
    return { date: dateArray[2], day: dateArray[0].charAt(0) }
}

export const calendarDateConverter = (date) => {
    const timestamp = new Date(date * 1000)
    const convertedDate = timestamp.toDateString()
    const dateArray = convertedDate.split(" ")
    const dayEn = dateArray[0].charAt(0).toLowerCase()
    let dayBg
    if (dateArray[0] === "Mon") {
        dayBg = "п"
    }
    if (dateArray[0] === "Tue") {
        dayBg = "в"
    }
    if (dateArray[0] === "Wed") {
        dayBg = "с"
    }
    if (dateArray[0] === "Thu") {
        dayBg = "ч"
    }
    if (dateArray[0] === "Fri") {
        dayBg = "п"
    }
    if (dateArray[0] === "Sat") {
        dayBg = "с"
    }
    if (dateArray[0] === "Sun") {
        dayBg = "н"
    }
    return {
        date: dateArray[2],
        dayEn: dayEn,
        dayBg: dayBg
    }
}

