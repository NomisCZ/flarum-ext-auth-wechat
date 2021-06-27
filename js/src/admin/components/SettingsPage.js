import { settings } from '@fof-components';
import ExtensionPage from 'flarum/components/ExtensionPage';

import config from '../../config';

const {
    items: { StringItem },
} = settings;

export default class SettingsPage extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
        this.setting = this.setting.bind(this);
    }
    content() {
        return [
            <div className="WeChatAuthSettingsPage">
                <div className="container">
                    <div className="Form-group">
                        <StringItem
                            name={`${config.package.name}.app_id`}
                            setting={this.setting}
                            {...{ ['required']: true }}
                        >
                            {app.translator.trans(`${config.module.name}.admin.settings.api_app_id`)}
                        </StringItem>
                    </div>
                    <div className="Form-group">
                        <StringItem
                            name={`${config.package.name}.app_secret`}
                            setting={this.setting}
                            {...{ ['required']: true }}
                        >
                            {app.translator.trans(`${config.module.name}.admin.settings.api_app_secret`)}
                        </StringItem>
                    </div>
                    {this.submitButton()}
                </div>
            </div>
        ];
    }
}
