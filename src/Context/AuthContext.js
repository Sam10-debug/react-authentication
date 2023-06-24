import { createContext,useState,useContext, Children } from "react";


const AuthContext= createContext({})
const {Provider}=AuthContext

const DataGet=({children})=>{
	const [accessToken, setAccessToken] = useState('');
	const [refreshToken, setRefreshToken] = useState('');
	return (
		<Provider value={{accessToken,refreshToken,setAccessToken,setRefreshToken}}>
			{children}
		</Provider>
	)
}

const useData=()=>{
	return useContext(AuthContext)
}

export {useData,DataGet}