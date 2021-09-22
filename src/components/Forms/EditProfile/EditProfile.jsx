import  React, {useState,useContext} from 'react'
import style from './editprofile.module.css'
import Button from '../../Button/Button'
import { NavLink, Redirect } from "react-router-dom";
import {Authorization,UserData} from '../../../context'
import {useApiUser} from '../../../Api/useApiUser';
import Spinner from '../../Spinner/Spinner';
import {Form as FormikForm, withFormik,FastField} from 'formik'
import FormErrorMassage from '../../FormValidationMessages/FormErrorMessage'
import {FormSchemaEditProfile} from '../../FormValidationShema/ValidationShema'

const DEFAULT_VALUES = {
	password:''
		};

const EditProfile = (props)=>{
	const { values, handleSubmit,isValid} = props;
	
const {getUser,userdata}=useContext(Authorization)
const {setUserName} = useContext(UserData)
DEFAULT_VALUES.email = userdata.email?userdata.email:''
DEFAULT_VALUES.image=userdata.image?userdata.image:''
DEFAULT_VALUES.username=userdata.username?userdata.username:''
DEFAULT_VALUES.bio = userdata.bio?userdata.bio:''
const {initEditUser,userRequestState} = useApiUser()

const [editStatus,setEditStatus]=useState(false)

let body = {
	"user":{
	    "email": values.email,
	    "bio": values.bio,
	    "image": values.image,
	    'password': values.password,
	    'username': values.username
	  }
}


const editUser = (e)=>{
	e.preventDefault()
	handleSubmit()
		 initEditUser(body)
		.then((data)=>{
			if(data==='error'){
				return 
			}
			getUser(data)
			setUserName(data.username)
			setEditStatus(true)
		}) 
}


const renderButton = ()=>{
		if(userRequestState ==='isLoading')
			return<Spinner size='small'/>
		return(
			<Button
				type="submit"
				isMain
				isBig
				action = "Edit"
				disabled={!isValid}
			/>
			)
	}

	if(editStatus)
		return <Redirect to="/userprofile"/>

	return(
		<div className={style.container}>
			<FormikForm onSubmit={editUser} className = {style.form}>
			<NavLink to = '/userprofile'>
				<button className ={style.button}></button>
			</NavLink>
				<h3 className = {style.form_title}>Profile info</h3>
				<label className = {style.label}>
				Picture
				<FastField
					className ={style.input}
					type = "url"
					placeholder = "Profile picture URL"
					name = "image"
				/>
				</label>
				<label className = {style.label}>
				User name
				<FastField
					className ={style.input}
					type = "text"
					name = "username"
					placeholder = "Username"
				/>
				<FormErrorMassage name="username" />
				</label>
				<label className = {style.label}>
					Bio
					<FastField as='textarea'
						className = {style.textarea}
						name ="bio"
					/>								  	
				</label>
				<FormErrorMassage name="bio" />
				<label className = {style.label}>
				Email
				<FastField 
						className ={style.input}
						type = "email"
						name ='email'
						placeholder = "Enter Your email"
				/>
				</label>
				<FormErrorMassage name="email" />
				<label className = {style.label}>
				Enter password
				<FastField
					className ={style.input}
					type = "password"
					name = "password"
				/>
				</label>
				<FormErrorMassage name="password" />
				{renderButton()}
			</FormikForm>
		</div>
		)
}

export default withFormik({
  validationSchema: FormSchemaEditProfile,
   mapPropsToValues: ({initialValues}) => 
  	initialValues ? initialValues : DEFAULT_VALUES,
})(EditProfile);