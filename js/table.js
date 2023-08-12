
class CustomTable{
    constructor(container, data, columns, tableID){
        this.data = [];
        this.columns = [];
        this.container = container;
        this.table = null;
        this.tableID = tableID;
        this.create(data, columns);
    }

    create(data, columns){
        this.data = data;
        this.columns = columns;
        this.table = document.createElement('div');
        this.table.className = 'table';

        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        this.columns.forEach(function(column) {
          var th = document.createElement('th');
          th.textContent = column;
          tr.appendChild(th);
        });
        thead.appendChild(tr);
        //this.table.appendChild(thead);

        var tbody = document.createElement('tbody');

        var tbodyWrapper = document.createElement('div');
        tbodyWrapper.classList.add("tbody_wrapper");
        tbodyWrapper.appendChild(thead);
        tbodyWrapper.appendChild(tbody);

        for (let rowID = 0; rowID < data.length; rowID++){
            let row = data[rowID];

            var tr = document.createElement('tr');

            var td = document.createElement('td');
            td.className = 'table-checkbox';
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "custom-checkbox";
            checkbox.classList.add("table_checkbox");
            checkbox.id = this.tableID + "_row_" + rowID + "_checkbox";
            checkbox.name = checkbox.id;
            checkbox.value = "yes";
            td.appendChild(checkbox);

            var label = document.createElement('label');
            label.classList.add("table_label");
            label.htmlFor  = checkbox.id;
            label.innerHTML = "";
            td.appendChild(label);
            tr.appendChild(td);

            for(let i = 0; i < Object.values(row).length; i++){
                var td = document.createElement('td');
                var div = document.createElement('div');
                div.classList.add("td_text_holder");
                div.innerHTML = Object.values(row)[i]
                td.appendChild(div);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            this.setUpCheckboxBehavior(checkbox, rowID);
            this.setUpHoverEffect(tr, rowID);
        }
        this.table.appendChild(tbodyWrapper);

        if (data.length > 5){
            tbody.style['height'] = "200px";
            tbody.style['overflow-y'] = "scroll";
        }

        var tableContainer = document.getElementById('table-container');
        tableContainer.appendChild(this.table);
    }

    setUpCheckboxBehavior(checkbox, id){
        checkbox.addEventListener('change', ()=> {
            var trs = this.table.querySelectorAll("tr");
            if (checkbox.checked){
                trs[id].classList.add("prev-sibling");
            }
        });
    }

    setUpHoverEffect(tr, id){
        tr.addEventListener('mouseenter', () => {
            var trs = this.table.querySelectorAll("tr");
            trs[id].classList.add("prev-sibling");
        });
        tr.addEventListener('mouseleave', () => {
            var trs = this.table.querySelectorAll("tr");
            var checkbox = trs[id + 1].querySelector("input");
            if (checkbox === null || !checkbox.checked){
                trs[id].classList.remove("prev-sibling");
            }
        });
    }
}
