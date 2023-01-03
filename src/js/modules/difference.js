
export default class Difference{
    constructor(oldOfficer, newOfficer, items){
    try{

// мы инициализируем элементы с которыми будем работать  
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.oldItems = this.oldOfficer.querySelectorAll(items);
    this.newItems = this.newOfficer.querySelectorAll(items);
// создаем два счетчика блоков для отображения новых и старых блоков
    this.oldCounter = 0;
    this.newCounter = 0;

    } catch(e) {}
}

// пишем ф-цию инициализируем кнопки плюс на наших блоках и назначаем обработчик события клик
bindTriggers(container, items, counter){
container.querySelector('.plus').addEventListener('click', (e)=> {
    e.stopPropagation();

// пишем условие что если наш счетчик блоков не равен 3 блоку ( т.к. у нас всего их 4)
// то мы задаем ему стиль display='flex' и прибавляем единицу в counter - счетчик блоков который уже видны    
    if(counter !== items.length -2){
        items[counter].style.display='flex';
        counter++;
    } else {
// если нет и мы нажимаем на плюс и появляться будет третий блок уже - то мы придаем ему свойство display='flex'
// а вот 4 блок (который блок с плюсом) мы удаляем со страницы, таким образом остается только 3 блока всего открытых 
        items[counter].style.display='flex';
        items[items.length -1].remove();
    }
});
}

// ф-ция скрытия блоков, скрывает все блоки кроме последнего (с плюсом который)
hideItems(items){
    items.forEach((item, i, arr) => {
        if( i !== arr.length -1){
            item.style.display='none';
        }
    });
}

init(){

try{

this.hideItems(this.oldItems);
this.hideItems(this.newItems);
this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);

}catch(e){}

}
}