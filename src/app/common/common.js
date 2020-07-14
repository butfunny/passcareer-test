export const upperCaseFirstLetter = (str) => {
    if (!str || str.length == 0) return false;
    return `${str[0].toUpperCase()}${str.substring(1)}`
};

export const getDates = function(startDate, endDate) {
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};
