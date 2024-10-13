export const justifyText = (text: string): string => {
    const MAXLENGTH : number = 80;
    let currentLine : string = '';
    let result : string = '';
    let word : string = '';
    let lineLength : number = 0;
    let i : number = 0;
    let previousChar: string = '';

    const addLine = (justify: boolean) => {
        if (currentLine.trim().length > 0) {
            if (justify) {
                result += justifyLine(currentLine.trim(), MAXLENGTH) + '\n';
            } else {
                result += currentLine.trim() + '\n';
            }
            currentLine = '';
            lineLength = 0;
        }
    };

    if (text.length < MAXLENGTH) {
        return text;
    }
    while (i < text.length) {
        const char : string = text[i];

        if (char === '\n' && previousChar === '\n') {
            addLine(false);
            result += '\n';
            i++;
            continue;
        }

        if (char === '\n') {
            addLine(true);
            i++;
            previousChar = char;
            continue;
        }

        if (char === ' ') {
            if (lineLength + word.length  <= MAXLENGTH) {
                currentLine += word + ' ';
                lineLength += word.length + 1;
                word = '';
            } else {
                addLine(true);
                currentLine += word + ' ';
                lineLength = word.length + 1;
                word = '';
            }
        } else if (lineLength == MAXLENGTH) {
            addLine(false);
        } else {
            word += char;
        }

        previousChar = char;
        i++;
    }

    if (word) {
        currentLine += word;
    }

    if (currentLine) {
        addLine(false);
    }

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

