import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Alert from 'flarum/components/Alert';

export default class WeChatUnlinkModal extends Modal {
    className() {
        return 'AuthWeChatUnlinkModal Modal--small';
    }

    title() {
        return app.translator.trans('nomiscz-auth-wechat.forum.modals.unlink.title');
    }

    content() {
        const {
            data: {
                attributes: {
                    WeChatAuth: {
                        providersCount = 0
                    },
                },
            },
        } = app.session.user;

        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group" id="submit-button-group">
                        <h3>{app.translator.trans('nomiscz-auth-wechat.forum.modals.unlink.info.confirm')}</h3>
                        {(providersCount <= 1)
                            ?
                            <p className="WeChatText--danger"><i className="fas fa-exclamation-triangle fa-fw" />
                                <b>{app.translator.trans('nomiscz-auth-wechat.forum.modals.unlink.info.no_providers')}</b>
                            </p>
                            : ''
                        }
                        <br/>
                        <div className="ButtonGroup">
                            {Button.component({
                                type: 'submit',
                                className: 'Button WeChatButton--danger',
                                icon: 'fas fa-exclamation-triangle',
                                loading: this.loading,
                                children: app.translator.trans('nomiscz-auth-wechat.forum.modals.unlink.buttons.confirm'),
                            })}
                            {Button.component({
                                className: 'Button Button--primary',
                                children: app.translator.trans('nomiscz-auth-wechat.forum.modals.unlink.buttons.cancel'),
                                disabled: this.loading,
                                onclick: () => this.hide()
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onsubmit(e) {

        let alert;

        e.preventDefault();
        this.loading = true;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/auth/wechat/unlink',
            data: '',
        }).then(() => {
            app.alerts.show(
                alert = new Alert({
                    type: 'success',
                    children: app.translator.trans('nomiscz-auth-wechat.forum.alerts.unlink_success'),
                })
            );
            this.hide();
            app.session.user.savePreferences();
        });

        setTimeout(() => {
            app.alerts.dismiss(alert);
        }, 8000);
    }
}