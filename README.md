<details> 
  <summary>image</summary>
   <p align="center">
  <img src="./images/image007.png" >
</p>

</details>

"spoiler"

spoiler

<div class="carousel">
    <div class="carousel-inner">
        <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked">
        <div class="carousel-item">
            <img src="./images/image004.png">
        </div>
        <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item">
            <img src="./images/image006.png">
        </div>
        <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item">
            <img src="./images/image004.png">
        </div>
        <label for="carousel-3" class="carousel-control prev control-1">‹</label>
        <label for="carousel-2" class="carousel-control next control-1">›</label>
        <label for="carousel-1" class="carousel-control prev control-2">‹</label>
        <label for="carousel-3" class="carousel-control next control-2">›</label>
        <label for="carousel-2" class="carousel-control prev control-3">‹</label>
        <label for="carousel-1" class="carousel-control next control-3">›</label>
        <ol class="carousel-indicators">
            <li>
                <label for="carousel-1" class="carousel-bullet">•</label>
            </li>
            <li>
                <label for="carousel-2" class="carousel-bullet">•</label>
            </li>
            <li>
                <label for="carousel-3" class="carousel-bullet">•</label>
            </li>
        </ol>
    </div>
</div>


[Описание](#0)    
[Загрузка данных](#1)    
[Настройка решателя СЛАУ](#2)    
[Вывод результатов](#3)    
[Настройка графика](#4)    
[Сохранение результатов](#5)    
[Реализация под Android Qt QML](./slau-qml/slau_qml)    
<a name="0"></a>
### Описание
Программа написана в рамках дипломного поекта ,с использованием технологий Qt Widget ,QCustomPlot, MatLab, С++.
Реализованы следующие методы:
- Метод Гаусса
- Метод Якоби
- Метод Зейделя
- Метод Минимальных невязок
- Метод сопряженных градиентов
- Метод Q-регуляризации
- Метод наискорейшего спуска с глоб. выбором порядка Q-градиента ([описание метода](http://www.ivdon.ru/ru/magazine/archive/n3y2015/3150))
- Метод наискорейшего спуска с покоординатным выбором порядка Q-градиента ([описание метода](http://www.ivdon.ru/ru/magazine/archive/n3y2015/3150))
- Метод мин.невязок с глоб. выбором порядка Q-градиента ([описание метода](http://www.ivdon.ru/ru/magazine/archive/n3y2015/3150))
- Метод мин.невязок с покоординатным выбором порядка Q-градиента ([описание метода](http://www.ivdon.ru/ru/magazine/archive/n3y2015/3150))
- Matlab метод минимальных невязок ([взят из библиотеки МАТЛАБ](http://www.mathworks.com/help/matlab/ref/minres.html))
- Matlab метод квазиминимальных невязок ([взят из библиотеки МАТЛАБ](http://www.mathworks.com/help/matlab/ref/qmr.html))
- Matlab метод бисопряженных градиентов ([взят из библиотеки МАТЛАБ](http://www.mathworks.com/help/matlab/ref/bicg.html))
- МНК
- LU
- QR

_ _ _

Программа считывает данные из текстовых файлов (*.txt) которые подготавливает пользователь. Файл должен содержать СЛАУ в виде расширенной матрицы элементы которой разделены пробелами или табуляциями.
<p>Создать новый текстовый документ matrix.txt и записать в него приведенную ниже СЛАУ в виде расширенной матрицы</p>
<p align="center">
  <img src="./images/image001.png" >
</p>
<p align="center">
  <img src="./images/image003.png" >
</p>

<a name="1"></a>
### Загрузка данных
Для загрузки СЛАУ в меню «Файл» выбрать пункт меню «Загрузить СЛАУ» и выбрать файл с данными.
<p align="center">
  <img src="./images/image004.png" >
</p>

Для построения графика готового решения выбрать пункт меню «Загрузить тестовые данные» и выбрать файл с результатами решения СЛАУ. После чего будет построен график.
<a name="2"></a>
### Настройка решателя СЛАУ 
После загрузки СЛАУ необходимо выбрать в меню «Решение» пункт меню «Решение СЛАУ»
<p align="center">
  <img src="./images/image005.png" >
</p>

Откроется диалоговое окно настройки решателя.
<p align="center">
  <img src="./images/image006.png" >
</p>

В первом поле «Тип решателя» выбирается метод решения. Далее в группе checkBox-ов можно выбрать методы регуляризации. В зависимости от выбранного метода становятся доступны дополнительные поля настроек:
точность решения, число итераций, порядок Q-градиента, порядок Alfa. После нажатия кнопки «ок» начинается поиск решения.
<a name="3"></a>
### Вывод результатов 
Результаты выводятся в виде графика и текстовой информации (режим «Extended mode»).
<p align="center">
  <img src="./images/image013.png" >
</p>
<p align="center">
  <img src="./images/image015.png" >
</p>

В процессе решения СЛАУ могут выводится информационные окна с
предупреждениями.
Предупреждение о плохой обусловленности СЛАУ.
<p align="center">
  <img src="./images/image007.png" >
</p>

В случае если решение не найдено за заданное количество итераций выводится информационное окно с предложением вывести результаты последней итерации.
<p align="center">
  <img src="./images/image008.png" >
</p>

Если решение не найдено за 3 секунды выводится прогресс диалог с информацией об установленном и текущем количестве итераций, а также прогресс выполнения итераций в процентах.
<p align="center">
  <img src="./images/image009.png" >
</p>

При невозможности решить СЛАУ выбранным методом выводятся соответствующие информационные окна.
<p align="center">
  <img src="./images/image010.png"  height="125">
  <img src="./images/image011.png" >
  <img src="./images/image012.png" >
</p>

<a name="4"></a>
### Настройка графика 
На графике реализовано контекстное меню графика и легенды. Для вызова контекстного меню графика выбрать график на форме или легенде ЛКМ и вызвать меню ПКМ.
<p align="center">
  <img src="./images/image016.png" >
</p>

В меню графика имеется возможность удаления выбранного графика, удаление всех графиков, настройка графика. 
В меню легенды добавлены пункты перемещения легенды на форме по углам и центру. 
<p align="center">
  <img src="./images/image017.png" >
</p>

При выборе пункта меню «Настроить График» выводится форма настроек графика. На форме настроек можно изменить цвет, стиль, размер, точек и линии выбранного графика. 
<p align="center">
  <img src="./images/image018.png" >
</p>

При изменении настроек происходит динамическое изменение графика.
<p align="center">
  <img src="./images/image019.png" >
</p>
<p align="center">
  <img src="./images/image020.png" >
</p>

<a name="5"></a>
### Сохранение результатов
<p align="center">
  <img src="./images/image004.png" >
</p>

1. «Сохранить решение» - сохраняет в текстовый файл (*.txt) результаты решения СЛАУ и информацию о решаемой СЛАУ.
<p align="center">
  <img src="./images/image015.png" >
</p>
2. «Экспорт графика» - сохраняет график решения в *.jpg файл.
<p align="center">
  <img src="./images/image022.png" >
</p>
3. «Печать» - выводит окно с предварительным просмотром печати результатов.
<p align="center">
  <img src="./images/image024.png" >
</p>
