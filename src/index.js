import React from 'react';
import promise from 'redux-promise';
import ReactDOM from 'react-dom';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsIndex from './components/post_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
	    <div>
	    	<Switch>
	    		<Route path='/posts/new' component={PostsNew}/>
	    		<Route path='/posts/:id' component={PostsShow}/>
	    		<Route path='/' component={PostsIndex}/>
	    	</Switch>
	    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
