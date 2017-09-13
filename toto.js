"use strict";

//PRODUCTION SETTINGS
//var BASE_SERVER = "http://report1/";
//var BASE_URL = BASE_SERVER+"t/CapsicoReports/";

//DEV SETTINGS
var BASE_SERVER = "http://report1-dev/"; // DEV
var BASE_URL = BASE_SERVER+"t/Capsico/views/"; // DEV


var COMMON_PARAMS="&:linktarget=_self&:render=false&:embed=yes&:tab=yes&:showVizHome=no&:scrollbars=no&:host_url="+escape(BASE_SERVER)+"&:toolbar=top&:usingOldHashUrl=true&:showShareOptions=true&:loadOrderID=0";


var Buttons = [
     { "id":"BTN_HOME"        , "name":"HOME"        ,                                        "func":"paintHomeScreen" }
    ,{ "id":"BTN_EXECUTIVE"   , "name":"EXECUTIVE"   , "icon":"images/Dashboard.png"        , "url":"http://www.etonline.com/news/194737_ranking_all_of_the_jokers_the_batman_verse" }
    ,{ "id":"BTN_PEOPLE"      , "name":"PEOPLE"      , "icon":"images/People.png"           , "func":"paintPeople" }
    ,{ "id":"BTN_QUALITY"     , "name":"QUALITY"     , "icon":"images/Quality.png"          , "func":"paintQuality" }
    ,{ "id":"BTN_OPERATIONS"  , "name":"OPERATIONS"  , "icon":"images/Operations.png"       , "func":"paintOperations" }
    ,{ "id":"BTN_PATIENT"     , "name":"PATIENT"     , "icon":"images/PatientExperience.png", "func":"paintPatients" }
    ,{ "id":"BTN_BUSINESS"    , "name":"BUSINESS"    , "icon":"images/BusinessGrowth.png"   , "url":"/error.html" }
    ,{ "id":"BTN_FINANCIAL"   , "name":"FINANCIAL"   , "icon":"images/Finance.png"          , "url":BASE_URL+"FINANCIALMEASURES_0/FINANCIALMEASURES?"+COMMON_PARAMS }
    ,{ "id":"BTN_ALL_REPORTS" , "name":"ALL REPORTS" , "icon":"", "func":"allReports" }
    ,{ "id":"BTN_ALL_MEASURES", "name":"ALL MEASURES", "icon":"", "url":"/error.html" }
    ,{ "id":"BTN_TRAINING"    , "name":"TRAINING"    , "icon":"", "url":"/error.html" }
    ,{ "id":"BTN_CONTACT_US"  , "name":"CONTACT US"  , "icon":"", "url":"/error.html" }
  ];

  

var selectedButton = null;

