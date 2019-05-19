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

const config = {
  'local': {
    fetchCreds: 'include',
    websocket: 'ws://localhost:8080/ws',
    http: 'http://localhost:8080'
  },
  'production': {
    fetchCreds: 'same-origin',
    websocket: 'wss://bookmarkd.cirello.io/ws',
    http: 'https://bookmarkd.cirello.io'
  }
}

var configuration = function () {
  switch (window.location.hostname) {
    case 'localhost':
      return config['local']
    default:
      return config['production']
  }
}

module.exports = configuration
