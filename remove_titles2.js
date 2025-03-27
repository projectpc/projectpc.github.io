(function () {
    'use strict';

    function startPlugin() {
        window.remove_titles_plugin = true;

        function addPlugin() {
            Lampa.Lang.add({
                settings_interface_remove_titles: {
                    en: 'Remove titles',
                    ru: 'Удалить названия'
                }
            });

            Lampa.SettingsApi.addParam({
                component: 'interface',
                param: {
                    name: 'interface_remove_titles',
                    type: 'switch',
                    "default": false
                },
                field: {
                    name: Lampa.Lang.translate('settings_interface_remove_titles')
                },
                onChange: function () {
                    updateTitlesVisibility();
                    Lampa.Layer.update();
                }
            });

            // Функция для скрытия/показа названий
            function updateTitlesVisibility() {
                const removeTitles = Lampa.Storage.field('interface_remove_titles');
                const style = $('#remove_titles_css');

                if (removeTitles) {
                    if (!style.length) {
                        $('<style id="remove_titles_css">.card__age, .card__title { display: none !important; }</style>').appendTo('head');
                    } else {
                        style.html('.card__age, .card__title { display: none !important; }');
                    }
                } else {
                    style.remove();
                }
            }

            // Обработка динамического контента
            const observer = new MutationObserver(() => {
                updateTitlesVisibility();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Инициализация при загрузке
            updateTitlesVisibility();
        }

        if (window.appready) {
            addPlugin();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addPlugin();
            });
        }
    }

    if (!window.remove_titles_plugin) startPlugin();
})();
