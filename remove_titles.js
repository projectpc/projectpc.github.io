(function () {
    'use strict';

    function startPlugin() {
        window.remove_all_text_plugin = true;

        function addPlugin() {
            Lampa.Lang.add({
                settings_interface_remove_all_text: {
                    be: 'Выдаліць увесь тэкст',
                    bg: 'Премахване на всички текстове',
                    cs: 'Odstranit veškerý text',
                    en: 'Remove all text',
                    he: 'הסר כל טקסט',
                    pt: 'Remover todo o texto',
                    ru: 'Удалить весь текст',
                    uk: 'Видалити весь текст',
                    zh: '移除所有文字'
                }
            });

            Lampa.SettingsApi.addParam({
                component: 'interface',
                param: {
                    name: 'remove_all_text',
                    type: 'switch',
                    "default": false
                },
                field: {
                    name: Lampa.Lang.translate('settings_interface_remove_all_text')
                },
                onChange: function () {
                    updateTextVisibility();
                    Lampa.Layer.update();
                }
            });

            // Функция для скрытия ВСЕГО текста под карточками
            function updateTextVisibility() {
                const removeAllText = Lampa.Storage.field('remove_all_text');
                const style = $('#remove_all_text_css');

                if (removeAllText) {
                    if (!style.length) {
                        $('<style id="remove_all_text_css">' +
                          '.card__name, .card__title, .card__info, .title, .name, .card__year, .year, .card__subtitle { display: none !important; }' +
                          '</style>').appendTo('head');
                    } else {
                        style.html('.card__name, .card__title, .card__info, .title, .name, .card__year, .year, .card__subtitle { display: none !important; }');
                    }
                } else {
                    style.remove();
                }
            }

            // Обработка динамического контента
            const observer = new MutationObserver(() => {
                updateTextVisibility();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Инициализация при загрузке
            updateTextVisibility();
        }

        if (window.appready) {
            addPlugin();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addPlugin();
            });
        }
    }

    if (!window.remove_all_text_plugin) startPlugin();
})();
