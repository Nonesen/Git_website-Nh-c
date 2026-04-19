const fs = require('fs');
const path = require('path');

const directoryPath = 'c:/Users/ADMIN/Desktop/Make code/Web Nhạc/Sonify';

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (filePath.includes('node_modules') || filePath.includes('.next') || filePath.includes('.git')) {
            continue;
        }

        if (stat.isDirectory()) {
            replaceInFiles(filePath);
        } else {
            // Only process valid text files
            if (filePath.match(/\.(ts|tsx|js|jsx|json|md|html|css|env.*)$/)) {
                let content = fs.readFileSync(filePath, 'utf-8');
                let newContent = content.replace(/Sonify/g, 'Sonify').replace(/sonify/g, 'sonify');
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf-8');
                    console.log(`Updated: ${filePath}`);
                }
            }
        }
    }
}

replaceInFiles(directoryPath);
console.log("Finished text file replace.");
