export default class Form {
    constructor(forms){
this.forms=document.querySelectorAll(forms);
this.inputs=document.querySelectorAll('input');

// создаем текстовые сообщения о статусе нашего запроса на сервер
this.message={
    loading: 'Загрузка...',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...',
};

// указываем путь до нашего сервера в переменной path
this.path = 'assets/question.php';
}

// ф-ция очистки инпутов 
clearInputs(){
    this.inputs.forEach(item =>{
        item.value = "";
    });
}

// ф-ция валидации введенных данных в инпуты type="email". Мы разраешаем вводить только: англ буквы, цифры, @ и . (ее нужно экранировать \)
// проверка будет осуществляться по нажатию клавиш в поле ввода, так же отменяется стандратное поведение браузера
checkMailInputs(){
    const mailInputs=document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
        input.addEventListener('keypress', function(e){
        if(e.key.match(/[^a-z 0-9 @ \.]/ig)){
            e.preventDefault();
        }
      });
    });
}

initMask(){
    function createMask(event){
// создаем маску нашего номера, по ней будет вводиться номер с началом +1, скобками и т.п
        let matrix = '+1 (___) ___-____',
        i=0,
// проверяем изначальные данные чтоб не было букв а только цифры
        def = matrix.replace(/\D/g, ''),
// проверяем данные которые вводит пользователь, если будут буквы то он их автоматом удалит
        val = this.value.replace(/\D/g, '');

// условие что если дефолтные значения равны либо больше того что введено - то значения будут
// применены дефолтные. По русски говоря если мы захотим удалить +1 то +1 будет появляться снова
        if(def.length >= val.length){
            val = def;
        }


// мы берем все элементы '/./g' которые находятся внутри. (а) - это технический аргумент и вместо него будет
// вставляться каждый символ который будет находиться в матрице.
// [_\d] - мы проверяем входит ли то что мы хотим отобразить в этот диапозон
// '.test(a)' мы проверяем каждый элемент вернет либо true либо false
// i < val.length - это кол-во цифр что мы ввели больше нуля
// если два этих условия будут true то мы вернем то значение что мы вводим
// если нет и символов нет введенных то возвращаем пустую строку либо а (тот символ что ввели)
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

// проверка на блюр т.е. автоматически очищает форму если в ней ровно 3 символа - +1( 
    if(event.type === 'blur') {
        if(this.value.length == 2){
            this.value='';
        }
    }
}

// здесь мы описываем разные события в обработчик - 1) инпут когда что то вводим.
// 2) фокус когда нажали только на инпут. 3) блюр когда 3 символа только в инпуте из нашей маски. 
// и во все эти события добавляем нашу ф-цию создания маски
let inputs = document.querySelectorAll('[name="phone"]');
inputs.forEach(input => {
input.addEventListener('input', createMask);
input.addEventListener('focus', createMask);
input.addEventListener('blur', createMask);
});
}

// Асинхронная функция отправки данных с инпутов на сервер
async postData(url, data){
// ф-ция будет дожидаться когда отправятся данные и затем будет продолжена
    let res = await fetch(url, {
        method:"POST",
        bodu: data
    });
// так же ф-ция будет дожидаться пока получит результаты данных в text формате
// и будет продолжена 
    return await res.text();
}

init(){
    
    this.checkMailInputs();
    this.initMask();

// мы перебираем наши формы ввода данных и назначаем обработчик событий submit - отправка данных 
// и отменяем стандартное поведение браузера
    this.forms.forEach(item => {
        item.addEventListener('submit', (e)=>{
            e.preventDefault();
   
// создаем новый див 
    let statusMessage = document.createElement('div');
// задаем нашему диву css стили
    statusMessage.style.cssText=`
    margin-top: 15px;
    font-size: 18px;
    color: grey;
    `;

// мы обращаемся к родителю наших форм для ввода и отправки данных, и помещаем в конец списка дочерних элементов наш созданный див
    item.parentNode.appendChild(statusMessage);
// передаем текс контент нашему диву - 'Загрузка...'
    statusMessage.textContent = this.message.loading;

    const formData = new FormData(item);

//отправка данных на сервер php (по пути что мы указывали this.path) а так же при успешной отправке формы на сервер
// будет показываться сообщение - Спасибо! скоро мы с вами свяжемся
// так же при успешной отправке все данные что отправятся на сервер с нашей формы
// будут продублированы в консоль
    this.postData(this.path, formData)
    .then(res =>{
        console.log(res);
        statusMessage.textContent=this.message.success;
    })
// при ошибке отправки данных покажет сообщение - Что-то пошло не так...
    .catch(()=>{
        statusMessage.textContent=this.message.failure;
    })
// этот метод finally выполнится в любом случае, успешном или нет - отправки данных на сервер
// он выполнит ф-цию очистки инпутов, а так же удалит созданный нами div в переменной statusMessage 
// через 6 секунд после его создания
    .finally(()=>{
        this.clearInputs();
        setTimeout(()=>{
            statusMessage.remove();
        }, 6000);
    });
   });
  });
}
}