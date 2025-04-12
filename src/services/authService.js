import {AUTH} from "@config/config"
import handleRequest from '@axios/axios';

const login = async (userData) => {
  const response = await handleRequest("POST",AUTH.LOG_IN, userData);
  return response;
};

const refreshToken = async(token)=>{
    
  const response = await handleRequest("POST",AUTH.REFRESH_TOKEN,{
    "refresh_token":token
} );
  return response;
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
  refreshToken,
  getMyDetails
};
