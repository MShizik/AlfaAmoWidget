var basicLinkRegex = /^.*:\/\/.*\.amocrm\.ru\/leads\/detail\/.*$/;

var prevLinkMatch = document.location.href.match(basicLinkRegex);

getFont();

const circle = document.createElement('div');
circle.id = 'comon-tech-circle';
if (prevLinkMatch){
    circle.classList.remove("hidden");
}else{
    circle.classList.add("hidden");
}
document.body.appendChild(circle);



var mainBody = document.createElement('div');
mainBody.classList.add("basement");
mainBody.classList.add("hidden");

mainBody.innerHTML = getHtml();

document.body.appendChild(mainBody);


setInterval(function() {
    if (!document.location.href.match(basicLinkRegex) && prevLinkMatch !== true) {
        circle.classList.add("hidden");
        fullReset();
        mainBody.classList.add("hidden");
    }else if (document.location.href.match(basicLinkRegex)){
        circle.classList.remove("hidden");
    }
    prevLinkMatch = document.location.href.match(basicLinkRegex);
  }, 5000);


circle.addEventListener('click', () => {

    if (document.location.href.match(basicLinkRegex)){
        const width = 800;
        const height = window.innerHeight;
      
        createPopup();
        var mainCloseSign = document.querySelector("#main-close-sign");
        mainCloseSign.addEventListener("click", () => {
            mainBody.classList.add("hidden");
        });
    }else{
        console.log("nope");
    }
});


function createPopup(){
  mainBody.classList.remove("hidden");
  basicLoad();
}


