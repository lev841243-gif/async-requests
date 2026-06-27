// получаем форму и элемент прогресс-бара
const form = document.getElementById('form');
const progress = document.getElementById('progress');

// обрабатываем отправку формы
form.addEventListener('submit', (event) => {
  // отменяем обычную отправку формы
  event.preventDefault();

  // создаём объект FormData из формы
  const formData = new FormData(form);

  // создаём AJAX-запрос
  const xhr = new XMLHttpRequest();

  // открываем POST-запрос на адрес из задания
  xhr.open('POST', form.action);

  // обновляем прогресс во время загрузки файла
  xhr.upload.addEventListener('progress', (event) => {
    // проверяем, можно ли вычислить процент загрузки
    if (event.lengthComputable) {
      // progress принимает значение от 0 до 1
      progress.value = event.loaded / event.total;
    }
  });

  // после успешной загрузки показываем 100%
  xhr.addEventListener('load', () => {
    progress.value = 1;
  });

  // отправляем данные формы
  xhr.send(formData);
});