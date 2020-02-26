import { extend } from 'flarum/extend';
import app from 'flarum/app';

import SettingsPage from 'flarum/components/SettingsPage';
import WeChatApplication from './components/WeChatApplication';
import WeChatUnlinkModal from "./components/WeChatUnlinkModal";
import WeChatLinkModal from "./components/WeChatLinkModal";

import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import Button from 'flarum/components/Button';

app.initializers.add('nomiscz/flarum-ext-auth-wechat', () => {

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

        items.add('linkWeChat',
            Button.component({
                className: `Button WeChatButton--${isLinked ? 'danger' : 'success'}`,
                icon: 'fab fa-weixin',
                children: app.translator.trans(`nomiscz-auth-wechat.forum.buttons.${isLinked ? 'unlink' : 'link'}`),
                onclick: () => app.modal.show(isLinked ? new WeChatUnlinkModal() : new WeChatLinkModal())
            })
        );
    });

    extend(LogInButtons.prototype, 'items', (items) => {
        items.add('wechat',
            <LogInButton
                className="Button LogInButton--wechat"
                icon="fab fa-weixin"
                path="/auth/wechat">
                {app.translator.trans('nomiscz-auth-wechat.forum.buttons.login')}
            </LogInButton>
        );
    });
});

app.wechat = new WeChatApplication();