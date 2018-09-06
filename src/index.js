import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import authors from './authors.json';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p,c,i) {
    return p.concat(c.books);
  }, []);
  
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  
  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) =>
        title === answer))
  };
}

const state = {
  turnData: getTurnData(authors),
  highlight: ''
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
      </React.Fragment>
    </BrowserRouter>
    , document.getElementById('root')
  );
}
render();
registerServiceWorker();
