var httpRequest;
var word;
var button;
window.onload = function() {
  //document.getElementById("clickbutton").onclick = doAjax;
  //meaning();
  word =document.getElementsByTagName('input')[0];
  button = document.getElementsByTagName('input')[1];

	button.onclick =function() {
		doAjax(); 
		meaning();
	}
};

  function doAjax(){
		httpRequest =new XMLHttpRequest();
    // GET Request
    //var url = "https://info2180-lab6-cheyko.c9users.io/request.php?q=definition";
    var url = "request.php?q="+word.value;
    httpRequest.onreadystatechange = meaning;
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function meaning() {
    var print = document.getElementById('result');
    if (httpRequest.readyState === httpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = httpRequest.responseText;
        //alert(response);
        print.innerHTML ='<h3> Result </h3>'+response;
      } else {
        //alert('There was a problem with the request.');
        print.innerHTML ='no response was found';
      }
    }
  }


/*window.onload()
{
      document.getElementById("clickbutton").onclick = function() { 
      //var userName = document.getElementById("ajaxTextbox").value;
      makeRequest('request.php',userName); 
  };
    function makeRequest(url, userName) {

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('userName=' + encodeURIComponent(userName));
  }
  function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      alert(response.computedString);
    } else {
      alert('There was a problem with the request.');
    }
  }
}
}*/