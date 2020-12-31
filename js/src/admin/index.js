import app from 'flarum/app';
import config from '../config';
import SettingsModal from './components/SettingsModal';

app.initializers.add(config.module.name, () => {
    app.extensionSettings[config.module.name] = () => app.modal.show(SettingsModal);
});
