import axios from 'axios'
/* eslint-disable */
//接口地址
//var BASE_URL='http://192.168.172.204:15521/'
const config = require('../config/config')
const BASE_URL = config.api.baseURL
//var BASE_URL='http://10.40.2.178:8090/'
// var BASE_URL='http://localhost:3000'
// var BASE_URL='https://virtserver.swaggerhub.com/ludun/screen/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'

// const  host = window.location.hostname;
// const  BASE_URL= process.env.NODE_ENV  ===  'production'  ? `http://${host}:38088/screen/api/v1` : `http://${host}:38088/screen/api/v1`

var debug=true

export default {
	get(url,params,callback){
		axios.get(BASE_URL+url,{
			params,
			headers:{
				Accept:'application/json'
			}
		}).
		then(res=>{
			callback && callback(res.data)
		}).
		catch(err=>{
			if (debug) {
				console.log('======请求错误======'+err)
			}
			return null
		})
	},
	post(url,params,callback){
		axios.post(BASE_URL+url,params,{
			headers:{
				Accept:'application/json'
			}
		}).
		then(res=>{
			callback && callback(res.data)
		}).
		catch(err=>{
			if (debug) {
				console.log('======请求错误======'+err)
			}
			return null
		})
	}
}
