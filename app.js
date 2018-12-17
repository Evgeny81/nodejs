import {DirWatcher, Importer} from './models';

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch('data', 1000);
dirWatcher.on('changed', (config) => {
    importer.handleChangeEvent(config);
});

setInterval(() => {
    console.log(importer.import('data'));
}, 1000);