// модуль создания модального окна с видеоплеером ютуба используя API YouTube

export default class VideoPlayer {
    constructor(triggers, overlay){
// инициализация кнопок: старта всплывающего окна, начала видео, кнопка закрыть модальное окно, 
this.btns = document.querySelectorAll(triggers);
this.overlay = document.querySelector(overlay);
this.close = this.overlay.querySelector('.close');
// переменная которая отвечает за состояние видео плеера 
this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
this.path = "";
}

// мы перебираем все кнопки и назначаем обработчик события клик
bindTriggers(){
    this.btns.forEach((btn, i) =>{

// мы обращаемся к нашим кнопкам, ищем ближайший родительский элемент с классом '.module__video-item' и
// обращаемся к его соседнему элементу 
try{
    const blockedElem = btn.closest('.module__video-item').nextElementSibling;
// условие если наш остаток кнопки деленный на 2 будет равен 0 т.е. если номер нашей кнопки второй 
if(i % 2 == 0){
// то мы придаем ему аттрибут data-disabled='true'
    blockedElem.setAttribute('data-disabled', 'true');
}
} catch(e) {}

btn.addEventListener('click', ()=>{
// мы проверяем если наша кнопка не является дочерним элементом '.module__video-item' или рядом с нашей кнопкой есть родитель с классом 
// '.module__video-item' который имеет аттрибут data-disabled НЕ 'true' (а false)
if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !=='true') {
    this.activeBtn = btn;
// пишем проверку на существование элемента <iframe id="frame"/> и если такой существует элемент
// то придаем ему стиль display='flex'
if(document.querySelector('iframe#frame')){
    this.overlay.style.display='flex';

// условие что если путь не равен пути полученному из нажатой кнопки триггера для воспроизведения видео на YouTube
if(this.path !== btn.getAttribute('data-url')) {
// то мы назначаем в нашу переменную пути this.path новый путь из аттрибута кнопки
    this.path = btn.getAttribute('data-url');
// так же запускаем метод который воспроизводит видео на YouTube благодаря передаваемому в его обьект пути с видео (это наш путь this.path)
    this.player.loadVideoById({videoId: this.path});

}
} else {
// если нет такого элемента то мы задаем путь (path) к видео файлу который берем из аттрибута кнопки - data-url
    this.path = btn.getAttribute('data-url');
// запускаем функцию создания плеера и в нее передаем путь до видео (data-url)
    this.createPlayer(this.path);

}
}
});
});
}

// ф-ция закрытия модального окна с плеером. мы перебираем все кнопки (this.close) класса что туда передадим и назначаем обработчик
// события клик. По нажатию на кнопку мы скрываем модальное окно придав ему стиль display='none' и останавливаем видео в видео плеере
// командой this.player.stopVideo()
bindCloseBtn(){
    this.close.addEventListener('click', ()=>{
    this.overlay.style.display='none';
    this.player.stopVideo();
    });
}

// ф-ция создания видео плеера YouTube в который мы выше передали путь (path) нашего url видео
createPlayer(url){
// ф-ция найдет элемент с id='frame' на странице и заменит его видео плеером, взяв его из 
// пути (src) YouTube API скрипта созданного нами "https://www.youtube.com/iframe_api"
this.player = new YT.Player('frame', {
    height: '100%',
    width: '100%',
    videoId: `${url}`,
// мы задаем событие которое будет использовать ф-цию и отвечать за отслеживание состояния видео, просмотрено оно или нет
    events: {
        'onStateChange': this.onPlayerStateChange
    }
});
// придаем стиль нашему модальному окну с плеером стилем display='flex'
this.overlay.style.display='flex';
}

// ф-ция которая разблокирует второе видео если мы просмотрим первое полностью. Когда это произойдет то наш state.data === 0. 0 - это
// просмотренное полностью видео
onPlayerStateChange(state){
try{
const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
    if(state.data === 0) {
if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
blockedElem.querySelector('.play__circle').classList.remove('closed');
blockedElem.querySelector('svg').remove();
blockedElem.querySelector('.play__circle').appendChild(playBtn);
blockedElem.querySelector('.play__text').textContent = "Play video";
blockedElem.querySelector('.play__text').classList.remove('attention');
blockedElem.style.opacity = 1;
blockedElem.style.filter = 'none';

blockedElem.setAttribute('data-disabled', 'false');
}
}
} catch(e){}
}


init(){
if(this.btns.length > 0){
// создаем элемент <script></script>
const tag = document.createElement('script');
// добавляем элементу скрипта аттрибут src
tag.src = "https://www.youtube.com/iframe_api";
//инициализируем первый элемент скрипта на странице
const firstScriptTag = document.getElementsByTagName('script')[0];
// обращаемся к родителю первого скрипта на странице и вставляем
// наш созданный элемент скрипта в список родителей перед первым скриптом на странице
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

this.bindCloseBtn();
this.bindTriggers();
}

}
}