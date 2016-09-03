import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import $ from 'jquery';

/**
 * Action Types
 */
const FETCH_START = 'workstyle/qms/FETCH_START';
const FETCH_SUCCESS = 'workstyle/qms/FETCH_SUCCESS';
const FETCH_ERROR = 'workstyle/qms/FETCH_ERROR';

const ADD_START = 'workstyle/qms/ADD_START';
const ADD_SUCCESS = 'workstyle/qms/ADD_SUCCESS';
const ADD_ERROR = 'workstyle/qms/ADD_ERROR';

const EDIT_START = 'workstyle/qms/EDIT_START';
const EDIT_SUCCESS = 'workstyle/qms/EDIT_SUCCESS';
const EDIT_ERROR = 'workstyle/qms/EDIT_ERROR';

const DELETE_START = 'workstyle/qms/DELETE_START';
const DELETE_SUCCESS = 'workstyle/qms/DELETE_SUCCESS';
const DELETE_ERROR = 'workstyle/qms/DELETE_ERROR';

const SET_GAMES = 'workstyle/qms/SET_GAMES';
const SET_HEADERS = 'workstyle/qms/SET_HEADERS';
const SET_NAV_ITEMS = 'workstyle/qms/SET_NAV_ITEMS';
const SET_TITLE = 'workstyle/qms/SET_TITLE';

const ADD_FILTER = 'workstyle/qms/ADD_FILTER';
const REMOVE_FILTER = 'workstyle/qms/REMOVE_FILTER';
const RESET_FILTERS = 'workstyle/qms/RESET_FILTERS';


const initialState = {
  title: '',
  navItems: [],
  games: [],
  headers: [],
  questions: [],
  isFetching: false,
  filters: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAMES:
      return { ...state, games: action.games }
    case SET_HEADERS:
      return { ...state, headers: action.headers }
    case SET_NAV_ITEMS:
      return { ...state, navItems: action.navItems }
    case SET_TITLE:
      return { ...state, title: action.title }
    case ADD_FILTER:
      return { ...state, filters: { ...state.filters, ...action.filter} }
    case REMOVE_FILTER:
      return { ...state, filters: _.omit(state.filters, action.key) }
    case RESET_FILTERS: // reset all but category
      return { ...state, filters: _.pick(state.filters, 'category') }
    case FETCH_START:
      return { ...state, isFetching: true }
    case FETCH_SUCCESS:
      return { 
        ...state,
        isFetching: false,
        questions: action.questions,
        receivedAt: action.receivedAt
      }
    case FETCH_ERROR:
      return { ...state, questions: [], isFetching: false }
    case ADD_SUCCESS:
      return { ...state, questions: [...state.questions, action.item] }
    case EDIT_SUCCESS:
      return {
        ...state,
        questions: state.questions.map((item) => {
          return (item.objectId === action.item.objectId) ? action.item : item;
        })
      }
    case DELETE_SUCCESS:
      return { 
        ...state,
        questions: state.questions.filter(item => item.objectId !== action.item.objectId) 
      }
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export function fetchQuestions() {
  return (dispatch, getState) => {
    dispatch(fetchStart())

    const filters = getState().qms.filters;
    return fetch(`/apis/qms/questions?${$.param(filters)}`, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(j => {
        if (!j.data || !j.data.questions) { dispatch(fetchError()) }
        else { dispatch(fetchSuccess(j.data.questions)) }
      })
      // .then(j => j.data.questions)
      // .then(questions => dispatch(fetchSuccess(questions)))
      .catch(e => { console.log('fetchQuestions error - ', e)})
  }
}

function fetchStart() {
  return { type: FETCH_START }
}

function fetchSuccess(questions) {
  return {
    type: FETCH_SUCCESS,
    questions,
    receivedAt: Date.now()
  }
}

function fetchError() {
  return { type: FETCH_ERROR }
}

export function addQuestion(question) {
  return dispatch => {
    dispatch(addStart(question));

    return fetch('/apis/qms/questions', {
      method: 'POST',
      credentials: 'same-origin', // adds cookies
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(question)
    }).then(response => response.json())
      // .then(j => { return Object.assign(question, j.data)})
      .then(j => j.data)  // Chris updating API to return ENTIRE question, not just objectId
      .then(question => dispatch({ type: ADD_SUCCESS, question }))
      .catch(e => { console.log('addQuestion error - ', e)})
  }
}

function addStart(question) {
  return { type: ADD_START, question }
}

export function editQuestion(question) {
  return dispatch => {
    dispatch(editStart(question));

    return fetch(`/apis/qms/question/${question.objectId}`, {
      method: 'PUT',
      credentials: 'same-origin', // adds cookies
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(question)
    }).then(response => response.json())
      .then(j => j.data) // Chris updating API to return ENTIRE question, not just objectId
      .then(question => dispatch({ type: EDIT_SUCCESS, question}))
      .catch(e => { console.log('editQuestion error - ', e)})
  }
}

function editStart(question) {
  return { type: EDITING_QUESTION, question }
}

export function deleteQuestion(question) {
  return dispatch => {
    dispatch(deleteStart(question));

    return fetch(`/apis/qms/question/${question.objectId}`, {
      method: 'DELETE',
      credentials: 'same-origin', // adds cookies
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(question)
    }).then(response => response.json())
      .then(j => j.data)
      .then(question => dispatch({ type: DELETE_SUCCESS, question}))
      .catch(e => { console.log('deleteQuestion error - ', e)})
  }
}

function deleteStart(question) {
  return { type: DELETE_START, question }
}

export function setGames(games) {
  return { type: SET_GAMES, games };
}

export function setHeaders(headers) {
  return { type: SET_HEADERS, headers }
}

export function setNavItems(navItems) {
  return { type: SET_NAV_ITEMS, navItems };
}

export function setTitle(title) {
  return { type: SET_TITLE, title };
}

export function addFilter(filter) {
  return { type: ADD_FILTER, filter };
}

export function removeFilter(key) {
  return { type: REMOVE_FILTER, key }
}

export function resetFilters() {
  console.log('resetFilters');
  return { type: RESET_FILTERS }
}
