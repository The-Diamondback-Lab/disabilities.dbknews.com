import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { tocData } from '../../../constants';

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/**
 * @param {ShortNavigationPropTypes} props
 */
export default function ShortNavigation(props) {
  const { pageNumber, prevPagePath, nextPagePath } = props;

  // Nav elements are empty divs so that prev and next nav elements are always
  // placed on left and right side of page (respectively).
  let prevNav = <div></div>;
  let nextNav = <div></div>;

  if (prevPagePath) {
    let romanNumeral = romanNumerals[pageNumber-1] + '.';
    let navTitle = tocData[pageNumber-1].path.replace(/-/gi, ' ');
    let navBlurb = tocData[pageNumber-1].navBlurb;

    prevNav = (
      <a href={'/' + prevPagePath}>
        <FiChevronLeft size="3.5em" strokeWidth="1px" />
        <div>
          <div>
            <span className="numeral">{romanNumeral}</span>
            <span className="nav-title">{navTitle}</span>
          </div>
          <span className="nav-blurb">{navBlurb}</span>
        </div>
      </a>
    );
  }

  if (nextPagePath) {
    let romanNumeral = romanNumerals[pageNumber+1] + '.';
    let navTitle = tocData[pageNumber+1].path.replace(/-/gi, ' ');
    let navBlurb = tocData[pageNumber+1].navBlurb;

    nextNav = (
      <a href={'/' + nextPagePath}>
        <div>
          <div>
            <span className="numeral">{romanNumeral}</span>
            <span className="nav-title">{navTitle}</span>
          </div>
          <span className="nav-blurb">{navBlurb}</span>
        </div>
        <FiChevronRight size="3.5em" strokeWidth="1px" />
      </a>
    );
  }

  return (
    <div className="nav short">
      {prevNav}
      {nextNav}
    </div>
  );
}

/**
 * @typedef ShortNavigationPropTypes
 * @prop {number} pageNumber
 * @prop {string} [prevPagePath]
 * @prop {string} [nextPagePath]
 */
