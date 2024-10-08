export const justifyText = (text: string): string => {
    const words = text.split(' ');
    const justifiedLines: string[] = [];
    let currentLine = '';

    for (let word of words) {
        if ((currentLine + word).length <= 80) {
            currentLine += word + ' ';
        } else {
            justifiedLines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }
    if (currentLine) justifiedLines.push(currentLine.trim());

    return justifiedLines
        .map(line => {
            let spacesNeeded = 80 - line.length;
            let spaceCount = line.split(' ').length - 1;
            let lineArr = line.split(' ');
            if (spaceCount > 0) {
                for (let i = 0; spacesNeeded > 0 && i < lineArr.length - 1; i++) {
                    lineArr[i] += ' ';
                    spacesNeeded--;
                }
            }
            return lineArr.join(' ');
        })
        .join('\n');
};
