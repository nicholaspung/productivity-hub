import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTitles as getTitlesAction,
  addTitle as addTitleAction,
} from './redux/actions';
import {
  getTitlesTitles,
  getTitlesLoading,
  getTitlesError,
} from './redux/selectors';
import Title from './Title';
import AddItem from '../BaseComponents/AddItem';
import {
  FilledButton,
  formInputClassName,
  fixedDisplayContainer,
  overflowDisplayContainer,
} from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';

const FILTER_OPTIONS = {
  'A-Z': 'A-Z',
  'Z-A': 'Z-A',
  NONE: 'NONE',
};

const TitleList = ({
  titles = [],
  loading = false,
  getTitles,
  classes = '',
  addTitle,
  error,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(FILTER_OPTIONS.NONE);
  useEffect(() => {
    if (!titles.length) {
      getTitles();
    }
    // eslint-disable-next-line
  }, [getTitles]);

  return (
    <div className={`${fixedDisplayContainer} ${classes || ''}`}>
      {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
      <h1 className="text-2xl font-bold text-center">Titles</h1>
      <AddItem
        addItem={addTitle}
        labelTitle="Add a title"
        labelButton="Add New Title"
        placeholder="Add..."
        property="title"
        classes="p-2"
      />
      <div className="flex flex-col md:flex-row md:justify-around md:items-end">
        <label htmlFor="title-filter" className="p-4 w-full md:w-6/12">
          <span className="w-full uppercase text-xs">Filtering Options</span>
          <div className="relative">
            <select
              id="title-filter"
              onChange={(event) => setFilter(event.target.value)}
              defaultValue={filter}
              className={formInputClassName}
            >
              {Object.keys(FILTER_OPTIONS).map((option) => (
                <option key={option}>{FILTER_OPTIONS[option]}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </label>
        <label htmlFor="title-search" className="p-4 w-full md:w-6/12">
          <p className="w-full uppercase text-xs">Search Titles</p>
          <div className="flex">
            <input
              id="title-search"
              type="text"
              value={search}
              placeholder="Search..."
              className={formInputClassName}
              // May want to add a debounce at some point
              onChange={(event) => setSearch(event.target.value.toLowerCase())}
            />
            <FilledButton action={() => setSearch('')}>
              <CancelSVG className="w-4 h-auto" title="Edit title" />
            </FilledButton>
          </div>
        </label>
      </div>
      <ul className={overflowDisplayContainer}>
        <EmptyItem length={titles.length} loading={loading} error={error} />
        {titles.length
          ? titles
              .sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if (filter === FILTER_OPTIONS['A-Z']) {
                  if (aTitle < bTitle) {
                    return -1;
                  }
                  if (aTitle > bTitle) {
                    return 1;
                  }
                  return 0;
                }
                if (filter === FILTER_OPTIONS['Z-A']) {
                  if (aTitle > bTitle) {
                    return -1;
                  }
                  if (aTitle < bTitle) {
                    return 1;
                  }
                  return 0;
                }
                return 0;
              })
              .filter((title) => title.title.toLowerCase().includes(search))
              .map((title) => <Title data={title} key={title.id} />)
          : null}
      </ul>
    </div>
  );
};

TitleList.propTypes = {
  titles: PropTypes.array,
  loading: PropTypes.bool,
  getTitles: PropTypes.func.isRequired,
  classes: PropTypes.string,
  addTitle: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    titles: getTitlesTitles(state),
    loading: getTitlesLoading(state),
    error: getTitlesError(state),
  }),
  {
    getTitles: getTitlesAction,
    addTitle: addTitleAction,
  },
)(TitleList);
