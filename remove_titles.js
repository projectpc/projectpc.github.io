(function() {
    'use strict';

    // Защита от повторного запуска
    if (window.remove_all_text_plugin) return;
    window.remove_all_text_plugin = true;

    // Ожидание загрузки Lampa
    function waitForLampa() {
        if (typeof Lampa === 'object' && Lampa.SettingsApi) {
            initPlugin();
        } else {
            setTimeout(waitForLampa, 200);
        }
    }

    function initPlugin() {
        // Добавляем перевод
        Lampa.Lang.add({
            settings_remove_all_text: {
                ru: 'Скрыть текст карточек',
                en: 'Hide cards text',
                uk: 'Приховати текст карток'
            }
        });

        // Регистрируем параметр
        Lampa.SettingsApi.addParam({
            component: 'main',
            param: {
                name: 'remove_all_text',
                type: 'switch',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('settings_remove_all_text'),
                description: Lampa.Lang.translate('settings_remove_all_text')
            },
            onChange: updateVisibility
        });

        // Применяем стили
        function updateVisibility() {
            const isActive = Lampa.Storage.get('remove_all_text', false);
            const styleId = 'remove_all_text_style';
            let style = document.getElementById(styleId);

            if (isActive) {
                if (!style) {
                    style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        .card__content > *:not(.card__image):not(.card__poster),
                        .card-v__content > *:not(.card-v__image),
                        .card-h__content > *:not(.card-h__image) {
                            display: none !important;
                        }
                    `;
                    document.head.appendChild(style);
                }
            } else if (style) {
                style.remove();
            }
        }

        // Обработка динамического контента
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    updateVisibility();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Первичная активация
        updateVisibility();

        // Перехват ошибок
        window.addEventListener('error', function(e) {
            console.error('RemoveAllText Plugin Error:', e.error);
        });
    }

    // Старт
    if (typeof Lampa === 'object') {
        initPlugin();
    } else {
        waitForLampa();
    }
})();
