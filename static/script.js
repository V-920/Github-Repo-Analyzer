const form = document.getElementById("form");
const repoUrlInput = document.getElementById("repo-url");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const repoUrl = repoUrlInput.value.trim();
    const parts = repoUrl.split("/");

    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        results.textContent = "Please enter owner/repository.";
        return;
    }

    const owner = parts[0];
    const repo = parts[1];

    results.textContent = "Loading repository information...";

    try {
        const response = await fetch(
            `/api/repository?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch repository.");
        }
        const languageResponse = await fetch(
            `/api/languages?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`
        );

        if (!languageResponse.ok) {
            throw new Error("Could not fetch language information.");
        }

        const languages = await languageResponse.json();

        const totalBytes = Object.values(languages).reduce(
                (total, bytes) => total + bytes,
                0
            );

            const languageStats = Object.entries(languages).map(
                ([language, bytes]) => ({
                    language: language,
                    percentage: totalBytes === 0
                        ? 0
                        : (bytes / totalBytes) * 100
                })
            );
        results.replaceChildren();

        const heading = document.createElement("h2");
        heading.id = "text";
        heading.textContent = data.name;

        const ownerElement = document.createElement("p");
        ownerElement.id = "text";
        ownerElement.className = "repo-owner";
        ownerElement.textContent = `Owned by ${data.owner}`;

        const description = document.createElement("p");
        description.id = "text";
        description.className = "repo-description";
        description.textContent = data.description || "No description available.";

        const details = document.createElement("div");
        details.className = "stats-container";

        const stats = [
            { label: "Stars", value: data.stars },
            { label: "Forks", value: data.forks },
            { label: "Open Issues", value: data.open_issues },
            { label: "Language", value: data.language || "Not specified" }
        ];

        stats.forEach((stat) => {
            const card = document.createElement("div");
            card.className = "stat-card";

            const label = document.createElement("h3");
            label.id = "text";
            label.textContent = stat.label;

            const value = document.createElement("p");
            value.textContent = stat.value;

            card.append(label, value);
            details.appendChild(card);
        });

        const link = document.createElement("a");
        link.href = data.url;
        link.textContent = "View on GitHub";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        results.append(heading, ownerElement, description, details, link);

        } catch (error) {
        console.error(error);
        results.textContent = error.message;
        }
        });

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}