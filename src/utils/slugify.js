export function slugify(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/[-\s]+/g, '-') // Replace spaces and hyphens with a single hyphen
        .toLowerCase()
        .replace(/w\//g, 'w-slash'); // Special handling for "w/"
}

export function deslugify(slug) {
    return slug
        .replace(/w-slash/g, 'w/') // Special handling for "w/"
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}