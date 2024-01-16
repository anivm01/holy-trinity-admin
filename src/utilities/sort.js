
export const sortNewestToOldest = (data) => {
    const sortedArray = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })
    return sortedArray
}

export const sortOldestToNewest = (data) => {
    const sortedArray = data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    })
    return sortedArray
}