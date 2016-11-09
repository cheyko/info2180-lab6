var httpRequest;
var word;
var button;
var fullsearch;
window.onload = function() {
  //document.getElementById("clickbutton").onclick = doAjax;
  //meaning();
  word =document.getElementsByTagName('input')[0];
  button = document.getElementsByTagName('input')[1];
  fullsearch = document.getElementsByTagName('input')[2];

	button.onclick =function() {
		doAjax(); 
		meaning();
	};
	
	fullsearch.onclick =function() {
		fullsearch.setAttribute('all','true');
		doAjax(); 
		getEverything();
	};
	
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
  
  function getEverything() {

	var url = "request.php?q="+fullsearch.getAttribute('all');
	httpRequest.onreadystatechange = searchAll;
	httpRequest.open("GET", url);
	httpRequest.send();
}

function searchAll() {

	var print =document.getElementById('result');
	var list = document.createElement('ol');
	print.innerHTML ='<h3> Result </h3>';

	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
		 	var response = httpRequest.responseXML;
		 	var definitions =response.getElementsByTagName('definition');
            print.appendChild(list);
         
            for (var i = 0; i < definitions.length; i++) {

            	var definition =document.createElement('li');
            	var heading =document.createElement('h3');
            	var p1 =document.createElement('p');
            	var p2 =document.createElement('p');

            	var word =document.createTextNode(definitions[i].getAttribute('name'));
				      var meaning =document.createTextNode(definitions[i].childNodes[0].nodeValue);
            	var author =document.createTextNode('-'+definitions[i].getAttribute('author'));
            	
            	heading.appendChild(word);
            	p1.appendChild(meaning);
            	p2.appendChild(author);

                definition.appendChild(heading);
                definition.appendChild(p1);
                definition.appendChild(p2);
                list.appendChild(definition);
            } 
		}
		else 
			print.innerHTML='there was some kind of error that arose';
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