import SettingsModal from 'flarum/components/SettingsModal';

export default class WeChatSettingsModal extends SettingsModal {
    className() {
        return 'AuthWeChatSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('nomiscz-auth-wechat.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                <label>{app.translator.trans('nomiscz-auth-wechat.admin.settings.api_app_id')}</label>
                <input className="FormControl" bidi={this.setting('flarum-ext-auth-wechat.app_id')}/>
            </div>,
            <div className="Form-group">
                <label>{app.translator.trans('nomiscz-auth-wechat.admin.settings.api_app_secret')}</label>
                <input className="FormControl" bidi={this.setting('flarum-ext-auth-wechat.app_secret')}/>
            </div>,
        ];
    }
}
