const fs = require('fs');

const MANGAFOLDER = '../../Manga';
const MANGA = 'Ah! My Goddess! Eng (complete)';
const copyDir = `${MANGAFOLDER}/${MANGA}(copy)`;

/* fs.cp(`${MANGAFOLDER}/${MANGA}`, copyDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Successfully copied')
}) */

function createChapters(dir) {
    let volumes = fs.readdirSync(dir, { withFileTypes: true });
    let chapterNumber = 0;
    for (let i = 0; i < volumes.length; i++) {
        let chapters = fs.readdirSync(`${dir}/${volumes[i].name}`, { withFileTypes: true });
        for (let j = 0; j < chapters.length; j++) {
            fs.rename(`${dir}/${volumes[i].name}/${chapters[j].name}`, `${dir}/ch ${chapterNumber}`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Successfully created the chapter.")
                }
            })
            chapterNumber++;
        }
        fs.rmdir(`${dir}/${volumes[i].name}`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully removed the volume.")
            }
        })
    }
}

createChapters(copyDir)