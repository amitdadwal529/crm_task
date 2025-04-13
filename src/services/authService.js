import {AUTH} from "@config/config"
import handleRequest from '@axios/axios';

const login = async (userData) => {
  const response = await handleRequest("POST",AUTH.LOG_IN, userData);
  return response;
};

const refreshAccessToken = async()=>{
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await handleRequest("POST",AUTH.REFRESH_TOKEN,{
    "refresh_token":refreshToken
} );

localStorage.setItem("token", response.accessToken);
localStorage.setItem("refreshToken", response.refreshToken);

return response.accessToken;
}


const getMyDetails  = async (id=null) => {

let url = AUTH.USER_DETAILS;

if(id!=null){
  url=url+`?id=${id}`
}

  const response = await handleRequest("GET",url);
  return response;
};


export default {
  login,
  refreshAccessToken,
  getMyDetails
};
