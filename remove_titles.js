(function () {
    'use strict';

    function startPlugin() {
        window.remove_all_text_plugin = true;

        function addPlugin() {
            // Добавляем перевод для переключателя
            Lampa.Lang.add({
                settings_interface_remove_all_text: {
                    ru: 'Удалить весь текст под карточками',
                    en: 'Remove all text under cards',
                    uk: 'Видалити весь текст під картками'
                }
            });

            // Регистрируем параметр в настройках
            Lampa.SettingsApi.addParam({
                component: 'interface',
                param: {
                    name: 'remove_all_text',
                    type: 'switch',
                    default: false
                },
                field: {
                    name: Lampa.Lang.translate('settings_interface_remove_all_text'),
                    description: Lampa.Lang.translate('settings_interface_remove_all_text')
                },
                onChange: function () {
                    updateTextVisibility();
                    Lampa.Layer.update();
                }
            });

            // Убедимся, что параметр добавляется в нужную секцию
            Lampa.Settings.listener.follow('open', function (e) {
                if (e.name === 'interface') {
                    const item = e.body.find('[data-name="remove_all_text"]');
                    if (item.length) {
                        item.detach();
                        item.insertAfter(e.body.find('.settings-interface__params').children().first());
                    }
                }
            });

            // Функция скрытия текста
            function updateTextVisibility() {
                const removeAllText = Lampa.Storage.get('remove_all_text', false);
                const styleId = 'remove_all_text_css';
                let style = document.getElementById(styleId);

                if (removeAllText) {
                    if (!style) {
                        style = document.createElement('style');
                        style.id = styleId;
                        style.innerHTML
