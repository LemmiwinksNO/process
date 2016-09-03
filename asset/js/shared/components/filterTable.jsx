// NOTE: This isn't truly 'shared' as it relies on qms.questions/filters/headers.
// Those could be broken out, i.e. 3 reducers => questions(items), filters, headers.

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

const FilterTable = ({hidden, headers, items, filters, onFilterChange, resetFilters}) => {
  let className = "filter-table-wrap";
  if (hidden) { className += ' hidden' }

  return (
    <div className={className}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='reset' onClick={resetFilters}>Reset</th>
            {headers.map(header => (
              <Header
                key={header.name}
                header={header}
                filters={filters}
                onChange={onFilterChange}/>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return <Row key={item.objectId} item={item} headers={headers}/>
          })}
        </tbody>
      </table>
    </div>
  )
}

FilterTable.propTypes = {
  hidden: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
}

const Header = ({header, filters, onChange}) => {
  // If this header has options, build a select dropdown to filter by those options.
  if (header.options) {
    // Check if a filter is selected!
    const defaultValue = (filters[header.name]) ? filters[header.name] : '';
    const className = (filters[header.name]) ? 'no-pad filtered' : 'no-pad';

    return (
      <th className={className}>
        <select name={header.name} onChange={onChange} defaultValue={defaultValue}>
          <option value="">{header.label}</option>
          {header.options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
          })}
        </select>
      </th>
    )
  } else {
    return <th>{header.label}</th>
  }
}

const Row = ({item, headers}) => {
  let key = 0;
  return (
    <tr>
      <td className="row-control">
        <i className="edit glyphicon glyphicon-edit" title="Edit item"></i>
      </td>
      {headers.map(header => {
        // Allow for the item property to be a string or {} or undefined
        let field = '';
        if (item[header.name]) {
          field = item[header.name].name || item[header.name];
        }
        key++;
        return <td key={key}>{field}</td>
      })}
    </tr>
  ) 
}

export default FilterTable;
