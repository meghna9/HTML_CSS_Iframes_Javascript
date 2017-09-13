"use strict";

var Buttons = [
     { "id":"BTN_HOME"        , "name":"HOME"        ,                                        "func":"paintHomeScreen" }
    ,{ "id":"BTN_EXECUTIVE"   , "name":"EXECUTIVE"   , "icon":"images/Dashboard.png"        , "url":"http://report1-dev/t/Capsico/views/EXECUTIVEDASHBOARD_1/EXECUTIVEDASHBOARD?:linktarget=_self&:embed=yes&:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=no&:toolbar=no&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
    ,{ "id":"BTN_PEOPLE"      , "name":"PEOPLE"      , "icon":"images/People.png"           , "func":"paintPeople" }
    ,{ "id":"BTN_QUALITY"     , "name":"QUALITY"     , "icon":"images/Quality.png"          , "func":"paintQuality"}

  

var selectedButton = null;

function addCSS(id, className)
      {
        var e = document.getElementById(id);y" }
    ,{ "id":"BTN_OPERATIONS"  , "name":"OPERATIONS"  , "icon":"images/Operations.png"       , "func":"paintOperations" }
    ,{ "id":"BTN_PATIENT"     , "name":"PATIENT"     , "icon":"images/PatientExperience.png", "func":"paintPatients" }
    ,{ "id":"BTN_BUSINESS"    , "name":"BUSINESS"    , "icon":"images/BusinessGrowth.png"   , "url":"/error.html" }
    ,{ "id":"BTN_FINANCIAL"   , "name":"FINANCIAL"   , "icon":"images/Finance.png"          , "url":"http://report1-dev/t/Capsico/views/FINANCIALMEASURES_0/FINANCIALMEASURES?:linktarget=_self&:embed=yes&:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%253A%252F%252Freport1-dev%252F&:tabs=yes&&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0#7" }
    ,{ "id":"BTN_ALL_REPORTS" , "name":"ALL REPORTS" , "icon":"", "url":"/error.html" }
    ,{ "id":"BTN_ALL_MEASURES", "name":"ALL MEASURES", "icon":"", "url":"/error.html" }
    ,{ "id":"BTN_TRAINING"    , "name":"TRAINING"    , "icon":"", "url":"/error.html" }
    ,{ "id":"BTN_CONTACT_US"  , "name":"CONTACT US"  , "icon":"", "url":"/error.html" }
  ];
        if (e != null)
         e.classList.add(className);
      };
function removeCSS(id, className)
      {
        var e = document.getElementById(id);
        if (e != null)
         e.classList.remove(className);
      };

function getButton(id)
 {
	for (var i = 0; i < Buttons.length; ++i)
	 {
	   var b = Buttons[i];
	   if (b.id == id)
		return b;
	 }
	return null;
 }
	  
	  
	  
function openTableauLink(url, width, height)
 {
	var ifrm = document.createElement("iframe");
	var x = document.getElementById("NAV_PANE");
    x.innerHTML="";
	ifrm.frameBorder = 0;
//    ifrm.style="border: 0px";
	ifrm.width = width || x.offsetWidth;
	ifrm.height = height || 950;
	ifrm.src= url;
	x.appendChild(ifrm);

 }
 
function openTableau(id)
  {
	var b = getButton(id);
	if (b == null)
     {
       alert("This button is not active at this time");
	   return;
	 }

	if (selectedButton!=null)
     removeCSS(selectedButton, "active");
    selectedButton=b.id;
    addCSS(selectedButton, "active");
	 
	if (b.func != null)
	 {
	   var f = eval(b.func);
	   f("NAV_PANE");
	 }
	else if (b.url != null)
	 {
       openTableauLink(b.url, b.width, b.height);
	 }
    else
	 alert("This button is not correctly defined. Missing a URL or a function name.");
  }
   
   
function paintNavBar(id)
 {
	var Str = "";
	for (var i = 0; i < Buttons.length; ++i)
	 {
	   var b = Buttons[i];
       Str+='<button class="button" id="'+b.id+'" onclick="openTableau(\''+b.id+'\')"><b>'+b.name+'</b></button>';
	 }
	document.getElementById(id).innerHTML = Str;
 }


 function paintRow(buttonIds)
  {
	var Str = '<TABLE class="HSButton" align="center" border="0px"><TR>';
	for (var i = 0; i < buttonIds.length; ++i)
	 {
	   var b = getButton(buttonIds[i]);
	   if (b != null)
	    {
	      Str+='<TD onclick="openTableau(\''+b.id+'\')"><IMG src="'+b.icon+'"><BR>'+b.name+'</TD>';
	    }
	 }
	Str+='</TABLE>';
	return Str;
  }
 
function paintHomeScreen(id)
 {
	var Str = '<BR>'
	         +'<h1><center>WELCOME TO THE CONNECTED <BR>HEALTH INSTITUTE DATA & ANALYTICS SITE</center></h1>'
	         +'<BR>'
			 +paintRow(["BTN_EXECUTIVE", "BTN_PEOPLE", "BTN_QUALITY", "BTN_FINANCIAL"])
			 +'<BR>'
	         +paintRow(["BTN_OPERATIONS", "BTN_PATIENT", "BTN_BUSINESS"]);
	document.getElementById(id).innerHTML = Str;
 }


var BaselineUrls = {
  "baselineUrl1":"http://report1-dev/t/Capsico/views/HOMEHEALTHPERFORMANCE_1/DETAILS?PERFORMANCE+MEASURES=${name}&?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0"
 ,"baselineUrl2":"http://report1-dev/#/site/Capsico/views/HOSPICEQUALITY_0/DETAILS?OUTCOME+QUALITY+MEASURES=${name}&?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0"
 ,"baselineUrl3":"http://report1-dev/t/Capsico/views/HOMEHEALTHQUALITYSAFETY_0/DETAILS?QUALITY+AND+SAFETY+MEASURES=${name}&?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0"
 ,"baselineUrl4":"http://report1-dev/t/Capsico/views/HOSPICEPROCESS_2/DETAILS?PROCESS+MEASURES=${name}&?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0"
 ,"baselineUrl5":"http://report1-dev/#/site/Capsico/views/HOMEHEALTHQUALITY_2/DETAILS?QUALITY+MEASURES=${name}&?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0"
 }; 
 
var QualityReports_HOMEHEALTH=[
   { "name":"Home Health Performance"
    ,"subs": [
	   { "name":"Summary Of All Measures"                                           , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHPERFORMANCE_1/SUMMARY?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Completed Medication Reconciliation"                               , "macro":"baselineUrl1" }
	  ,{ "name":"Influenza Vaccination Contraindicated (During Current Flu Season)" , "macro":"baselineUrl1" }
	  ,{ "name":"Influenza Vaccination Received (During Current Flu Season)"        , "macro":"baselineUrl1" }
	  ,{ "name":"Influenza Vaccination Refused (During Current Flu Season)"         , "macro":"baselineUrl1" }
	  ,{ "name":"Improvement In Surgical Wound status"                              , "macro":"baselineUrl1" }
	  ,{ "name":"Pneumococcal Vaccination Contraindicated"                          , "macro":"baselineUrl1" }
	  ,{ "name":"Pneumococcal Vaccination Received"                                 , "macro":"baselineUrl1" }
	  ,{ "name":"Pneumococcal Vaccination Refused"                                  , "macro":"baselineUrl1" }
	  ,{ "name":"Signed Medical Orders Within 30 Days Of Being Written"             , "macro":"baselineUrl1" }
	  ,{ "name":"Signed Plan Of Care Orders (485) Within 30 Days Of SOC"            , "macro":"baselineUrl1" }
	 ]
   }
 ];
 
  
var QualityReports_HOSPICE=[
   { "name":"Hospice Quality"
    ,"subs": [
	   { "name":"Summary Of All Measures", "url":"http://report1-dev/t/Capsico/views/HOSPICEQUALITY_0/SUMMARY?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Belief Values"                                 , "macro":"baselineUrl2" }
	  ,{ "name":"Comprehensive Pain Assessment"                 , "macro":"baselineUrl2" }
	  ,{ "name":"Dyspnea Assessment"                            , "macro":"baselineUrl2" }
	  ,{ "name":"Dyspnea Treatment"                             , "macro":"baselineUrl2" }
	  ,{ "name":"Opioid Treatment With Bowel Regimen"           , "macro":"baselineUrl2" }
	  ,{ "name":"Pain Screening"                                , "macro":"baselineUrl2" }
	  ,{ "name":"Treatment Preferences"                         , "macro":"baselineUrl2" }
	 ]
   }
 ];
 
 var QualitySafetyReports_HOMEHEALTH=[
   { "name":"Home Health Quality & Safety"
    ,"subs": [
	   { "name":"Summary Of All Measures"          , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHQUALITYSAFETY_0/SUMMARY?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Completed Depression Screening"   , "macro":"baselineUrl3" }
	  ,{ "name":"Completed Falls Risk Assessment"  , "macro":"baselineUrl3" }
	  ,{ "name":"Received Influenza Vaccine"	   , "macro":"baselineUrl3" }
	 ]
   }
 ];
 
 var ProcessReports_HOSPICE=[
   { "name":"Hospice Process"
    ,"subs": [
	   { "name":"Summary Of All Measures"        , "url":"http://report1-dev/t/Capsico/views/HOSPICEPROCESS_2/SUMMARY?:iid=4?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Notice Election"                , "macro":"baselineUrl4" }
	  ,{ "name":"Signed Orders for Plan of Care" , "macro":"baselineUrl4" }
	 
	 ]
   }
 ];
 
 var QualityReports_HOMEHEALTHH=[
   { "name":"Home Health Quality"
    ,"subs": [
	   { "name":"Summary Of All Measures"                       , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHQUALITY_2/SUMMARY?:linktarget=_self&:embed=yes&:&tab=yes:showVizHome%3Dno&:scrollbars=no:host_url%3Dhttp:%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0#1" }
	  ,{ "name":"Ambulation Improvement"                        , "macro":"baselineUrl5" }
	  ,{ "name":"Pain Medication Improvment"                    , "macro":"baselineUrl5" }
	  ,{ "name":"Oral Medication Improvment"                    , "macro":"baselineUrl5" }

	 ]
   }
 ];
 var PeopleReports_PEOPLE=[
   { "name":""
    ,"subs": [
	   { "name":"Candidate Days To Fill"       					, "url":"http://report1-dev/t/Capsico/views/DAYSTOFILL/DAYSTOFILL?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Employee New Hire Rate" 						, "url":"http://report1-dev/t/Capsico/views/NEWHIRERATE_0/NEWHIRERATE?:iid=1?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Employee Census (Current)"             , "url":"http://report1-dev/t/Capsico/views/EMPLOYEECENSUSCURRENT/EMPLOYEECENSUSCURRENT?:iid=3?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Employee Census (Historical)"      	, "url":"http://report1-dev/t/Capsico/views/EMPLOYEECENSUSHISTORICAL/EMPLOYEECENSUSHISTORICAL?:iid=2?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Employee TurnOver Rate"       					, "url":"http://report1-dev/t/Capsico/views/TURNOVERRATE_0/TURNOVERRATE?:iid=5?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  ,{ "name":"Employee Tenure"       	    				, "url":"http://report1-dev/t/Capsico/views/TENURE/TENURE?:iid=3?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	  	 
	 ]
   }
   ];
   
  var PatientReports_PATIENT=[
   { "name":""
    ,"subs": [
	   { "name":"Patient Average Daily Census"       	, "url":"http://report1-dev/t/Capsico/views/PATIENTAVERAGEDAILYCENSUS_0/PATIENTAVERAGEDAILYCENSUS?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0#1" }
	  ,{ "name":"Patient Admissions" 			                , "url":"http://report1-dev/t/Capsico/views/PATIENTADMISSIONS_0/PATIENTADMISSIONS?:iid=1?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
	 
	  	 
	 ]
   }
 ];
 
 var UtilizationReports_Operations=[
   { "name":""
    ,"subs": [
    { "name":"30-day Readmissions"              		 , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHQUALITY-ASSESSMENT/DISTRIBUTION-30-DAYREADMISSIONS?:iid=1?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
   ,{ "name":"Overall Hospitalization"       			 , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHQUALITY-ASSESSMENT/DISTRIBUTION-OVERALLHOSPITILZATIONS?:iid=1?:iid=1?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
   ,{ "name":"Home Health Utilization"                   , "url":"http://report1-dev/t/Capsico/views/HOMEHEALTHUTILIZATION_1/HOMEHEALTHUTILIZATION?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
   ,{ "name":"Hospice Utilization"                       , "url":"http://report1-dev/t/Capsico/views/HOSPICEUTILIZATION_0/HOSPICEUTILIZATION?:linktarget=_self&:embed=yes&?:iid=1:&tab=yes&:showVizHome=no&:scrollbars=no:host_url=http%3A%2F%2Freport1-dev%2F&:tabs=yes&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0" }
    
  ]
   }
];
 
/*

ASSESSMENT DETAILS
ADDITIONAL ASSESSMENT DETAILS
30-DAY READMISSIONS DISTRIBUTIONS
OVERALL HOSPITALIZATION DISTRIBUTIONS

DETAILS
ADDITIONAL DETAILS
DISTRIBUTIONS
*/

function PaintReportMenu(defs, level)
 {
   if (level == null)
    level = 1
   var Str = "";
   for (var i = 0; i < defs.length; ++i)
    {
	  var d = defs[i];
	  if (d.url == null && d.macro == null)
	   {
		 Str+='<H'+level+'>'+d.name+'</H'+level+'>';
		 if (d.subs != null && d.subs.length != 0)
		  Str+='<BLOCKQUOTE>'+PaintReportMenu(d.subs, level+1)+'</BLOCKQUOTE>';
	   }
	  else
	   {
		 var url = d.macro != null ? BaselineUrls[""+d.macro] : d.url;
		 if (d.link == false)
          Str+='<SPAN class="ReportNoLink">'+d.name+'</SPAN><BR>';
		 else
		  Str+='<A class="ReportLink" href="javascript:openTableauLink(\''+url.replace("${name}", d.name.toUpperCase())+'\')">'+d.name+'</A><BR>';
	   }
    }
   return Str;
 }

function paintQuality(id)
 {
	var Str = '<BR>'
	         +'<h1><center>QUALITY REPORTS</center></h1>'
	         +'<BR>'
	         +'<TABLE align="center">'
			 +'<TR valign="top"><TD>'+PaintReportMenu(QualityReports_HOMEHEALTH)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +                 '<TD>'+PaintReportMenu(QualityReports_HOSPICE)+'</TD>'
			 +'</TR>'
			 +'<TR><TD>&nbsp;</TD></TR>'
			 +'<TR valign="top"><TD>'+PaintReportMenu(QualitySafetyReports_HOMEHEALTH)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +                 '<TD>'+PaintReportMenu(ProcessReports_HOSPICE)+'</TD>'
			 +'</TR>'
			 +'<TR><TD>&nbsp;</TD></TR>'
			 +'<TR valign="top"><TD>'+PaintReportMenu(QualityReports_HOMEHEALTHH)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +'</TR>'
			 +'</TABLE>'
	         ;
	document.getElementById(id).innerHTML = Str;
 }
 
 function paintPeople(id)
 {
	var Str = '<BR>'
	         +'<h1><center>PEOPLE REPORTS</center></h1>'
	         +'<BR>'
	         +'<TABLE align="center">'
			 +'<TR valign="top"><TD>'+PaintReportMenu(PeopleReports_PEOPLE)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +'</TABLE>'
	         ;
	document.getElementById(id).innerHTML = Str;
 }
 
 
 function paintPatients(id)
 {
	var Str = '<BR>'
	         +'<h1><center>PATIENT REPORTS</center></h1>'
	         +'<BR>'
	         +'<TABLE align="center">'
			 +'<TR valign="top"><TD>'+PaintReportMenu(PatientReports_PATIENT)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +'</TABLE>'
	         ;
	document.getElementById(id).innerHTML = Str;
 
 }
 function paintOperations(id)
 {
	var Str = '<BR>'
	         +'<h1><center>OPERATIONS REPORTS</center></h1>'
	         +'<BR>'
	         +'<TABLE align="center">'
			 +'<TR valign="top"><TD>'+PaintReportMenu(UtilizationReports_Operations)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +'</TABLE>'
	         ;
	document.getElementById(id).innerHTML = Str;
 }
