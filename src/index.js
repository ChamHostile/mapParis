// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Container,
  Row,
} from 'react-bootstrap';
import SearchBar from './components/searchBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App = () => (
  <Container>
    <Row>
      <SearchBar />
    </Row>
  </Container>
);

ReactDOM.render(<App />, document.getElementById('app'));
