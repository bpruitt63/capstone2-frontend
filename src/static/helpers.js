
/** Changes date from yyyy-mm-dd to Month/dd/yyyy */
export function makeReadableDate(date) {
    const months = {'01': 'January', '02': 'February', '03': 'March', '04': 'April',
                    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
                    '09': 'September', '10': 'October', '11': 'November', '12': 'December'};
    const month = months[date.slice(5, 7)];
    const day = date.slice(-2);
    const year = date.slice(0, 4);
    return `${month} ${day}, ${year}`;
};
