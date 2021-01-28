let isScrolling;

const processElements = () => {
  const articles = document.getElementsByTagName('article');

  for (article of articles) {
    addNewElementToArticle(article);
  }
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.addEventListener('load', async () => {
  let articles = [];
  while (articles.length <= 0) {
    articles = document.getElementsByTagName('article');
    await sleep(50);
  }

  processElements();

  addObserver(articles[0].parentNode);
});

const addObserver = (node) => {
  const observer = new MutationObserver((_) => {
    processElements();
  });

  observer.observe(node, { childList: true });
};

const addNewElementToArticle = (article) => {
  const redirectUrl = getUrl(article);

  let foriegnSpan = article.querySelector('[aria-label="Global-Link"]');

  if (!foriegnSpan) {
    const deleteElements = getDeleteElements(article);
    const newElements = createGlobalLinkElements();

    const finishedElement = buildNewElement(
      deleteElements,
      newElements,
      redirectUrl,
    );

    const actionsContainer = article.getElementsByClassName('item-actions')[0];

    actionsContainer.append(finishedElement);
  }
};

const getUrl = (article) => {
  const parentSpan = article.querySelector('span[aria-label="Open Menu"]')
    .parentNode;
  const button = article.querySelector('button[aria-label="Open Menu"]');
  button.click();
  const url = parentSpan.querySelector(
    'div > ul > li > ul > li:nth-child(3) > a',
  ).href;
  parentSpan.style.display = 'none';
  return url;
};

const getDeleteElements = (article) => {
  const deleteSpan = article.querySelector('[aria-label="Delete"]');
  const deleteButton = deleteSpan.getElementsByTagName('button')[0];
  const deleteButtonSpan = deleteButton.getElementsByTagName('span')[0];

  return { deleteSpan, deleteButton, deleteButtonSpan };
};

const createGlobalLinkElements = () => {
  const newSpan = document.createElement('span');
  const newButton = document.createElement('button');
  const newButtonSpan = document.createElement('span');

  return { newSpan, newButton, newButtonSpan };
};

const buildNewElement = (deleteElements, newElements, redirectUrl) => {
  const { deleteSpan, deleteButton, deleteButtonSpan } = deleteElements;
  const { newSpan, newButton, newButtonSpan } = newElements;

  newSpan.ariaLabel = 'Global-Link';
  newSpan.className = deleteSpan.className;
  newButton.className = deleteButton.className;
  newButtonSpan.className = deleteButtonSpan.className;

  newButtonSpan.innerHTML = iconSvg;

  newButton.append(newButtonSpan);
  newSpan.append(newButton);

  newButton.addEventListener('click', () => window.open(redirectUrl, '_blank'));

  return newSpan;
};

const iconSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="globe"
    class="svg-inline--fa fa-globe fa-w-16"
    role="img"
    viewBox="0 0 496 512"
  >
    <path
      fill="currentColor"
      d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
    />
  </svg>
`;
