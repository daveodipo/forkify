import View from './View'; //copy everything that should be common to all the views to the parent class

// import icons from '../img/icons.svg'// Parcel 1
// in Parcel 2, for any static assets that aren't programming files
import icons from 'url:../../img/icons.svg'; // Parcel 1
import { Fraction } from 'fractional';

// one model for each of the views
// the views are much bigger
// we also want each view to have a couple of private methods and properties
class RecipeView  extends View {
  // later, we'll have a parent class called view which will contain a couple of methods that all the views should inherit
  // set parent element to 'recipeContainer'
  // this will make it really easy to render the spinner, success/error messages or the recipe itself
 _parentElement = document.querySelector('.recipe'); // if each view has this property, it makes it easy for all those tasks
 _errorMessage = 'We couldn\'t find that recipe. Please try another one!';
 _message = '';
 
 

  // for rendering the recipe right at the beginning
  // this method (the publisher) needs to get access to the subscriber; the handler function
  addHandlerRender(handler) {
    // needs to be part of the public API of this project
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', (e)=> {
      const btn = e.target.closest('.btn--tiny')//really useful for event delegation
      // the user might click on the svg element instead of the actual button
      // if we click outide any of these buttons, 'closest' won't return any element (null); we need to check for this
      if(!btn) return;
      console.log(btn);
      handler()
    })
  }
  _generateMarkup() {
    return ` <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }
  _generateMarkupIngredient = ing => {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
  };
}
export default new RecipeView(); // we don't pass any data in so we don't even need a constructor
