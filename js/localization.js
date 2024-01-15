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
var ADD_STUDENT_UPDATE_LINK_TXT = "Обновить";
var ADD_STUDENT_RES_REFRESH_LINK_TXT_SUC = "Ссылка обновлена";
var ADD_STUDENT_RES_UPDATE_DATA_TXT_SUC = "Данные обновлены";
var ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE = "Ошибка";
var ADD_STUDENT_RES_ADD_TXT_SUC = "Студент добавлен";
var ADD_STUDENT_RES_ADD_TXT_FAILURE = "Студент не был добавлен";

//Содержимое блока добавления студента на урок
var LESSON_ADD_STUDENT_BLOCK_DESC = "Добавить ученика на урок";
var LESSON_ADD_STUDENT_SEL_LESSON_LABEL = "Урок";
var LESSON_ADD_STUDENT_SEL_SUBJECT_LABEL = "Предмет";
var LESSON_ADD_STUDENT_SEL_DATES_LABEL = "Выбрать даты:";
var LESSON_ADD_STUDENT_SEL_TEACHER_LABEL = "Педагог";
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
    'Количество учеников',
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
var ADD_PAYMENT_BLOCK_DESC = "Передать платеж";
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

//Содержимое блока аналитики
var ANALYTICS_BLOCK_DESC = "Аналитика";
var ANALYTICS_COLUMN_MONEY_BALANCE_DESC = "Остаток<br>по сумме";
var ANALYTICS_COLUMN_LESSONS_BALANCE_DESC = "Остаток по урокам<br>(все абонементы)";
var ANALYTICS_COLUMN_PURCHASES_AMOUNT_DESC = "Общее количество<br>покупок";
var ANALYTICS_COLUMN_TOTAL_PURCHASES_SUM_DESC = "Общая сумма<br>покупок";
var ANALYTICS_COLUMN_AVG_PURCHASES_SUM_DESC = "Средний<br>чек";

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
var ZERO_SEL_LABEL = "Выбор отсутсвует";
var CAL_FROM = "с ";
var CAL_TO = "по ";
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


  function updateLocalization(isEng) {
    if (isEng) {
  
      BASIC_ERROR_UNREGISTER = 'Register at <a href="https://comontech.ru">comontech.ru</a>';
      BASIC_ERROR_SUB = "Renew subscription";
  
      STUDENT_CHOSER_BLOCK_DESC = "Select a student in AlfaCRM";
      STUDENT_CHOSER_PARENT_LABEL = "Parent/Customer";
      STUDENT_CHOSER_STUDENT_LABEL = "Student";
      STUDENT_CHOSER_STUDENT_WARN = "Student not selected";
      STUDENT_CHOSER_BRANCH_LABEL = "Branch";
      STUDENT_CHOSER_BRANCH_WARN = "Branch not selected";
      FORBIDDEN_TIP_STUDENT_EXIST = "Student already registered in AlfaCRM";
      FORBIDDEN_TIP_STUDENT_UNEXIST = "Student not registered in AlfaCRM";
  
      ADD_STUDENT_BLOCK_DESC = "Add student to AlfaCRM";
      ADD_STUDENT_IS_LEAD_LABEL = "Add as lead";
      ADD_STUDENT_MAIN_BTN_TXT = "Add student to AlfaCRM";
      ADD_STUDENT_REFRESH_LINK_TXT = "Restore link";
      ADD_STUDENT_UPDATE_LINK_TXT = "Update";
      ADD_STUDENT_RES_REFRESH_LINK_TXT_SUC = "Link updated";
      ADD_STUDENT_RES_UPDATE_DATA_TXT_SUC = "Data updated";
      ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE = "Error";
      ADD_STUDENT_RES_ADD_TXT_SUC = "Student added";
      ADD_STUDENT_RES_ADD_TXT_FAILURE = "Student was not added";
  
      LESSON_ADD_STUDENT_BLOCK_DESC = "Add student to the lesson";
      LESSON_ADD_STUDENT_SEL_LESSON_LABEL = "Lesson";
      LESSON_ADD_STUDENT_SEL_SUBJECT_LABEL = "Subject";
      LESSON_ADD_STUDENT_SEL_DATES_LABEL = "Choose dates:";
      LESSON_ADD_STUDENT_MAIN_BTN_TXT = "Add student to the lesson";
      LESSON_ADD_STUDENT_RES_ADD_TXT_SUC = "Student added to the lesson";
      LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE = "An error occurred";
      LESSON_ADD_STUDENT_SEL_TEACHER_LABEL = "Teacher";
      
  
      LESSON_ADD_STUDENT_GROUP_COLUMNS_LIST = [
        '',
        'Date',
        'Lesson Time',
        'Subject',
        'Teacher',
        'Classroom',
        'Group Name',
        'Student Limit',
        'Comment'
      ];
      LESSON_ADD_STUDENT_SHORT_COLUMNS_LIST = [
        '',
        'Date',
        'Lesson Time',
        'Subject',
        'Teacher',
        'Classroom',
        'Student`s amount',
        'Comment'
      ];
  
      ADD_LESSON_BLOCK_DESC = "Create a lesson";
  
      GROUP_ADD_STUDENT_BLOCK_DESC = "Add student to group";
      GROUP_ADD_STUDENT_SEL_GROUP_LABEL = "Group";
      GROUP_ADD_STUDENT_CAL_BLOCK_MAIN_TITLE = "Select dates:";
      GROUP_ADD_STUDENT_CAL_BLOCK_DESC = "Select the participation period in the group. If the end date is not specified, the student will be added indefinitely";
      GROUP_ADD_STUDENT_MAIN_BTN_TXT = "Add student to group";
      GROUP_ADD_STUDENT_RES_ADD_SUC = "Student added to group";
      GROUP_ADD_STUDENT_RES_ADD_FAILURE = "Student not added to group";
      GROUP_ADD_STUDENT_COLUMNS = [
        '',
        'Group Name',
        'Teacher',
        'Count/<br>Student Limit',
        'Comment'
      ];
  
      ADD_PAYMENT_BLOCK_DESC = "Submit a payment";
      ADD_PAYMENT_SEL_CAS_TITLE = "Cash Register";
      ADD_PAYMENT_SEL_CATEGORY_TITLE = "Categories";
      ADD_PAYMENT_SEL_INCOME_TITLE = "Income Item";
      ADD_PAYMENT_MAIN_BTN_TXT = "Top up balance";
      ADD_PAYMENT_RES_ADD_SUC = "Payment added";
      ADD_PAYMENT_RES_FAILURE = "An error occurred";
  
      ADD_ABONEMENT_BLOCK_DESC = "Add subscription";
      ADD_ABONEMENT_SEL_ABONEMENT_TITLE = "Subscription";
      ADD_ABONEMENT_DATA_BLOCK_MAIN_TITLE = "Add subscription:";
      ADD_ABONEMENT_DATA_BLOCK_MAIN_DESC = "Choose data to add subscription";
      ADD_ABONEMENT_MAIN_BTN_TXT = "Add subscription";
      ADD_ABONEMENT_SEL_LESSON_LABEL = "Select lessons:";
      ADD_ABONEMENT_SEL_SUBJ_LABEL = "Select subjects:";
      ADD_ABONEMENT_CHECKBOX_PAY_STYLE_LABEL = "Separate payment type";
      ADD_ABONEMENT_RES_ADD_SUC = "Subscription added";
      ADD_ABONEMENT_RES_FAILURE = "An error occurred";
      ADD_ABONEMENT_TABLE_COLUMS = [
        '',
        'Subscription Name',
        'Billing',
        'Price',
        'Validity Period'
      ];
  
      COMMUNICATION_BLOCK_DESC = "Communications";
      COMMUNICATION_MAIN_BTN = "Load next 10 messages";
      COMMUNICATION_CLIENT_TITLE = "Client";
      COMMUNICATION_MANAGER_TITLE = "Manager";

       ANALYTICS_BLOCK_DESC = "Analytics";
       ANALYTICS_COLUMN_MONEY_BALANCE_DESC = "Balance";
       ANALYTICS_COLUMN_LESSONS_BALANCE_DESC = "Lessons balance<br>(all abonements)";
       ANALYTICS_COLUMN_PURCHASES_AMOUNT_DESC = "Total purchases<br>amount";
       ANALYTICS_COLUMN_TOTAL_PURCHASES_SUM_DESC = "Total<br>purchases sum";
       ANALYTICS_COLUMN_AVG_PURCHASES_SUM_DESC = "Average<br>purchase sum";
  
      FOOTER_COMPANY_INFO = "Made<br> on the platform";
      FOOTER_KNOWLEDGEBASE_BTN_TXT = "Knowledge Base";
      FOOTER_SUB_LABEL = "Subscription";
  
      TIP_TG = "Chat with support";
      TIP_CONNECTION = "No connection to the service";
      TIP_DISABLED = "This feature is under development";
      TIP_FORBIDDEN = "You have not selected a student";
      SEARCH_LABEL = "Search...";
      SEL_LABEL = "Select from the list";
      ZERO_SEL_LABEL = "Nothing to select";
      CAL_FROM = "from ";
      CAL_TO = "to ";
      CAL_DAYS = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ];
  
      CAL_MONTHS = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];
    } else {
      BASIC_ERROR_UNREGISTER = 'Зарегистрируйтесь <a href="https://comontech.ru">comontech.ru</a>';
      BASIC_ERROR_SUB = "Продлите подписку";
  
      STUDENT_CHOSER_BLOCK_DESC = "Выбрать учащегося в AlfaCRM";
      STUDENT_CHOSER_PARENT_LABEL = "Родитель/заказчик";
      STUDENT_CHOSER_STUDENT_LABEL = "Ученик";
      STUDENT_CHOSER_STUDENT_WARN = "Ученик не выбран";
      STUDENT_CHOSER_BRANCH_LABEL = "Филиал";
      STUDENT_CHOSER_BRANCH_WARN = "Филиал не выбран";
      FORBIDDEN_TIP_STUDENT_EXIST = "Учащийся уже записан в AlfaCRM";
      FORBIDDEN_TIP_STUDENT_UNEXIST = "Учащийся не записан в AlfaCRM";
  
      ADD_STUDENT_BLOCK_DESC = "Записать учащегося в AlfaCRM";
      ADD_STUDENT_IS_LEAD_LABEL = "Записать как лид";
      ADD_STUDENT_MAIN_BTN_TXT = "Записать учащегося в AlfaCRM";
      ADD_STUDENT_REFRESH_LINK_TXT = "Восстановить ссылку";
      ADD_STUDENT_UPDATE_LINK_TXT = "Обновить";
      ADD_STUDENT_RES_REFRESH_LINK_TXT_SUC = "Ссылка обновлена";
      ADD_STUDENT_RES_UPDATE_DATA_TXT_SUC = "Данные обновлены";
      ADD_STUDENT_RES_SUBACTIONS_TXT_FAILURE = "Ошибка";
      ADD_STUDENT_RES_ADD_TXT_SUC = "Студент добавлен";
      ADD_STUDENT_RES_ADD_TXT_FAILURE = "Студент не был добавлен";
  
      LESSON_ADD_STUDENT_BLOCK_DESC = "Добавить ученика на урок";
      LESSON_ADD_STUDENT_SEL_LESSON_LABEL = "Урок";
      LESSON_ADD_STUDENT_SEL_SUBJECT_LABEL = "Предмет";
      LESSON_ADD_STUDENT_MAIN_BTN_TXT = "Добавить ученика на урок";
      LESSON_ADD_STUDENT_RES_ADD_TXT_SUC = "Студент добавлен на урок";
      LESSON_ADD_STUDENT_RES_ADD_TXT_FAILURE = "Произошла ошибка";
      LESSON_ADD_STUDENT_SEL_DATES_LABEL = "Выбрать даты:";
      LESSON_ADD_STUDENT_SEL_TEACHER_LABEL = "Педагог";
  
      LESSON_ADD_STUDENT_GROUP_COLUMNS_LIST = [
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
      LESSON_ADD_STUDENT_SHORT_COLUMNS_LIST = [
        '',
        'Дата',
        'Время урока',
        'Предмет',
        'Педагог',
        'Аудитория',
        'Количество учеников',
        'Комментарий'
      ];
  
      ADD_LESSON_BLOCK_DESC = "Создать урок";
  
      GROUP_ADD_STUDENT_BLOCK_DESC = "Добавить ученика в группу";
      GROUP_ADD_STUDENT_SEL_GROUP_LABEL = "Группа";
      GROUP_ADD_STUDENT_CAL_BLOCK_MAIN_TITLE = "Выбрать даты:";
      GROUP_ADD_STUDENT_CAL_BLOCK_DESC = "Выберите период участия в группе. Если не указано по какое число добавляется ученик, то он добавляется бессрочно";
      GROUP_ADD_STUDENT_MAIN_BTN_TXT = "Добавить ученика в группу";
      GROUP_ADD_STUDENT_RES_ADD_SUC = "Студент добавлен в группу";
      GROUP_ADD_STUDENT_RES_ADD_FAILURE = "Студент не добавлен в группу";
      GROUP_ADD_STUDENT_COLUMNS = [
        '',
        'Название группы',
        'Педагог',
        'Количество/<br>лимит учеников',
        'Комментарий'
      ];
  
      ADD_PAYMENT_BLOCK_DESC = "Передать платеж";
      ADD_PAYMENT_SEL_CAS_TITLE = "Касса";
      ADD_PAYMENT_SEL_CATEGORY_TITLE = "Категории статей";
      ADD_PAYMENT_SEL_INCOME_TITLE = "Статья дохода";
      ADD_PAYMENT_MAIN_BTN_TXT = "Пополнить баланс";
      ADD_PAYMENT_RES_ADD_SUC = "Платеж добавлен";
      ADD_PAYMENT_RES_FAILURE = "Произошла ошибка";
  
      ADD_ABONEMENT_BLOCK_DESC = "Добавить абонемент";
      ADD_ABONEMENT_SEL_ABONEMENT_TITLE = "Абонемент";
      ADD_ABONEMENT_DATA_BLOCK_MAIN_TITLE = "Добавить абонемент:";
      ADD_ABONEMENT_DATA_BLOCK_MAIN_DESC = "Выберите данные для добавления абонемента";
      ADD_ABONEMENT_MAIN_BTN_TXT = "Добавить абонемент";
      ADD_ABONEMENT_SEL_LESSON_LABEL = "Выберите уроки:";
      ADD_ABONEMENT_SEL_SUBJ_LABEL = "Выберите предметы:";
      
       ADD_ABONEMENT_CHECKBOX_PAY_STYLE_LABEL = "Раздельный тип расчетов";
       ADD_ABONEMENT_RES_ADD_SUC = "Абонемент добавлен";
       ADD_ABONEMENT_RES_FAILURE = "Произошла ошибка";
       ADD_ABONEMENT_TABLE_COLUMS = [
            '',
            'Название абонемента',
            'Тарификация',
            'Стоимость',
            'Период действия'
        ];

       COMMUNICATION_BLOCK_DESC = "Коммуникации";
       COMMUNICATION_MAIN_BTN = "Загрузить следующие 10 сообщений";
       COMMUNICATION_CLIENT_TITLE = "Клиент";
       COMMUNICATION_MANAGER_TITLE = "Менеджер";

      ANALYTICS_BLOCK_DESC = "Аналитика";
      ANALYTICS_COLUMN_MONEY_BALANCE_DESC = "Остаток<br>по сумме";
      ANALYTICS_COLUMN_LESSONS_BALANCE_DESC = "Остаток по урокам<br>(все абонементы)";
      ANALYTICS_COLUMN_PURCHASES_AMOUNT_DESC = "Общее количество<br>покупок";
      ANALYTICS_COLUMN_TOTAL_PURCHASES_SUM_DESC = "Общая сумма<br>покупок";
      ANALYTICS_COLUMN_AVG_PURCHASES_SUM_DESC = "Средний<br>чек";

       FOOTER_COMPANY_INFO = "Сделано<br> на платформе";
       FOOTER_KNOWLEDGEBASE_BTN_TXT = "База знаний";
       FOOTER_SUB_LABEL = "Подписка";

       TIP_TG = "Чат с поддержкой";
       TIP_CONNECTION = "Нет связи с сервисом";
       TIP_DISABLED = "Эта функция находится\n в разработке";
       TIP_FORBIDDEN = "Вы не выбрали учащегося";
       SEARCH_LABEL = "Поиск...";
       SEL_LABEL = "Выберите из списка";
       ZERO_SEL_LABEL = "Выбор отсутсвует";
       CAL_FROM = "с ";
       CAL_TO = "по ";
       CAL_DAYS = [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ];

       CAL_MONTHS = [
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
    }
}