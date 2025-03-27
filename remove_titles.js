(function () {
    'use strict';

    function startPlugin() {
        window.remove_titles_keep_year_plugin = true;

        function addPlugin() {
            Lampa.Lang.add({
                settings_interface_remove_titles_keep_year: {
                    be: 'Пакінуць толькі год',
                    bg: 'Остави само годината',
                    cs: 'Ponechat pouze rok',
                    en: 'Keep only year',
                    he: 'השאר רק שנה',
                    pt: 'Manter apenas o ano',
                    ru: 'Оставить только год',
                    uk: 'Залишити тільки рік',
                    zh: '仅保留年份'
                }
            });

            Lampa.SettingsApi.addParam({
                component: 'interface',
                param: {
                    name: 'remove_titles_keep_year',
                    type: 'switch',
                    "default": false
                },
                field: {
                    name: Lampa.Lang.translate('settings_interface_remove_titles_keep_year')
                },
                onChange: function () {
                    updateTitlesVisibility();
                    Lampa.Layer.update();
                }
            });

            // Функция для скрытия всего текста, кроме года
            function updateTitlesVisibility() {
                const removeTitles = Lampa.Storage.field('remove_titles_keep_year');
                const style = $('#remove_titles_keep_year_css');

                if (removeTitles) {
                    if (!style.length) {
                        $('<style id="remove_titles_keep_year_css">' +
                          '.card__name, .card__title, .card__info, .title, .name { display: none !important; }' + // Скрываем названия
                          '.card__year, .year { display: block !important; }' + // Оставляем год
                          '</style>').appendTo('head');
                    } else {
                        style.html('.card__name, .card__title, .card__info, .title, .name { display: none !important; } .card__year, .year { display: block !important; }');
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

    if (!window.remove_titles_keep_year_plugin) startPlugin();
})();
