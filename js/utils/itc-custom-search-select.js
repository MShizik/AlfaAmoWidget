

class ItcCustomSearchSelect {
    static EL = 'itc-select';
    static EL_SHOW = 'itc-select_show';
    static EL_OPTION = 'itc-select__option';
    static EL_OPTION_SELECTED = 'itc-select__option_selected';
    static ST_SCROLL = "scrollable";
    static ST_RESIZE = "resizeble";
    static DATA = '[data-select]';
    static DATA_TOGGLE = '[data-select="toggle"]';
  
    static template(params) {
      const { name, options, targetValue } = params;
      this.basicItems = [];
      this.basicOptions = [];
      let selectedIndex = -1;
      let selectedValue = '';
      let selectedContent = 'Выберите из списка';
      options.forEach((option, index) => {
        let selectedClass = '';
        if (option[0] === targetValue) {
          selectedClass = ` ${this.EL_OPTION_SELECTED}`;
          selectedIndex = index;
          selectedValue = option[0];
          selectedContent = option[1];
        }
        this.basicOptions[index] = option[0];
        this.basicItems.push(`<li class="itc-select__option${selectedClass}" data-select="option"
          data-value="${option[1]}" data-index="${index}">${option[1]}</li>`);
      });
      return `<div class = "itc-select__container"><input type="text" class="itc-select__toggle" name="${name}"
        value="${selectedContent}" data-select="toggle" data-index="${selectedIndex}">
        </input></div><div class="itc-select__dropdown">
        <ul class="itc-select__options">${this.basicItems.join('')}</ul></div>`;
    }
  
    static hideOpenSelect() {
      document.addEventListener('click', (e) => {
        if (!e.target.closest(`.${this.EL}`)) {
          const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
          elsActive.forEach((el) => {
            el.classList.remove(this.EL_SHOW);
            el.classList.remove("select-opened");
          });
        }
      });
    }

    resize(){
      if (this._el.querySelectorAll(".itc-select__option").length >= 6){
        this._el.querySelector(".itc-select__dropdown").classList.add("scrollable");
        this._el.querySelector(".itc-select__dropdown").classList.remove("resizeble");
      }else{
        this._el.querySelector(".itc-select__dropdown").classList.add("resizeble");
        this._el.querySelector(".itc-select__dropdown").classList.remove("scrollable");
      }
    }

    static create(target, params) {
      this.params = params;
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      if (this._el) {
        return new this(target, params);
      }
      return null;
    }

    constructor(target, params) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      this._params = params || {};
      this._onClickFn = this._onClick.bind(this);
      if (this._params.options) {
        this._el.innerHTML = this.constructor.template(this._params);
        this._el.classList.add(this.constructor.EL);
      }
      this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
      this._el.addEventListener('click', this._onClickFn);
      this.resize();
      this._searchAnalizer();
    }
  
    _onClick(e) {
      const { target } = e;
      const type = target.closest(this.constructor.DATA).dataset.select;
      if (type === 'toggle') {
          this.toggle(target);
      } else if (type === 'option') {
        this._changeValue(target);
      }
    }

    _searchAnalizer(){
        var optionsWrapper = this._el.querySelector(".itc-select__options");
        var options = optionsWrapper.querySelectorAll(".itc-select__option");
        var input = this._el.querySelector(".itc-select__toggle");
        input.addEventListener('input', e => {
            let searchTerm = e.target.value;
            if (e.target.value === ''){
                let options = this._params['options'];
                let basicItems = [];
                options.forEach((option, index) => {
                    let selectedClass = '';
                    basicItems.push(`<li class="itc-select__option${selectedClass}" data-select="option"
                      data-value="${option[1]}" data-index="${index}">${option[1]}</li>`);
                });
                optionsWrapper.innerHTML = basicItems.join(' ');
            }
            var sharpedOptions = [];
            options.forEach(opt => {
                if (opt.innerHTML.toLowerCase().includes(searchTerm.toLowerCase())){
                    sharpedOptions.push(opt);
                }
            });

            if (sharpedOptions.length !== 0){
                optionsWrapper.innerHTML = '';
                sharpedOptions.forEach(opt => optionsWrapper.appendChild(opt));
            }
        });

        input.addEventListener('blur', e => {
          if (e.target.value === ''){
            e.target.value = "Выберите из списка";
          }
        });
    }
  
    _updateOption(el) {
      const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
      const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
      if (elOptionSel) {
        elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }
      elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
      this._elToggle.textContent = elOption.textContent;
      this._elToggle.value = elOption.textContent;
      this._elToggle.dataset.index = elOption.dataset.index;
      this._el.dispatchEvent(new CustomEvent('itc.select.change'));
      this._params.onSelected ? this._params.onSelected(this, elOption) : null;
      return elOption.dataset.value;
    }
  
    _reset() {
      const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
      if (selected) {
        selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }
      this._elToggle.textContent = 'Выбрать';
      this._elToggle.value = '';
      this._elToggle.dataset.index = '-1';
      this._el.dispatchEvent(new CustomEvent('itc.select.change'));
      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return '';
    }
  
    _changeValue(el) {
      if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
        this.hide();
      }
      this._updateOption(el);
      this.hide();
    }
  
    show() {
      
      if (document.querySelector(".select-opened") === null){
        document.querySelectorAll(this.constructor.EL_SHOW)
          .forEach((el) => {
            el.classList.remove(this.constructor.EL_SHOW);
          });
        this._el.classList.add(`${this.constructor.EL_SHOW}`);
        this._el.classList.add("select-opened");
      }
    }
  
    hide() {
      this._el.classList.remove(this.constructor.EL_SHOW);
      this._el.classList.remove("select-opened");
    }
  
    toggle() {
        if (this.targetValue === this.value){
            this.hide();
        }
      this.show();
    }
  
    dispose() {
      this._el.removeEventListener('click', this._onClickFn);
    }
  
    get value() {
      return this._elToggle.value;
    }
  
    set value(value) {
      let isExists = false;
      this._el.querySelectorAll('.select__option')
        .forEach((option) => {
          if (option.dataset.value === value) {
            isExists = true;
            this._updateOption(option);
          }
        });
      if (!isExists) {
        this._reset();
      }
    }
  
    get selectedIndex() {
      return this._elToggle.dataset.index;
    }
  
    set selectedIndex(index) {
      const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
      if (option) {
        this._updateOption(option);
      }
      this._reset();
    }
  }
  
  ItcCustomSearchSelect.hideOpenSelect();