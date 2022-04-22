import moment from "moment";

export var convertDateTimeToString = (dateTime) => {
    return moment(dateTime).format('YYYYMMDD')
}