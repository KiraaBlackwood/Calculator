const result = document.querySelector('#result'), //назначаем каждой переменной кнопку, соответствующую селектору
      expression = document.querySelector('#expression'),
      num = document.querySelectorAll('.number:not(.equals)'),
      operation = document.querySelectorAll('.operation'),
      equals = document.querySelector('.equals'),
      clear = document.querySelector('#clear'),
      ce = document.querySelector('#ce');
let ex = ''; // строка выражения, которое должно быть посчитано
result.innerHTML = '0'; // присваиваем "result" изначально ноль, для отображения на странице



function clickN() { // когда нажимает на кнопку "number"
  if(!ex || typeof(ex) === 'number' || ex === '0') { //если строка выражения пустая или в ней число или она равна 0
    expression.innerHTML = this.id; //передаем в поле "result" нажатую цифру
    ex = this.id; // записывает цифру в выражение
  } else {
    expression.innerHTML += this.id; // добавляем цифру в поле "result"
    ex += this.id; // добавляем цифру в выражение
  }
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop(); //чтобы в поле "result" отображалось последнее значение
  checkLength(result.innerHTML); //проверяем длину числа в функции ниже
};

function clickO() { // когда нажимаем на operation
  if(!ex) { // если выражение пустое - не делаем ничего
    return;
  }  

  ex = ex.toString().replace(/=/, ''); // если был нажат =, заменяем на новый знак
  if (ex.match(/\/|\*|\+|-|=/)) { // если введена операция, то конвертируем все выражение в строку
    ex = eval(ex).toString();
  } 
  expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
  ex += this.id; // добавляем знак к выражению
  result.innerHTML = this.id; //отображаем в result последнюю нажатую кнопку
};


Array.from(num).forEach(function(element) { // для каждой кнопкам цифр назначаем функцию clickN
      element.addEventListener('click', clickN); // при нажатии на кнопку, запускается событие clickN 
    });

Array.from(operation).forEach(function(element) { // для каждой кнопкам операций назначаем функцию clickO
      element.addEventListener('click', clickO); // при нажатии на кнопку, запускается событие clickО
    });

// очистить все при нажатии
clear.addEventListener('click', () => { //очищаем все поля при нажатии и переменную ex
  result.innerHTML = '';
  expression.innerHTML = '';
  ex = '';
})

// очищаем последнее нажатие 
ce.addEventListener('click', () => { 
  if (!expression.innerHTML.match(/=$/)) { //если последнее нажатие не "=", чтобы не стирать результат
    
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = 0; // меняем result на 0
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g); //разделяем по знаку
      arg.splice(-1, 1); // срезом получаем последний элемент
      return arg.join(''); // и удаляем его из выражения
    }
  }
})

// посчитать все
equals.addEventListener('click', ()=> {
  if (!ex) { //если выражение пустое
    result.innerHTML = '0'; //в поле result остается 0
  } else {
    ex = eval(ex); //иначе считается записанное в ex выражение
    expression.innerHTML += '='; // добавляем в поле expression знак равенства
    result.innerHTML = trim12(ex); // а в поле result - результат, пропущенный через функцию, которая в случае необходимости приводмт число в экспоненциальный
  }
})

function checkLength(arg) { // если мы вводим слишком длинное число
  if (arg.toString().length > 14) {
    expression.innerHTML = 'number too long'.toUpperCase(); //выводим предепреждение пользователю
    result.innerHTML = '0'; // заменаем result и ex на 0 
    ex = '0';
  } 
}

function trim12(arg) { // если посчитанное число очень большое
  if (arg.toString().length > 14) { // проверяем длину числа
    ex = parseFloat(arg.toPrecision(12)); // сокращаем число до 12 знаков и переводим в float
    if (ex.toString().length > 14) { //если длина все еще 14
      ex = ex.toExponential(9); // приводим к экспоненте
    };
    return ex; // возвращаем измененное
  } else {
    return arg; // возвращаем не меняя
  }
}