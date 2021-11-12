function setTilt(element) {
  // console.log("style set ");
  VanillaTilt.init(element, {
    glare: true,
    reverse: true,
    "max-glare": 0.3,
    scale:1.09,
    max:20,
    transition:true,
    axis: "x",
    gyroscope: false,
    startX: 30,
    // startY:0,
    speed:330, //higher the value, slower the motion , like time 
  });
}

function parseHTML(html="") {  //created document fragment that is apened
    const template = document.createElement('template');
    if ('content' in template) {
        template.innerHTML = html;
        return document.importNode(template.content, true);
    }
    const frag = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
        frag.appendChild(div.firstChild);
    }
    return frag;
}

function appendEmptyData() {
  document.getElementById("moviedata").appendChild(parseHTML('<div class="card-empty"></div>'));
  document.getElementById("moviedata").appendChild(parseHTML('<div class="card-empty"></div>'));
  document.getElementById("moviedata").appendChild(parseHTML('<div class="card-empty"></div>'));
}


function loadXMLDoc(filename) {
  if (window.ActiveXObject) {
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  }
  else {
    xhttp = new XMLHttpRequest();
  }
  xhttp.open("GET", filename, false);
  // try { xhttp.responseType = "msxml-document" } catch (err) { } // Helping IE11
  xhttp.send("");
  return xhttp.responseXML;
}



function xPATHExecuter(xmlDoc,path) {
  var nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
  var Iterator = xmlDoc.evaluate(path, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
  var result = Iterator.iterateNext();
  const List = new Set()
  while (result) {
    List.add(result.childNodes[0].nodeValue);
    result = Iterator.iterateNext();
  }
  
  // str=str+str+ str + str+str + str+str+str+ str + str+str + str;
  return List;
}


function appendNoResultTag() {
  // console.log("Emptyyyyyyyyyyyy")
  document.getElementById("moviedata").innerHTML = "<div class='no-data'>Movie not found <br/>Check out other movies</div>";
}
function displayMovieResults(xmlDoc, xmlStyle, paramSort = "unset",paramOrder="unset",paramFilter="",paramFilterOn="title") {  
  xml = xmlDoc;
  xsl = xmlStyle;
  document.getElementById("moviedata").innerHTML="";
  // code for IE
  if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    ex = xml.transformNode(xsl);
    document.getElementById("moviedata").innerHTML = ex;
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    if (paramSort == "unset") {
      paramOrder = "descending";
      paramSort = "id";
    }
    xsltProcessor.setParameter(null, "sortParam", paramSort);
    xsltProcessor.setParameter(null, "order", paramOrder); 
    xsltProcessor.setParameter(null, "filter", paramFilter); 
    
    xsltProcessor.setParameter(null, "filterOn", paramFilterOn); 
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    var cells = resultDocument.querySelectorAll('.card');
    cells.forEach(cell => cell.addEventListener('mouseenter', (e)=>setTilt(e.srcElement), false));    
    // console.log(resultDocument)
    document.getElementById("moviedata").appendChild(resultDocument);
    appendEmptyData();
    //to tackle the spacing in grid when there is less than 4 card on selection during search
    let data= document.querySelector(".card")
    if (data == null) {
      appendNoResultTag();
    }
  }
}  


