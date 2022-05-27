export function camelToKebab(value: string): string {
    const newVal = value.split('').map((letter, index) => {
        if (letter.match(/^[A-Z]/)) {
            return `${index !== 0 ? '-' : ''}${letter.toLowerCase()}`;
        }
        return letter;
    }).join('');

    return newVal.replace(/-+/g, '-');
}