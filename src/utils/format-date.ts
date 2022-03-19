export const FormatDate = (date: number) => {
    const dateLastUpdate = new Date(date)
    return `${dateLastUpdate.getUTCFullYear()}-${dateLastUpdate.getUTCMonth()}-${dateLastUpdate.getUTCDate()}`
}
