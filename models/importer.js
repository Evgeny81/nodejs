import fs from 'fs';
import {resolve} from 'path';
import csv from 'csvtojson';
import {CHANGE, DELETE} from '../constants';
import {dirWatcher} from './dirwatcher';

export class Importer {
    constructor() {
        this.files = {};
    }

    import(path) {
        return Promise.resolve(this.files[path] || {})
    }

    importSync(path) {
        return this.files[path] || {};
    }

    handleChangeEvent({path, fileName, operation}) {
        fs.readdir(path, (err) => {
            if (err) throw new Error(err);
            if (!this.files[path]) {
                this.files[path] = {};
            }
            const currentDir = this.files[path];
            switch (operation) {
                case CHANGE:
                    this.transformCSVtoJSON({path, fileName});
                    break;
                case DELETE:
                    if (currentDir[fileName]) {
                        delete currentDir[fileName];
                    }
                    if (!Object.keys(currentDir).length) {
                        delete this.files[path];
                    }
                    break;
                default:
                    console.log('Something unexpected has happened');
                    break;
            }

        })
    }

    transformCSVtoJSON({fileName, path}) {
        const filePath = resolve(path, fileName);
        csv().fromFile(filePath)
            .then((json)=>{
                this.files[path][fileName] = JSON.stringify(json);
            });
    }
}
