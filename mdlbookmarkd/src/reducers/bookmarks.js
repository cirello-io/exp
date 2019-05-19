// Copyright 2018 github.com/ucirello
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const initialState = {
  loaded: false,
  bookmarks: [],
  bookmark: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INITIAL_LOAD': {
      return {
        ...state,
        loaded: true,
        bookmarks: (
          state.loaded
            ? []
            : state.bookmarks.slice()
        ).filter((v) => v.id !== state.bookmark.id).concat(action.bookmarks)
      }
    }
    case 'BOOKMARK_ADDED': {
      let bookmarks = state.bookmarks.slice()
      bookmarks.unshift(action.bookmark)
      return {
        ...state,
        bookmark: action.bookmark,
        bookmarks
      }
    }
    case 'BOOKMARK_UPDATED': {
      var bookmarks = state.bookmarks.slice().map((v) => {
        if (v.id === action.bookmark.id) {
          return action.bookmark
        }
        return v
      })
      return {
        ...state,
        bookmark: action.bookmark,
        bookmarks
      }
    }
    case 'BOOKMARK_DELETED': {
      return {
        ...state,
        bookmarks: state.bookmarks.slice().filter((v) => v.id !== action.id)
      }
    }
    case 'BOOKMARK':
      return {
        ...state,
        bookmark: action.bookmark
      }
    default:
      return state
  }
}

export default reducer
