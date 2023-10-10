// javascript file for piano
// add names for piano scales / chords, etc. and fill played keys with blue color
// parse json configuration file with relevant informations and fill them on page

let jsonObject;

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
    create html for piano scale

    html template example for one piano scale:

    <main>
        <div class="piano">
            <h1 class="kind">Minor Blues Scales</h1>
            <div class="row">
                <div class="card">
                    <h2 class="name">Cm Pentatonic Blues</h2>
                    <div class="box">
                        <div class="octave">
                            <div class="white-key key-c play">
                                <div class="number">1</div>
                            </div>
                            <div class="black-key key-c#"></div>
                            <div class="white-key key-d"></div>
                            <div class="black-key key-d# play">
                                <div class="number">2</div>
                            </div>
                            <div class="white-key key-e"></div>
                            <div class="white-key key-f play">
                                <div class="number">3</div>
                            </div>
                            <div class="black-key key-f# play">
                                <div class="number">4</div>
                            </div>
                            <div class="white-key key-g play">
                                <div class="number">1</div>
                            </div>
                            <div class="black-key key-g#"></div>
                            <div class="white-key key-a"></div>
                            <div class="black-key key-a# play">
                                <div class="number">2</div>
                            </div>
                            <div class="white-key key-b"></div>
                        </div>
                        <div class="octave">
                            <div class="white-key key-c play">
                                <div class="number">1</div>
                            </div>
                            <div class="black-key key-c#"></div>
                            <div class="white-key key-d"></div>
                            <div class="black-key key-d# play">
                                <div class="number">2</div>
                            </div>
                            <div class="white-key key-e"></div>
                            <div class="white-key key-f play">
                                <div class="number">3</div>
                            </div>
                            <div class="black-key key-f# play">
                                <div class="number">4</div>
                            </div>
                            <div class="white-key key-g play">
                                <div class="number">1</div>
                            </div>
                            <div class="black-key key-g#"></div>
                            <div class="white-key key-a"></div>
                            <div class="black-key key-a# play">
                                <div class="number">2</div>
                            </div>
                            <div class="white-key key-b"></div>
                        </div>
                        <div class="octave">
                            <div class="white-key key-c play">
                                <div class="number">3</div>
                            </div>
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
                    <div class="notes">Notes: C, D#, F, F#, G, A#</div>
                </div>
            </div>
        </div>
    </main>
*/
function createScaleHTML() {
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

    // for each fetched element, create separated html element
    for (let i = 0; i < numberOfElements; i++) {
        const row = document.createElement("div");
        const card = document.createElement("div");
        const name = document.createElement("h2");
        const box = document.createElement("div");

        // start counting index for fingering number
        // of current element from the beginning
        fingeringIndex = 0;

        const octaves = [
            createOctaveHTML(i),
            createOctaveHTML(i),
            createOctaveHTML(i, true),
        ];

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

        let notLastElement = i < numberOfElements - 1;
        let rightLeftHandsParsed = i % 2 != 0;

        // set name for element
        name.textContent = jsonObject.elements[i].name;

        // add divider and notes after every right
        // and left hand for given element
        if (rightLeftHandsParsed) {
            if (notLastElement) row.classList.add("divider");

            // create div for notes
            const notes = document.createElement("div");
            notes.className = "notes";

            card.append(notes);

            notes.textContent = "Notes: ";

            // set all individual notes for element
            jsonObject.elements[i].keys.forEach(
                (key) => (notes.textContent += `${key} `)
            );
        }
    }
}

function createOctaveHTML(currentElement, isLastOctave = false) {
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

    // for each played key, append appropriate css class
    // for playing and fingering number
    addFingering({
        isLastOctave,
        currentElement,
        keyC,
        keyCsharp,
        keyD,
        keyDsharp,
        keyE,
        keyF,
        keyFsharp,
        keyG,
        keyGsharp,
        keyA,
        keyAsharp,
        keyB,
    });

    return octave;
}

// for each played key, append appropriate css class
// for playing and fingering number
function addFingering(keys) {
    const {
        isLastOctave,
        currentElement,
        keyC,
        keyCsharp,
        keyD,
        keyDsharp,
        keyE,
        keyF,
        keyFsharp,
        keyG,
        keyGsharp,
        keyA,
        keyAsharp,
        keyB,
    } = keys;

    jsonObject.elements[currentElement].keys.forEach((key, index) => {
        // create fingering number and add current number to it
        const number = document.createElement("div");

        number.className = "number";
        number.textContent =
            jsonObject.elements[currentElement].fingering[fingeringIndex++];

        switch (key) {
            case "C": {
                // if it's last octave, then just mark key
                // in octave to complete full piano scale
                // otherwise, if it's not last octave, then
                // just normally mark each key from scale
                // also nest fingering number inside piano key
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyC.classList.add("play");
                    keyC.append(number);
                }

                break;
            }

            case "C#": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyCsharp.classList.add("play");
                    keyCsharp.append(number);
                }

                break;
            }

            case "D": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyD.classList.add("play");
                    keyD.append(number);
                }

                break;
            }

            case "D#": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyDsharp.classList.add("play");
                    keyDsharp.append(number);
                }

                break;
            }

            case "E": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyE.classList.add("play");
                    keyE.append(number);
                }

                break;
            }

            case "F": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyF.classList.add("play");
                    keyF.append(number);
                }

                break;
            }

            case "F#": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyFsharp.classList.add("play");
                    keyFsharp.append(number);
                }

                break;
            }

            case "G": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyG.classList.add("play");
                    keyG.append(number);
                }

                break;
            }

            case "G#": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyGsharp.classList.add("play");
                    keyGsharp.append(number);
                }

                break;
            }

            case "A": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyA.classList.add("play");
                    keyA.append(number);
                }

                break;
            }

            case "A#": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyAsharp.classList.add("play");
                    keyAsharp.append(number);
                }

                break;
            }

            case "B": {
                if ((isLastOctave && !index) || !isLastOctave) {
                    keyB.classList.add("play");
                    keyB.append(number);
                }

                break;
            }
        }
    });
}

// create page and add all elements on it
async function createPage() {
    await fetchData();
    createScaleHTML();
}

createPage();
