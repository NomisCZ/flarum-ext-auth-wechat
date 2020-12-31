import { extend } from 'flarum/extend';
import app from 'flarum/app';

import config from '../config';

import SettingsPage from 'flarum/components/SettingsPage';
import Application from './components/Application';
import UnlinkModal from "./components/UnlinkModal";
import LinkModal from "./components/LinkModal";

import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import Button from 'flarum/components/Button';

app.initializers.add(`nomiscz/${config.package.name}`, () => {

    extend(SettingsPage.prototype, 'accountItems', (items) => {
        const {
            data: {
                attributes: {
                    WeChatAuth: {
                        isLinked = false
                    },
                },
            },
        } = app.session.user;

        items.add(`link${config.module.id}`,
            <Button className={`Button ${config.module.id}Button--${isLinked ? 'danger' : 'success'}`} icon={config.module.icon}
                path={`/auth/${name}`} onclick={() => app.modal.show(isLinked ? UnlinkModal : LinkModal)}>
                {app.translator.trans(`${config.module.name}.forum.buttons.${isLinked ? 'unlink' : 'link'}`)}
            </Button>
        );
    });

    extend(LogInButtons.prototype, 'items', (items) => {
        items.add(config.package.id,
            <LogInButton
                className={`Button LogInButton--${config.module.id}`}
                icon={config.module.icon}
                path={config.api.uri}>
                {app.translator.trans(`${config.module.name}.forum.buttons.login`)}
            </LogInButton>
        );
    });
});

app.wechat = new Application();