import { extend } from 'flarum/extend';
import app from 'flarum/app';

import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('nomiscz/flarum-ext-auth-wechat', () => {
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
