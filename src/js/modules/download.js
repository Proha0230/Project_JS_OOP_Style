export default class Download{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

// мы пишем ф-цию которая будет создавать загрузчик фотографии по клику на кнопку Download PDF, таким образом можно хоть что кинуть 
// в загрузку. Мы создаем элемент <a></a> предаем ей атрибуты href где путь будет наш this.path приходящий в ф-цию, так же добавляем атрибут
// download и параметр nice_picture.  Скрываем его, назначая стиль display='none', затем добавляем нашему элементу ссылки в дочерний элемент
// в body, используем метод click() который инициирует клик по элементу и затем удаляем этот элемент из списка дочерних элементов в body
downloadItem(path){
const element = document.createElement('a');
element.setAttribute('href', path);
element.setAttribute('download', 'nice_picture');
element.style.display='none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
}

// здесь мы отменяем стандартное поведение браузера и отменяем всплытие,
// чтоб у нас не перелистывал при скачивании файла на первый самый слайд
init() {
this.btns.forEach(item => {
item.addEventListener('click', (e)=>{
this.downloadItem(this.path);
e.preventDefault();
e.stopPropagation();
});
});
}
}