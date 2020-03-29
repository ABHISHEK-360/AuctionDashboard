//abhishek360

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import{
  Button,
}from '@material-ui/core';
import * as Colors from '../configs/Colors';
import {
  ChevronRight,
  ChevronLeft,
} from '@material-ui/icons';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

class Pagination extends Component {
  state = {
    currentPage: 1
  };

  componentDidMount() {
    const { pageLimit = 20, pageNeighbours = 0 } = this.props;

    this.pageLimit =  pageLimit;
    this.pageNeighbours =  Math.max(0, Math.min(pageNeighbours, 2));
  }

  gotoPage = (page, totalPages, direction) => {
    const { totalRecords, onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      direction,
      pageLimit: this.pageLimit,
      totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = (page, totalPages ) => {
    this.gotoPage(page, totalPages);
  }

  handleMoveLeft = (totalPages) => {
    this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1, totalPages, LEFT_PAGE);
  }

  handleMoveRight = (totalPages) => {
    this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1, totalPages, RIGHT_PAGE);
  }

  fetchPageNumbers = (totalPages) => {
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = (this.pageNeighbours * 2) + 1;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 1;
      const hasRightSpill = (totalPages - endPage) > 0;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return pages;

    }

    return range(1, totalPages);
  }

  render() {
    const totalRecords = this.props.totalRecords;
    const totalPages = Math.ceil(totalRecords / this.pageLimit);
    if (!totalRecords) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers(totalPages);

    return (
      <div align = 'center' style = {{padding: 5, flex: 1,}}>
        {
          pages.map((page, index) => {
            if (page === LEFT_PAGE) return (
                <Button
                  key={index}
                  variant = 'contained'
                  size = 'small'
                  style = {styles.buttonNav}
                  onClick={() => this.handleMoveLeft(totalPages)}
                >
                  <ChevronLeft/>
                </Button>
            );

            if (page === RIGHT_PAGE) return (
                <Button
                  key={index}
                  variant = 'contained'
                  size = 'small'
                  style = {styles.buttonNav}
                  onClick={() => this.handleMoveRight(totalPages)}
                >
                  <ChevronRight/>
                </Button>
            );

            if(page === currentPage)
              return (
                <Button
                  key={index}
                  size = 'small'
                  variant = 'contained'
                  style = {styles.buttonCurrent}
                >
                  { page }/{totalPages}
                </Button>
              );

            return (
              <Button
                key={index}
                size = 'small'
                variant = 'outlined'
                style = {styles.button}
                onClick={() => this.handleClick(page, totalPages)}
              >
                { page }
              </Button>
            );

          })
        }
      </div>
    );

  }
}

const styles = {
  button: {
    margin: 2,
    color: Colors.PRIMARY,
    borderColor: Colors.PRIMARY_SPECIAL,
  },
  buttonCurrent: {
    margin: 2,
    color: Colors.FOREGROUND,
    backgroundColor: Colors.BACKGROUND,
  },
  buttonNav: {
    margin: 2,
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
  },
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
