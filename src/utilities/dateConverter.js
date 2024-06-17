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
    const convertedDate = date.toDateString();
    const dateArray = convertedDate.split(" ");
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



export const wholeDateObjectConverter = (date) => {
    const convertedDate = date.toDateString();
    const dateArray = convertedDate.split(" ");
    const monthsBg = {
        Jan: "Януари",
        Feb: "Февруари",
        Mar: "Март",
        Apr: "Април",
        May: "Май",
        Jun: "Юни",
        Jul: "Юли",
        Aug: "Август",
        Sep: "Септември",
        Oct: "Октомври",
        Nov: "Ноември",
        Dec: "Декември",
    };

    const daysBg = {
        Sun: "Неделя",
        Mon: "Понеделник",
        Tue: "Вторник",
        Wed: "Сряда",
        Thu: "Четвъртък",
        Fri: "Петък",
        Sat: "Събота",
    };

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    return {
        year: dateArray[3],
        month: dateArray[1],
        date: dateArray[2],
        day: dateArray[0],
        monthBg: monthsBg[dateArray[1]],
        dayBg: daysBg[dateArray[0]],
        time: time,
    };
}

export const getDefaultDateTime = (hours, mins) => {
    const now = new Date();
    now.setHours(hours, mins, 0); // Set time to 10:15 AM
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, add 1 to get 1-12
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const toDatetimeLocalString = (date) => {
    const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const localISOTime = (new Date(date - offset)).toISOString().slice(0, 16);
    return localISOTime;
};