//Базовое содержимое
var BASIC_ERROR_UNREGISTER = 'Зарегистрируйтесь <a href = "https://comontech.ru" >comontech.ru</a>';
var BASIC_ERROR_SUB = "Продлите подписку";


//Содержимое блока выбора студента
var STUDENT_CHOSER_BLOCK_DESC = "Выбрать учащегося в AlfaCRM";
var STUDENT_CHOSER_PARENT_LABEL = "Родитель/заказчик";
var STUDENT_CHOSER_STUDENT_LABEL = "Ученик";
var STUDENT_CHOSER_STUDENT_WARN = "Ученик не выбран";
var STUDENT_CHOSER_BRANCH_LABEL = "Филиал";
var STUDENT_CHOSER_BRANCH_WARN = "Филиал не выбран";
var FORBIDDEN_TIP_STUDENT_EXIST = "Учащийся уже записан в AlfaCRM";
var FORBIDDEN_TIP_STUDENT_UNEXIST = "Учащийся не записан в AlfaCRM";

//Содержимое блока добавления студента
var ADD_STUDENT_BLOCK_DESC = "Записать учащегося в AlfaCRM";
var ADD_STUDENT_IS_LEAD_LABEL = "Записать как лид";
var ADD_STUDENT_MAIN_BTN_TXT = "Записать учащегося в AlfaCRM";
var ADD_STUDENT_REFRESH_LINK_TXT = "Восстановить ссылку на карточку AlfaCRM";
var ADD_STUDENT_RES_REFRESH_LINK_TXT_SUC = "Ссылка обновлена";
var ADD_STUDENT_RES_REFRESH_LINK_TXT_FAILURE = "Ошибка";
var ADD_STUDENT_RES_ADD_TXT_SUC = "Студент добавлен";
var ADD_STUDENT_RES_ADD_TXT_FAILURE = "Студент не был добавлен";

//Содержимое блока добавления студента на урок
var LESSON_ADD_STUDENT_BLOCK_DESC = "Добавить ученика на урок";
var LESSON_ADD_STUDENT_SEL_LESSON_LABEL = "Урок";
var LESSON_ADD_STUDENT_SEL_SUBJECT_LABEL = "Предмет";
var LESSON_ADD_STUDENT_MAIN_BTN_TXT = "Добавить ученика на урок";
var LESSON_ADD_STUDENT_RES_ADD_TXT_SUC = "Студент добавлен на урок";
var LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE = "Произошла ошибка";

var LESSON_ADD_STUDENT_GROUP_COLUMNS_LIST = [
    '',
    'Дата',
    'Время урока',
    'Предмет',
    'Педагог',
    'Аудитория',
    'Название группы',
    'Лимит учеников',
    'Комментарий'
];
var LESSON_ADD_STUDENT_SHORT_COLUMNS_LIST = [
    '',
    'Дата',
    'Время урока',
    'Предмет',
    'Педагог',
    'Аудитория',
    'Комментарий'
];

//Содержимое блока добавления урока
var ADD_LESSON_BLOCK_DESC = "Создать урок";

//Содержимое блока добавления студента в группа
var GROUP_ADD_STUDENT_BLOCK_DESC = "Добавить ученика в группа";
var GROUP_ADD_STUDENT_SEL_GROUP_LABEL = "Группа";
var GROUP_ADD_STUDENT_CAL_BLOCK_MAIN_TITLE = "Выбрать даты:";
var GROUP_ADD_STUDENT_CAL_BLOCK_DESC = "Выберите период участия в группе. Если не указано по какое число добавляется ученик, то он добавляется бессрочно";
var GROUP_ADD_STUDENT_MAIN_BTN_TXT = "Добавить ученика в группу";
var GROUP_ADD_STUDENT_RES_ADD_SUC = "Студент добавлен в группу";
var GROUP_ADD_STUDENT_RES_ADD_FAILURE = "Студент не добавлен в группу";
var GROUP_ADD_STUDENT_COLUMNS = [
    '',
    'Название группы',
    'Педагог',
    'Количество/<br>лимит учеников',
    'Комментарий'
];

//Содержимое блока добавления платежа
var ADD_PAYMENT_BLOCK_DESC = "Передать платежа";
var ADD_PAYMENT_SEL_CAS_TITLE = "Касса";
var ADD_PAYMENT_SEL_CATEGORY_TITLE = "Категории статей";
var ADD_PAYMENT_SEL_INCOME_TITLE = "Статья дохода";
var ADD_PAYMENT_MAIN_BTN_TXT = "Пополнить баланс";
var ADD_PAYMENT_RES_ADD_SUC = "Платеж добавлен";
var ADD_PAYMENT_RES_FAILURE = "Произошла ошибка";

//Содержимое блока добавления абонемента
var ADD_ABONEMENT_BLOCK_DESC = "Добавить абонемент";
var ADD_ABONEMENT_SEL_ABONEMENT_TITLE = "Абонемент";
var ADD_ABONEMENT_DATA_BLOCK_MAIN_TITLE = "Добавить абонемент:";
var ADD_ABONEMENT_DATA_BLOCK_MAIN_DESC = "Выберите данные для добавления абонемента";
var ADD_ABONEMENT_MAIN_BTN_TXT = "Добавить абонемент";
var ADD_ABONEMENT_SEL_LESSON_LABEL = "Выберите уроки:";
var ADD_ABONEMENT_SEL_SUBJ_LABEL = "Выберите предметы:";
var ADD_ABONEMENT_CHECKBOX_PAY_STYLE_LABEL = "Раздельный тип расчетов";
var ADD_ABONEMENT_RES_ADD_SUC = "Абонемент добавлен";
var ADD_ABONEMENT_RES_FAILURE = "Произошла ошибка";
var ADD_ABONEMENT_TABLE_COLUMS = [
    '',
    'Название абонемента',
    'Тарификация',
    'Стоимость',
    'Период действия'
];

//Содержимое блока коммуникаций
var COMMUNICATION_BLOCK_DESC = "Коммуникации";
var COMMUNICATION_MAIN_BTN = "Загрузить следующие 10 сообщений";
var COMMUNICATION_CLIENT_TITLE = "Клиент";
var COMMUNICATION_MANAGER_TITLE = "Менеджер";

//Содержимое подвала
var FOOTER_COMPANY_INFO = "Сделано<br> на платформе";
var FOOTER_KNOWLEDGEBASE_BTN_TXT = "База знаний";
var FOOTER_SUB_LABEL = "Подписка";

//Утилиты
var TIP_TG = "Чат с поддержкой";
var TIP_CONNECTION = "Нет связи с сервисом";
var TIP_DISABLED = "Эта функция находится\n в разработке";
var TIP_FORBIDDEN = "Вы не выбрали учащегося";
var SEARCH_LABEL = "Поиск...";
var SEL_LABEL = "Выберите из списка";
var CAL_DAYS = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб"
  ];

var CAL_MONTHS = [
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


function updateLocalization(isEng){
    if (isEng){

    }
}