export const basicQuery = (search) => `
SELECT ?name, ?img, ?desc, GROUP_CONCAT(DISTINCT ?countryName; SEPARATOR=", ") AS ?countries, GROUP_CONCAT(DISTINCT ?regionName; SEPARATOR=", ") AS ?regions, GROUP_CONCAT(DISTINCT ?ingredientName; SEPARATOR=", ") AS ?ingredients WHERE {
    ?dish a dbo:Food; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc.
    OPTIONAL {?dish dbp:country ?country. ?country rdfs:label ?countryName. FILTER(langMatches(lang(?countryName), "FR"))}
    OPTIONAL {?dish dbp:region ?region. ?region rdfs:label ?regionName. FILTER(langMatches(lang(?regionName), "FR"))}
    OPTIONAL {?dish dbo:ingredient ?ingredient. ?ingredient rdfs:label ?ingredientName. FILTER(langMatches(lang(?ingredientName), "FR"))}
    FILTER(regex(?name, "${search}", "i") && langMatches(lang(?name), "FR") && langMatches(lang(?desc), "FR"))
}`;