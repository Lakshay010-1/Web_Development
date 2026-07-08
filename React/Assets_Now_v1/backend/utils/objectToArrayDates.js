export function objectToArrayDates(key, dateField, arr) {
    const datesObject = arr[key];
    const datesArray = Object.keys(datesObject).map(field => {
        return { date: field, price: datesObject[field][dateField] }
    });
    datesArray.sort((a, b) => b - a);
    return datesArray;
}
