import app from 'flarum/app';
import config from '../config';
import AdminSettingsModal from './components/AdminSettingsModal';

app.initializers.add(config.module.name, () => {
    app.extensionSettings[config.module.name] = () => app.modal.show(AdminSettingsModal);
});
