import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns){
        super(container, btns);
    }

    showSlides(n) {

// проверяем если slideIndex больше чем число наших карточек то он переключит на первую, это если мы листаем дальше
// чем 6 (последняя наша карточка), то он переключит на 1 карточку(слайд)
        if(n > this.slides.length){
            this.slideIndex = 1;
        }
// так же только если мы нажмем на 1 слайд на кнопку назад, он переключит на последний - 6 слайл   
        if(n < 1){
            this.slideIndex = this.slides.length;
        }
    
        try {

// мы инициализируем всплывающее окно с челом 
            this.hanson = document.querySelector('.hanson');
// придаем ему прозрачность '0' (0%)
            this.hanson.style.opacity ='0';
// пишем условие, что если номер нашей страницы 3 то
            if(n===3){
// добавляем класс анимации нашему элементу со всплывающим окном
                this.hanson.classList.add('animated');
// через setTimeout мы пишем что - через 3 секунды как пользователь переключится на 3 страницу сайта
// оно придаст нашему всплывающему окну прозрачность "1" (100% видимости) и добавит класс анимации 'sildeInUp'
// т.е. визуальнро будет выглядеть как будто оно выезжает снизу вверх
                setTimeout(()=>{
                    this.hanson.style.opacity ='1';
                    this.hanson.classList.add('sildeInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) {}

// перебираем все слайды наших страниц на сайте и все делаем display='none'
        Array.from(this.slides).forEach(slide => {
            slide.style.display='none';
        });
// выбираем первый слайд страницы и ему придает display='block' т.е. показываем его   
        this.slides[this.slideIndex - 1].style.display='block';
    }
    
// ф-ция перелистывания слайдов мы складываем и присваиваем число в slideIndex 
    plusSlides(n){
        this.showSlides(this.slideIndex += n);
    }

// мы берем все кнопки которые указываем в this.btns перебираем их и навешиваем обработчик события клик
// мы запускаем ф-цию и передаем в нее 1 - т.е. мы прибавляем к нашему slideIndex +1
    bindTrigger(){
        this.btns.forEach(item => {
            item.addEventListener('click', ()=> {
                this.plusSlides(1);
            });

// мы обращаемся нашей кнопке по которой мы переходим вперед по слайдеру, 
// обращаемся к ее родителю и выбираем предыдущий элемент от ее родителя и обращаемся к нему
// так же через обработчик события клик - мы отменяем стандартное поведение браузера, и назначаем в slideIndex = 1, 
// т.е. у нас перейдет на самый первый слайд таким образом и запускаем ф-цию переключаения слайдов передавая в нее slideIndex = 1
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
            e.preventDefault();
            this.slideIndex = 1;
            this.showSlides(this.slideIndex);
            });
        });

// здесь мы добавляем кнопки навигации по слайдам для второй страницы. мы инициализиурем все элементы по указанному классу
// перебираем их, назначаем обработчик события клик, отменяем всплытие ф-ции, отменяем стандартное поведение браузера и изменяем 
// slideIndex - 1 ( отнимаем единицу )
        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });
// здесь мы добавляем кнопки навигации по слайдам для второй страницы. мы инициализиурем все элементы по указанному классу
// перебираем их, назначаем обработчик события клик, отменяем всплытие ф-ции, отменяем стандартное поведение браузера и изменяем 
// slideIndex + 1 ( прибавляем единицу )
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) =>{
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }
    
    render(){
// здесь мы задаем условие на наличия слайдера указанного (container'a) т.к. у нас этот модуль запускается как на первой 
// html странице , так и на второй. и чтоб они не конфликтовали друг с другом и не путались мы делаем эту проверку.
    if(this.container){

        this.showSlides(this.slideIndex); 
        this.bindTrigger();       
    }
  }
}