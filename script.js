// Data
const allResults = [
    { titre: "Loi sur la consommation", type: "Loi", domaine: "CONSOMMATION", source: "Nationale", enVigueur: "Oui", link: "docA.pdf" },
    { titre: "Décret sur la concurrence", type: "Décret", domaine: "CONCURRENCE", source: "Nationale", enVigueur: "Non", link: "docB.pdf" },
    { titre: "Ordonnance douanière", type: "Ordonnance", domaine: "DOUANES", source: "Internationale", enVigueur: "Oui", link: "docC.pdf" },
    { titre: "Règlement des ressources humaines", type: "Règlement", domaine: "GESTION DES RESSOURCES HUMAINES ET SOCIALES", source: "Internationale", enVigueur: "Oui", link: "docD.pdf" },
    { titre: "Arrêté sur la concurrence", type: "Arrêté", domaine: "CONCURRENCE", source: "Nationale", enVigueur: "Non", link: "docE.pdf" },
    // Add more sample data here
];

let filteredResults = [...allResults];
let currentPage = 1;
const resultsPerPage = 3;

// DOM Elements
const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');
const typeFilter = document.getElementById('type-filter');
const domainFilter = document.getElementById('domain-filter');
const sourceFilter = document.getElementById('source-filter');
const enVigueurFilter = document.getElementById('en-vigueur-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const resultsBody = document.getElementById('results-body');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const currentPageSpan = document.getElementById('current-page');

// Pagination
function paginateResults() {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    resultsBody.innerHTML = '';

    paginatedResults.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.titre}</td><td>${result.type}</td><td>${result.domaine}</td><td>${result.source}</td><td>${result.enVigueur}</td><td><a href="${result.link}" target="_blank">Télécharger</a></td>`;
        resultsBody.appendChild(row);
    });

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= filteredResults.length;
    currentPageSpan.textContent = `Page ${currentPage}`;
}

// Apply Filters
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const type = typeFilter.value;
    const domaine = domainFilter.value;
    const source = sourceFilter.value;
    const enVigueur = enVigueurFilter.value;

    filteredResults = allResults.filter(result => {
        return (
            result.titre.toLowerCase().includes(searchTerm) &&
            (type === '' || result.type === type) &&
            (domaine === '' || result.domaine === domaine) &&
            (source === '' || result.source === source) &&
            (enVigueur === '' || result.enVigueur === enVigueur)
        );
    });

    currentPage = 1;
    paginateResults();
}

// Event Listeners for Filters
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const suggestions = allResults
        .filter(result => result.titre.toLowerCase().includes(searchTerm))
        .map(result => result.titre)
        .slice(0, 5);

    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            searchInput.value = suggestion;
            suggestionsList.innerHTML = '';
            applyFilters();
        });
        suggestionsList.appendChild(li);
    });

    applyFilters();
});

typeFilter.addEventListener('change', applyFilters);
domainFilter.addEventListener('change', applyFilters);
sourceFilter.addEventListener('change', applyFilters);
enVigueurFilter.addEventListener('change', applyFilters);

clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    typeFilter.value = '';
    domainFilter.value = '';
    sourceFilter.value = '';
    enVigueurFilter.value = '';
    suggestionsList.innerHTML = '';
    applyFilters();
});

// Pagination Event Listeners
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        paginateResults();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage * resultsPerPage < filteredResults.length) {
        currentPage++;
        paginateResults();
    }
});

// Initial Load
paginateResults();
