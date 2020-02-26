import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class WeChatLinkModal extends Modal {
    className() {
        return 'AuthWeChatLinkModal Modal--small';
    }

    title() {
        return app.translator.trans('nomiscz-auth-wechat.forum.modals.link.title');
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button LogInButton--wechat',
                            icon: 'fab fa-weixin',
                            loading: this.loading,
                            children: app.translator.trans('nomiscz-auth-wechat.forum.buttons.login'),
                            onclick: () => this.showLogin()
                        })}
                    </div>
                </div>
            </div>
        );
    }

    showLogin() {

        const width = 600;
        const height = 400;
        const $window = $(window);

        window.open(app.forum.attribute('apiUrl') + '/auth/wechat/link', 'wechatLinkPopup',
            `width=${width},` +
            `height=${height},` +
            `top=${$window.height() / 2 - height / 2},` +
            `left=${$window.width() / 2 - width / 2},` +
            'status=no,scrollbars=no,resizable=no');
    }
}