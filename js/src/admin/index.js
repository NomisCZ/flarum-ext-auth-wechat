import app from 'flarum/app';
import WeChatSettingsModal from './components/WeChatSettingsModal';

app.initializers.add('nomiscz-auth-wechat', () => {
    app.extensionSettings['nomiscz-auth-wechat'] = () => app.modal.show(new WeChatSettingsModal());
});
