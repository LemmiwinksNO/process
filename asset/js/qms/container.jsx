import React, { PropTypes } from 'react';;
import { connect } from 'react-redux';

// Components
import PageHeader from '../shared/components/pageHeader';
import PageNav from '../shared/components/pageNav';
import ContentFiller from '../shared/components/contentFiller';
import Dropdown from '../shared/components/dropdown';
import Search from '../shared/components/search';
import FilterTable from '../shared/components/filterTable';

// Actions
import { fetchQuestions, addFilter, removeFilter, resetFilters } from './duck';

const Qms = ({title, games, questions, filters, headers, isFetching, dispatch}) => {
  // Handlers to pass to components
  const onGameSelect = curryOnGameSelect(dispatch, addFilter, fetchQuestions);
  const onFilterChange = curryOnFilterChange(dispatch, addFilter, removeFilter, fetchQuestions);
  const onSearchSubmit = curryOnSearchSubmit(dispatch, addFilter, fetchQuestions);
  const onFilterReset = curryOnFilterReset(dispatch, resetFilters, fetchQuestions);

  // Control whether we show the table or filler, and with what message
  const selectedGame = filters.category;
  let fillerTitle = '';
  let hideTable = true;
  if (isFetching) {
    fillerTitle = 'Loading...';
  } else if (selectedGame && questions.length) {
    hideTable = false;
  } else if (!selectedGame) {
    fillerTitle = 'Select a game type to see & edit content';
  } else {
    fillerTitle = 'No results for given filters.';
  }

  return (
    <div className="content admin-container">
      <PageHeader title={title} />
      <div className="qms-header">
        <h3>Select a game type to edit</h3>
        <div className="row">
          <div className="col-md-8">
            <Dropdown items={games} onChange={onGameSelect}/>
            <span>
              <span> OR &nbsp;</span>
              <a className="new-pending-content-link js_review_and_publish" href="">Review &amp; Publish New Pending Content</a>
            </span>
          </div>
          <div className="col-md-4">
            <div className="pull-right">
              <Search onSubmit={onSearchSubmit} loading={isFetching} total={questions.length} />
            </div>
          </div>
        </div>
      </div>
      <ContentFiller hidden={!hideTable} title={fillerTitle} />
      <FilterTable 
        hidden={hideTable}
        headers={headers}
        items={questions}
        filters={filters} 
        resetFilters={onFilterReset}
        onFilterChange={onFilterChange}/>
    </div>
  )
}

Qms.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.object.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    games: state.qms.games,
    title: state.qms.title,
    questions: state.qms.questions,
    filters: state.qms.filters,
    headers: state.qms.headers,
    isFetching: state.qms.isFetching
  }
}

export default connect(mapStateToProps)(Qms);

function curryOnGameSelect(dispatch, addFilter, fetchQuestions) {
  return function(e) {
    const game = e.target.value;
    dispatch(addFilter({category: game}));
    dispatch(fetchQuestions());
  }
}

function curryOnFilterChange(dispatch, addFilter, removeFilter, fetchQuestions) {
  return function(e) {
    const value = e.target.value;
    const key = e.target.getAttribute('name');
    const filter = {};
    filter[key] = value;

    (value) ? dispatch(addFilter(filter)) : dispatch(removeFilter(key));
    dispatch(fetchQuestions());
  }
}

function curryOnSearchSubmit(dispatch, addFilter, fetchQuestions) {
  return function(e) {
    e.preventDefault();
    const value = $(e.target).find('input').val();
    const filter = {search: value};
    dispatch(addFilter(filter));
    dispatch(fetchQuestions());
  }
}

function curryOnFilterReset(dispatch, resetFilters, fetchQuestions) {
  return function() {
    dispatch(resetFilters());
    dispatch(fetchQuestions());
  }
}
