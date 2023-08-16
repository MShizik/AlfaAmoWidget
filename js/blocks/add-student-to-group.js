var groupData = [{
    name: "Группа 1",
    teacher: "Иванов В.А. ",
    limit: "9/12",
    comment: "Комментарий"
}];

var groupColumns = [
'',
'Название группы',
'Педагог',
'Количество/лимит<br> учеников',
'Комментарий'
];

let groupTable = new CustomTable(document.querySelector("#add-student-to-group-table-container"), groupData, groupColumns);
