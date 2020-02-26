import Alert from 'flarum/components/Alert';

export default class WeChatApplication
{
    wechatLinkComplete(returnCode) {

        let alert;

        switch (returnCode) {

            case 'already_linked':
                app.modal.close();
                app.alerts.show(
                    alert = new Alert({
                        type: 'error',
                        children: app.translator.trans('nomiscz-auth-wechat.forum.alerts.already_linked'),
                    })
                );
                break;
            case 'already_used':
                app.alerts.show(
                    alert = new Alert({
                        type: 'error',
                        children: app.translator.trans('nomiscz-auth-wechat.forum.alerts.already_used'),
                    })
                );
                break;
            case 'done':
                app.modal.close();
                app.session.user.savePreferences();
                app.alerts.show(
                    alert = new Alert({
                        type: 'success',
                        children: app.translator.trans('nomiscz-auth-wechat.forum.alerts.link_success'),
                    })
                );
                break;
            case 'error':
                app.alerts.show(
                    alert = new Alert({
                        type: 'error',
                        children: app.translator.trans('nomiscz-auth-wechat.forum.alerts.error'),
                    })
                );
                break;
        }

        setTimeout(() => {
            app.alerts.dismiss(alert);
        }, 8000);
    }
}