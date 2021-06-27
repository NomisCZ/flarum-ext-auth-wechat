import app from 'flarum/app';
import config from '../config';
import SettingsPage from './components/SettingsPage';

app.initializers.add(`nomiscz/${config.module.name}`, () => {
    app.extensionData.for(config.module.name).registerPage(SettingsPage);
});
