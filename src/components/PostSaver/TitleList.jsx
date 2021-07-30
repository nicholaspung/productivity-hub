import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTitles as getTitlesAction,
  addTitle as addTitleAction,
} from '../../redux/actions/postSaverActions';
import {
  getTitlesTitles,
  getTitlesLoading,
  getTitlesError,
} from '../../redux/selectors/postSaverSelectors';
import Title from './Title';
import AddItem from '../BaseComponents/AddItem';
import {
  FilledButton,
  formInputClassName,
  overflowDisplayContainer,
} from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';
import { FILTER_OPTIONS } from '../../constants/postSaverConstants';
import { sortTitles } from '../../utils/savedPostUtils';

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
    getTitles();
  }, [getTitles]);

  return (
    <div className={`${classes || ''}`}>
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
              .sort((a, b) => sortTitles(a, b, filter))
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
