export const FORUMCATEGORIES = ["Incubating and Hatching Eggs",
                                "Raising Babies",
                                "Aviary and Hutches",
                                "Feeding and Watering",
                                "Emergencies, Diseases, and Injuries",
                                "Predators and Pests",
                                "Behaviors and Eggs",
                                "Meat Bird",
                                "Laws",
                                "Pictures and Stories"];

export const ARTICLECATEGORIES = [  "Getting Started",
                                    "Hatching and Raising",
                                    "Diseases, Injuries, and Cures",
                                    "Predators and Pests",
                                    "Feeders and Waterers",
                                    "Housing",
                                    "Maintaining a Healthy Lifestyle",
                                    "Meat Bird and Processing",
                                    "Other"
                                ]

export let LINKTOCATEGORY = {}
export let LINKTOARTICLECATEGORY = {}

FORUMCATEGORIES.forEach((category) => {
    LINKTOCATEGORY[convertToLink(category)] = category;
});

ARTICLECATEGORIES.forEach((category) => {
    LINKTOARTICLECATEGORY[convertToLink(category)] = category;
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