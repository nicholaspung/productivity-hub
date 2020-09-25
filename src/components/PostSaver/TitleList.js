import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTitles as getTitlesAction } from "./redux/actions";
import { getTitlesTitles, getTitlesLoading } from "./redux/selectors";
import Title from "./Title";
import AddTitle from "./AddTitle";

const FILTER_OPTIONS = {
  "A-Z": "A-Z",
  "Z-A": "Z-A",
  NONE: "NONE",
};

const TitleList = ({ titles, loading, getTitles }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(FILTER_OPTIONS["NONE"]);
  useEffect(() => {
    if (!titles.length) {
      getTitles();
    }
  }, [getTitles, titles]);

  return (
    <div>
      <h1>Titles</h1>
      <div>
        <label htmlFor="title-search">Search For A Title</label>
        <input
          id="title-search"
          type="text"
          value={search}
          // May want to add a debounce at some point
          onChange={(event) => setSearch(event.target.value.toLowerCase())}
        />
        <button onClick={() => setSearch("")}>Clear Search</button>
      </div>
      <div>
        <label htmlFor="title-filter">Filtering Options</label>
        <select
          id="title-filter"
          onChange={(event) => setFilter(event.target.value)}
          defaultValue={filter}
        >
          {Object.keys(FILTER_OPTIONS).map((option) => (
            <option key={option}>{FILTER_OPTIONS[option]}</option>
          ))}
        </select>
      </div>
      <AddTitle />
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <ul>
            {titles
              .sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if (filter === FILTER_OPTIONS["A-Z"]) {
                  if (aTitle < bTitle) {
                    return -1;
                  } else if (aTitle > bTitle) {
                    return 1;
                  }
                  return 0;
                } else if (filter === FILTER_OPTIONS["Z-A"]) {
                  if (aTitle > bTitle) {
                    return -1;
                  } else if (aTitle < bTitle) {
                    return 1;
                  }
                  return 0;
                } else {
                  return 0;
                }
              })
              .filter((title) => title.title.toLowerCase().includes(search))
              .map((title) => (
                <Title data={title} key={title.id} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    titles: getTitlesTitles(state),
    loading: getTitlesLoading(state),
  }),
  {
    getTitles: getTitlesAction,
  }
)(TitleList);
