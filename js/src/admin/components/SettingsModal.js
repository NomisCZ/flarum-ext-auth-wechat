import { settings } from '@fof-components';
import { SettingsModal as FoFSettingsModal } from 'flarum/components/SettingsModal';

import config from '../../config';

const {
    items: { StringItem },
} = settings;

export default class SettingsModal extends FoFSettingsModal {
    oninit(vnode) {
        super.oninit(vnode);
        this.setting = this.setting.bind(this);
    }

    className() {
        return `${config.module.id}SettingsModal Modal--small`;
    }

    title() {
        return app.translator.trans(`${config.module.name}.admin.settings.title`);
    }

    form() {
        return [
            <div className="Form-group">
                <StringItem
                    name={`${config.package.name}.app_id`}
                    setting={this.setting}
                    {...{ ['required']: true }}
                >
                    {app.translator.trans(`${config.module.name}.admin.settings.api_app_id`)}
                </StringItem>
            </div>,
            <div className="Form-group">
                <StringItem
                    name={`${config.package.name}.app_secret`}
                    setting={this.setting}
                    {...{ ['required']: true }}
                >
                    {app.translator.trans(`${config.module.name}.admin.settings.api_app_secret`)}
                </StringItem>
            </div>
        ];
    }
}
