import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerclick(handler) {
    // we'll use event delegation as there'll be 2 buttons but we don't want to listen to each individually
    // instead, we'll add the event listener to the common parent element
    this._parentElement.addEventListener('click', function (e) {
      // create a button element and select the closest button element to the clicked element
      const btn = e.target.closest('.btn--inline');
      // closest is a lil bit like querySelector but for searching down in the tree
      // for children, it searches up the tree (for parents)
      // this is important because we might click on the <span>/<svg>/<use>, instead of clicking on the button itself; so we can't set the button to just e.target
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // no of pages: page / resultsPerPage
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //   page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
              <span>Page ${curPage - 1}</span>
          </button>`;
    }

    // Other page
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>`;
    }
    //   page 1 and there are NO other pages
    return ''; // return nothing because we only want to render one button
  }
}

export default new PaginationView();
