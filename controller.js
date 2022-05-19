import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// to make sure our app is supported by old browsers:
import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; //polyfill async await
// import recipeView from './views/recipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // id
    const id = window.location.hash.slice();

    // guard clause
    if (!id) return;
    // listen for the event of the entire page loading
    // render spinner
    recipeView.renderSpinner(); //you can do this with all other views

    // load recipe
    await model.loadRecipe(id); //1. we receive data here
    //  loadRecipe is an async function and will return a promise; we thus have to await that promise before we can move on to execution
    // this is an example of one async function calling another async function
    // const recipe = model.state.recipe

    // console.log(recipe);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe); // 2. we render data here
    // 'render' is a very common name for render e.g., in React
    // const recipeView = new recipeView(model.state.recipe)// also possible
    // render method will accept the data from recipe and store it in recipeView object

    // TEST
    controlServings()
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResulsts = async () => {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search); // pass in the whole object
    // console.log(model.getSearchResultsPage(1));
  } catch (err) {
    console.error(err);
  }
};

// Publisher-subscriber pattern in practice
// init function is called when the program starts which immediately calls the addHandlerRender function from the view
// this is possible because the controller does in fact import both the view and the model
// as we call addHandlerRender, we pass in controlRecipes as an argument
// essentially, we subscribe controlRecipes to addHandlerRender
// at this point, the two functions are essentially finally connected
// addHandlerRender thus listens for events (addEventListener), and uses controlRecipes as a callback
// as soon as the publisher publishes an event, the subscriber will get called
// this will allow keeping the handler in the controller and the listener in the view

// analyze controlSearchResulsts and controlPagination; they're quite similar and inter-twined

const controlPagination = goToPage => {
  // 1) Render new results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage(goToPage));
    //this works because render will overwrite the markup that was there previously; because of the clear() method

    // 2) Render new pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = () => {
  // update the recipe servings (in state)
  model.updateServings(8)
  // update the recipe view; we'll simply re-render the recipe instead of manually changing the quantitity elements
  recipeView.render(model.state.recipe);
}

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  
  // the event is listened for in addHandlerRender but handled here
  searchView.addHandlerSearch(controlSearchResulsts);
  paginationView.addHandlerclick(controlPagination);
};
init();
