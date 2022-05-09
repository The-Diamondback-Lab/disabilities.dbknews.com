import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { InView } from 'react-intersection-observer';

import ArticleContent from '../components/Article/ArticleContent';
import ShortNavigation from '../components/Article/ShortNavigation';
import FullNavigation from '../components/Article/FullNavigation';
import Footer from '../components/Footer';

/**
 * @extends React.Component<ArticlePropTypes>
 */
export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    try {
      let resp = await axios.get(`/data/part${this.props.pageNumber+1}.html`);
      let content = resp.data
        .split(/\r?\n/gi)
        .filter(x => x.length)
        .map(x => `<p>${x}</p>`)
        .join('');

      let timelineData = null;
      if (this.props.timelinePath) {
        resp = await axios.get(this.props.timelinePath);
        timelineData = resp.data;
      }

      this.setState({
        content,
        timelineData
      });
      this.props.onReady();
    } catch (err) {
      this.setState({ err }, this.props.onReady);
    }
  }

  render() {
    const { path, pageNumber, prevPagePath, nextPagePath, authors,
      authorLinks } = this.props;
    const { content, timelineData } = this.state;

    let title = path.split('-').join(' ');
    let imgCoverMobilePath = `https://dbknews-assets.s3.amazonaws.com/disabilities.dbknews.com/part${pageNumber+1}-cover-mobile.jpg`;

    return (
      <React.Fragment>
        <div className="article-cover">
          <img src={imgCoverMobilePath} />
          <div></div>
        </div>
        <InView>
          {({inView, ref}) => (
            <React.Fragment>
              <FullNavigation articleTitleInView={inView}/>
              <div id="page-container">
                <ArticleContent
                  observerRef={ref}
                  title={title}
                  authors={authors}
                  authorLinks={authorLinks}
                  content={content}
                  timelineData={timelineData} />
                <ShortNavigation
                  pageNumber={pageNumber}
                  prevPagePath={prevPagePath}
                  nextPagePath={nextPagePath} />
                <div className="divider" />
                <Footer />
              </div>
            </React.Fragment>
          )}
        </InView>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  onReady: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  timelinePath: PropTypes.string,
  prevPagePath: PropTypes.string,
  nextPagePath: PropTypes.string
}

/**
 * @typedef ArticlePropTypes
 * @prop {() => void} onReady
 * @prop {string} path
 * @prop {number} pageNumber
 * @prop {string} [timelinePath]
 * @prop {string} [prevPagePath]
 * @prop {string} [nextPagePath]
 */
