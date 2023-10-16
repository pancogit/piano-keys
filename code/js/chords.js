// javascript file for piano chords
// add names for piano chords and fill played keys with blue color
// parse json configuration file with relevant informations and fill them on page

let jsonObject;

// current index for piano key while searching through all piano octaves
let currentKeyIndex = 0;

// temporarily index for fingering number of current element
let fingeringIndex;

// fetch json data from web server
async function fetchData() {
    const jsonData = await fetch("data.json");

    // save fetched data to global variable
    jsonObject = await jsonData.json();

    // print only for local debugging
    // console.log("Data");
    // console.log(jsonObject);

    // check if data is fetched from server
    if (!jsonObject && !jsonObject.elements) {
        console.error("Data is not fetched from server.");

        return;
    }
}

/*
    create html for piano chords

    html template example for one piano chord:

    <main>
        <div class="piano">
            <h1 class="kind">C chords</h1>
            <h2 class="chord">C major chord</h2>
            <div class="row">
                <div class="card">
                    <h3 class="name">C - right hand</h3>
                    <div class="box">
                        <div class="octave">
                            <div class="white-key key-c play">
                                <div class="number">1</div>
                            </div>
                            <div class="black-key key-c#"></div>
                            <div class="white-key key-d"></div>
                            <div class="black-key key-d#"></div>
                            <div class="white-key key-e play">
                                <div class="number">3</div>
                            </div>
                            <div class="white-key key-f"></div>
                            <div class="black-key key-f#"></div>
                            <div class="white-key key-g play">
                                <div class="number">5</div>
                            </div>
                            <div class="black-key key-g#"></div>
                            <div class="white-key key-a"></div>
                            <div class="black-key key-a#"></div>
                            <div class="white-key key-b"></div>
                        </div>
                        <div class="octave">
                            <div class="white-key key-c"></div>
                            <div class="black-key key-c#"></div>
                            <div class="white-key key-d"></div>
                            <div class="black-key key-d#"></div>
                            <div class="white-key key-e"></div>
                            <div class="white-key key-f"></div>
                            <div class="black-key key-f#"></div>
                            <div class="white-key key-g"></div>
                            <div class="black-key key-g#"></div>
                            <div class="white-key key-a"></div>
                            <div class="black-key key-a#"></div>
                            <div class="white-key key-b last-key"></div>
                        </div>
                    </div>
                    <div class="notes">Notes: C, E, G</div>
                </div>
            </div>
        </div>
    </main>
*/
function createChordHTML() {
    // create html elements
    const main = document.createElement("main");
    const piano = document.createElement("div");
    const kind = document.createElement("h1");

    // add classes to html elements
    piano.className = "piano";
    kind.className = "kind";

    // append and nest html elements to form tree
    main.append(piano);
    piano.append(kind);

    // set page title
    kind.textContent = jsonObject.title;

    // create row html for each element
    createRowsHTML(piano);

    // insert created html to the page
    document.body.append(main);
}

function createRowsHTML(pianoHTML) {
    const numberOfElements = jsonObject.elements.length;
    let numberOfChords;
    let row, chord;

    // for each fetched element, create separated html element
    for (let i = 0; i < numberOfElements; i++) {
        numberOfChords = jsonObject.elements[i].chords.length;
        chord = document.createElement("h2");

        chord.className = "chord";
        pianoHTML.append(chord);

        // create html for each chord
        for (let j = 0; j < numberOfChords; j++) {
            const card = document.createElement("div");
            const name = document.createElement("h3");
            const box = document.createElement("div");

            row = document.createElement("div");

            // create two octaves for chords because they can
            // be split between two octaves like B major
            const octaves = [createOctaveHTML(), createOctaveHTML(true)];

            // add classes to html elements
            row.className = "row";
            card.className = "card";
            name.className = "name";
            box.className = "box";

            // append and nest html elements to form tree
            pianoHTML.append(row);
            row.append(card);
            card.append(name);
            card.append(box);

            octaves.forEach((octave) => box.append(octave));

            // set heading for all chords
            chord.textContent = jsonObject.elements[i].name;

            // set name for individual chord
            name.textContent = jsonObject.elements[i].chords[j].name;

            // add notes after every chord
            createNotesHTML(i, j, card);

            // for each played key, append appropriate css class
            // for playing and fingering number
            addFingering(i, j, octaves);
        }

        let notLastElement = i < numberOfElements - 1;

        // add divider after each group of chords
        if (notLastElement) row.classList.add("divider");
    }
}

