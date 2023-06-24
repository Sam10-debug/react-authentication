import {useEffect,useState } from 'react';
import { useData } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const {accessToken,refreshToken,setAccessToken,setRefreshToken}=useData()
	const navigate=useNavigate()

	const handleLogin = async (e) => {
		// Make a request to the server to authenticate the user
		e.preventDefault()
		const response = await fetch('https://apexdgreat.pythonanywhere.com/auth/login', {
		  method: 'POST',
		  body: JSON.stringify({ email, password }),
		  headers: {
			'Content-Type': 'application/json',
		  },
		});
		const data= await response.json()
		console.log(data)
		console.log(response);
		if (response.ok) {
		  setAccessToken(data?.accessToken);
		//   setRefreshToken(data.refreshToken);
		alert(data.message)
		  navigate("/home")
		} else if(response.status===401){
			alert(data.message)
			navigate("/")
		}
		else {
		  // Handle login error
		  console.error('Login failed');
		}
	  };
	   // Function to handle token refresh
  
  return (
	<section className='sign-up'>
		<form action="" onSubmit={handleLogin}>
			<div className="">
				<label htmlFor="email">Email:</label>
				<input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} />
			</div>
			<div className="">
				<label htmlFor="pw">Password:</label>
				<input type="password" id='pw' onChange={(e)=>setPassword(e.target.value)}/>
			</div>
			<button>SIGN IN</button>
		</form>
	</section>
  )
}

export default SignIn