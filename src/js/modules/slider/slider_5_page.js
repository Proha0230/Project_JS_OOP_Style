// модуль слайдера для 5ой страницы нашего сайта.

import Slider from "./slider";

// мы наследует у нашего родительского класса его свойства
export default class Slider5Page extends Slider {
    constructor(container, next, prev, activeClass){
        super(container, next, prev, activeClass);
    }

// ф-ция показа нашего слайдера. мы инициализиурем наши элементы которые нам будут нужны для работы слайдера
// это элементы слайдера, класс активного слайдера, и собственно сам слайдер
    mySlider(n){
    this.feedItem = document.querySelectorAll('.feed__item');
    this.active = document.querySelector('.feed__item-active');
    this.contSlider = document.querySelector('.feed__slider');

// проверяем если slideIndex больше чем число наших карточек то он переключит на первую, это если мы листаем дальше
// чем 6 (последняя наша карточка), то он переключит на 1 карточку(слайд)
    if(n > this.feedItem.length){
        this.slideIndex = 1;
    }

// так же только если мы нажмем на 1 слайд на кнопку назад, он переключит на последний - 6 слайл
    if(n < 1){
        this.slideIndex = this.feedItem.length;
    }

// перебираем все наши слайды , удаляем им всем активный класс если он есть и ставим им всем display='none' (скрываем)
    Array.from(this.feedItem).forEach(item => {
    item.classList.remove('feed__item-active');
    item.style.display='none';     
// выбираем самый 1 слайд из списка и назначает ему класс активности и свойство display='block' чтоб показался наш слайд
    this.feedItem[this.slideIndex - 1].classList.add('feed__item-active');
    this.feedItem[this.slideIndex - 1].style.display='block';
    })
}


// ф-ция перелистывания слайдов мы складываем и присваиваем число в slideIndex в зависимости от кнопки на которую жмем
// так же добавляем слайду класс активности
    plusSlides(n) {
    this.mySlider(this.slideIndex += n);
    this.feedItem[this.slideIndex - 1].classList.add('feed__item-active');
    }
    
    bindTriggers(){
// мы инициализируем все кнопки "назад" с классом '.slick-prev' , перебираем их и назначаем обработчик события по клику - 
// мы отменяем стандартное поведение браузера и отменяем всплытие ф-ций чтоб функция не продолжала дальше свой маршрут
// на соседние элементы с похожими классами и отнимаем от slideIndex - 1
        document.querySelectorAll('.slick-prev').forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

// мы инициализируем все кнопки "вперед" с классом '.slick-next' , перебираем их и назначаем обработчик события по клику - 
// мы отменяем стандартное поведение браузера и отменяем всплытие ф-ций чтоб функция не продолжала дальше свой маршрут
// на соседние элементы с похожими классами и прибавляем к slideIndex + 1
        document.querySelectorAll('.slick-next').forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    
    init(){
try{

// задаем стили для слайдера нашего
    this.container.style.cssText= `
    display: block;
    overflow: hidden;
    align-items: center;
    `;

// запускаем наши функции
    this.bindTriggers();
    this.mySlider(this.slideIndex);
} catch(e) {}
}

}
