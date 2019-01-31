class Calendar {
    constructor(base){
        this.baseEl = base;
        this.date_obj = new Date();
        this.today_date = this.date_obj.getDate();
        this.today_month = this.date_obj.getMonth();
        this.today_year = this.date_obj.getFullYear();

        //  current values
        this.curr_mon = null;
        this.curr_year = null;
    }

    //  append DOM with new table
    createTable(base, month, year, date){
        console.log(month + ' ' + year + ' ' + date)
        let $new_el = $('<table>\n' +
            '    <tr>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr><td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr><td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '        <td></td>\n' +
            '    </tr>\n' +
            '</table>');
        $("."+base).append($new_el);
        $('td').css({
            'border': '2px solid black',
            'padding': '20px',
            'cursor': 'pointer',
            'transition': '.1s',
            'text-align': 'center'
        });
    }
    //  how many days in the month
    getDaysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
    getFirstDayName(month, year){
        let first_date = Calendar.month_name[month] + " " + 1 + " " + year;
        let tmp = new Date(first_date).toDateString();
        let first_day = tmp.substring(0, 3);
        return first_day;
    }
    setDates(month, year, date){
        $('.'+this.baseEl).prepend('<h1>' + year + '  ' + Calendar.month_name[month] + ', '+ date + '</h1>');

        let number = 1;
        let m = month;
        let y = year;

        let d = this.getFirstDayName(m, y);
        let tmp = this.getDaysInMonth(m, y)
        let today_date_index = 6 + Calendar.day_name.indexOf(d) + date;
        $('td').each(function (index) {
            if(index < 7){
                $(this).text(Calendar.day_name[index]);
            }else if(index >= 7 + Calendar.day_name.indexOf(d) && index < tmp + 7 + Calendar.day_name.indexOf(d)){
                $(this).text(number++);
            }
            if(index == today_date_index){
                $(this).css('background-color', '#232323');
                $(this).css('color', '#fff');
            }
        })
    }
    //  Creating DOM element - table and setting dates
    createCalendar(month = 0, year = 0, date = 0){
        let m = null;
        let y = null;
        let d = null;
        if(month == 0 && year == 0 && date == 0){
            m = this.today_month;
            y = this.today_year;
            d = this.today_date;
        }
        else{
            m = month;
            y = year;
            d = date;
        }

        this.curr_mon = m;
        this.curr_year = y;

        this.createTable(this.baseEl, m, y, d);
        this.createButtons();

        this.setDates(m, y, d);

    }
    //  to do -> add buttons, cards
    createButtons(){
        let $btnNext = $('<button id = \'next\'>Next</button>');
        let $btnPrevious = $('<button id = \'previous\'>Previous</button>');
        $('.'+this.baseEl).after($btnPrevious, $btnNext);

        let curr_month = this.curr_mon;
        let curr_year = this.curr_year;
        let newMonth = this.setNewMonth;
        let baseEl = this.baseEl;
        $('#next').on('click',function (e) {
            curr_month++;
            if(curr_month == 12){
                curr_year++;
                curr_month = 0;
            }
            ///////////
            newMonth(baseEl, curr_month, curr_year);
            ////////////
        })
        $('#previous').on('click',function (e) {
            curr_month--;
            if(curr_month == -1){
                curr_year--;
                curr_month = 11;
            }
            newMonth(baseEl, curr_month, curr_year);
        })
    }
    setNewMonth(base, month, year){
        $('.box h1').remove();
        $('.'+base).prepend('<h1>' + year + '  ' + Calendar.month_name[month] + '</h1>');

        $('td').each(function () {
            $('td').text('');
        })
    }

}
Calendar.day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
Calendar.month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];


let cal = new Calendar('box');
cal.createCalendar();