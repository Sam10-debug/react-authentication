import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
	const navigate=useNavigate()

	const [formData,setFormData]=useState({
		username:"",
		email:"",
		password:"",
	})
	const handleChange=(e)=>{
		const {name,value}=e.target
		setFormData(prev=>{
			return {
				...prev,
				[name]:value
			}
		})
	}

	const handleSignIn=async(e)=>{
		e.preventDefault()
		try{
			const response= await axios.post("https://apexdgreat.pythonanywhere.com/auth/signup",formData)
			console.log(response)
			if(response.status===201){
				alert(response?.data?.message)
				navigate("/signin")
			}
		}catch(err){
			console.error(err)
		}
		// try {
		// 	const response = await fetch('https://apexdgreat.pythonanywhere.com/auth/signup', {
		// 	  method: 'POST',
		// 	  headers: {
		// 		'Content-Type': 'application/json'
		// 	  },
		// 	  body: JSON.stringify(formData)
		// 	});
		// 	console.log(response);
		//   } catch (error) {
		// 	console.error('An error occurred during sign-up:', error);
		//   }

	}
  return (
	<section className="sign-up">
		<form action="" onSubmit={handleSignIn}>
			<div className="">
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
			</div>
			<div className="">
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
			</div>
			<div className="">
				<label htmlFor="pw">Password:</label>
				<input type="password" id="pw" name="password" value={formData.password} onChange={handleChange} />
			</div>
			<button >Sign Up</button>
		</form>
	</section>
  )
}

export default SignUp