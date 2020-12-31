import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import config from '../../config';

export default class UnlinkModal extends Modal {
    className() {
        return `${config.module.id}UnlinkModal Modal--small`;
    }

    title() {
        return app.translator.trans(`${config.module.name}.forum.modals.unlink.title`);
    }

    content() {
        const {
            data: {
                attributes: {
                    'WeChatAuth': {
                        providersCount = 0
                    },
                },
            },
        } = app.session.user;

        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group" id="submit-button-group">
                        <h3>{app.translator.trans(`${config.module.name}.forum.modals.unlink.info.confirm`)}</h3>
                        {(providersCount <= 1)
                            ?
                            <p className={`${config.module.id}Text--danger`}><i className="fas fa-exclamation-triangle fa-fw" />
                                <b>{app.translator.trans(`${config.module.name}.forum.modals.unlink.info.no_providers`)}</b>
                            </p>
                            : ''
                        }
                        <br />
                        <div className="ButtonGroup">
                            <Button type={'submit'} className={`Button ${config.module.id}Button--danger`} icon={'fas fa-exclamation-triangle'}
                                loading={this.loading}>
                                {app.translator.trans(`${config.module.name}.forum.modals.unlink.buttons.confirm`)}
                            </Button>
                            <Button className={'Button Button--primary'} icon={'fas fa-exclamation-triangle'}
                                onclick={() => this.hide()} disabled={this.loading}>
                                {app.translator.trans(`${config.module.name}.forum.modals.unlink.buttons.cancel`)}
                            </Button>
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
            url: `${app.forum.attribute('apiUrl')}/${config.api.uri}/unlink`,
            data: '',
        }).then(() => {
            app.session.user.savePreferences();
            this.hide();
            alert = app.alerts.show({ type: 'success' }, app.translator.trans(`${config.module.name}.forum.alerts.unlink_success`));
        });

        setTimeout(() => {
            app.alerts.dismiss(alert);
        }, 5000);
    }
}