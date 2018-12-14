import axios from 'axios'
import logObj from '../util/logHelp'
import qs from 'qs'
/* eslint-disable */
//接口地址
// var BASE_URL='http://192.168.172.204:15521/'
const config = require('../config/config')
const BASE_URL = config.api.baseURL
//var BASE_URL='http://10.40.2.178:8090/'
// var BASE_URL='http://103.10.87.52:17011/'
//var BASE_URL='http://localhost:58121/'

//var BASE_URL='http://192.168.172.204:3000/data'
// var BASE_URL='https://virtserver.swaggerhub.com/ludun/screen/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'

// var BASE_URL='http://192.168.1.188:8080/screen/api/v1'

const  host = window.location.hostname;
// const  BASE_URL= process.env.NODE_ENV  ===  'production'  ? `http://${host}:38088/screen/api/v1` : `http://${host}:38088/screen/api/v1`

var debug=true

export default {
  data () {
    return {

    }
  },
  install (Vue, option) {
    /*获取token*/

    Vue.prototype.getToken = function () {
      let token, intoToken = this.$route.query.token;
      if (intoToken) {
        token = intoToken;
      } else {
        token = localStorage.getItem('token');
      }
      return token;
    }

    // GET请求
    Vue.prototype.get = function (url,params,callback){
      axios.get(BASE_URL+url,{
        params,
        headers:{
          // Accept:'application/json'
        }
      }).
      then(res=>{
        callback && callback(res.data)
        logObj.recordDataLog.createLogMessage(url)
      }).
      catch(err=>{
        if (debug) {

        }
        return null
      })
    }

    // POST请求
    Vue.prototype.post = function (url,params,callback){

      axios.post(BASE_URL+url,params,{
        headers:{
          // Accept:'application/json'
        }
      }).
      then(res=>{
        callback && callback(res.data)
        logObj.recordDataLog.createLogMessage(url)
      }).
      catch(err=>{
        if (debug) {

        }
        return null
      })
    }
    Vue.prototype.postJ = function (url,params,callback){
      if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        var url = BASE_URL+url

        var xdr = new XDomainRequest();
        xdr.onload = function() {
          alert(xdr.responseText);
        };
        xdr.onerror = function(e) {
          alert("error");
          console.log(e)
        };

        xdr.timeout = 60000;
        xdr.ontimeout = function() {
          alert("timeout");
        };

        xdr.open("post", url);
        var postData = encodeURI(JSON.stringify(params));
        xdr.send(postData);
      }else{
        axios({
          method: 'post',
          url:BASE_URL+url,
          data:qs.stringify(params),
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
            // Accept:'application/json'
          }
        }).then((res)=>{
          callback && callback(res.data)
          logObj.recordDataLog.createLogMessage(url)
        }).
        catch(err=>{
          if (debug) {

          }
          return null
        });
      }


    }
    Vue.prototype.BASE_URL=BASE_URL
  },
}
