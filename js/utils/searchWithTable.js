class SearchWithTable{
    constructor(tableContainer, input, data, columns, checkBoxCallBack, connectedBtn, onUpdate){
        this.input = null;
        this.basicData = null;
        this.columns = null;
        this.tableContainer = null;
        this.tableObj = null;
        this.currentValue = null;
        this.checkBoxCallBack = null;
        this.connectedBtn = null;
        this.onUpdate = null;
        this.create(tableContainer, input, data, columns, checkBoxCallBack, connectedBtn, onUpdate);
    }

    create(tableContainer, input, data, columns, checkBoxCallBack, connectedBtn, onUpdate){
        this.input = input;
        this.basicData = data;
        this.columns = columns;
        this.tableContainer = tableContainer;

        this.input.value = "Поиск...";
        this.currentValue = "";
        this.tableObj = new CustomTable(this.tableContainer, this.basicData, this.columns, checkBoxCallBack);

        this.checkBoxCallBack = checkBoxCallBack;
        this.connectedBtn = connectedBtn;
        this.onUpdate = onUpdate;

        this.setUpInputBehavior()
    }

    setUpInputBehavior(){
        this.input.addEventListener('input', e => {
            this.currentValue = this.input.value;
            let searchTerm = e.target.value;
            if (e.target.value === ''){
                this.tableObj.insertData(null, this.basicData);
                this.tableObj.setUpRowOnClickHandler();
                this.connectedBtn.classList.remove("active");
                this.connectedBtn.classList.add("inactive");
                this.input.classList.add("used");
            }else{
                let sharpedData = [];
                this.basicData.forEach(dataItem => {
                    if (dataItem['name'].toLowerCase().includes(searchTerm.toLowerCase())){
                        sharpedData.push(dataItem);
                    }
                    /*Object.values(dataItem).some(value => {
                        if (value.toLowerCase().includes(searchTerm.toLowerCase())){
                            sharpedData.push(dataItem);
                            return true;
                        }
                    });*/
                });
                if(sharpedData.length !== 0){
                    this.tableObj.insertData(null, sharpedData);
                    this.tableObj.setUpRowOnClickHandler();
                    this.connectedBtn.classList.remove("active");
                    this.connectedBtn.classList.add("inactive");
                    this.onUpdate(this.tableObj);
                }
            }
        });

        this.input.addEventListener('blur', e => {
          if (e.target.value === ''){
            e.target.value = "Поиск...";
          }
          e.target.classList.remove("used");
        });

        this.input.addEventListener('focus', e => {
            if (this.currentValue === ""){
                this.input.value = "";
            }
        })
    }
}