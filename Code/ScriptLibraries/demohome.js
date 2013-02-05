window.phonegap = (document.URL.indexOf("http://") == -1) && (document.URL.indexOf("https://") == -1);
document.addEventListener('DOMContentLoaded',function(){
	document.getElementById("userinfo").innerHTML = navigator.userAgent;
	document.getElementById("userinfo").innerHTML += "<br />phonegap = " + window.phonegap;
})