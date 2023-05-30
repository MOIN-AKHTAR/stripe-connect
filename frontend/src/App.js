import React ,{useState,useEffect} from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null)

  useEffect(()=>{
   const accountId=window.location.href.split("?")[1]?.split("=")[1];
   if(!accountId){
    setError("No account found");
    setLoading(false)
   }else{
     if(accountId.startsWith("acct_")){
      verifyAccount(accountId)
     }else{
      setError("Invalid account");
      setLoading(false)
     }
   }
  
  },[]);

  const verifyAccount=async (accountId)=>{
    try {
        const res=await axios({
          url:`http://localhost:4000/stripe/verify-account?accountId=${accountId}`
        });
      console.log(res.data)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.error||error?.response?.data?.message);
      setLoading(false);
    }
  }
  return (
    <div className="App">
    {
      loading?<h1>Loading...</h1>:error?<h1>{error}</h1>:<h1>Success!!!</h1>
    }
    </div>
  );
}

export default App;
