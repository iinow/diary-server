const moment = require('moment')

console.log(moment('20200320000000', 'YYYYMMDDhmmss').year())
console.log(moment('20200320000000', 'YYYYMMDDhmmss').month())

console.log(moment('2020 03 10 00 00 00', 'YYYY MM DD h mm ss').format('DD'))
