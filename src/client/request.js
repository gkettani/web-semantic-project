const base_url = 'http://dbpedia.org/sparql';


const request = async (query) => {
  try {
    const url = `${base_url}?query=${encodeURIComponent(query)}&format=json`;
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const webService = {
  request
};
export default webService;
