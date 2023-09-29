var basicLinkRegex = /^.*:\/\/.*\.(?:amocrm.ru|kommo.com)\/leads\/detail\/.*$/;

var prevLinkMatch = null;

getFont();

const circle = document.createElement('div');
circle.id = 'comon-tech-circle';
if (prevLinkMatch){
    circle.classList.remove("hidden");
}else{
    circle.classList.add("hidden");
}
circle.innerHTML = getCircle();
document.body.appendChild(circle);



var mainBody = document.createElement('div');
mainBody.classList.add("basement");
mainBody.classList.add("hidden");
mainBody.id = "alfaamo_extension_main_body";

mainBody.innerHTML = getHtml();

document.body.appendChild(mainBody);

inputMasksEventListner();


setInterval(function() {
    if (!document.location.href.match(basicLinkRegex) && prevLinkMatch === null) {
        circle.classList.add("hidden");
        fullReset();
        mainBody.classList.add("hidden");
    }else if (document.location.href.match(basicLinkRegex) && prevLinkMatch === null){
        circle.classList.remove("hidden");
        fullReset();
        basicLoad();
    }
    else if (document.location.href.match(basicLinkRegex) && prevLinkMatch !== null){
        if (checkContactsAmount()){
            fullReset();
            basicLoad();
        }
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
    }
});


function createPopup(){
  mainBody.classList.remove("hidden");
  if (checkContactsAmount()){
    fullReset();
    basicLoad();
  }
}

function checkContactsAmount() {
    if (arraysEqual(studentsData, parentsData)){
        return studentsData.length + parentsData.length < document.querySelectorAll("#contacts_list > li").length + 1;
    }
    return studentsData.length + parentsData.length < document.querySelectorAll("#contacts_list > li").length;
}

