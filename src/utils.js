export const FORUMCATEGORIES = ["Incubating and Hatching Eggs",
                                "Raising Babies",
                                "Aviary Design, Construction, Maintenance",
                                "Feeding and Watering",
                                "Emergencies, Diseases, and Injuries",
                                "Predators and Pests",
                                "Behaviors and Eggs",
                                "Meat Bird",
                                "Laws",
                                "Pictures and Stories"];

export let LINKTOCATEGORY = {}

FORUMCATEGORIES.forEach((category) => {
    LINKTOCATEGORY[convertToLink(category)] = category;
});

console.log(LINKTOCATEGORY);

export function convertToLink(value) {
    // Convert string to hyphenated version
    return value == undefined ? '' : value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

export function timestampToString(firebaseTimeStamp) {
    let date = new Date(firebaseTimeStamp.seconds * 1000);
    return date.toDateString().replace(/^\S+\s/,'');
}