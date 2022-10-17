import{_ as g,B as C,r as y,o as r,c as u,a as n,b as c,d as s,n as k,w as m,v as d,e as v,f as _,t as p,g as b}from"./index.195e315a.js";const S={components:{BSpinner:C},data(){return{isCameraOpen:!1,isPhotoTaken:!1,isLoading:!1}},computed:{isLoadingPage:{get(){return this.$store.state.isLoading}}},methods:{toggleCamera(){this.isCameraOpen?(this.isCameraOpen=!1,this.isPhotoTaken=!1,this.stopCameraStream()):(this.isCameraOpen=!0,this.createCameraElement())},createCameraElement(){this.isLoading=!0;const a=window.constraints={audio:!1,video:!0};navigator.mediaDevices.getUserMedia(a).then(e=>{this.isLoading=!1,this.$refs.camera.srcObject=e}).catch(e=>{this.isLoading=!1,console.log("error",e)})},stopCameraStream(){this.$refs.camera.srcObject.getTracks().forEach(e=>{e.stop()})},takePhoto(){this.isPhotoTaken=!this.isPhotoTaken,this.$refs.canvas.getContext("2d").drawImage(this.$refs.camera,0,0,450,337.5),this.stopCameraStream()},async submitImage(){const a=document.getElementById("photoTaken").toDataURL("image/jpeg");this.$store.commit("SET_IS_LOADING",!0),this.$store.commit("SET_USER_IMAGE",a);const e=await this.$store.dispatch("getWeather");await this.$store.dispatch("saveUser",this.$store.state.user),e&&this.$router.push("/"),this.$store.commit("SET_IS_LOADING",!1)}}},E={key:1,class:"web-camera-container mt-5"},T={key:0,class:"my-2 mb-4"},N={class:"camera-button"},O={key:0},P={key:1,class:""},x={class:"camera-loading"},I={key:1,class:"camera-box"},L=["height"],w=["height"],R={key:2,class:"camera-shoot"},B=s("img",{style:{filter:"invert(1)"},src:"https://img.icons8.com/material-outlined/50/000000/camera--v2.png"},null,-1),A=[B],U={key:3,class:"camera-download"};function $(a,e,h,f,t,o){const l=y("BSpinner");return o.isLoadingPage?(r(),u(l,{key:0})):(r(),n("div",E,[t.isCameraOpen?c("",!0):(r(),n("div",T," To continue, please take a selfie. ")),s("div",N,[s("button",{type:"button",class:k(["btn",{"btn-outline-primary":!t.isCameraOpen,"btn-outline-danger":t.isCameraOpen}]),onClick:e[0]||(e[0]=(...i)=>o.toggleCamera&&o.toggleCamera(...i))},[t.isCameraOpen?(r(),n("span",P,"Close Camera")):(r(),n("span",O,"Open Camera"))],2)]),m(s("div",x,[t.isLoading?(r(),u(l,{key:0})):c("",!0)],512),[[d,t.isCameraOpen&&t.isLoading]]),t.isCameraOpen?m((r(),n("div",I,[m(s("video",{ref:"camera",width:450,height:337.5,autoplay:""},null,8,L),[[d,!t.isPhotoTaken]]),m(s("canvas",{id:"photoTaken",ref:"canvas",width:450,height:337.5},null,8,w),[[d,t.isPhotoTaken]])],512)),[[d,!t.isLoading]]):c("",!0),t.isCameraOpen&&!t.isLoading?(r(),n("div",R,[s("button",{type:"button",class:"btn btn-primary",onClick:e[1]||(e[1]=(...i)=>o.takePhoto&&o.takePhoto(...i))},A)])):c("",!0),t.isPhotoTaken&&t.isCameraOpen?(r(),n("div",U,[v(" Looking good? "),s("a",{id:"downloadPhoto",download:"my-photo.jpg",class:"link-primary cursor-pointer",onClick:e[2]||(e[2]=(...i)=>o.submitImage&&o.submitImage(...i))}," Continue ")])):c("",!0)]))}const D=g(S,[["render",$]]),M=/[a-zA-Z]+(?:[ '-][a-zA-Z]+)*/;function V(a){return!!M.test(a)}const j=/^[a-zA-Z ]+$/;const G={components:{CameraComponent:D},data(){return{error:{name:"",city:""}}},computed:{formStep:{get(){return this.$store.state.formStep}},userName:{get(){return this.$store.state.user.name},set(a){this.$store.commit("SET_USER_NAME",a)}},userCity:{get(){return this.$store.state.user.city},set(a){this.$store.commit("SET_USER_CITY",a)}}},methods:{validateName(){if(j.test(this.userName))this.error.name="";else return this.error.name="Name is required",!1;return!0},async submitForm(a){a.preventDefault();const e=V(this.userCity);e?this.error.city="":this.error.city="Enter a valid City",!(!this.validateName()||!e)&&this.$store.commit("SET_FORM_STEP",2)}}},z={key:0,class:"register-card mt-5"},F={class:"card"},Z=s("h3",{class:"card-title card-header"},"Register Page",-1),X={class:"card-body"},Y={class:"mb-3"},q=s("label",{for:"nameInput",class:"form-label"},"Name",-1),W={key:0,class:"text-danger"},H={class:"mb-3"},J=s("label",{for:"cityInput",class:"form-label"},"City",-1),K={key:0,class:"text-danger"},Q={class:"mb-3 form-check d-flex justify-content-end"},ee={key:1};function te(a,e,h,f,t,o){const l=y("camera-component");return o.formStep==1?(r(),n("div",z,[s("form",F,[Z,s("div",X,[s("div",Y,[q,m(s("input",{type:"text",class:"form-control",id:"nameInput","onUpdate:modelValue":e[0]||(e[0]=i=>o.userName=i)},null,512),[[_,o.userName]]),t.error.name?(r(),n("small",W,p(t.error.name),1)):c("",!0)]),s("div",H,[J,m(s("input",{type:"text",class:"form-control",id:"cityInput","onUpdate:modelValue":e[1]||(e[1]=i=>o.userCity=i)},null,512),[[_,o.userCity]]),t.error.city?(r(),n("small",K,p(t.error.city),1)):c("",!0)]),s("div",Q,[s("button",{type:"submit",class:"btn btn-primary",onClick:e[2]||(e[2]=(...i)=>o.submitForm&&o.submitForm(...i))}," Submit ")])])])])):(r(),n("div",ee,[b(l)]))}const ae=g(G,[["render",te]]);export{ae as default};
