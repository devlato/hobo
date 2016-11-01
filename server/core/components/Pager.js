'use strict';


import _ from 'lodash';
import {
    DEFAULT_PAGE,
    DEFAULT_ITEMS_PER_PAGE_AMOUNT,
    DEFAULT_SORT_DIRECTION,
    DEFAULT_SORT_FIELDS
} from '@/core/constants';


export default class Pager {

  constructor(
      page :mixed = DEFAULT_PAGE,
      itemsPerPage :number = DEFAULT_ITEMS_PER_PAGE_AMOUNT,
      sortDirection :string = DEFAULT_SORT_DIRECTION,
      sortColumns :Array = DEFAULT_SORT_FIELDS
  ) :Pager {
    if (_.isObject(page) && (arguments.length === 1)) {
      return this._fromQueryObject(page);
    }

    this._page = page;
    this._itemsPerPage = itemsPerPage;
    this._sortDirection = sortDirection;
    this._sortColumns = !_.isArray(sortColumns)
        ? sortColumns
            ? [sortColumns]
            : undefined
        : sortColumns;

    return this;
  }


  _fromQueryObject(options) :Pager {
    this._page = options.page;
    this._itemsPerPage = options.itemsPerPage;
    this._sortDirection = options.sortDirection;
    this._sortColumns = !_.isArray(options.sortColumns)
        ? options.sortColumns
            ? [options.sortColumns]
            : undefined
        : options.sortColumns;

    return this;
  }


  static fromRequest(request) {
    return new Pager(request.query);
  }


  page() {
    return this._page;
  }


  itemsPerPage() {
    return this._itemsPerPage;
  }


  sortDirection() {
    return this._sortDirection;
  }


  sortColumns() {
    return this._sortColumns;
  }


  toQueryObject() :Object {
    return {
      page: this.page(),
      itemsPerPage: this.itemsPerPage(),
      sortDirection: this.sortDirection(),
      sortColumns: this.sortColumns()
    };
  }
}
