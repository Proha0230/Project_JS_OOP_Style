export default class ShowInfo {
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
    }


init(){

// мы перебираем все кнопки и назначаем обработчик события клик. Мы берем элемент кнопки, ищем ближайший родительский элемент с 
// классом .module__info-show и обращаемся к его соседнему элементу и тогглим его (показываем/скрываем по клику) по нажатию на кнопку триггер
this.btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
const sibling = btn.closest('.module__info-show').nextElementSibling;
sibling.classList.toggle('msg');
sibling.style.marginTop='20px';
});
});
}
} 
