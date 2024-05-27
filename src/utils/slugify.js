export function slugify(text) {
    return text
        .toString() // Ensure text is a string
        .normalize('NFD') // Normalize to NFD form (decomposed)
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .trim() // Trim whitespace
        .replace(/[-\s]+/g, '-') // Replace spaces and hyphens with a single hyphen
        .toLowerCase(); // Convert to lowercase
}

export function deslugify(slug) {
    return slug
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}