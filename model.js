// module in which we'll write our entire model
// recipe, search, bookmark
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  // the state contains all the data that we need to build our application
  recipe: {},
  search: {
    query: '', //data here would come in handy for, say, analytics about the most popular queries
    results: [],
    page: 1, //  1 by default
    resultsPerPage: RES_PER_PAGE,
  },
};
// when 'state' is updated by loadRecipe, it's also updated in the controller which imports the state

// fetching recipe data from forkify API
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data; // use let so as to create new object based on this
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // Temp error
    console.error(`${err}💩`);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    // create a new array which contains the new objects where the property names are different
    state.search.results = data.data.recipes.map(rec => {
      return {
        // we store the data returned here in the state
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err}💩`);
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  // not async as we already have the search results loaded
  // we want to reach into the state and get the data for the page that's being requested
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;

  console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) =>{
// this function will reach into the state (recipes) and change the quantity in each ingredient
state.recipe.ingredients.forEach(ing => {
  // newQt = oldQt * newServings / oldServings
  // e.g., 2 * 8 / 4 = 4
  ing.quantity = ing.quantity * newServings / state.recipe.servings;
});
// we also need to update the servings in the state
state.recipe.servings = newServings;// we do this at the end of the function to preserve the old original value
 
}