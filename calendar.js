class Calendar {
    constructor(base){
        this.baseEl = base;
        this.date_obj = new Date();
        this.today_date = this.date_obj.getDate();
        this.today_month = this.date_obj.getMonth();
        this.today_year = this.date_obj.getFullYear();
        this.dataStorage = new Map([
            ['2.1.2019','Rode to Vladimir'],
            ['4.1.2019','Train in jim!']
        ]);
        //  current values
        this.curr_mon = null;
        this.curr_year = null;
    }

    //  append DOM with new table
    createTable(base, month, year, date){
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
            'padding': '20px',
            'transition': '.2s',
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
        $('.'+this.baseEl).prepend('<h1>' + year + '  ' + Calendar.month_name[month] + '</h1>');

        let number = 1;
        let m = month;
        let y = year;

        let d = this.getFirstDayName(m, y);
        let tmp = this.getDaysInMonth(m, y)
        const putLabel_ = this.putLabel.bind(this);

        $('td').each(function (index) {
            if(index < 7){
                $(this).attr('class', 'day_of_the_week');
                $(this).text(Calendar.day_name[index]);
            }else if(index >= 7 + Calendar.day_name.indexOf(d) && index < tmp + 7 + Calendar.day_name.indexOf(d)){
                $(this).attr('class', 'date_in_calendar')
                $(this).text(number);
                let string = number + '.' + month  + '.' + year;    //  string in format dd.mm.yyyy
                putLabel_(string, $(this));
                number+=1;
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
    createButtons(){
        let $btnNext = $('<button id = \'next\' class=\'calendar_btn\'><i class="fas fa-chevron-up"></i></button>');
        let $btnPrevious = $('<button id = \'previous\' class=\'calendar_btn\'><i class="fas fa-chevron-down"></i></button>');
        $('.'+this.baseEl).after($btnPrevious, $btnNext);

        let curr_month = this.curr_mon;
        let curr_year = this.curr_year;
        const newMonth = this.setNewMonth.bind(this);
        let baseEl = this.baseEl;
        $('#next').on('click',function (e) {
            curr_month++;
            if(curr_month == 12){
                curr_year++;
                curr_month = 0;
            }
            newMonth(baseEl, curr_month, curr_year);

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
        $('td').each(function () {
            $(this).text('');
            $(this).removeAttr('class');
            $(this).css('background-color','#1f1f1f1');
        })
        this.setDates(month, year, 1);
        $('.'+base+' h1').remove();
        $('.'+base).prepend('<h1>' + year + '  ' + Calendar.month_name[month] + '</h1>');
    }
    getDateStorage(){
        console.log(this.dataStorage);
    }
    setNoteToDataStorage(date, note){
        this.dataStorage.set(date, note);
    }
    getNoteFromDataStorage(date){
        return this.dataStorage.get(date);
    }
    putLabel(date, $obj){
        if(this.dataStorage.has(date)){
            $obj.css('background-color', '#e03a3a');
            $obj.attr('class', 'noted');
        }else{
            $obj.css('background-color', '#1f1f1f');
        }
    }
}
Calendar.day_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
Calendar.month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];


let cal = new Calendar('box');
cal.createCalendar();

$('td').on('click', function (e) {
    let date_day = e.target.textContent;
    if(date_day > 0 && date_day <= 31){
        let string = $('.'+cal.baseEl+' h1').text();
        let date_arr = string.split(' ');
        let date_year = date_arr[0];
        let date_month = date_arr[2];

         // key of map in format dd.mm.yyyy
        let key = date_day + '.' + Calendar.month_name.indexOf(date_month) + '.' + date_year;
    }
})
