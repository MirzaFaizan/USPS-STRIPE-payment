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

  var request = new XMLHttpRequest();

  request.open(
    "GET",
    'http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=<RateV4Request USERID="945RADIO3150"><Revision>2</Revision><Package ID="1ST"><Service>FIRST CLASS</Service><FirstClassMailType>LETTER</FirstClassMailType><ZipOrigination>44106</ZipOrigination><ZipDestination>20770</ZipDestination><Pounds>0</Pounds><Ounces>3.12345678</Ounces><Container/><Size>REGULAR</Size><Machinable>true</Machinable></Package></RateV4Request>',
    true
  );
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      xmlData = request.responseText;
      parseXmlData(xmlData);
    } else {
      console.log("error");
    }
  };

  request.send();
}
function parseXmlData(x) {
  let parser = new DOMParser();
  xml = parser.parseFromString(x, "application/xml");
  var tempAmount = (xml.getElementsByTagName("Rate")[0].firstChild);
  console.log(tempAmount.data);

  var amountToBePaid= parseFloat(tempAmount.data);
  console.log(amountToBePaid);


  var checkoutHandler = StripeCheckout.configure({
    key: "pk_test_TYooMQauvdEDq54NiTphI7jx",
    locale: "auto"
  });
  
  checkoutHandler.open({
    name: "Radio sheild",
    description: "Here is the total for your shipping",
    token: handleToken,
    amount:amountToBePaid*100
  });

  function handleToken(token) {
   fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(token)
  })
  .then(response => {
    if (!response.ok)
      throw response;
    return response.json();
  })
  .then(output => {
    console.log("Purchase succeeded:", output);
  })
  .catch(err => {
    console.log("Purchase failed:", err);
  })
  }
  
}
