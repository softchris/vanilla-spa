// use actual backend for reading
// delete event, hook up evn with jquery
// add submit functionality
// CSS + font (spin up actual frontend to see what happens)

const appEl = document.getElementById('app');
const baseUrl = 'http://localhost:3000';

async function hashHandler() {
  console.log('The hash has changed!', location.hash);
  const hash = !location.hash ? '#/' : location.hash;
  appEl.innerHTML = await routes[hash]();
}

function buy(id) {
  console.log(`Buy product with ${id} `);
}

async function init() {
  const hash = !location.hash ? '#/' : location.hash;
  appEl.innerHTML = await routes[hash]();
}

function buildTemplate(tmpId, context) {
  var template = $('#' + tmpId).html();

  // Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  var html = templateScript(context);
  return html;
}

const routes = {
  '#/': () => {
    return 'default page'
  }, 
  '#/products': async() => {
    const res = await fetch(`${baseUrl}/products`)
    const json = await res.json();
    return buildTemplate('products-list', { products: json })
  }
}

init();

window.addEventListener('hashchange', hashHandler, false);