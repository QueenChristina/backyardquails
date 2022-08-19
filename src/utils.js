export function convertToLink(value) {
    // Convert string to hyphenated version
    return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}