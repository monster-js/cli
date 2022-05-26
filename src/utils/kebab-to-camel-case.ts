export function kebabToCamelCase(text: string) {
    return text.replace(/-./g, x => x[1].toUpperCase());
}