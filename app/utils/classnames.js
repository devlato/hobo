import _ from 'lodash';
import classNames from 'classnames/bind';


export default function classnames(...args) {
  let securedArgs = [{}].concat(args);
  let merged = _.extend.apply(_, securedArgs);

  return classNames.bind(merged);

}
