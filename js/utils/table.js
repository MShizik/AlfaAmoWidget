
class CustomTable{
    constructor(container, data, columns, checkboxCallBack){
        this.data = [];
        this.columns = [];
        this.container = container;
        container.innerHTML = "";
        this.table = null;
        this.checkboxCallBack = null;
        this.create(data, columns,checkboxCallBack);
    }

    create(data, columns, checkboxCallBack){
        this.checkboxCallBack = checkboxCallBack;
        this.data = data;
        this.columns = columns;
        this.table = document.createElement('div');
        this.table.className = 'table';

        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        this.columns.forEach(function(column) {
          var th = document.createElement('th');
          var div = document.createElement('div');
          div.classList.add("td_text_holder");
          div.innerHTML = column;
          th.appendChild(div);
          tr.appendChild(th);
        });
        thead.appendChild(tr);

        var tbody = document.createElement('tbody');

        var tbodyWrapper = document.createElement('div');
        tbodyWrapper.classList.add("tbody_wrapper");
        var scrollabelWrapper = document.createElement('div');
        scrollabelWrapper.classList.add("scrollable_wrapper");
        tbodyWrapper.appendChild(thead);
        tbodyWrapper.appendChild(tbody);
        scrollabelWrapper.appendChild(tbodyWrapper);

        this.insertData(tbody, data);
        
        this.table.appendChild(scrollabelWrapper);
        
        this.setUpRowOnClickHandler();    

        if (data.length > 5){
            tbody.style['height'] = "200px";
            tbody.style['overflow-y'] = "scroll";
        }

        this.container.appendChild(this.table);
    }

    insertData(tbodyCont, data){
        var tbody = tbodyCont;
        if (tbody === null){
            tbody = this.table.querySelector("tbody");;
        }
        tbody.innerHTML = "";
        for (let rowID = 0; rowID < data.length; rowID++){
            let row = data[rowID];

            var tr = document.createElement('tr');

            var td = document.createElement('td');
            td.className = 'table-checkbox';
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "custom-checkbox";
            checkbox.classList.add("table_checkbox");
            checkbox.id = this.container.id.replace("-container" ,"") + "_row_" + rowID + "_checkbox";
            checkbox.name = checkbox.id;
            checkbox.value = "yes";
            td.appendChild(checkbox);

            var label = document.createElement('label');
            label.classList.add("table_label");
            label.htmlFor  = checkbox.id;
            label.innerHTML = "";
            td.appendChild(label);
            tr.appendChild(td);

            for(let i = 0; i < Object.values(row).length - 1; i++){
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
    }

    setUpCheckboxBehavior(checkbox, id){
        checkbox.addEventListener('change', ()=> {
            var trs = this.table.querySelectorAll("tr");
            if (checkbox.checked){
                trs[id].classList.add("prev-sibling");
            }
            if (this.checkboxCallBack !== undefined){
                this.checkboxCallBack(this.table, checkbox);
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

    setUpRowOnClickHandler(){
        var rows = this.table.querySelectorAll("tr");
        rows.forEach(currentRow => {
            var createClickHandler = function(row, table, checkboxCallBack) {
                return function() {
                    var checkbox = row.querySelector(".table-checkbox input");
                    if (checkbox !== null){
                        if (checkbox.checked){
                            checkbox.checked = false;
                        }else{
                            checkbox.checked = true;
                        }
                        if (checkboxCallBack !== undefined){
                            checkboxCallBack(table, checkbox);
                        }
                    }
                };
            };
            currentRow.onclick = createClickHandler(currentRow, this.table, this.checkboxCallBack);
        });
    }
}
