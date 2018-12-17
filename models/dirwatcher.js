import EventEmitter from 'events';
import fs from 'fs';
import {resolve} from 'path';
import {CHANGE, DELETE} from '../constants';

export class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.importedFiles = {};
    }

    watch(path, delay) {
        setInterval(() => (this.readDir(path)), delay);
    }

    addUpdateFile({importedFiles, dirContent, path}) {
        dirContent.forEach((fileName) => {
            if (fileName.indexOf('.cvs') === -1) {
                return;
            }
            const filePath = resolve(path, fileName);
            const currentSize = fs.statSync(filePath).size;

            let fileUpdated = false;
            if (this.importedFiles[fileName]) {
                fileUpdated = this.importedFiles[fileName].size !== currentSize;
            }

            if (!importedFiles.includes(fileName) || fileUpdated) {
                this.importedFiles[fileName] = {
                    size: currentSize
                };
                this.emit('changed', {path, fileName, operation: CHANGE});
            }
        });
    }

    deleteFile({importedFiles, dirContent, path}) {
        importedFiles.forEach((fileName) => {
            if (!dirContent.includes(fileName)) {
                delete this.importedFiles[fileName];
                this.emit('changed', {path, fileName, operation: DELETE});
            }
        });
    }

    readDir(path) {
        fs.readdir(path, (err, dirContent) => {
            if (err) {
                throw new Error(err);
            }
            const importedFiles = Object.keys(this.importedFiles);
            if (importedFiles.length > dirContent.length) {
                this.deleteFile({importedFiles, dirContent, path});
            } else {
                this.addUpdateFile({importedFiles, dirContent, path});
            }
        });
    }
}
