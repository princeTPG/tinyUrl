// generate unique-id from current-timeStamp
// and convert it to a number-str using toString fucntion and provide a base of 20
export const getShortUniqueId = () => {
    const currentDate = new Date().getTime();
    return currentDate.toString(20);
}