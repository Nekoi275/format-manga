const fs = require('fs');

const MANGAFOLDER = '../../Manga';
const MANGA = 'Ah! My Goddess! Eng (complete)';
const copyDir = `${MANGAFOLDER}/${MANGA}(copy)`;

fs.cp(`${MANGAFOLDER}/${MANGA}`, copyDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Successfully copied')
})

