const fs = require('fs');
const path = require('path');

const MANGAFOLDER = '../../Reading';
const MANGA = 'claymore(manga)';
const COPYDIR = `${MANGAFOLDER}/Claymore`;

function createChapters(dir) {
    let volumes = fs.readdirSync(dir, { withFileTypes: true });
    let chapterNumber = 0;
    for (let i = 0; i < volumes.length; i++) {
        let chapters = fs.readdirSync(`${dir}/${volumes[i].name}`, { withFileTypes: true });
        for (let j = 0; j < chapters.length; j++) {
            let chapterName = `${dir}/${volumes[i].name}/${chapters[j].name}`;
            let isArchive = path.extname(chapterName).toLowerCase() === '.rar' || path.extname(chapterName).toLowerCase() === '.zip';
            let isChapter = fs.lstatSync(chapterName).isDirectory();
            if (!isChapter && !isArchive) {
                console.log(`${volumes[i].name} is not a volume folder.`)
                break;
            }
            let newName = isArchive ? `${dir}/ch ${chapterNumber}${path.extname(chapterName).toLowerCase()}` : `${dir}/ch ${chapterNumber}`;
            fs.rename(chapterName, newName, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    if (j === chapters.length - 1) {
                        fs.rmdir(`${dir}/${volumes[i].name}`, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Successfully removed the volume folder.')
                            }
                        })
                    }
                    console.log('Successfully created the chapter.')
                }
            })
            chapterNumber++;
        }
    }
}

fs.cp(`${MANGAFOLDER}/${MANGA}`, COPYDIR, { recursive: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        createChapters(COPYDIR)
        fs.appendFile(`${COPYDIR}/.nomedia`, '', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Added .nomedia file.')
            }
        })
    }
})
