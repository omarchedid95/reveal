const defaultProfile = {
    uuid: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    reveal0: {
        number: 0,
        time: 1,
        prompt: '',
        answer: ''
    },
    reveal1: {
        number: 1,
        time: 3,
        prompt: '',
        answer: ''
    },
    reveal2: {
        number: 2,
        time: 7,
        prompt: '',
        answer: ''
    },
    reveal3: {
        number: 3,
        time: 10,
        prompt: '',
        answer: ''
    },
    sexPreference: 'anyone',
    agePreference: [18, 30]
}
const defaultReveal = defaultProfile.reveal0;
const defaultAgePreference = defaultProfile.agePreference;
const defaultSexPreference = defaultProfile.sexPreference;
// Helper function that sanitizes a reveal
function sanitizeReveal(reveal) {
    let sanitizedReveal = {...defaultReveal};
    // Clean the number
    try {
        if (reveal.hasOwnProperty('number')) {
            if (typeof(reveal.number) !== 'number') {
                throw Error('Invalid reveal number');
            }
            const revealNumber = reveal.number;
            if (revealNumber < 0 || revealNumber > 3)  {
                throw Error('Invalid reveal number');
            }
            sanitizedReveal.number = reveal.number;
        } else {
            throw Error('Reveal is missing a number');
        }
    } catch (error) {
        // Assume default reveal values and continue
        console.log(error);
    }
    // Clean the time
    try {
        if (reveal.hasOwnProperty('time')) {
            if (typeof(reveal.time) !== 'number') {
                throw Error('Invalid reveal time');
            }
            const revealTime = reveal.time;
            if (![1,3,7,10].includes(revealTime))  {
                throw Error('Invalid reveal time');
            }
            sanitizedReveal.time = reveal.time;
        } else {
            throw Error('Reveal is missing a time');
        }
    } catch (error) {
        // Assume default reveal values and continue
        console.log(error);
    }
    // Clean the prompt
    try {
        if (reveal.hasOwnProperty('prompt')) {
            if (reveal.prompt.length > 0) {
                sanitizedReveal.prompt = reveal.prompt;
            }
        } else {
            throw Error('Reveal is missing a prompt');
        }
    } catch (error) {
        // Assume default reveal values and continue
        console.log(error);
    }
    // Clean the answer
    try {
        if (reveal.hasOwnProperty('answer')) {
            if (reveal.prompt.length > 0) {
                sanitizedReveal.answer = reveal.answer;
            }
        } else {
            throw Error('Reveal is missing an answer');
        }
    } catch (error) {
        // Assume default reveal values and continue
        console.log(error);
    }
    return sanitizedReveal;
}
// Helper function that sanitizes an age
function sanitizeAgePreference(agePreference) {
    let sanitizedAgePreference = [defaultAgePreference[0], defaultAgePreference[1]];
    try {
        if (!Array.isArray(agePreference)) {
            throw Error('Age preference object is not an array');
        }
        if (agePreference.length !== 2) {
            throw Error('Age preference array has an invalid length');
        }
        if (agePreference[0] < 18 || agePreference[0] > 99 || agePreference[0] >= agePreference[1]) {
            throw Error('Age preference minimum has an invalid value');
        }
        if (agePreference[1] < 19 || agePreference[1] > 100 || agePreference[1] <= agePreference[0]) {
            throw Error('Age preference maximum has an invalid value');
        }
        sanitizedAgePreference = [agePreference[0], agePreference[1]];
    } catch (error) {
        // Assume default age preference value and continue
        console.log(error);
    }
    return sanitizedAgePreference;
}
// Helper function that sanitizes a sex preference
function sanitizeSexPreference(sexPreference) {
    let sanitizedSexPreference = defaultSexPreference;
    try {
        if (typeof(sexPreference) !== 'string') {
            throw Error('Invalid sex preference object')
        }
        if (!['anyone', 'women', 'men'].includes(sexPreference)) {
            throw Error('Invalid sex preference');
        }
        sanitizedSexPreference = sexPreference;
    } catch (error) {
        // Assume defautl sex preference value and continue
        console.log(error);
    }
    return sanitizedSexPreference;
}
// Function that sanizites a profile
export function sanitizeProfile(profile) {
    // TODO: do we want to set default values or just let values be missing?
    let sanitizedProfile = {...defaultProfile};
    if (profile.hasOwnProperty('firstName')) {
        // TODO: sanitize name
        sanitizedProfile.firstName = profile.firstName;
    }
    if (profile.hasOwnProperty('lastName')) {
        // TODO: sanitize name
        sanitizedProfile.lastName = profile.lastName;
    }
    if (profile.hasOwnProperty('dob')) {
        // TODO: sanitize date
        sanitizedProfile.dob = profile.dob;
    }
    if (profile.hasOwnProperty('reveal0')) {
        sanitizedProfile.reveal0 = sanitizeReveal(profile.reveal0);
    }
    if (profile.hasOwnProperty('reveal1')) {
        sanitizedProfile.reveal1 = sanitizeReveal(profile.reveal1);
    }
    if (profile.hasOwnProperty('reveal2')) {
        sanitizedProfile.reveal2 = sanitizeReveal(profile.reveal2);
    }
    if (profile.hasOwnProperty('reveal3')) {
        sanitizedProfile.reveal3 = sanitizeReveal(profile.reveal3);
    }
    if (profile.hasOwnProperty('agePreference')) {
        sanitizedProfile.agePreference = sanitizeAgePreference(profile.agePreference);
    }
    if (profile.hasOwnProperty('sexPreference')) {
        sanitizedProfile.sexPreference = sanitizeSexPreference(profile.sexPreference);
    }
    return sanitizedProfile;
}