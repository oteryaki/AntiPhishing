function AJAXInteractionLoading(fp, url, callback, processFunc, completeFunc) {
    var req = init();
    req.onreadystatechange = processRequest;
        
    function init() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    
    function processRequest () {
    
	   if(req.readyState == 1 ){
			if(processFunc) processFunc();
	   }
	   
      if (req.readyState == 4) {
      	 
      	 if(completeFunc){
	      	 completeFunc();
      	 }
      	 
	     if (req.status == 200) {
          if (callback) callback(req);
         //callback()çagrildiginda readyState 4 degerini alirsa,XMLHttpRequest islemini tamamladi demektir. 
         //Eger status degeri de 200 ise baglanti islemin basariyla yapildigi anlami çikar.
        }
      }
    }

    this.doGet = function() {
      req.open("GET", getURL(fp, url), true);
      req.send(null);
    }
}

function AJAXInteraction(fp, url, callback) {    
    var req = init();
    req.onreadystatechange = processRequest;
        
    function init() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    
    function processRequest () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          if (callback) callback(req);
         //callback()çagrildiginda readyState 4 degerini alirsa,XMLHttpRequest islemini tamamladi demektir. 
         //Eger status degeri de 200 ise baglanti islemin basariyla yapildigi anlami çikar.
        }
      }
    }

    this.doGet = function() {
      req.open("GET", getURL(fp, url), true);
      req.send(null);
    }
}

function AJAXInteractionUrlOnly(fp, updateitem, url, callback) {    
    var req = init();
    req.onreadystatechange = processRequest;
        
    function init() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    
    function processRequest () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          if (callback) callback(req);
         //callback()çagrildiginda readyState 4 degerini alirsa,XMLHttpRequest islemini tamamladi demektir. 
         //Eger status degeri de 200 ise baglanti islemin basariyla yapildigi anlami çikar.
        }
      }else if(req.readyState==1){
      	updateitem.innerHTML = '<font color="green">Bulunuyor...</font>';
      }
    }

    this.doGet = function() {
      req.open("GET", url, true);
      req.send(null);
    }
}

function AJAXInteractionCombo(url, callback, objsel, key_income, isnumeric) {

    var req = init();
    req.onreadystatechange = processRequest;
        
    function init() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    
    function processRequest () {
      // readyState of 4 signifies request is complete
      if (req.readyState == 4) {
	// status of 200 signifies sucessful HTTP call
        if (req.status == 200) {
          if (callback) callback(req, objsel, key_income, isnumeric);
        }
      }else if(req.readyState==1){
        var wait_key = '0';
        if(objsel.options[0]!=null)
        	wait_key = objsel.options[0].value;
		objsel.options[1]= new Option("Yükleniyor ...", wait_key);
		objsel.selectedIndex = 1;
      }
    }

    this.doGet = function() {
      // make a HTTP GET request to the URL asynchronously
      req.open("GET", url, true);
      req.send(null);
    }
}

function getURL(fp , url){    
	for (var i=0; i<fp.elements.length; i++){
        var name = fp.elements[i].name;
        var value = fp.elements[i].value;
        if (fp.elements[i].type == "radio")
        {
        	value = getRadioCheckedValue(eval('document.forms[0].'+fp.elements[i].name));
        }
    	if (name == "cmd") continue;
    	//Tarih alan kontrolü
    	if ((name.length > 3) && (name.substring(name.length-3) == "inp") && name!="cyersicinp"){
    		if (value == "") value = "01.01.1900";
			value = value.substring(6,10) + "-" + value.substring(3,5) + "-" + value.substring(0,2);			
			var repname = '&'+name.substring(0, name.length-4);
			url.replace(/repname/g, '');
			url = url + repname + "=" + value;
			continue;
    	}
    	var repname = '&'+name;
    	if (url.indexOf(repname) != -1) continue;

        if(value.includes('%')){
            value = value.replace("%", "%25");
        }

	    url = url + "&" + name + "=" + value;
    }
    return url;
}

function getXMLDoc(txt) {
    var browser = browserDetect();
    var xmldoc;
    if (browser == 'firefox') {
        parser = new DOMParser();
        xmldoc = parser.parseFromString(txt, "text/xml");
    } else if (browser == 'chrome') {
        parser = new DOMParser();
        xmldoc = parser.parseFromString(txt, "text/xml");
    } else { //default ie dir
        try {
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            xmldoc.async = "false";
            xmldoc.loadXML(txt);
        } catch (e) {
            parser = new DOMParser();
            xmldoc = parser.parseFromString(txt, "text/xml");
        }
    }
    return xmldoc;
}