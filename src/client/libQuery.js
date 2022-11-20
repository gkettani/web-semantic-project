export const basicQuery = (search) => `
SELECT ?name, ?img, ?desc, GROUP_CONCAT(DISTINCT ?countryName; SEPARATOR=", ") AS ?countries, GROUP_CONCAT(DISTINCT ?regionName; SEPARATOR=", ") AS ?regions, GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients WHERE {
    ?dish a dbo:Food; a owl:Thing; a wikidata:Q2095; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
    OPTIONAL {?dish dbp:country ?country. ?country rdfs:label ?countryName. FILTER(langMatches(lang(?countryName), "FR"))}
    OPTIONAL {?dish dbp:region ?region. ?region rdfs:label ?regionName. FILTER(langMatches(lang(?regionName), "FR"))}
    OPTIONAL {?dish dbo:ingredient ?ingredient. ?ingredient rdfs:label ?ingredientName. FILTER(langMatches(lang(?ingredientName), "FR"))}
    FILTER(regex(?name, "${search}", "i") && langMatches(lang(?name), "FR") && langMatches(lang(?desc), "FR"))
}`;

export const countryQuery = (search) =>`
SELECT DISTINCT ?name, ?img, ?desc, ?countryName, GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients WHERE {
        ?dish a dbo:Food; a owl:Thing; a wikidata:Q2095; dbo:country ?country; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
        ?country rdfs:label ?countryName.
        OPTIONAL {?dish dbo:ingredient ?ingredient. ?ingredient rdfs:label ?ingredientName. FILTER(langMatches(lang(?ingredientName), "FR"))}
        FILTER(regex(?countryName, "${search}", "i") && langMatches(lang(?countryName), "FR") && langMatches(lang(?desc), "FR") && langMatches(lang(?name), "FR"))
}`;

export const specificQuery = (search) => `
SELECT ?name, ?img, ?desc, GROUP_CONCAT(DISTINCT ?countryName; SEPARATOR=", ") AS ?countries, GROUP_CONCAT(DISTINCT ?regionName; SEPARATOR=", ") AS ?regions, GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients WHERE {
    ?dish a dbo:Food; a owl:Thing; a wikidata:Q2095; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
    OPTIONAL {?dish dbp:country ?country. ?country rdfs:label ?countryName. FILTER(langMatches(lang(?countryName), "FR"))}
    OPTIONAL {?dish dbp:region ?region. ?region rdfs:label ?regionName. FILTER(langMatches(lang(?regionName), "FR"))}
    OPTIONAL {?dish dbo:ingredient ?ingredient. ?ingredient rdfs:label ?ingredientName. FILTER(langMatches(lang(?ingredientName), "FR"))}
    FILTER(regex(?name, "^${search}$", "i") && langMatches(lang(?name), "FR") && langMatches(lang(?desc), "FR"))
}`;

export const ingredientQuery = (search) => `
SELECT ?name, ?ingredientName, ?img, ?desc WHERE {
    ?dish a dbo:Food; dbo:ingredient ?ingredient; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
    ?ingredient rdfs:label ?ingredientName.
    FILTER(regex(?ingredientName, "${search}", "i") && langMatches(lang(?ingredientName),"FR") && langMatches(lang(?name),"FR") && langMatches(lang(?desc),"FR"))
}`;

export const translateToFR = (search) => `
SELECT ?frName WHERE {
    ?country a schema:Country; rdfs:label ?enName; rdfs:label ?frName.
    FILTER(regex(?enName, "^${search}$", "i") && langMatches(lang(?enName),"EN") && langMatches(lang(?frName),"FR"))
}`;

export function addFilter(query, filter, ingredientExclu)
{ 
    if(filter === "Plats végétariens"){
        query = `SELECT DISTINCT ?name, ?img, ?desc, ?countryName, ?ingredients WHERE{ {` + query;
        query = query + `} FILTER(!contains(lcase(?desc), "poulet") && !contains(lcase(?desc), "boeuf") && !contains(lcase(?desc), "porc") && !contains(lcase(?desc), "dinde") && !contains(lcase(?desc), "domestique")). 
        FILTER(!contains(lcase(?ingredients), "poulet") && !contains(lcase(?ingredients), "bœuf") && !contains(lcase(?ingredients), "porc") && !contains(lcase(?ingredients), "dinde") && !contains(lcase(?ingredients), "domestique")). }`;
    }else if(filter === "Plats sans porc"){
        query = `SELECT DISTINCT ?name, ?img, ?desc, ?countryName, ?ingredients WHERE{ {` + query;
        query = query + `} FILTER(!contains(lcase(?desc), "porc")). 
        FILTER(!contains(lcase(?ingredients), "porc")). }`;
    }else if(filter === "Filtrer par ingrédients"){
        query = `SELECT DISTINCT ?name, ?img, ?desc, ?countryName, ?ingredients WHERE{ {` + query;
        query = query + `} FILTER(!contains(lcase(?desc), "${ingredientExclu}")). 
        FILTER(!contains(lcase(?ingredients), "${ingredientExclu}")). }`;
    }
    return query;
}