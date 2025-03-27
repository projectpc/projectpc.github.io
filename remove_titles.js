(function() {
    // Функция для скрытия/удаления названий
    function hideTitles() {
        // Выбираем все элементы с названиями (подберите подходящий селектор)
        const titles = document.querySelectorAll('.card__name, .card__title, .title');
        
        titles.forEach(title => {
            // Удаляем или скрываем элемент
            title.style.display = 'none';  // или title.remove()
        });
    }

    // Если контент подгружается динамически, используем MutationObserver
    const observer = new MutationObserver(() => {
        hideTitles();
    });

    // Начинаем наблюдение за изменениями DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Первый запуск
    hideTitles();
})();
