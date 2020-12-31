import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

import config from '../../config';

export default class LinkModal extends Modal {
    className() {
        return `${config.module.id}LinkModal Modal--small`;
    }

    title() {
        return app.translator.trans(`${config.module.name}.forum.modals.link.title`);
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group">
                        <Button className={`Button LogInButton--${config.module.id}`} icon={config.module.icon} loading={this.loading} disabled={this.loading}
                            path={`/auth/${name}`} onclick={() => this.showLogin()}>
                            {app.translator.trans(`${config.module.name}.forum.buttons.login`)}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    showLogin() {

        const width = 600;
        const height = 400;
        const $window = $(window);

        window.open(`${app.forum.attribute('apiUrl')}/${config.api.uri}/link`, `${config.module.id}LinkPopup`,
            `width=${width},` +
            `height=${height},` +
            `top=${$window.height() / 2 - height / 2},` +
            `left=${$window.width() / 2 - width / 2},` +
            'status=no,scrollbars=no,resizable=no');

        this.loading = true;
    }
}