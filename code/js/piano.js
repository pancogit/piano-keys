// javascript file for piano
// add names for piano scales / chords, etc. and fill played keys with blue color
// parse json configuration file with relevant informations and fill them on page

let jsonObject;

// fetch json data from web server
async function fetchData() {
    const jsonData = await fetch("data.json");

    // save fetched data to global variable
    jsonObject = await jsonData.json();

    console.log("Data");
    console.log(jsonObject);
}

// create page and add all elements on it
async function createPage() {
    await fetchData();
}

createPage();
