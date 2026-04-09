const fs = require('fs'); const t = fs.readFileSync('src/data/rawDistros.ts', 'utf8'); console.log(t.split('distro:').length - 1);
