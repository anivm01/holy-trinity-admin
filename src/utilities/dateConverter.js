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
    // dateString is like "2025-01-31T00:00" (no time zone info)

    // 1. Split into date and time parts
    const [datePart, timePart] = date.split("T"); // e.g. ["2025-01-31", "00:00"]
    const [year, month, day] = datePart.split("-").map(Number); // [2025, 1, 31]
    const [hour, minute] = timePart.split(":").map(Number);     // [0, 0]

    // 2. Construct a Date in UTC. This stops JS from shifting based on the user's local offset.
    //    E.g. if it's "2025-01-31T00:00", that is *exactly* midnight on the 31st, ignoring user offset.
    const dateObj = new Date(Date.UTC(year, month - 1, day, hour, minute));

    // 3. Get the day of the week in UTC (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeekNum = dateObj.getUTCDay();

    // 4. Convert that numeric day to an English short name ("Sun", "Mon", ...)
    const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayEnFull = dayNamesEn[dayOfWeekNum]; // e.g. "Fri"
    // If you only need the first letter in lowercase:
    const dayEn = dayEnFull.charAt(0).toLowerCase(); // "f" if it's "Fri"

    // 5. Convert English day name to Bulgarian letter
    let dayBg;
    switch (dayEnFull) {
        case "Mon":
            dayBg = "п"; // понеделник
            break;
        case "Tue":
            dayBg = "в"; // вторник
            break;
        case "Wed":
            dayBg = "с"; // сряда
            break;
        case "Thu":
            dayBg = "ч"; // четвъртък
            break;
        case "Fri":
            dayBg = "п"; // петък
            break;
        case "Sat":
            dayBg = "с"; // събота
            break;
        case "Sun":
            dayBg = "н"; // неделя
            break;
        default:
            dayBg = "";
    }

    // 6. The date (day of month) is simply your `day` variable (31, 1, etc.)
    //    Convert to string if you like
    return {
        date: String(day), // e.g. "31"
        dayEn,             // "f"
        dayBg,             // "п" (if it's Friday)
    };
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
    //const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const localISOTime = (new Date(date)).toISOString().slice(0, 16);
    return localISOTime;
};