// add notes after every chord
function createNotesHTML(elementIndex, chordIndex, card) {
    // create div for notes
    const notes = document.createElement("div");
    notes.className = "notes";

    card.append(notes);

    notes.textContent = "Notes: ";

    // set all individual notes for element
    jsonObject.elements[elementIndex].chords[chordIndex].keys.forEach(
        (key) => (notes.textContent += `${key} `)
    );
}

function createOctaveHTML(isLastOctave = false) {
    // create html elements
    const octave = document.createElement("div");
    const keyC = document.createElement("div");
    const keyCsharp = document.createElement("div");
    const keyD = document.createElement("div");
    const keyDsharp = document.createElement("div");
    const keyE = document.createElement("div");
    const keyF = document.createElement("div");
    const keyFsharp = document.createElement("div");
    const keyG = document.createElement("div");
    const keyGsharp = document.createElement("div");
    const keyA = document.createElement("div");
    const keyAsharp = document.createElement("div");
    const keyB = document.createElement("div");

    // add classes to html elements
    octave.className = "octave";
    keyC.classList.add("white-key", "key-c");
    keyCsharp.classList.add("black-key", "key-c#");
    keyD.classList.add("white-key", "key-d");
    keyDsharp.classList.add("black-key", "key-d#");
    keyE.classList.add("white-key", "key-e");
    keyF.classList.add("white-key", "key-f");
    keyFsharp.classList.add("black-key", "key-f#");
    keyG.classList.add("white-key", "key-g");
    keyGsharp.classList.add("black-key", "key-g#");
    keyA.classList.add("white-key", "key-a");
    keyAsharp.classList.add("black-key", "key-a#");
    keyB.classList.add("white-key", "key-b");

    if (isLastOctave) keyB.classList.add("last-key");

    // append and nest html elements to form tree
    octave.append(keyC);
    octave.append(keyCsharp);
    octave.append(keyD);
    octave.append(keyDsharp);
    octave.append(keyE);
    octave.append(keyF);
    octave.append(keyFsharp);
    octave.append(keyG);
    octave.append(keyGsharp);
    octave.append(keyA);
    octave.append(keyAsharp);
    octave.append(keyB);

    return octave;
}

// for each played key, append appropriate css class
// for playing and fingering number
function addFingering(currentElement, currentChord, octaves) {
    const allKeys = [];

    currentKeyIndex = 0;
    fingeringIndex = 0;

    // get all keys from each octave and save them into array
    octaves.forEach((octave) => {
        octave.childNodes.forEach((keyNode) => allKeys.push(keyNode));
    });

    // set played keys and fingering numbers for only one octave
    jsonObject.elements[currentElement].chords[currentChord].keys.forEach(
        (key) => keyFingering(currentElement, currentChord, key, allKeys)
    );
}

function keyFingering(currentElement, currentChord, key, allKeys) {
    if (!isKeyCorrect(currentElement, currentChord, key)) return;

    // create fingering number and add current number to it
    const number = document.createElement("div");

    number.className = "number";
    number.textContent =
        jsonObject.elements[currentElement].chords[currentChord].fingering[
            fingeringIndex++
        ];

    let keyLetter = `key-${key.toLowerCase()}`;

    // find first key letter from all octaves and
    // then continue to search for next key letter
    for (let i = currentKeyIndex; i < allKeys.length; i++) {
        // increment index for keys from all octaves
        // after every iteration
        currentKeyIndex++;

        // when key letter is found, then stop search
        // the next outer loop will continue to search
        // for the next key letter
        // add played class to the dom node when key
        // is found and nest number inside played key
        if (allKeys[i].classList.contains(keyLetter)) {
            allKeys[i].classList.add("play");
            allKeys[i].append(number);

            break;
        }
    }
}

function isKeyCorrect(currentElement, currentChord, key) {
    let keysNames = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
    ];

    let correctKey = false;

    for (let i = 0; i < keysNames.length; i++) {
        if (keysNames[i] == key) {
            correctKey = true;

            break;
        }
    }

    if (!correctKey) {
        console.error(
            `Piano key for "${jsonObject.elements[currentElement].chords[currentChord].name}" is not correct: ${key}`
        );
    }

    return correctKey;
}

function setDocumentTitle() {
    document.title = jsonObject.title;
}

// create page and add all elements on it
async function createPage() {
    await fetchData();
    createChordHTML();
    setDocumentTitle();
}

createPage();
