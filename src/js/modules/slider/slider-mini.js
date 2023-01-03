
import Slider from './slider';

// указываем то что мы наследуем от нашего прототипного класса Slider
// ключевое слово super используется как ф-ция вызывающая родительский конструктор, т.е. когда мы вызываем например 
// в constructor 'next' через super, то нам передается сразу this.next = document.querySelector(next); и т.д.
export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

// ф-ция декораций наших элементов в слайдере. Сначала мы со всех слайдеров убираем активный класс, затем проверяем на animate параметр,
// false он или true. если true то мы задаем прозрачность описании в карточках слайдера 0.4 (40%), а стрелки в карточках слайдера скрываем (0%).
    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

// мы проверяем что если наш первый слайд не содержит название узла 'button' т.е. наш элемент не кнопка, то мы добавляем ему активный класс  
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

// проверяем есть ли активный параметр animate, и если есть то мы задаем первому элементу на который нажимаем - стиль прозрачности описания в карточке 
// 1 (100%) и стиль стрелок в карточке слайдера прозрачность 1 (100%) т.е видно
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

// ф-ция которая перетаскивает в конец всего дива карточку слайда и выполняет ф-цию decorizeSlides() которая проверяет на параметр
// animate/на отсутствия содержания выбранного элемента как кнопка/ и скрытие описания и стрелок у всех элементов слайдера 
    nextSlide() {
    this.container.appendChild(this.slides[0]);
    this.decorizeSlides();
    }

// ф-ция которая задаем непосрдственно на кнопки стрелок переключения слайдера уже определенные ф-ции:  перелистывания вперед, и перелистывания назад
    bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());

// мы назначаем на кнопку назад ф-цию : мы создаем переменную active, которая является последним слайдом в списке
// далее мы вставляет наш последний слайд из списка перед самым первым элементом и выполняем ф-цию decorizeSlides()
    this.prev.addEventListener('click', () => {
    let active = this.slides[this.slides.length -1];
    this.container.insertBefore(active, this.slides[0]);
    this.decorizeSlides();          
    });
    }

    init() {

// конструкцией try{} catch(e){} мы определяем есть ли у нас возможность выполнить те инструкции что написаны в блоке try {}, если есть то выполняем, 
// а если нет то пропускаем этот блок и идем дальше, при этом не вводя весь модуль в ошибку. 
    try{
        
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

// проверяем на условие autoplay параметра и если он true то мы будет выполнять ф-цию перелистывания вперед карточки слайдера каждые 5 секунд
        if (this.autoplay) {
            setInterval(() => this.nextSlide(), 5000);
        }

    } catch(e) {}

    }
}