function getHtml(){
  return `<div class="connection-block">
  <div class="connection-mark" id="amo-connection">
      <div class="connection-indicator"></div>
      <div class="connection-name">Amo</div>
  </div>
  <div class="connection-mark" id="alfa-connection">
      <div class="connection-indicator"></div>
      <div class="connection-name">Alfa</div>
  </div>
  <div class="close-sign" id="main-close-sign"></div>
</div>
<div class="top-blur-module"></div>
<div class="content-folder-wrapper">
  <div class="content-folder">
      <div class="widget-content-block active static" id = "student-choser-content-block">
          <div class="title">
              <div class="block-pos">
                  01
              </div>
              <div class="block-desc">
                  Выбрать учащегося в AlfaCRM
              </div>
          </div>
          <div class = "inactive-info">
              <div class= "selection-result hidden" id = "student_choser_parent_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                          Родитель/заказчик
                      </div>
                      <div class = "result-value">
                          Имя Фамилия
                      </div>
                  </div>
              </div>
              <div class= "selection-result hidden" id = "student_choser_student_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                          Ученик
                      </div>
                      <div class = "result-value">
                          Имя Фамилия
                      </div>
                  </div>
              </div>
              <div class= "selection-result hidden" id = "student_choser_filial_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                          Филлиал
                      </div>
                      <div class = "result-value">
                          Филлиал 3
                      </div>
                  </div>
              </div>
          </div>
          <div class="operation-content">
              <div id="student-selector">
                  <div class="selection-row unselected">
                      <div class="title">
                          Родитель/заказчик
                      </div>
                      <div class="selector">
                          <div id="student_choser_parent_selector"></div>
                      </div>
                      <div class="widget-note">
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_parent_result">
                          <div class = "result">
                              <div class = "result-label">
                                  Родитель/заказчик
                              </div>
                              <div class = "result-value">
                                  Имя Фамилия
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="selection-row unselected">
                      <div class="title">
                          Ученик
                      </div>
                      <div class="selector">
                          <div id="student_choser_student_selector"></div>
                      </div>
                      <div class="widget-note">
                          Ученик не выбран
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_student_result">
                          <div class = "result">
                              <div class = "result-label">
                                  Ученик
                              </div>
                              <div class = "result-value">
                                  Имя Фамилия
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="selection-row unselected">
                      <div class="title">
                          Филлиал
                      </div>
                      <div class="selector">
                          <div id="student_choser_filial_selector"></div>
                      </div>
                      <div class="widget-note">
                          Филлиал не выбран
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_filial_result">
                          <div class = "result">
                              <div class = "result-label">
                                  Филлиал
                              </div>
                              <div class = "result-value">
                                  Филлиал 3
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="widget-content-block inactive  forbidden" id = "add-student-content-block">
          <div class="title">
              <div class="block-pos">
                  02
              </div>
              <div class="block-desc">
                  Записать ученика в AlfaCRM
              </div>
          </div>
          <div class="operation-content" id="add-student">
              <div class="task_checkbox">
                  <input type="checkbox" class="custom-checkbox" id="add_as_lead" name="add_as_lead" value="yes">
                  <label for="add_as_lead">Записать как лид</label>
              </div>
              <div class="task_button">
                  <button class="basic_btn active" id = "add_student_btn">
                      Записать ученика в AlfaCRM
                  </button>
                  <div class="additional-info" id = "add_student_refresh">
                      <a>Восстановить ссылку на карточку AlfaCRM</a>
                  </div>
              </div>
          </div>
      </div>
      <div class="widget-content-block inactive forbidden" id = "add-student-to-lesson-content-block">
          <div class="title">
              <div class="block-pos">
                  03
              </div>
              <div class="block-desc">
                  Добавить ученика на урок
              </div>
          </div>
          <div class="operation-content">
              <div id="lesson-selector">
                  <div class="selection-row">
                      <div class="title">
                          Урок
                      </div>
                      <div class="selector">
                          <div id="add-student-to-lesson-lesson-selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          Предмет
                      </div>
                      <div class="selector">
                          <div id="add-student-to-lesson-subject-selector"></div>
                      </div>
                  </div>

                  <div class="calendar-wrapper" id="add-student-to-lesson-calendar-wrapper">
                      <div class="date_picker" id="add-student-to-lesson-calendar">
                          <div class="date_picker_input" id="date-picker-input-add-student-to-lesson">
                              <label>Выбрать даты:</label>
                              <div class="cal_input_block">
                                  <div class="cal_input_icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewbox="0 0 14 14" fill="none">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25667 1.74459V0H3.9481V1.74459H10.0517V0H11.7431V1.74459H12.1105C13.7255 1.74459 13.9791 2.03447 14 3.45121V12.2503C14 13.489 13.8885 14 12.3656 14H1.64392C0.121022 14 0 13.6287 0 12.1248V3.62268C0.0204458 2.42723 0.136099 1.74459 1.7507 1.74459L2.25667 1.74459ZM1.35359 11.8814C1.35359 12.3546 1.4963 12.3861 1.80608 12.3861H12.2508C12.5602 12.3861 12.6469 12.3787 12.6469 11.9047V4.80285C12.6382 4.43703 12.5197 4.37272 12.2791 4.37272H1.69559C1.45479 4.37272 1.35029 4.42559 1.35359 4.7071L1.35359 11.8814Z" fill="#AFBCBE"/>
                                      </svg>
                                  </div>
                                  <input type="text" class="cal_date_input first" id="input-cal-add-student-to-lesson" placeholder="с __.__.____" data-slots="_"/>
                                  <input type="text" class="cal_date_input second" id="input-cal-second-add-student-to-lesson" placeholder="по __.__.____" data-slots="_"/>
                                  <div class="cal_input_clear">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewbox="0 0 14 14" fill="none">
                                          <path d="M12.8337 2.34175L11.6587 1.16675L7.00033 5.82508L2.34199 1.16675L1.16699 2.34175L5.82533 7.00008L1.16699 11.6584L2.34199 12.8334L7.00033 8.17508L11.6587 12.8334L12.8337 11.6584L8.17533 7.00008L12.8337 2.34175Z" fill="#AFBCBE"/>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                          <div class="date_picker_calendar hidden" id="date-picker-cal-add-student-to-lesson">
                              <div class="calendar_header" id="header-cal-add-student-to-lesson">
                                  <button class="cal-btn back">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewbox="0 0 10 11" fill="none">
                                          <path d="M1.90039 5.5L7.30039 0.303848L7.30039 10.6962L1.90039 5.5Z" fill="#AFBCBE"/>
                                      </svg>
                                  </button>
                                  <span></span>
                                  <button class="cal-btn front">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewbox="0 0 10 11" fill="none">
                                          <path d="M8.59961 5.5L3.19961 10.6962L3.19961 0.303848L8.59961 5.5Z" fill="#AFBCBE"/>
                                      </svg>
                                  </button>
                              </div>
                              <div class="cal_wrapper">
                                  <div class="cal_days" id="days-cal-add-student-to-lesson"></div>
                                  <div class="calendar_main" id="main-cal-add-student-to-lesson"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="table_container" id="add-student-to-lesson-table-container"></div>
              <button class="basic_btn inactive" id = "add-student-to-lesson-btn">
                  Добавить ученика на урок
              </button>
          </div>
      </div>
      <div class="widget-content-block disabled ">
          <div class="title">
              <div class="block-pos">
                  04
              </div>
              <div class="block-desc">
                  Создать урок
              </div>
          </div>
      </div>
      <div class="widget-content-block inactive forbidden" id = "add-student-to-group-content-block">
          <div class="title">
              <div class="block-pos">
                  05
              </div>
              <div class="block-desc">
                  Добавить ученика в группу
              </div>
          </div>
          <div class="operation-content">
              <div class="table_container" id="add-student-to-group-table-container"></div>
              <div class="choose_date_container" id = "add-student-to-group-calendars">
                  <div class="choose-date-description">
                      <div class="main-title">
                          Выбрать даты:
                      </div>
                      <div class="main-description">
                          Выберите период участия в группе. Если не указано по какое число добавляется ученик, то он добавляется бессрочно
                      </div>
                  </div>
                  <div class="plug"></div>
              </div>
              <button class="basic_btn inactive" id = "add-student-to-group-btn">
                  Добавить ученика в группу
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive  forbidden" id = "add-payment-content-block">
          <div class="title">
              <div class="block-pos">
                  06
              </div>
              <div class="block-desc">
                  Передать платеж
              </div>
          </div>
          <div class="operation-content">
              <div id="add-payment-selector">
                  <div class="selection-row">
                      <div class="title">
                          Касса
                      </div>
                      <div class="selector">
                          <div id="add_payment_cas_selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          Категория статей
                      </div>
                      <div class="selector">
                          <div id="add_payment_category_selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          Статья дохода
                      </div>
                      <div class="selector">
                          <div id="add_payment_income_selector"></div>
                      </div>
                  </div>
              </div>
              <button class="basic_btn inactive" id = "add-payment-btn">
                  Пополнить баланс
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive  forbidden" id = "add-abonement-content-block">
          <div class="title">
              <div class="block-pos">
                  07
              </div>
              <div class="block-desc">
                  Добавить абонемент
              </div>
          </div>
          <div class="operation-content">
              <div id="add_abonement_selector_wrapper">
                  <div class="selection-row">
                      <div class="title">
                          Абонемент
                      </div>
                      <div class="selector">
                          <div class="input-wrapper">
                              <input autocomplete="off" class="selection_with_table" id="add_abonement_search_input" type="text">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="table_container" id="add_abonement_table_container"></div>
              <button class="basic_btn inactive" id = "add-abonement-btn">
                  Добавить абонемент
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive forbidden" id = "communication-content-block">
          <div class="title">
              <div class="block-pos">
                  08
              </div>
              <div class="block-desc">
                  Коммуникации
              </div>
          </div>
          <div class="operation-content">
              <div class="chat-wrapper" id="communication-chat">
                  
              </div>
              <button class="basic_btn active" id = "communication-btn">
                  Загрузить следующие 10 сообщений
              </button>
          </div>
      </div>
  </div>
</div>
<div class="bottom-blur-module"></div>
<div class="footer">
  <div class="company-logo">
      <div class="main-info">
          Сделано<br> на платформе
      </div>
      <div class="logo"></div>
  </div>
  <div class = "footer-info">
      <div class = "info-block">
          
      </div>
  </div>
  <button class="basic_btn active" id = "footer-knowledgebase-btn">
      База знаний
  </button>
</div>
<div class = "tg-logo">
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
    <path d="M19 0.602225L15.9946 16.2923C15.9946 16.2923 15.5741 17.3801 14.4189 16.8584L7.48458 11.3526L7.45242 11.3364C8.38909 10.4654 15.6524 3.70266 15.9698 3.39612C16.4613 2.92136 16.1562 2.63873 15.5856 2.99736L4.85679 10.053L0.717638 8.61077C0.717638 8.61077 0.0662573 8.37083 0.00359284 7.84911C-0.0598962 7.32653 0.739076 7.0439 0.739076 7.0439L17.6131 0.188948C17.6131 0.188948 19 -0.44207 19 0.602225Z" fill="#3CA1EB"/>
</svg>
</div>`
}

function getFont(){
    var fontsLink = document.createElement("link");
    fontsLink.rel = "preconnect";
    fontsLink.href = "https://fonts.googleapis.com";

    document.head.appendChild(fontsLink);

    var gstaticLink = document.createElement("link");
    gstaticLink.rel = "preconnect";
    gstaticLink.href = "https://fonts.gstatic.com";

    document.head.appendChild(gstaticLink);

    var fonts = document.createElement("link");

    fonts.rel = "stylesheet";
    fonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap";

    document.head.appendChild(fonts);
}

function fullReset(){
    resetAddAbonement();
    resetAddPayment();
    resetAddStudentToLesson();
    resetAddStudentToGroup();
    resetAddStudent();
    resetStudentChoser();
}