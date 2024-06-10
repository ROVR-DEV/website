export function formatDate(isoDate) {
    const [year, month, day] = isoDate.split('T')[0].split('-');
    return `${month}.${day}.${year.slice(-2)}`;
}