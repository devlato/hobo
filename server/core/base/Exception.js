'use strict';


import format from 'string-template';


class Exception {

  constructor(
      message :string,
      data = {}
  ) :Exception {
    this._error = new Error(message);
    this._data = data;

    // Compatibility
    this.message = this.formattedMessage();
    this.stack = this.formattedStackTrace();

    return this;
  }


  error() :Error {
    return this._error;
  }


  data() :Object {
    return this._data;
  }


  formattedMessage() :string {
    return format(this.rawMessage(), this.data());
  }


  formattedStackTrace() {
    return format(this.rawStackTrace(), this.data());
  }


  rawMessage() {
    return this.error().message;
  }


  rawStackTrace() {
    return this.error().stack;
  }
}


export default Exception;
