(function() {
    'use strict';
    if (window.remove_all_text_plugin) return;
    window.remove_all_text_plugin = true;

    function initPlugin() {
        Lampa.Lang.add({
            settings_remove_all_text: {
                ru: 'Скрыть текст карточек',
                en: 'Hide cards text'
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'remove_all_text',
                type: 'switch',
                default: false
            },
            field: {
                name: Lampa.Lang.translate('settings_remove_all_text')
            },
            onChange: updateVisibility
        });

        function updateVisibility() {
            const isActive = Lampa.Storage.get('remove_all_text', false);
            const style = document.getElementById('remove_all_text_style');
            if (isActive) {
                if (!style) {
                    const newStyle = document.createElement('style');
                    newStyle.id = 'remove_all_text_style';
                    newStyle.textContent = `
                        .card__title, .card__description, .year, .card__info { 
                            display: none !important; 
                        }
                    `;
                    document.head.appendChild(newStyle);
                }
            } else if (style) {
                style.remove();
            }
        }

        // Динамическое обновление
        const observer = new MutationObserver(updateVisibility);
        observer.observe(document.body, { childList: true, subtree: true });
        updateVisibility();
    }

    if (typeof Lampa !== 'undefined') initPlugin();
    else window.addEventListener('lampa-loaded', initPlugin);
})();
