export const basicQuery = (search) => `
SELECT ?name, ?img, ?desc, GROUP_CONCAT(DISTINCT ?countryName; SEPARATOR=", ") AS ?countries, GROUP_CONCAT(DISTINCT ?regionName; SEPARATOR=", ") AS ?regions, GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients WHERE {
    ?dish a dbo:Food; a owl:Thing; a wikidata:Q2095; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
    OPTIONAL {?dish dbp:country ?country. ?country rdfs:label ?countryName. FILTER(langMatches(lang(?countryName), "FR"))}
    OPTIONAL {?dish dbp:region ?region. ?region rdfs:label ?regionName. FILTER(langMatches(lang(?regionName), "FR"))}
    OPTIONAL {?dish dbo:ingredient ?ingredient. ?ingredient rdfs:label ?ingredientName. FILTER(langMatches(lang(?ingredientName), "FR"))}
    FILTER(regex(?name, "${search}", "i") && langMatches(lang(?name), "FR") && langMatches(lang(?desc), "FR"))
}`;

export const countryQuery = (search) =>`
SELECT DISTINCT ?name, ?img, ?desc WHERE {
        ?dish a dbo:Food; a owl:Thing; a wikidata:Q2095; dbo:country ?country; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
        ?country rdfs:label ?countryName.
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

export function addFilter(query, filter)
{ 
    if(filter === "vegetarien"){
        var n = query.lastIndexOf("}");
        if(n < 0) return query;
        query = query.substring(0,n) + " FILTER NOT EXISTS { FILTER (contains(?desc, \"poulet\") || contains(?desc, \"boeuf\") || contains(?desc, \"porc\") || contains(?desc, \"dinde\") || contains(?desc, \"domestique\")). }" + query.substring(n);
    } 
    return query;
}

// function insertBeforeLastOccurrence(strToSearch, strToFind, strToInsert) {
//     var n = strToSearch.lastIndexOf(strToFind);
//     if (n < 0) return strToSearch;
//     return strToSearch.substring(0,n) + strToInsert + strToSearch.substring(n);    
// }