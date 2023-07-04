const fs = require('fs');

const MANGAFOLDER = '../../Manga';
const MANGA = '';
const COPYDIR = `${MANGAFOLDER}/`;

function createChapters(dir) {
    let volumes = fs.readdirSync(dir, { withFileTypes: true });
    let chapterNumber = 0;
    for (let i = 0; i < volumes.length; i++) {
        let chapters = fs.readdirSync(`${dir}/${volumes[i].name}`, { withFileTypes: true });
        for (let j = 0; j < chapters.length; j++) {
            let isArchive = chapters[j].name.split('.')[1] === 'rar' || chapters[j].name.split('.')[1] === 'zip';
            let isChapter = fs.lstatSync(`${dir}/${volumes[i].name}/${chapters[j].name}`).isDirectory();
            if (!isChapter && !isArchive) {
                console.log(`${volumes[i].name} is not a volume folder.`)
                break;
            }
            let newName = isArchive ? `${dir}/ch ${chapterNumber}.${chapters[j].name.split('.')[1]}` : `${dir}/ch ${chapterNumber}`;
            fs.rename(`${dir}/${volumes[i].name}/${chapters[j].name}`, newName, (err) => {
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
