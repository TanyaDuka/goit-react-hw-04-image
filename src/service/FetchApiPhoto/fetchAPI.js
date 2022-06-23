export default function fetchAPI(search, page, PER_PAGE) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=26721460-a31d9fe7e52cee7d3858c2b4f&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Not Found ${search}`);
  });
}
