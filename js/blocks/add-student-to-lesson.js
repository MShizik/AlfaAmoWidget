ItcCustomSearchSelect.create('#add-student-to-lesson-lesson-selector', {
    name: 'add-student-to-lesson-lesson-selector',
    targetValue: 'Выбор',
    options: [
        [
            'choose1', 'Выбор 1'
        ],
        [
            'choose2', 'Выбор 2'
        ],
        [
            'choose3', 'Выбор 3'
        ],
        [
            'choose4', 'Выбор 4'
        ]
    ]
});

ItcCustomSearchSelect.create('#add-student-to-lesson-subject-selector', {
    name: 'add-student-to-lesson-subject-selector',
    targetValue: 'Выбор',
    options: [
        [
            'choose1', 'Выбор 1'
        ],
        [
            'choose2', 'Выбор 2'
        ],
        [
            'choose3', 'Выбор 3'
        ],
        [
            'choose4', 'Выбор 4'
        ]
    ]
});

let addStudentToLessonCalendar = new CustomCalendar(document.querySelector("#add-student-to-lesson-calendar"));

var lessonsData = [
    {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    },
    {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    },
    {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    },
    {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    }, {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    }, {
        date: "09.07.2023",
        time: "18:00",
        subj: "Ангийский язык",
        teacher: "Иванов В. А.",
        room: "24",
        group_name: "Новички",
        limit: "3/12",
        comment: "Комментарий"
    }

];

var lessonColumns = [
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

var addStudentToLessonTable = new CustomTable(document.querySelector("#add-student-to-lesson-table-container"), lessonsData, lessonColumns);