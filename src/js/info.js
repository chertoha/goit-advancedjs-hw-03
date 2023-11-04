export const createInfoData = (imgUrl, title, description, options) => {
  const fragment = document.createDocumentFragment();
  const image = document.createElement('img');
  const meta = document.createElement('div');
  const header = document.createElement('h1');
  const text = document.createElement('p');
  const footer = document.createElement('p');

  image.src = imgUrl;

  header.innerText = title;
  text.innerText = description;
  footer.innerHTML = `<strong>Temperament</strong>: ${options}`;

  meta.append(header, text, footer);
  fragment.append(image, meta);
  return fragment;
};
