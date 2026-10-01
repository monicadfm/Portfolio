// Fetch public repo count
async function loadRepoCount() {
    try {
        const response = await fetch("https://api.github.com/users/monicadfm");

        // On failure (e.g. rate limit) the HTML fallback number stays
        if (!response.ok) {
            return;
        }

        const data = await response.json();

        document.querySelectorAll(".repo-count").forEach(function (element) {
            element.textContent = data.public_repos;
        });
    } 
    catch (error) {
        console.warn("Could not load github data:", error);
    }
}

loadRepoCount();