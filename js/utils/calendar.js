class CustomCalendar{

  constructor(head_element, inputChangedCallBack, clearCallBack){
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
    this.inputChangedCallBack = null;
    this.clearCallBack = null;
    this.init(head_element, inputChangedCallBack, clearCallBack);
  }
  
  init(head_element, inputChangedCallBack, clearCallBack){
    this.head_element = head_element;
    this.calendar = this.head_element.querySelector(".calendar_main");
    this.firstInput = this.head_element.querySelector(".cal_date_input.first");
    this.secondInput = this.head_element.querySelector(".cal_date_input.second");
    this.calHeader = this.head_element.querySelector(".calendar_header");
    this.calHeaderTitle = this.head_element.querySelector(".calendar_header span");
    this.calDays = this.head_element.querySelector(".cal_days");
    this.clearSign = this.head_element.querySelector(".cal_input_clear");
    this.calIcon = this.head_element.querySelector(".cal_input_icon");
    this.todayTimestamp = Date.now() - (Date.now() % this.oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
    this.firstSelectedDay = this.todayTimestamp;
    this.secondSelectedDay = this.todayTimestamp + this.oneDay * 14;
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.monthDetails = this.getMonthDetails(this.year, this.month);

    this.inputChangedCallBack = inputChangedCallBack;
    this.clearCallBack = clearCallBack;

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

    this._setInputBehavior();
    this.updateInput();

    this.clearSign.addEventListener('click', () => {
      this._clearInputs();
    });

    this.calIcon.addEventListener('click', () => {

      this.head_element.querySelector('.date_picker_calendar').classList.toggle('hidden');
      
      this.head_element.querySelector('.date_picker_input').classList.toggle('showCal');
    });

    document.addEventListener('click', (event) => {
      if (!head_element.contains(event.target) && head_element.querySelector('.date_picker_input').classList.contains('showCal')) {
        this._closeCalendar(50);
      }
    });
  }

  _setInputBehavior(){
    //first input
    this.firstInput.addEventListener('click', () => {
      if (this.head_element.querySelector('.date_picker_calendar').classList.contains('hidden')){
        this.head_element.querySelector('.date_picker_calendar').classList.remove('hidden');
      }
      if (!this.head_element.querySelector('.date_picker_input').classList.contains('showCal')){
        this.head_element.querySelector('.date_picker_input').classList.add('showCal')
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

    this.firstInput.addEventListener('input', () => {
      setTimeout(() => {
        this._changeDateFromInput(this.firstInput, true);
        if (this.inputChangedCallBack !== null){
          this.inputChangedCallBack(this);
        }
      }, 100);
    });

    //second Input
    this.secondInput.addEventListener('click', () => {
      if (this.head_element.querySelector('.date_picker_calendar').classList.contains('hidden')){
        this.head_element.querySelector('.date_picker_calendar').classList.remove('hidden')
      }
      if (!this.head_element.querySelector('.date_picker_input').classList.contains('showCal')){
        this.head_element.querySelector('.date_picker_input').classList.add('showCal')
      }
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

    this.secondInput.addEventListener('input', () => {
      setTimeout(() => {
        this._changeDateFromInput(this.secondInput, false);
        if (this.inputChangedCallBack !== null){
          this.inputChangedCallBack(this);
        }
      }, 100);
    });
  }
  
  _clearInputs(){
    this.firstSelectedDay = null;
    this.secondSelectedDay = null;
    let days = this.calendar.querySelectorAll(".cal_date");

    days.forEach(day => {
      day.classList.remove("isSelected");
      day.classList.remove("active");
      day.classList.remove("additional-active");
    });

    this.firstInput.value = "";
    this.secondInput.value = "";
    this.clearCallBack();
  }

  _changeDateFromInput(input, isFirst){
    if (input.value.replace(/\_/g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0){
      if (isFirst){
        this.firstSelectedDay = null;
      }
      else{
        this.secondSelectedDay = null;
      }
      this.removeMiddleSelected();
      this.selectOnClick();
          this.calendar.innerHTML = "";
          this.setCalBody();
          this.updateInput();
    }
    if (input.value.replace(/\_/g, "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 8){
      let date = this._getTimeStampFromInput(input);
      if (!isNaN(date)){
        if (date.getTime() === this.firstSelectedDay){
          if (isFirst){
            input.value = "с " + this.getDateStringFromTimestamp(this.firstSelectedDay);
          }else{
            input.value = "по " + this.getDateStringFromTimestamp(this.secondSelectedDay);
          }
          return;
        }else if ( date.getTime() === this.secondSelectedDay){
          if (isFirst){
            input.value = "с " + this.getDateStringFromTimestamp(this.firstSelectedDay);
          }else{
            input.value = "по " + this.getDateStringFromTimestamp(this.secondSelectedDay);
          }
          return;
        }
        this.year = date.getFullYear();
        this.month = date.getMonth();
        date = date.getTime();
        this.setHeader(this.year, this.month);
        this.monthDetails = this.getMonthDetails(this.year, this.month);
        if (isFirst && (date < this.secondSelectedDay || this.secondSelectedDay === null)){
          this.firstSelectedDay = date;
        }
        else if (!isFirst && date > this.firstSelectedDay && this.firstSelectedDay !== null){
          this.secondSelectedDay = date
        }
        else if (!isFirst && ( date < this.firstSelectedDay || this.firstSelectedDay === null)){
          this.secondInput = "по " + this.getDateStringFromTimestamp(this.firstSelectedDay);
          this.firstSelectedDay = date;
          this.firstInput.value = "с " + this.getDateStringFromTimestamp(date);
        }
        else if (isFirst && date > this.secondSelectedDay)
        {
          this.firstInput.value = "с " + this.getDateStringFromTimestamp(this.secondSelectedDay);
          this.secondSelectedDay = date;
          this.secondInput.value = "по " + this.getDateStringFromTimestamp(date);
        }
        this.selectOnClick();
        this.calendar.innerHTML = "";
        this.setCalBody();
        this.updateInput();
      }
      else{
        if (isFirst){
          this.firstSelectedDay = null;
        }
        else{
          this.secondSelectedDay = null;
        }
      }
    }
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
    let _date =  (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
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
    this.calendar.style["grid-template-rows"] = "repeat(5, min(30px))";
    let currentDay = null;
    let index = 0;
    let cols = 7;
    if ((firstDay >= 5 && numberOfDays === 31) || (firstDay >= 6 && numberOfDays === 30)){
      rows = 6;
      this.calendar.style["grid-template-rows"] = "repeat(6, min(30px))";
    }
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

  setMiddleSelected(){
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
    else if (this.head_element.querySelectorAll(".cal_date.isSelected").length === 1 && this._checkInputFillnes(this.firstInput) && this._checkInputFillnes(this.secondInput)){
      let activeDate = this.head_element.querySelector(".cal_date.isSelected");
      let activeDateTimestamp = this._getCellTimestamp(activeDate);
      let days = this.calendar.querySelectorAll(".cal_date.current");
      let fromChecker = true;
      if (activeDateTimestamp === this.firstSelectedDay) {fromChecker = false}
      days.forEach(day => {
        if (day === activeDate){
          fromChecker = !fromChecker;
        }
        else if (fromChecker){
          day.classList.add("additional-active");
        }
        else{
          day.classList.remove("additional-active");
        }
      });
    }
    else if (this.head_element.querySelectorAll(".cal_date.isSelected").length === 0 && this._checkInputFillnes(this.firstInput) && this._checkInputFillnes(this.secondInput)){
      let firstDate = new Date(this.firstSelectedDay);
      let secondDate = new Date(this.secondSelectedDay);
      if (this.year <= secondDate.getFullYear() && this.year >= firstDate.getFullYear() && this.month <= secondDate.getMonth() && this.month >= firstDate.getMonth()){
        let days = this.calendar.querySelectorAll(".cal_date.current");
        days.forEach(day => {
          day.classList.add("additional-active");
        });
      }
    }
  }

  removeMiddleSelected(){
    let days = this.calendar.querySelectorAll(".cal_date");
    days.forEach(day => {
      day.classList.remove("additional-active");
    });
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
    this.calDays.innerHTML = "";
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
    this.calendar.innerHTML = "";
    let firstSelected;
    let secondSelected;
    for (let i = 0; i < this.monthDetails.length; i++) {
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");
        this.monthDetails[i].month === 0 && div.classList.add("current");
        //if (this.monthDetails[i].timestamp === this.todayTimestamp) {div.classList.add("inactive_indicator");}
        span.classList.add("cell_item");
        span.innerText = this.monthDetails[i].date;
        div.appendChild(span);
        this.calendar.appendChild(div);
        if (this.monthDetails[i].timestamp === this.firstSelectedDay && this.monthDetails[i].month === 0) {firstSelected = div;}
        if (this.monthDetails[i].timestamp === this.secondSelectedDay && this.monthDetails[i].month === 0) {secondSelected = div;}
    }

    if (firstSelected !== undefined){
      this.setSelectedDate(firstSelected);
    }

    if (secondSelected !== undefined){
      this.setSelectedDate(secondSelected);
    }

    if (secondSelected === undefined && firstSelected === undefined){
      this.setMiddleSelected();
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
    if (input == this.secondInput) dateString = "по " + dateString;
    input.value = dateString;
  }

  getDateStringFromTimestamp(timestamp){
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() > 9 ? dateObject.getMonth() + 1: ("0" + (dateObject.getMonth() + 1));
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
                  this._closeCalendar(500);
                }
                this.selectOnClick();
                this.setSelectedDate(cell);

                this.inputChangedCallBack(this);
                
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
    return !(cellTimeStamp >= this.secondSelectedDay && this.secondSelectedDay !== null) &&
          ((cellTimeStamp <= this.firstSelectedDay && this.firstSelectedDay !== null && this.secondSelectedDay !== null) ||
          this.firstInput.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 0 || 
          this.firstInput.classList.contains('onFocus'));
  }

  _getCellTimestamp(cell){
    let day = cell.querySelector("span").innerHTML;
    return new Date(this.year, this.month, day).getTime();
  }

  _checkInputFillnes(input){
    return input.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(/\./g, "").replace(" ", "").length === 8;
  }

  _getTimeStampFromInput(input){
    let stringDate = input.value.replace("_", "").replace(/[а-яА-ЯёЁ]/g, "").replace(" ", "");
    let splittedDate = stringDate.split(".");
    let date = Date.parse(splittedDate[2] + "-" + splittedDate[1] + "-" + splittedDate[0]);
    if (!isNaN(date)){
      return new Date(Number(splittedDate[2]), Number(splittedDate[1]) - 1,splittedDate[0][0] === "0" ?  Number(splittedDate[0][1]) : Number(splittedDate[0]));
    }
    else {
      return NaN;
    }
  }

  _closeCalendar(time){
    setTimeout(() => {
      this.head_element.querySelector('.date_picker_calendar').classList.add('hidden');
      this.head_element.querySelector('.date_picker_input').classList.remove('showCal');
    }, time);
  }

  getValues(){
    return {
      "firstInput" : this.firstSelectedDay,
      "secondInput" : this.secondSelectedDay
    }
  }

  getInputs(){
    return {
      "firstInput" : this.firstInput,
      "secondInput" : this.secondInput
    }
  }

  getId(){
    return this.head_element.id;
  }
}
  
  
  