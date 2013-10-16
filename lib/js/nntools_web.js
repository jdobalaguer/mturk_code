
<!-- Div methods  -->

var html_start            = "../../../lib/html/start.html";
var html_infosheet        = "../../../lib/html/information_sheet.html";
var html_consentform      = "../../../lib/html/consent_form.html";
var html_humanform        = "../../../lib/html/human_form.html";
var html_instructions     = "html/instructions.html";
var html_errscreen        = "../../../lib/html/error_fullscreen.html";
var html_sending          = "../../../lib/html/sending_data.html";
var html_vercode          = "../../../lib/html/verification_code.php";

function emptyDiv(divid) {
  document.getElementById(divid).innerHTML = "";
}
function printDiv(divid,webfile) {
  if(typeof(coding)=="undefined"){
    coding = {};
  }
  // webdata
  var webdata = {};
  switch (webfile) {
    case html_vercode:
      webdata.minimum_performance     = parameters.minimum_performance;
      webdata.participant_performance = participant_performance;
      webdata.participant_id          = participant_id;
      break;
  }
  // webfunc
  var webfunc;
  switch (webfile) {
    case html_sending:
      webfunc = function(data) {
        if(coding.webfile==html_vercode){
          return;
        }
        document.getElementById(divid).innerHTML = data;
        coding.webfile = webfile;
      }
      break;
    default:
      webfunc = function(data) {
        document.getElementById(divid).innerHTML = data;
        coding.webfile = webfile;
      }
      break;
  }
  // send
  $.post(webfile,webdata,webfunc);
}
function hideDiv(element){
      document.getElementById(element).hidden = true;
}
function showDiv(element){
      document.getElementById(element).hidden = false;
}
function goWebsite(url) {
  printDiv("webbodyDiv",url);
}

<!-- Auxiliar methods for HTML templates -->
var participant_id     = makeId();
var participant_age    = '';
var participant_gender = '';
function getHumanform(){
  participant_age    = document.getElementById("ageSelect").value;
  participant_gender = document.getElementById("genderSelect").value;
}
