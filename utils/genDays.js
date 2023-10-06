const genDays = (startDate) => {
    var date = new Date(startDate);
    var dates = [];

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var startDay = weekdays[date.getDay()];
    console.log("Start date is on a " + startDay);

    for (var i = 0; i < 16; i++) {
        date.setDate(date.getDate() + 7);
        dates.push(new Date(date));
    }

    dates.forEach(function (date) {
        console.log(date.toDateString());
    });
}

export default genDays