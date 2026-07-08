export function findDateIdx(fullDate, arr) {
    const date = new Date(fullDate);
    const n = arr.length;
    let left = 0, right = n - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        let midDateItem = arr[mid].date;
        let midDate = new Date(midDateItem);
        if (date.getTime() === midDate.getTime()) {
            return mid;
        } else if (date > midDate) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left == n ? left - 1 : left;
}
