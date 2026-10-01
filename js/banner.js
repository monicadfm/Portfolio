// Banner
const Hard_Pity = 90;

const Rarities = [
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

    for (const rarity of Rarities) {
        if (roll < rarity.weight) { 
            return rarity; 
        }
        roll -= rarity.weight;
    }

    return Rarities[0]; // Fallback
}

// Pull system
function roll(state) {
    state.pity++;
    state.total++;

    let rarity;

    if (state.pity >= Hard_Pity) {
        rarity = Math.random() < 1 / 6 ? Rarities[4] : Rarities[3];
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

// Test
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
    for (const rarity of Rarities) {
        const count = counts[rarity.name] || 0;
        percentages[rarity.name] = (count / pulls * 100).toFixed(2) + "%";
    }

    console.table(percentages);
    console.log("Longest wait for Legendary+:", longestWait, "pulls");
}