function getCircle(){
    return `<div class = "tech-logo">
    <div class = "first-row">
        <svg id = "logo-letter-c" xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M0 11.0777V3.33534C0 0.721153 1.71 0 4.15 0C6.61 0 8.18 0.751202 8.18 3.33534V5.09816H5.39V3.21514C5.39 1.97316 4.87 1.72276 4.15 1.72276C3.4 1.72276 2.91 1.97316 2.91 3.21514V12.0994C2.91 13.3714 3.41 13.5917 4.15 13.5917C4.87 13.5917 5.39 13.3714 5.39 12.0994V10.0961H8.17V11.0777C8.17 14.6835 6.6 15.2344 4.12 15.2344C1.69 15.2344 0 14.6635 0 11.0777Z" fill="#101F23"/>
        </svg>
        <svg id = "logo-letter-o" xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path d="M0.400146 9.09771V3.81927C0.400146 1.5256 1.47015 0.413818 4.25014 0.413818C7.03014 0.413818 8.10014 1.53561 8.10014 3.81927V9.06766C8.10014 12.2327 6.93014 13.1241 4.25014 13.1241C1.57015 13.1342 0.400146 12.2327 0.400146 9.09771ZM5.37014 9.99915V3.54883C5.37014 2.67744 5.22014 2.0264 4.25014 2.0264C3.28014 2.0264 3.13014 2.67744 3.13014 3.54883V9.99915C3.13014 10.8705 3.28014 11.5216 4.25014 11.5216C5.22014 11.5116 5.37014 10.8705 5.37014 9.99915Z" fill="#101F23"/>
        </svg>
        <svg id = "logo-letter-m" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M0.379761 0.614364H2.68976L2.90976 2.10675C3.25976 1.1352 4.12976 0.444092 5.29976 0.444092C6.83976 0.444092 7.55976 1.015 7.85976 2.06669C8.25976 1.12518 9.09976 0.444092 10.2198 0.444092C12.3298 0.444092 12.9298 1.48576 12.9298 3.52903V12.9341H10.1998V3.74938C10.1998 2.75779 9.89975 2.37718 9.17975 2.37718C8.57975 2.37718 8.10976 2.74778 8.00976 3.24858V12.9341H5.27976V3.64922C5.27976 2.77782 5.00976 2.37718 4.25976 2.37718C3.65976 2.37718 3.28976 2.6977 3.11976 3.07831V12.9341H0.38976V0.614364H0.379761Z" fill="#101F23"/>
        </svg>
        <svg id = "logo-letter-comma" xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
            <path d="M0.419922 3.66593L1.15992 0.280518H3.49992L1.91992 3.66593H0.419922Z" fill="#101F23"/>
        </svg>
        <svg id = "logo-letter-o" xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path d="M0.319702 9.09771V3.81927C0.319702 1.5256 1.3897 0.413818 4.1697 0.413818C6.9497 0.413818 8.0197 1.53561 8.0197 3.81927V9.06766C8.0197 12.2327 6.8497 13.1241 4.1697 13.1241C1.4897 13.1342 0.319702 12.2327 0.319702 9.09771ZM5.2897 9.99915V3.54883C5.2897 2.67744 5.1397 2.0264 4.1697 2.0264C3.1997 2.0264 3.0497 2.67744 3.0497 3.54883V9.99915C3.0497 10.8705 3.1997 11.5216 4.1697 11.5216C5.1397 11.5216 5.2897 10.8705 5.2897 9.99915Z" fill="#101F23"/>
        </svg>
        <svg id = "logo-letter-n" xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M0.300049 0.614364H2.61005L2.83005 2.08672C3.15005 1.04505 4.12005 0.444092 5.19004 0.444092C7.58004 0.444092 8.00004 1.76621 8.00004 3.70931V12.9441H5.27005V3.86957C5.27005 3.06829 5.22004 2.34714 4.15005 2.34714C3.45005 2.34714 3.16005 2.76781 3.03005 3.06829V12.9241H0.300049V0.614364Z" fill="#101F23"/>
        </svg>
    </div>
    <div class = "second-row">
    <svg id = "logo-letter-t" xmlns="http://www.w3.org/2000/svg" width="12" height="23" viewBox="0 0 12 23" fill="none">
        <path d="M3.54957 3.86192H0.189575V0.967285H11.0596V3.86192H7.65957V22.6219H3.55957V3.86192H3.54957Z" fill="url(#paint0_linear_22_6528)"/>
        <defs>
            <linearGradient id="paint0_linear_22_6528" x1="-1.47092" y1="11.7943" x2="57.9824" y2="11.7943" gradientUnits="userSpaceOnUse">
                <stop stop-color="#33CC66"/>
                <stop offset="0.6455" stop-color="#0099CC"/>
                <stop offset="0.9974" stop-color="#0033FF"/>
            </linearGradient>
        </defs>
    </svg>
    <svg id = "logo-letter-e" xmlns="http://www.w3.org/2000/svg" width="11" height="23" viewBox="0 0 11 23" fill="none">
        <path d="M0.189575 0.967285H10.0996V3.86192H4.46957V9.80142H9.25957V13.0266H4.46957V19.8074H10.0996V22.6319H0.189575V0.967285Z" fill="url(#paint0_linear_22_6529)"/>
        <defs>
        <linearGradient id="paint0_linear_22_6529" x1="-13.4709" y1="11.7943" x2="45.9824" y2="11.7943" gradientUnits="userSpaceOnUse">
            <stop stop-color="#33CC66"/>
            <stop offset="0.6455" stop-color="#0099CC"/>
            <stop offset="0.9974" stop-color="#0033FF"/>
        </linearGradient>
        </defs>
    </svg>
    <svg id = "logo-letter-c2" xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
        <path d="M0.890137 16.9426V5.54432C0.890137 1.69817 3.41014 0.636475 7.00013 0.636475C10.6201 0.636475 12.9301 1.73824 12.9301 5.54432V8.75947H8.83013V5.36404C8.83013 3.5311 8.06013 3.16051 7.00013 3.16051C5.90013 3.16051 5.17014 3.5311 5.17014 5.36404V18.445C5.17014 20.318 5.90013 20.6485 7.00013 20.6485C8.06013 20.6485 8.83013 20.318 8.83013 18.445V15.1898H12.9301V16.9526C12.9301 22.2611 10.6301 23.0724 6.97014 23.0724C3.37014 23.0623 0.890137 22.221 0.890137 16.9426Z" fill="url(#paint0_linear_22_6530)"/>
        <defs>
        <linearGradient id="paint0_linear_22_6530" x1="-24.4703" y1="11.849" x2="34.983" y2="11.849" gradientUnits="userSpaceOnUse">
            <stop stop-color="#33CC66"/>
            <stop offset="0.6455" stop-color="#0099CC"/>
            <stop offset="0.9974" stop-color="#0033FF"/>
        </linearGradient>
        </defs>
    </svg>
    <svg id = "logo-letter-h" xmlns="http://www.w3.org/2000/svg" width="12" height="23" viewBox="0 0 12 23" fill="none">
        <path d="M0.0402832 0.967285H4.14028V9.87153H7.94028V0.967285H12.0003V22.6219H7.94028V12.9164H4.14028V22.6219H0.0402832V0.967285Z" fill="url(#paint0_linear_22_6531)"/>
        <defs>
            <linearGradient id="paint0_linear_22_6531" x1="-39.4702" y1="11.7943" x2="19.9832" y2="11.7943" gradientUnits="userSpaceOnUse">
                <stop stop-color="#33CC66"/>
                <stop offset="0.6455" stop-color="#0099CC"/>
                <stop offset="0.9974" stop-color="#0033FF"/>
            </linearGradient>
        </defs>
    </svg>
    </div>
</div>`;
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
                  ${STUDENT_CHOSER_BLOCK_DESC}
              </div>
          </div>
          <div class = "inactive-info">
              <div class= "selection-result hidden" id = "student_choser_parent_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                        ${STUDENT_CHOSER_PARENT_LABEL}
                      </div>
                      <div class = "result-value">
                          Имя Фамилия
                      </div>
                  </div>
              </div>
              <div class= "selection-result hidden" id = "student_choser_student_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                        ${STUDENT_CHOSER_STUDENT_LABEL}
                      </div>
                      <div class = "result-value">
                          Имя Фамилия
                      </div>
                  </div>
              </div>
              <div class= "selection-result hidden" id = "student_choser_filial_inactive_result">
                  <div class = "result">
                      <div class = "result-label">
                        ${STUDENT_CHOSER_BRANCH_LABEL}
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
                        ${STUDENT_CHOSER_PARENT_LABEL}
                      </div>
                      <div class="selector">
                          <div id="student_choser_parent_selector"></div>
                      </div>
                      <div class="widget-note">
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_parent_result">
                          <div class = "result">
                              <div class = "result-label">
                                ${STUDENT_CHOSER_PARENT_LABEL}
                              </div>
                              <div class = "result-value">
                                  Имя Фамилия
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="selection-row unselected">
                      <div class="title">
                        ${STUDENT_CHOSER_STUDENT_LABEL}
                      </div>
                      <div class="selector">
                          <div id="student_choser_student_selector"></div>
                      </div>
                      <div class="widget-note">
                        ${STUDENT_CHOSER_STUDENT_WARN}
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_student_result">
                          <div class = "result">
                              <div class = "result-label">
                                ${STUDENT_CHOSER_STUDENT_LABEL}
                              </div>
                              <div class = "result-value">
                                  Имя Фамилия
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="selection-row unselected">
                      <div class="title">
                          ${STUDENT_CHOSER_BRANCH_LABEL}
                      </div>
                      <div class="selector">
                          <div id="student_choser_filial_selector"></div>
                      </div>
                      <div class="widget-note">
                        ${STUDENT_CHOSER_BRANCH_WARN}
                      </div>
                      <div class= "selection-result hidden" id = "student_choser_filial_result">
                          <div class = "result">
                              <div class = "result-label">
                                ${STUDENT_CHOSER_BRANCH_LABEL}
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
                  ${ADD_STUDENT_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content" id="add-student">
              <div class="task_checkbox">
                  <input type="checkbox" class="custom-checkbox" id="add_as_lead" name="add_as_lead" value="yes">
                  <label for="add_as_lead">${ADD_STUDENT_IS_LEAD_LABEL}</label>
              </div>
              <div class="task_button">
                  <button class="basic_btn active" id = "add_student_btn">
                      ${ADD_STUDENT_MAIN_BTN_TXT}
                  </button>
                  <div class="additional-info" id = "add_student_refresh">
                      <a>${ADD_STUDENT_REFRESH_LINK_TXT}</a>
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
                  ${LESSON_ADD_STUDENT_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content">
              <div id="lesson-selector">
                  <div class="selection-row">
                      <div class="title">
                          ${LESSON_ADD_STUDENT_SEL_LESSON_LABEL}
                      </div>
                      <div class="selector">
                          <div id="add-student-to-lesson-lesson-selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          ${LESSON_ADD_STUDENT_SEL_SUBJECT_LABEL}
                      </div>
                      <div class="selector">
                          <div id="add-student-to-lesson-subject-selector"></div>
                      </div>
                  </div>

                  <div class="calendar-wrapper" id="add-student-to-lesson-calendar-wrapper">
                      <div class="date_picker" id="add-student-to-lesson-calendar">
                          <div class="date_picker_input" id="date-picker-input-add-student-to-lesson">
                              <label>${LESSON_ADD_STUDENT_SEL_DATES_LABEL}</label>
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
                  ${LESSON_ADD_STUDENT_MAIN_BTN_TXT}
              </button>
          </div>
      </div>
      <div class="widget-content-block disabled ">
          <div class="title">
              <div class="block-pos">
                  04
              </div>
              <div class="block-desc">
                  ${ADD_LESSON_BLOCK_DESC}
              </div>
          </div>
      </div>
      <div class="widget-content-block inactive forbidden" id = "add-student-to-group-content-block">
          <div class="title">
              <div class="block-pos">
                  05
              </div>
              <div class="block-desc">
                  ${GROUP_ADD_STUDENT_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content">
          <div id="add_group_selector_wrapper">
                  <div class="selection-row">
                      <div class="title">
                          ${GROUP_ADD_STUDENT_SEL_GROUP_LABEL}
                      </div>
                      <div class="selector">
                          <div class="input-wrapper">
                              <input autocomplete="off" class="selection_with_table" id="add_group_search_input" type="text">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="table_container" id="add-student-to-group-table-container"></div>
              <div class="choose_date_container" id = "add-student-to-group-calendars">
                  <div class="choose-date-description">
                      <div class="main-title">
                          ${GROUP_ADD_STUDENT_CAL_BLOCK_MAIN_TITLE}
                      </div>
                      <div class="main-description">
                          ${GROUP_ADD_STUDENT_CAL_BLOCK_DESC}
                      </div>
                  </div>
                  <div class="plug"></div>
              </div>
              <button class="basic_btn inactive" id = "add-student-to-group-btn">
                  ${GROUP_ADD_STUDENT_MAIN_BTN_TXT}
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive  forbidden" id = "add-payment-content-block">
          <div class="title">
              <div class="block-pos">
                  06
              </div>
              <div class="block-desc">
                  ${ADD_PAYMENT_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content">
              <div id="add-payment-selector">
                  <div class="selection-row">
                      <div class="title">
                          ${ADD_PAYMENT_SEL_CAS_TITLE}
                      </div>
                      <div class="selector">
                          <div id="add_payment_cas_selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          ${ADD_PAYMENT_SEL_CATEGORY_TITLE}
                      </div>
                      <div class="selector">
                          <div id="add_payment_category_selector"></div>
                      </div>
                  </div>
                  <div class="selection-row">
                      <div class="title">
                          ${ADD_PAYMENT_SEL_INCOME_TITLE}
                      </div>
                      <div class="selector">
                          <div id="add_payment_income_selector"></div>
                      </div>
                  </div>
              </div>
              <button class="basic_btn inactive" id = "add-payment-btn">
                  ${ADD_PAYMENT_MAIN_BTN_TXT}
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive  forbidden" id = "add-abonement-content-block">
          <div class="title">
              <div class="block-pos">
                  07
              </div>
              <div class="block-desc">
                  ${ADD_ABONEMENT_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content">
              <div id="add_abonement_selector_wrapper">
                  <div class="selection-row">
                      <div class="title">
                          ${ADD_ABONEMENT_SEL_ABONEMENT_TITLE}
                      </div>
                      <div class="selector">
                          <div class="input-wrapper">
                              <input autocomplete="off" class="selection_with_table" id="add_abonement_search_input" type="text">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="table_container" id="add_abonement_table_container"></div>
              <div class="choose_data_container" id = "add-abonement-data-container">
                <div class="choose-data-description">
                    <div class="main-title">
                        ${ADD_ABONEMENT_DATA_BLOCK_MAIN_TITLE}
                    </div>
                    <div class="main-description">
                        ${ADD_ABONEMENT_DATA_BLOCK_MAIN_DESC}
                    </div>
                </div>
                <div class="plug"></div>
            </div>
              <button class="basic_btn inactive" id = "add-abonement-btn">
                  ${ADD_ABONEMENT_MAIN_BTN_TXT}
              </button>
          </div>
      </div>
      <div class="widget-content-block inactive forbidden" id = "communication-content-block">
          <div class="title">
              <div class="block-pos">
                  08
              </div>
              <div class="block-desc">
                  ${COMMUNICATION_BLOCK_DESC}
              </div>
              <div class = "block-loader hidden">
              </div>
              <div class = "block-result hidden">
                <div class = "result-arrow">
                </div>
                <div class = "result-text">
                </div>
              </div>
          </div>
          <div class="operation-content">
              <div class="chat-wrapper" id="communication-chat">
                  
              </div>
              <button class="basic_btn inactive" id = "communication-btn">
                  ${COMMUNICATION_MAIN_BTN}
              </button>
          </div>
      </div>
  </div>
</div>
<div class="bottom-blur-module"></div>
<div class="footer">
  <div class="company-logo">
      <div class="main-info">
          ${FOOTER_COMPANY_INFO}
      </div>
      <div class="logo"></div>
  </div>
  <div class = "footer-info">
      <div class = "info-block">
          
      </div>
  </div>
  <button class="basic_btn active" id = "footer-knowledgebase-btn">
      ${FOOTER_KNOWLEDGEBASE_BTN_TXT}
  </button>
</div>
<a href = "https://t.me/Comontech108">
    <div class = "widget-tg-circle" id = "widget-tg-circle-link">
        <div class = "tg-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <path d="M19 0.602225L15.9946 16.2923C15.9946 16.2923 15.5741 17.3801 14.4189 16.8584L7.48458 11.3526L7.45242 11.3364C8.38909 10.4654 15.6524 3.70266 15.9698 3.39612C16.4613 2.92136 16.1562 2.63873 15.5856 2.99736L4.85679 10.053L0.717638 8.61077C0.717638 8.61077 0.0662573 8.37083 0.00359284 7.84911C-0.0598962 7.32653 0.739076 7.0439 0.739076 7.0439L17.6131 0.188948C17.6131 0.188948 19 -0.44207 19 0.602225Z" fill="#3CA1EB"/>
            </svg>
        </div>
    </div>
</a>`

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
    resetCommunication();
}

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}