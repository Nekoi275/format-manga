const fs = require('fs');

const MANGAFOLDER = '../../Manga';
const MANGA = 'Ah! My Goddess! Eng (complete)';
const COPYDIR = `${MANGAFOLDER}/${MANGA}(copy)`;

function createChapters(dir) {
    let volumes = fs.readdirSync(dir, { withFileTypes: true });
    let chapterNumber = 0;
    for (let i = 0; i < volumes.length; i++) {
        let chapters = fs.readdirSync(`${dir}/${volumes[i].name}`, { withFileTypes: true });
        for (let j = 0; j < chapters.length; j++) {
            if (!fs.lstatSync(`${dir}/${volumes[i].name}/${chapters[j].name}`).isDirectory()) {
                console.log('Not a volume.')
                break;
            }

            fs.rename(`${dir}/${volumes[i].name}/${chapters[j].name}`, `${dir}/ch ${chapterNumber}`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    if (j === chapters.length - 1) {
                        fs.rmdir(`${dir}/${volumes[i].name}`, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Successfully removed the volume.')
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
