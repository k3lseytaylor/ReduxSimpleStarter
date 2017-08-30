import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm }from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';
 

class PostsNew extends Component {
	renderField(field){
		const{ meta:{ touched, error } } = field;

		const className= `form-group ${touched&&error ? 'has-danger':''}`;
		console.log(field);
		

		return (
			<div className= {className} >
			<label>{field.label}</label>
				<input
					className='form-control'
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		//this === component
		console.log(values);
		this.props.createPost(values ,()=>{
			this.props.history.push('/');
		});

	}





	render(){
		const { handleSubmit } = this.props;


		return(
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
				label='Title'
				name='title'
				component={this.renderField}
				/>
				<Field
				label='Categories'
				name='categories'
				component={this.renderField}
				/>
				<Field
				label='Post Content'
				name='content'
				component={this.renderField}
				/>
				<button type='submit' className='btn btn-primary'>Submit</button>
				<Link to='/'className='btn btn-danger'>Cancel</Link>
			</form>
		);
	}
}

function validate(values){
	//console.log(values) -> {title:'user input',categories:'user input',contente:'user input'}
	const errors = {};

	if(!values.title){
		errors.title = 'Enter a title';
	}
	if(!values.categories){
		errors.categories= 'Please categorize your post';
	}
	if(!values.content){
		errors.content = 'Enter Some content';
	}
	//validate the inputs form 'values'
	//If errors is empty,the form is fine to submit
	//If errors has *any* properties, redux form assumes form is invalid


	return errors;

}

export default reduxForm({
	validate : validate,
	form: 'PostsNewForm'
	//make sure the form property is unique
})(
	connect(null,{ createPost })(PostsNew)
);

