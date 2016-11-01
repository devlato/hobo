import React, {Component, PropTypes} from 'react';
import {autobind} from 'core-decorators';

import _ from 'lodash';

import classNames from 'utils/classnames';

import styles from './_styles.scss';

const cx = classNames(styles);

const INTERVAL = 1000;


export default class IndexPage extends Component {

  @autobind
  _onGameStart() {
    this.setState({mode: 'game'});
  }


  @autobind
  _onKeyDown(e) {
  }


  componentWillMount() {
    let game = this._generateEnemies();

    game[0][0] = 'h';

    this.setState({game});
  }


  componentDidMount() {
    setInterval(() => this._updateEnemies(), INTERVAL);
  }


  @autobind
  _onHoboMove(selectedRow) {
    let {game} = this.state;

    let newGame = _.map(game, (row, j) => {
      return _.map(row, (column, i) => {
        if (column === 'h') {
          return 0;
        }

        return column;
      });
    });

    newGame[selectedRow][0] = 'h';

    this.setState({game: newGame});
  }


  render() {
    let {mode, game, score} = this.state;
    let title = this._getTitle(mode);
    let block = this._getBlock(mode, game, score);

    return (
      <div className={cx('hobo-container')} onKeyDown={this._onKeyDown}>
        <div className={cx('hobo')} />
        <div className={cx('game-container')}>
          <div className={cx('game')}>
            <div className={cx('game-title')}>
              {title}
            </div>
            <div className={cx('game-content')}>
              {block}
            </div>
          </div>
        </div>
      </div>
    );
  }


  _getTitle(mode) {
    switch (mode) {
      case 'start':
        return 'Become a Hobo and Start a Life from The Scratch';

      case 'game':
        return 'Control your inner hobo!';

      default:
        return null;
    }
  }


  _getHoboRow(field) {
    return _.filter(field, column => (column.indexOf('h') !== -1))[0].indexOf('h');
  }


  _getHoboRowNew(field) {
    return _.reduce(field, (memo, row, i) => {
      if (row[0] === 'h') {
        return i;
      }

      return 0;
    }, 0);
  }


  _generateEnemies() {
    return _.map(_.range(0, 4), row => {
      return _.map(_.range(0, 10), (column, i) => {
        if (i === 9) {
          return _.sample([0, 1]);
        }

        return 0;
      });
    });
  }


  @autobind
  _updateEnemies() {
    let {game, score} = this.state;
    let hoboIndex = this._getHoboRowNew(game);

    let newGame = _.map(game, row => {
      return _.slice(row, 1).concat(_.sample([0, 0, 0, 0, 1]));
    });

    if (newGame[hoboIndex][0] === 1) {
      score++;
    }

    newGame[hoboIndex][0] = 'h';

    this.setState({game: newGame, score});
  }


  _getBlock(mode, field, score) {
    switch (mode) {
      case 'start':
        return (
          <div className={cx('hobo-start-game')} onClick={this._onGameStart}>
            <div className={cx('hobo-face')} />
            <div className={cx('hobo-action')}>
              Start game
            </div>
          </div>
        );

      case 'game':
        let hoboIndex = this._getHoboRow(field);

        let rows = _.map(field, (row, j) => {
          let columns = _.map(row, (column, i) => {
            if (column === 1) {
              return (
                <div className={cx('hobo-player', 'enemy')} key={i} />
              );
            }

            if (column === 'h') {
              return (
                <div className={cx('hobo-player', 'the-hobo')} key={i} />
              );
            }

            return (
              <div className={cx('hobo-player', 'empty', (i === hoboIndex ? 'highlighted' : ''))}
                   onClick={_.partial(this._onHoboMove, j)} key={i} />
            );
          });

          return (
            <div className={cx('hobo-player-row')} key={j}>
              {columns}
            </div>
          );
        });

        return (
          <div>
            <div className={cx('hobo-game')}>
              {rows}
            </div>
            <div className={cx('hobo-scope')}>
              {`Yout score: ${score}`}
            </div>
          </div>
        );

      default:
        return null;
    }
  }


  state = {
    mode: 'start',
    score: 0,
    game: [
      ['h', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

}

