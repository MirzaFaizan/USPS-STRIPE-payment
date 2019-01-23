(function(window) {
  var btn = document.getElementById("button");
  btn.addEventListener("click", inputValues, makeRequest);
  let serviceType = "";
  let mailType = "";
  let zipAddress1 = "";
  let zipAddress2 = "";
  let pounds = "";
  let ounces = "";
  let size = "";
  let xmlData;
  let xml;
  let parseserviceType;
  let parsemailType;
  let parseZipAddress1;
  let parseZipAddress2;
  let parsePounds;
  let parseOunces;
  let parsesize;
  let parsexmlData;

  function inputValues(e) {
    serviceType = document.getElementById("InputServiceType").value;
    mailType = document.getElementById("InputMailType").value;
    zipAddress1 = document.getElementById("inputAddress").value;
    zipAddress2 = document.getElementById("inputAddress2").value;
    pounds = document.getElementById("inputPounds").value;
    ounces = document.getElementById("inputOunces").value;
    size = document.getElementById("inputSize").value;

    parseZipAddress1 = parseInt(zipAddress1);
    parseZipAddress2 = parseInt(zipAddress2);
    parsePounds = parseFloat(pounds);
    parseOunces = parseFloat(ounces);
    console.log(parseZipAddress1);
    console.log(parseZipAddress2);
    console.log(parsePounds);
    console.log(parseOunces);

    makeRequest();

    e.preventDefault();
  }

  function makeRequest() {
    const Http = new XMLHttpRequest();
    //  const url = `http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=<RateV4Request USERID="945RADIO3150"><Revision>2</Revision><Package ID="1ST"><Service>"${serviceType}"</Service><FirstClassMailType>"${mailType}"</FirstClassMailType><ZipOrigination>${parseZipAddress1}</ZipOrigination><ZipDestination>${parseZipAddress2}</ZipDestination<Pounds>${parsePounds}</Pounds><Ounces>${parseOunces}</Ounces><Container/><Size>"${size}"</Size><Machinable>true</Machinable></Package></RateV4Request>`;
    const url =
      'http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=<RateV4Request USERID="945RADIO3150"><Revision>2</Revision><Package ID="1ST"><Service>FIRST CLASS</Service><FirstClassMailType>LETTER</FirstClassMailType><ZipOrigination>44106</ZipOrigination><ZipDestination>20770</ZipDestination><Pounds>0</Pounds><Ounces>3.12345678</Ounces><Container/><Size>REGULAR</Size><Machinable>true</Machinable></Package></RateV4Request>';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = e => {
      xmlData = Http.responseText;

      parseXmlData(xmlData);
    };
  }
  function parseXmlData(x) {
    let parser = new DOMParser();
    xml = parser.parseFromString(x, "application/xml");
    console.log(xml);
  }
  window.Form = Form;
})(window);
