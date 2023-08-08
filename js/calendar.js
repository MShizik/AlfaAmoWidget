class CustomCalendar{

  constructor(head_element){
    this.calendar = null;
    this.firstInput = null;
    this.secondInput = null;
    this.calHeader = null;
    this.calHeaderTitle = null;
    this.calDays = null;
    this.days = [
      "Вс",
      "Пн",
      "Вт",
      "Ср",
      "Чт",
      "Пт",
      "Сб"
    ];
    this.months = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь"
    ];
    this.todayTimestamp = null;
    this.oneDay = 60 * 60 * 24 * 1000;
    this.selectedDay = null;
    this.init(head_element);
  }
  
  init(head_element){
    this.head_element = head_element;
    this.calendar = head_element.querySelector(".calendar_main");
    this.firstInput = head_element.querySelector(".cal_date_input.first");
    this.secondInput = head_element.querySelector(".cal_date_input.second");
    this.calHeader = head_element.querySelector(".calendar_header");
    this.calHeaderTitle = head_element.querySelector(".calendar_header span");
    this.calDays = head_element.querySelector(".cal_days");
    this.todayTimestamp = Date.now() - (Date.now() % this.oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
    this.firstSelectedDay = this.todayTimestamp;
    this.secondSelectedDay = this.todayTimestamp + this.oneDay * 14;
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.monthDetails = this.getMonthDetails(this.year, this.month);

    this.setDateToInput(this.firstSelectedDay, this.firstInput);
    this.setDateToInput(this.secondSelectedDay, this.secondInput);
    
    this.setHeader(this.year, this.month);
    this.fillCalendarDays();
    this.setCalBody();
    this.head_element.querySelectorAll(".cal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.updateCalendar(btn);
        this.updateInput();
      });
    });
    
    this.firstInput.addEventListener('click', () => {
      if (head_element.querySelector('.date_picker_calendar').classList.contains('hidden')){
        head_element.querySelector('.date_picker_calendar').classList.remove('hidden')
      }
      if (!head_element.querySelector('.date_picker_input').classList.contains('showCal')){
        head_element.querySelector('.date_picker_input').classList.add('showCal')
      }
    });

    this.secondInput.addEventListener('click', () => {
      if (head_element.querySelector('.date_picker_calendar').classList.contains('hidden')){
        head_element.querySelector('.date_picker_calendar').classList.remove('hidden')
      }
      if (!head_element.querySelector('.date_picker_input').classList.contains('showCal')){
        head_element.querySelector('.date_picker_input').classList.add('showCal')
      }
    });

    this.firstInput.addEventListener('focus', () => {
      this.firstInput.classList.add('onFocus');
      this.secondInput.classList.contains('onFocus') && this.secondInput.classList.remove('onFocus');
    });
    
    this.firstInput.addEventListener('blur',() =>{
      setTimeout(() =>  {
        this.firstInput.classList.remove('onFocus');
      }, 300);
    });

    this.secondInput.addEventListener('focus', ()=>{
      this.secondInput.classList.add('onFocus');
      this.firstInput.classList.contains('onFocus') && this.firstInput.classList.remove('onFocus');
    });
    
    this.secondInput.addEventListener('blur', () =>{
      setTimeout(() => {
        this.secondInput.classList.remove('onFocus');
      }, 300);
    });

    this.firstInput.addEventListener('input', () => {
      setTimeout(() => {
      if (this.firstInput.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 8){
        let stringDate = this.firstInput.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(" ", "");
        let splittedDate = stringDate.split(".");
        let date = Date.parse(splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]);
        if (!isNaN(date)){
          console.log(splittedDate[0]);
          this.year = Number(splittedDate[2]);
          this.month = Number(splittedDate[1]) - 1;
          this.setHeader(this.year, this.month);
          console.log(this.monthDetails);
          this.monthDetails = this.getMonthDetails(this.year, this.month);
          console.log(this.monthDetails);
          this.firstSelectedDay = date;
          this.selectOnClick();
          this.calendar.innerHTML = "";
          this.setCalBody();
          console.log();
          this.setSelectedDate(Array.from(this.calendar.querySelectorAll('.cal_date.current')).find(el => el.querySelector("span").textContent === `${splittedDate[0][0] === "0" ? splittedDate[0][1] : splittedDate[0]}`));
        }
      }
      }, 100);
    });

    this.updateInput();
  }
  
  getNumberOfDays(year, month) {
    return 40 - new Date(year, month, 40).getDate();
  }
  
  getDayDetails(args) {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
    }
    let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.days[day]
    };
  }
  
  getMonthDetails(year, month) {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = this.getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 5;
    let currentDay = null;
    let index = 0;
    let cols = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }
  
  isCurrentDay(day, cell, isFirst){
    this.setSelectedDate(cell);
  }

  setMiddleSelected(){
    console.log(this.head_element.querySelectorAll(".cal_date.isSelected"));
    if (this.head_element.querySelectorAll(".cal_date.isSelected").length === 2){
      let days = this.calendar.querySelectorAll(".cal_date");
      let fromChecker = false;
      days.forEach(day => {
        if (day.classList.contains("active") && !fromChecker){
          fromChecker = true;
        }else if (day.classList.contains("active") && fromChecker){
          fromChecker = false;
        }
        else if (fromChecker){
          day.classList.add("additional-active");
        }
        else{
          day.classList.remove("additional-active");
        }
      });
    }
  }

  removeMiddleSelected(){

  }
  
  setSelectedDate(cell){
      cell.classList.add("active");
      cell.classList.add("isSelected");
      cell.classList.remove("additional-active");
      this.setMiddleSelected();
  }
  
  getMonthStr(month){
    return this.months[Math.max(Math.min(11, month), 0)] || "Month";
  }
  
  setHeaderNav(offset){
    this.month = this.month + offset;
    if (this.month === -1) {
      this.month = 11;
      this.year--;
    } else if (this.month === 12) {
      this.month = 0;
      this.year++;
    }
    this.monthDetails = this.getMonthDetails(this.year, this.month);
    return {
      year: this.year,
      month: this.month,
      monthDetails: this.monthDetails
    };
  }
  
  setHeader(year, month){
    this.calHeaderTitle.innerHTML = this.getMonthStr(month) + " " + year;
  }
  
  fillCalendarDays(){
    for (let i = 0; i < this.days.length; i++) {
      let div = document.createElement("div");
      let span = document.createElement("span");
      div.classList.add("cell_wrapper");
      span.classList.add("cell_item");

      span.innerText = this.days[i].slice(0, 2);

      div.appendChild(span);
      this.calDays.appendChild(div);
    }
  }
  
  setCalBody(){
    for (let i = 0; i < this.monthDetails.length; i++) {
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");
        this.monthDetails[i].month === 0 && div.classList.add("current");
        span.classList.add("cell_item");
      
        span.innerText = this.monthDetails[i].date;
      
        div.appendChild(span);
        this.calendar.appendChild(div);
        (this.monthDetails[i].timestamp === this.firstSelectedDay && this.monthDetails[i].month === 0)  && this.isCurrentDay(this.monthDetails[i], div, true);
        (this.monthDetails[i].timestamp === this.secondSelectedDay && this.monthDetails[i].month === 0) && this.isCurrentDay(this.monthDetails[i], div, false);
        
    }
  }
  
  
  
  updateCalendar(btn){
      let newCal, offset;
      if (btn.classList.contains("back")) {
        offset = -1;
      } else if (btn.classList.contains("front")) {
        offset = 1;
      }
      newCal = this.setHeaderNav(offset);
      this.setHeader(newCal.year, newCal.month);
      this.calendar.innerHTML = "";
      this.setCalBody();
    }

  selectOnClick(){
    this.head_element.querySelectorAll(".cell_wrapper.current").forEach((cell) => {
      let cellTimeStamp = this._getCellTimestamp(cell);
      if (cellTimeStamp !== this.firstSelectedDay && cellTimeStamp !== this.secondSelectedDay){
        cell.classList.remove("isSelected");
        cell.classList.remove("active");
      }

      if(cell.classList.contains("isCurrent") && !cell.classList.contains("active")) {
        cell.querySelector("span").classList.add("inactive_indicator");
      }
    });
  }

  setDateToInput(timestamp, input){
    let dateString = this.getDateStringFromTimestamp(timestamp);
    if (input == this.firstInput) dateString = "с " + dateString;
    if (input == this.secondInput) dateString = "с " + dateString;
    input.value = dateString;
  }

  getDateStringFromTimestamp(timestamp){
    let dateObject = new Date(timestamp);
    let month = ("0" + (dateObject.getMonth() + 1));
    let date = ("0" + dateObject.getDate()).slice(-2);
    return `${date}.${month}.${dateObject.getFullYear()}`;
  }

  updateInput(){
    let currentDay = this.head_element.querySelector(".isCurrent");
    this.head_element.querySelectorAll(".cell_wrapper").forEach((cell) => {
      if (cell.classList.contains("current")) {
        cell.addEventListener("click", (e) => {
          let cell_date = e.target.textContent;
  
          currentDay !== null && currentDay.classList.remove("active");
  
          for (let i = 0; i < this.monthDetails.length; i++) {
            if (this.monthDetails[i].month === 0) {
              if (this.monthDetails[i].date.toString() === cell_date) {
                if (this.checkDateSelectionDirection(this._getCellTimestamp(cell))){
                  this.firstSelectedDay = this.monthDetails[i].timestamp;
                  this.setDateToInput(this.firstSelectedDay, this.firstInput);
                }
                else{
                  this.secondSelectedDay = this.monthDetails[i].timestamp;
                  this.setDateToInput(this.secondSelectedDay, this.secondInput);
                }
                this.selectOnClick();
                this.setSelectedDate(cell);
                
                cell.querySelector('span').classList.contains('inactive_indicator') 
                && cell.querySelector('span').classList.remove('inactive_indicator');
              }
            }
          }
        });
      }
    });
  }

  checkDateSelectionDirection(cellTimeStamp){
    return !(cellTimeStamp >= this.secondSelectedDay && this.secondSelectedDay != null) &&
          ((cellTimeStamp <= this.firstSelectedDay && this.firstSelectedDay != null && this.secondSelectedDay != null) ||
          this.firstInput.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0 || 
          this.firstInput.classList.contains('onFocus'));
  }

  _getCellTimestamp(cell){
    let day = cell.querySelector("span").innerHTML;
    return new Date(this.year, this.month, day).getTime();
  }
}
  
  
  