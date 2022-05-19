import icons from 'url:../../img/icons.svg';

export default class View {
  // we won't create any instance of this view
  // we'll only use it as a parent class of the other child views
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //this is part of the public API
    this._data = data;
    const markup = this._generateMarkup();// every view that renders something to the UI needs this method
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // the two properties and the render method are something that all the views will have in common
  _clear() {
    // this method will be available for all views with #parentElement
    this._parentElement.innerHTML = ''; //get rid of existing content
  }

  renderSpinner() {
    //  this will be a public method that the controller can call as it starts fetching data
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
              `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // implement a method for success messages; we don't need it yet
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
