import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useData } from "./Context/AuthContext"

const HomePage = () => {
	const navigate=useNavigate()
	const [title,setTitle]=useState("")
	const [description,setDescription]=useState("")
	const [dataa,setData]=useState([])
	const {accessToken,setAccessToken}= useData()
	const data={
		title:title,
		description:description,
	}
	const headers = {
		Authorization: `Bearer ${accessToken}`,
	  };
	 const handleRecipe=(e)=>{
		 e.preventDefault()
		axios.post("https://apexdgreat.pythonanywhere.com/recipe/recipes",data,{headers})
		.then(response => {
		  // Handle the response data
		  console.log(response.data);
		})
		.catch(error => {
		  // Handle the error
		  console.error(error);})
	 }
	 const getRecipe=()=>{
		axios.get("https://apexdgreat.pythonanywhere.com/recipe/recipes", { headers })
		.then(response => {
		  // Handle the response data
		  console.log(response.data);
		  setData(response.data)
		})
		.catch(error => {
		  // Handle the error
		  console.error(error);
		});
	 }
	 const logOut=()=>{
		setAccessToken("")
		navigate("/signin")
	 }

	 const mappedData=dataa.map(data=><div key={data.id}>{data.title}</div>)
  return (
	<div>HomePage
		<form action="" onSubmit={handleRecipe}>
			<input type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)} /><br />
			<input type="text" placeholder="description" onChange={(e)=>setDescription(e.target.value)} /><br />
			<button>SUBMIT</button>
		</form>
		<button onClick={getRecipe}>GET RECIPES</button>
		<button onClick={logOut}>LOG OUT</button>
		<div>
			{mappedData}
		</div>
	</div>
  )
}

export default HomePage