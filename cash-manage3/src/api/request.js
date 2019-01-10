import axios from 'axios'

const request = axios.create({

})

request.interceptors.request.use(config=>{
    if(localStorage.getItem('weiToken')){
        config.headers.Authorization = localStorage.getItem('weiToken');
    }
})

request.interceptors.response.use(response=>{
    return response
},
error=>{
    const { status } = error.response;
    if(status == 401){
        localStorage.removeItem('weiToken');
    }
})

console.log('request',request);


export default request;
