import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp'
import HomePage from './HomePage';
import { DataGet, useData } from './Context/AuthContext';

const App=()=> {
  const {setAccessToken,refreshToken}=useData()
   // Function to handle token refresh
  const handleTokenRefresh = async () => {
    // Make a request to the server to refresh the access token using the refresh token
    try{
      const response = await fetch('/api/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
      }
    }catch(e){
      console.error('e');

    }
  };
    // useEffect hook to automatically refresh the access token when it expires
	useEffect(() => {
		const refreshTokenInterval = setInterval(() => {
		  handleTokenRefresh();
		}, 600000); // Refresh token every 10 minutes
	
		return () => {
		  clearInterval(refreshTokenInterval);
		};
	  }, []);
	  
  return (
    <DataGet>
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  </DataGet>
 
  );
}

export default App;