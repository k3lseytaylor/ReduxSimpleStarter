import _ from 'lodash';
import { FETCH_POSTS,FETCH_POST,DELETE_POST } from '../actions';


export default function(state = {} ,action) {
	switch(action.type) {
		case DELETE_POST:
			return _.omit(state, action.payload);
			//because state is object
			// omit takes out the action.payload inside of state
			//if state was a array we would of have to use reject
			//return _.reject(state,post=>post.id ===action.payload);

		case FETCH_POST:
			// const post = action.payload.data;
			// const newState = {...state};
			// newState[post.id]=post;
			// return newState;
			//  ^ is ES5
			return {...state,[action.payload.data.id]:action.payload.data };
			//  ^ samething but int ES6
		case FETCH_POSTS:
			return _.mapKeys(action.payload.data, 'id');
				 //[ post1 ,post2 ]
				// use lodash to do this
				//_.mapKeys(name of array, the thing to use as the key) 
				// --> {4 : post }
				//then use the name of the array+['id']to look for the posts


		default:
			return state;
	}
}