function addCSS(id, className)
      {
        var e = document.getElementById(id);
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
	x.style.overflow = "hidden";
	ifrm.frameBorder = 0;
//    ifrm.style="border: 0px";
	ifrm.width = width || x.offsetWidth;
	ifrm.height = height || "100%";
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
	 
	window.location.hash='#'+id;

	if (selectedButton!=null)
     removeCSS(selectedButton, "active");
    selectedButton=b.id;
    addCSS(selectedButton, "active");
	 
	if (b.func != null)
	 {
	   var f = eval(b.func);
	   f("NAV_PANE");
	   document.getElementById("NAV_PANE").style.overflow = "auto";
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
  "baselineUrl1":BASE_URL+"HOMEHEALTHPERFORMANCE_1/DETAILS?PERFORMANCE+MEASURES=${name}"+COMMON_PARAMS
 ,"baselineUrl2":BASE_URL+"HOSPICEQUALITY_0/DETAILS?OUTCOME+QUALITY+MEASURES=${name}"+COMMON_PARAMS
 ,"baselineUrl3":BASE_URL+"HOMEHEALTHQUALITYSAFETY_0/DETAILS?QUALITY+AND+SAFETY+MEASURES=${name}"+COMMON_PARAMS
 ,"baselineUrl4":BASE_URL+"HOSPICEPROCESS_2/DETAILS?PROCESS+MEASURES=${name}"+COMMON_PARAMS
 ,"baselineUrl5":BASE_URL+"HOMEHEALTHQUALITY_2/DETAILS?QUALITY+MEASURES=${name}"+COMMON_PARAMS
 ,"baselineUrl6":BASE_URL+"HOMEHEALTHQUALITY-ASSESSMENT/ASSESSMENTDETAILS?OASIS+MEASURES=${name}"+COMMON_PARAMS
 }; 

var QualityReports_HOMEHEALTH_SUMMARY=[
   { "name":"Home Health Measures"
    ,"subs": [
	   { "name":"Combined Measures Summary"            , "url":BASE_URL+"HOMEHEALTH-SUMMARY/SUMMARY?"+COMMON_PARAMS }
	 ]
   }
 ];

 
var QualityReports_HOMEHEALTH=[
   { "name":"Home Health Performance"
    ,"subs": [
	   { "name":"Summary Of All Measures"                                           , "url":BASE_URL+"HOMEHEALTHPERFORMANCE_1/SUMMARY?"+COMMON_PARAMS }
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
	   { "name":"Summary Of All Measures", "url":BASE_URL+"HOSPICEQUALITY_0/SUMMARY?"+COMMON_PARAMS }
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
	   { "name":"Summary Of All Measures"                     , "url":BASE_URL+"HOMEHEALTHQUALITYSAFETY_0/SUMMARY?"+COMMON_PARAMS }
	  ,{ "name":"Completed Depression Screening Assessment"   ,  "macro":"baselineUrl3" }
	  ,{ "name":"Completed Falls Risk Assessment"             ,  "macro":"baselineUrl3" }
	  ,{ "name":"Required Influenza Vaccine"	              ,  "macro":"baselineUrl3" }
	 ]
   }
 ];

var QualityReports_HOSPICE_SUMMARY=[
   { "name":"Hospice Measures"
    ,"subs": [
	   { "name":"Combined Measures Summary"            , "url":BASE_URL+"HOSPICE-SUMMARY/SUMMARY?"+COMMON_PARAMS }
	 ]
   }
 ];
 
 var ProcessReports_HOSPICE=[
   { "name":"Hospice Process"
    ,"subs": [
	   { "name":"Summary Of All Measures"        , "url":BASE_URL+"HOSPICEPROCESS_2/SUMMARY?"+COMMON_PARAMS }
	  ,{ "name":"Notice Of Election"             , "macro":"baselineUrl4" }
	  ,{ "name":"Signed Orders for Plan of Care" , "macro":"baselineUrl4" }
	 
	 ]
   }
 ];
 
var PeopleReports_PEOPLE=[
   { "name":""
    ,"subs": [
	   { "name":"Candidate Days To Fill"       , "link": false, "url":BASE_URL+"DAYSTOFILL/DAYSTOFILL?"+COMMON_PARAMS }
	  ,{ "name":"Employee New Hire Rate" 	   ,                "url":BASE_URL+"NEWHIRERATE_0/NEWHIRERATE?"+COMMON_PARAMS }
	  ,{ "name":"Employee Census (Current)"    ,                "url":BASE_URL+"EMPLOYEECENSUSCURRENT/EMPLOYEECENSUSCURRENT?"+COMMON_PARAMS }
	  ,{ "name":"Employee Census (Historical)" ,                "url":BASE_URL+"EMPLOYEECENSUSHISTORICAL/EMPLOYEECENSUSHISTORICAL?"+COMMON_PARAMS }
	  ,{ "name":"Employee TurnOver Rate"       ,                "url":BASE_URL+"TURNOVERRATE_0/TURNOVERRATE?"+COMMON_PARAMS }
	  ,{ "name":"Employee Tenure"              , "link": false, "url":BASE_URL+"TENURE/TENURE?"+COMMON_PARAMS }
	  	 
	 ]
   }
   ];
var QualityReports_HOMEHEALTHH=[
   { "name":"Home Health Quality"
    ,"subs": [
	   { "name":"Summary Of All Measures"                     , "url":BASE_URL+"HOMEHEALTHQUALITY_2/SUMMARY?"+COMMON_PARAMS }
	  ,{ "name":"Ambulation Improvement"                      , "macro":"baselineUrl5" }
	  ,{ "name":"Pain Improvement"                            , "macro":"baselineUrl5" }
	  ,{ "name":"Oral Medication Improvement"                 , "macro":"baselineUrl5" }

	 ]
   }
 ];
   
  var PatientReports_PATIENT=[
   { "name":" "
    ,"subs": [
	   { "name":"Patient Average Daily Census"       	, "url":BASE_URL+"PATIENTAVERAGEDAILYCENSUS_0/PATIENTAVERAGEDAILYCENSUS?"+COMMON_PARAMS }
	  ,{ "name":"Patient Admissions" 			        , "url":BASE_URL+"PATIENTADMISSIONS_0/PATIENTADMISSIONS?"+COMMON_PARAMS }
	  ,{ "name":"Patient Admissions By Physicians" 	    , "url":BASE_URL+"ADMISSIONSBYREFERRALTYPE/ADMISSIONSBYPHYSICIANS?"+COMMON_PARAMS }
	  ,{ "name":"Patient Admissions By Hospitals" 	    , "url":BASE_URL+"ADMISSIONSBYREFERRALTYPE/ADMISSIONSBYHOSPITALS?"+COMMON_PARAMS }
	 
	  	 
	 ]
   }
 ];
 
 var UtilizationReports_Operations=[
   { "name":""
    ,"subs": [
        { "name":"30 Days Readmissions"              		 , "macro":"baselineUrl6" }
       ,{ "name":"Overall Hospitalization"       			 , "macro":"baselineUrl6"}
       ,{ "name":"Home Health Utilization"                   , "url":BASE_URL+"HOMEHEALTHUTILIZATION_TRENDS/HOMEHEALTHUTILIZATION?"+COMMON_PARAMS }
       ,{ "name":"Hospice Utilization"                       , "url":BASE_URL+"HOSPICEUTILIZATION_0/HOSPICEUTILIZATION?"+COMMON_PARAMS }
       ,{ "name":"Hospice Additional Utilization"            , "url":BASE_URL+"ADDITIONALHOSPICEUTILIZATION_0/ADDITIONALHOSPICEUTILIZATION?"+COMMON_PARAMS }
       ,{ "name":"Hospice (Live) Discharges"                 , "url":BASE_URL+"PATIENTDISCHARGES/PATIENTDISCHARGES?"+COMMON_PARAMS }
      ]
   }
];


 var Reports_ALL=[
   { "name":""
    ,"subs": [
        { "name":"Story: VNAHG South CJR Scorecard"    , "url":BASE_URL+"VNAHGSOUTHCJRSCORECARD/VNAHGSouthCJRScorecard?"+COMMON_PARAMS }
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
//		  Str+='<A class="ReportLink" href="javascript:openTableauLink(\''+url.replace("devurl", d.name.toUpperCase())+'\')">'+d.name+'</A><BR>;
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
			 +'<TR valign="top"><TD>'+PaintReportMenu(QualityReports_HOMEHEALTH_SUMMARY)
			 +                        '<BR>'
			 +                        PaintReportMenu(QualityReports_HOMEHEALTH)
			 +                        '<BR>'
			 +                        PaintReportMenu(QualitySafetyReports_HOMEHEALTH)
			 +                        '<BR>'
			 +                        PaintReportMenu(QualityReports_HOMEHEALTHH)
			 +                 '</TD>'
			 +                 '<TD>'+PaintReportMenu(QualityReports_HOSPICE_SUMMARY)
			 +                        '<BR>'
			 +                        PaintReportMenu(QualityReports_HOSPICE)
			 +                        '<BR>'
			 +                        PaintReportMenu(ProcessReports_HOSPICE)
			 +                 '</TD>'
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

function allReports(id)
 {
	var Str = '<BR>'
	         +'<h1><center>ALL REPORTS</center></h1>'
	         +'<BR>'
	         +'<TABLE align="center">'
			 +'<TR valign="top"><TD>'+PaintReportMenu(Reports_ALL)+'</TD>'
			 +                 '<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>'
			 +'</TABLE>'
	         ;
	document.getElementById(id).innerHTML = Str; 
 }
 