(function() {
    'use strict';
    if (window.remove_all_text_plugin) return;
    window.remove_all_text_plugin = true;

    let lampaRoot = null;

    // Ждём загрузки корневого элемента Lampa
    function waitForShadowRoot() {
        const rootElement = document.querySelector('lampa-app');
        if (rootElement && rootElement.shadowRoot) {
            lampaRoot = rootElement.shadowRoot;
            initPlugin();
        } else {
            setTimeout(waitForShadowRoot, 100);
        }
    }

    function initPlugin() {
        // Добавляем перевод
        const translations = {
            ru: 'Скрыть текст карточек',
            en: 'Hide cards text',
            uk: 'Приховати текст карток'
        };

        // Регистрируем параметр в настройках
        const SettingsApi = lampaRoot.querySelector('settings-api').__vue__;
        SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'remove_all_text',
                type: 'switch',
                default: false
            },
            field: {
                name: translations.ru // Можно добавить мультиязычность через Lampa.Lang
            },
            onChange: updateVisibility
        });

        // Применяем стили к Shadow DOM
        function updateVisibility() {
            const isActive = SettingsApi.storage.get('remove_all_text', false);
            const styleId = 'remove_all_text_style';
            let style = lampaRoot.getElementById(styleId);

            if (isActive) {
                if (!style) {
                    style = document.createElement('style');
                    style.id = styleId;
                    style.textContent = `
                        .card__content > *:not(.card__image),
                        .card-v__content > *:not(.card-v__image),
                        .card-h__content > *:not(.card-h__image) {
                            display: none !important;
                        }
                    `;
                    lampaRoot.appendChild(style);
                }
            } else if (style) {
                style.remove();
            }
        }

        // Обработка динамического контента внутри Shadow DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => updateVisibility());
        });

        observer.observe(lampaRoot, {
            childList: true,
            subtree: true
        });

        // Первичная активация
        updateVisibility();
    }

    // Старт
    waitForShadowRoot();
})();
