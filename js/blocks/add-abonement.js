var abonementTableColumns = [
    '',
    'Название абонемента',
    'Тарификация',
    'Стоимость',
    'Период действия'
];
var abonementTableData = [
    {
        name: "Абонемент 1",
        tariff: 'Тариф 1',
        price: '20 000 р.',
        period: '03.08.2023–03.09.2023'
    }, {
        name: "Абонемент 2",
        tariff: 'Тариф 1',
        price: '20 000 р.',
        period: '03.08.2023–03.09.2023'
    }, {
        name: "Абонемент 3",
        tariff: 'Тариф 1',
        price: '20 000 р.',
        period: '03.08.2023–03.09.2023'
    }, {
        name: "Абонемент 4 с очень длинным названием",
        tariff: 'Тариф 1',
        price: '20 000 р.',
        period: '03.08.2023–03.09.2023'
    }
];


let addAbonementSearchTable = new SearchWithTable(document.querySelector("#add_abonement_table_container"), document.querySelector("#add_abonement_search_input"), abonementTableData, abonementTableColumns)
