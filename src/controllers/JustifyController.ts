export const justifyText = (text: string): string => {
    const MAXLENGTH : number = 80;
    let currentLine : string = '';
    let result : string = '';
    let word : string = '';
    let lineLength : number = 0;
    let i : number = 0;

    if (text.length < MAXLENGTH) {
        return text;
    }
    while (i < text.length) {
        const char : string = text[i];

        if (char === '\n') {
            if (lineLength + word.length <= MAXLENGTH) {
                currentLine += word;
                word = '';
            }
            i++;
            continue;
        }

        if (char === ' ') {
            if (lineLength + word.length + 1 <= MAXLENGTH) {
                currentLine += word + ' ';
                lineLength += word.length + 1;
                word = '';
            } else {
                result += justifyLine(currentLine.trim(), MAXLENGTH) + '\n';
                currentLine = word + ' ';
                lineLength = word.length + 1;
                word = '';
            }
        } else {
            word += char;
        }

        i++;
    }

    if (word) currentLine += word;
    if (currentLine) result += justifyLine(currentLine.trim(), MAXLENGTH);

    return result;
};
function justifyLine(line: string, targetLength: number): string {
    let spaceNeeded : number = targetLength - line.length;
    const words : string[] = line.split(' ');
    let spaceSlots : number = words.length - 1;

    if (spaceSlots === 0) return line;

    let spacesPerSlot : number = Math.floor(spaceNeeded / spaceSlots);
    let extraSpaces: number = spaceNeeded % spaceSlots;

    let justifiedLine: string = '';
    for (let i : number = 0; i < words.length; i++) {
        justifiedLine += words[i];
        if (i < spaceSlots) {
            justifiedLine += ' '.repeat(spacesPerSlot + 1);
            if (extraSpaces > 0) {
                justifiedLine += ' ';
                extraSpaces--;
            }
        }
    }
    return justifiedLine;
}

