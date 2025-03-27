(function() {
    'use strict';
    
    if (window.remove_titles_plugin) return;
    window.remove_titles_plugin = true;

    let observer;
    let styleElement;

    function initPlugin() {
        // Добавляем перевод
        Lampa.Lang.add({
            settings_remove_titles: {
                ru: 'Скрыть названия',
                en: 'Hide titles',
                uk: 'Приховати назви'
            }
        });

        // Регистрируем параметр
        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'remove_titles',
                type: 'switch',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('settings_remove_titles'),
                description: ''
            },
            onChange: updateTitles
        });

        // Привязка к открытию настроек
        Lampa.Settings.listener.follow('open', (e) => {
            if(e.name === 'interface') {
                const element = e.body.find('[data-name="remove_titles"]');
                if(element.length) {
                    element.detach();
                    element.insertAfter(e.body.find('.settings-interface__params').children().first());
                }
            }
        });

        // Инициализация стилей
        styleElement = document.createElement('style');
        styleElement.id = 'remove_titles_css';
        document.head.appendChild(styleElement);

        // Наблюдатель за изменениями
        observer = new MutationObserver(updateTitles);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        updateTitles();
    }

    function updateTitles() {
        const isActive = Lampa.Storage.get('remove_titles');
        const shadowRoot = document.querySelector('lampa-app').shadowRoot;
        
        if(isActive) {
            styleElement.innerHTML = `
                .card__name, 
                .card__title, 
                .title {
                    display: none !important;
                }
            `;
            
            // Для элементов внутри Shadow DOM
            if(shadowRoot) {
                shadowRoot.querySelectorAll('.card__name, .card__title, .title').forEach(el => {
                    el.style.display = 'none';
                });
            }
        }
        else {
            styleElement.innerHTML = '';
            if(shadowRoot) {
                shadowRoot.querySelectorAll('.card__name, .card__title, .title').forEach(el => {
                    el.style.display = '';
                });
            }
        }
    }

    // Запуск после инициализации Lampa
    if(window.appready) initPlugin();
    else Lampa.Listener.follow('app', e => {
        if(e.type === 'ready') initPlugin();
    });

})();
