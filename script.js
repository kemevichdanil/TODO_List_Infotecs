// Получение списка названий заданий для дальнейших возможных изменений
function getTextFrom(ul) {    
  const list = ul.querySelectorAll('li'); // Получаем массив состоящий из элементов 'li' то есть наших TODO
  return [...list].map(item=> item.textContent) // Возвращаем новый массив, состоящий только из названий самих TODO
}
bruh = getTextFrom(document.querySelector('ul')); // Сохраняем названия TODO в отдельную переменную

//Функция по обновлению массивов с именами после внесения изменений
function update_list_name() {
  bruh = getTextFrom(document.querySelector('ul'));
  myNodelist = document.getElementsByTagName("LI");
}

var myNodelist = document.getElementsByTagName("LI"); // Получение всех TODO в отдельную переменную

// Вывод названия из списка в окно редактирования
var spis = document.querySelector("ul"); // Получение 'ul' для дальнейших манипуляций с ним
spis.addEventListener('click', function(ev) { // Добавляем событие по клику
  if (ev.target.tagName === 'LI') {
    document.getElementById("title").innerHTML = ev.target.innerHTML; // Вывод на экран редактирования названия TODO
    document.getElementById("task_title").value = ''; // Обнуление окна ввода, на случай, если там что-то осталось после прошлого редактирования
  }
}, false);

// Функция обновления имени по нажатию на кнопку "Сохранить изменения"
var new_title = document.getElementById("task_edited"); // получение кнопки "Сохранить изменения"
new_title.addEventListener('click', function init_title() { // Добавление события по клику на кнопку
  title_forTry = document.getElementById("task_title").value; // Получаем значение из окна ввода
  title_onEdit = document.getElementById("title"); // Получаем старое название TODO
  if (title_forTry != ''){ // Проверка на пустое значение окна ввода
    ident = bruh.findIndex(i => i == title_onEdit.innerHTML) // Получение индекса TODO из списка, если таковой существует
    myNodelist[ident].textContent = title_forTry; // Обновление названия в окне слева
    title_onEdit.innerHTML = title_forTry; // Обновление названия в окне редактирования
    bruh = getTextFrom(document.querySelector('ul'));
  } else {
    alert('Введите новое название') // В случае пустого окна ввода, вывод на экран сообщения
  }
});

// Удаление задания из списка
var del = document.getElementById("task_delete"); // Получаем кнопку удаления
del.addEventListener('click', function deleting() { // Добавление события по клику на полученную кнопку
  title_onEdit = document.getElementById("title"); // Получение имени для дальнейшей проверки на наличие TODO 
  ident = bruh.findIndex(i => i == title_onEdit.innerHTML); // Получение индекса конкретного TODO по его имени
  if (ident != -1) {
    myNodelist[ident].style.display = "none"; // Скрываем TODO
    update_list_name(); // Обновляем массив имен
    document.getElementById("title").innerHTML = "Выберите задание, которое хотите отредактировать"; // Выводим в окне редактирования вместо удаленного имени 
    document.getElementById("task_title").value = ''; // Обнуляем окно ввода нового имени
  }
  
})

// Обновление статуса задания Выполнено/Не выполнено
var complete = document.getElementById('task_completed'); // Получение кнопки "Выполнено"
complete.addEventListener('click', function () { // Добавление события по клику
  title_onEdit = document.getElementById("title"); // Получение имени TODO, которому необходимо установить статус
  ident = bruh.findIndex(i => i == title_onEdit.innerHTML); // Получение индекса данного TODO
  if (ident != -1) {
    myNodelist[ident].classList.toggle("checked"); // В случае, если задание "не выполнено" обновляем статус на "на выполнено" и наоборот
    myNodelist[ident].classList.remove("in_progress"); // Если статус "В процессе", то так же убираем его
  }
  
})

// Установка статуса задания на "В процессе"
var progress = document.getElementById('task_inProgress'); // Получение кнопки "В процессе"
progress.addEventListener('click', function () { // Добавление события по клику
  title_onEdit = document.getElementById("title"); // Получение имени TODO, которому необходимо установить статус
  ident = bruh.findIndex(i => i == title_onEdit.innerHTML); // Получение индекса данного TODO
  if (ident != -1) {
    myNodelist[ident].classList.toggle("in_progress"); // В случае, если задание "В процессе" обновляем статус на "Не выполнено" и наоборот
    myNodelist[ident].classList.remove("checked"); // Если статус "Выполнено", то так же убираем его
  }
  
})

// Добавление нового элемента по нажатию на кнопку "Добавить"
function newElement() {
  var li = document.createElement("li"); // Создаем новый элемент "li"
  var inputValue = document.getElementById("myInput").value; // Получаем значение из окна ввода
  var t = document.createTextNode(inputValue); // Создаем текстовый элемент и помещаем туда полученое из окна ввода значение
  li.appendChild(t); // Помещаем текстовый элемент в "li"
  if (inputValue === '') { // Проверка на наличие имени для нового TODO
    alert("Вам необходимо что-то ввести"); // Вывод на экран сообщения в случае, если окно ввода осталось пустым
  } else {
    document.getElementById("myUL").appendChild(li); // Получаем наш список TODO и добавляем туда ранее созданный "li" с именем
  }
  document.getElementById("myInput").value = ""; // Обнуляем значение окна ввода
  
  update_list_name(); // Обновляем массивы имен для будущих изменений

}


// Добавление возможности изменения ширины 
var p = document.getElementById('todoList'); // Получаем блок TODO
var d = document.getElementById('todoEdit'); // Получаем блок редактирования TODO
var resizeBar = document.getElementById('resizeBar'); // Получаем блок, который будет отвечать за изменение ширины
resizeBar.addEventListener('mousedown', initDrag, false); // Добавляем событие по удержанию мыши

var startX, startWidth, startWidth2; // Создаем необходимые переменные


function initDrag(e) {
   startX = e.clientX; // Получаем X координату мыши
   startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10); // Получаем ширину блока списка TODO
   startWidth2 = parseInt(document.defaultView.getComputedStyle(d).width, 10); // Получаем ширину блока редактирования TODO
   document.documentElement.addEventListener('mousemove', doDrag, false); // Добавляем событие по движению мыши
   document.documentElement.addEventListener('mouseup', stopDrag, false); // Добавляем событие по отпусканию кнопки мыши
}

// Изменение ширины относительно координаты мыши
function doDrag(e) {
  p.style.width = (startWidth + e.clientX - startX) + 'px';
  d.style.width = (startWidth2 - e.clientX + startX) + 'px';
}

// Обнуляем события по движению мыши
function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

// Реализация поиска
function filterFunction() {
  var input, filter, ul, li, i; // Резервируем необходимые координаты
  input = document.getElementById("mySearch"); // Получение окна ввода поиска
  filter = input.value.toUpperCase(); // Получение значения из окна ввода и перевод в верхний регистр для поиска независимо от того, в каком регистре писал пользователь
  ul = document.getElementById("myUL"); // Получение списка TODO для поиска по нему
  li = ul.getElementsByTagName("li"); // Получаем массив "li"
  for (i = 0; i < li.length; i++) { // Поиск методом перебора
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) { // Проверка на наличие значения из окна поиска в имени TODO
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}