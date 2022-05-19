class SearchView {
  _parentEL = document.querySelector('.search');

  getQuery() {
    const query =  this._parentEL.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    // addHandlerSearch() will be the publisher while the controlSearchResulsts() will be the subscriber
    this._parentEL.addEventListener('submit', (e)=> {
        // this will work whether the user clicks submit or presses enter
        // when we submit a form, we need to first prevent the default action; otherwise the page will reload
        e.preventDefault();
        handler();
    })
  }
}

export default new SearchView();
