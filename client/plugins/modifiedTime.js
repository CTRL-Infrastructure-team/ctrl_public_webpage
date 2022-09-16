import moment from 'moment'

export default (time) => {
    // return moment(time).add(9, 'h').format('YYYY年MM月DD日')
    return moment(time).local().format('YYYY年MM月DD日')
}