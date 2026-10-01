// Banner simulator (rates + pity match WishBound)
const HARD_PITY = 90;

const RARITIES = [
    { name: "Common",    weight: 55,  color: "--r-common", characters: ["Nix", "Bram"] },
    { name: "Rare",      weight: 30,  color: "--r-rare",   characters: ["Luna", "Kaito"] },
    { name: "Epic",      weight: 12,  color: "--r-epic",   characters: ["Aurora", "Draven"] },
    { name: "Legendary", weight: 2.5, color: "--r-legend", characters: ["Seraphina", "Ondina", "Ezra"] },
    { name: "Mythic",    weight: 0.5, color: "--r-mythic", characters: ["Celeste", "Vesper"] }
];

// Returns one random item from the list
function pickRandom(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

// Legendary and/or Mythic count as "high" and reset pity
function isHighRarity(rarity) {
    return rarity.name === "Legendary" || rarity.name === "Mythic";
}

// Picks rarity using weights
function pickRarity() {
    let roll = Math.random() * 100;

    for (const rarity of RARITIES) {
        if (roll < rarity.weight) { 
            return rarity; 
        }
        roll -= rarity.weight;
    }

    return RARITIES[0]; // Fallback
}

// Pull system
function roll(state) {
    state.pity++;
    state.total++;

    let rarity;

    if (state.pity >= HARD_PITY) {
        // Guaranteed Legendary/Mythic, keeps their 5:1 ratio
        rarity = Math.random() < 1 / 6 ? RARITIES[4] : RARITIES[3];
    } 
    else {
        rarity = pickRarity();
    }

    if (isHighRarity(rarity)) {
        state.pity = 0;
    }

    return {
        rarity: rarity,
        character: pickRandom(rarity.characters)
    };
}

// Dev tool: run testRates(10000) in the console
function testRates(pulls) {
    const state = { pity: 0, total: 0};
    const counts = {};
    let wait = 0;
    let longestWait = 0;

    for (let i = 0; i < pulls; i++) {
        const result = roll(state);
        const name = result.rarity.name;

        counts[name] = (counts[name] || 0) + 1;

        wait++;
        if (isHighRarity(result.rarity)) {
            longestWait = Math.max(longestWait, wait);
            wait = 0;
        }
    }

    const percentages = {};
    for (const rarity of RARITIES) {
        const count = counts[rarity.name] || 0;
        percentages[rarity.name] = (count / pulls * 100).toFixed(2) + "%";
    }

    console.table(percentages);
    console.log("Longest wait for Legendary+:", longestWait, "pulls");
}

// UI
const bannerState = { pity: 0, total: 0 };

const reveal = document.getElementById("reveal");
const revealName = document.getElementById("revealName");
const revealSub = document.getElementById("revealSub");
const pityText = document.getElementById("pityText");
const pityBar = document.getElementById("pityBar");
const oddsList = document.getElementById("odds");
const historyList = document.getElementById("history");
const log = document.getElementById("log");

document.getElementById("pityMax").textContent = HARD_PITY;

// Building odds
function renderOdds() {
    for (const rarity of RARITIES) {
        const li = document.createElement("li");
        li.textContent = rarity.name + " " + rarity.weight + "%";
        li.style.setProperty("--c", "var(" + rarity.color + ")");
        oddsList.appendChild(li);
    }
}

// Update pity text and bar
function renderPity() {
    pityText.textContent = bannerState.pity + "/" + HARD_PITY;
    pityBar.style.width = (bannerState.pity / HARD_PITY * 100) + "%";
}

// Results list
function bestOf(results) {
    let best = results[0];
    for (const result of results) {
        if (RARITIES.indexOf(result.rarity) > RARITIES.indexOf(best.rarity)) {
            best = result;
        }
    }
    return best;
}

// Results
function showResults(results) {
    const best = bestOf(results);
    const color = "var(" + best.rarity.color + ")";

    // Box
    revealName.textContent = best.character;
    revealName.style.color = color;
    revealSub.textContent = results.length > 1 ? "Best of " + results.length + " · " + best.rarity.name : best.rarity.name;
    reveal.style.borderColor = color;

    // Animation restart
    reveal.classList.remove("flash");
    void reveal.offsetWidth; // forces reflow so the animation replays
    reveal.classList.add("flash");

    renderPity();

    // History, max 40
    for (const result of results) {
        const square = document.createElement("span");
        square.style.background = "var(" + result.rarity.color + ")";
        square.title = result.character + " (" + result.rarity.name + ")";
        historyList.prepend(square);
    }
    while (historyList.children.length > 40) {
        historyList.lastChild.remove();
    }

    // Fake API response
    const response = {
        pulls: results.map(function (r) {
            return {
                character: r.character, rarity: r.rarity.name
            };
        }),
        pity: bannerState.pity,
        totalPulls: bannerState.total
    };

    const status = document.createElement("span");
    status.className = "ok";
    status.textContent = "POST /api/banners/1/pull?count=" + results.length + " → 200 OK\n";

    log.textContent = "";
    log.append(status, JSON.stringify(response, null, 2)); // strings added as text, not HTML
}

// Pulls count
function pull(count) {
    const results = [];
    for (let i = 0; i < count; i++) {
        results.push(roll(bannerState));
    }
    showResults(results);
}

//Buttons
document.getElementById("pull1").addEventListener("click", function () {
    pull(1);
});

document.getElementById("pull10").addEventListener("click", function () {
    pull(10);
});

renderOdds();
renderPity();