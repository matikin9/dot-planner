// Global variables
var intersectionCounter = 2;
var intersectionsValidated = [];
var newShapeDrawn = false;
//Creating the map
var map = L.mapbox.map('map')

var url = window.location.href;
url = url.split('/');
var id = url[url.length - 1];

$.ajax({
  method: "GET",
  url: "/projects/id/" + id,
  dataType: "json",
  success: function(data) {
    if (data) {
      var project = data[0];
      showHide(project);
    }
  }
});

// TODO: Does mapbox API token expire? We probably need the city to make their own account and create a map. This is currently using Spencer's account.

L.tileLayer('https://api.mapbox.com/styles/v1/spencerc77/ciw30fzgs00ap2jpg6sj6ubnn/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BlbmNlcmM3NyIsImEiOiJjaXczMDZ6NWwwMTgzMm9tbXR4dGRtOXlwIn0.TPfrEq5h7Iuain1LsBsC8Q', {detectRetina: true}).addTo(map);

//Adding a feature group to the map
var featureGroup = L.featureGroup().addTo(map);

//Add the drawing tool to the map passing in the above options as an argument
var drawControlFull = new L.Control.Draw({
  draw: {
    circle: false
  },
  edit: {
      featureGroup: featureGroup, //REQUIRED!!,
      edit: false,
      remove: false
  }
});

map.on(L.Draw.Event.CREATED, function(e) {
  featureGroup.addLayer(e.layer);
  drawControlFull.removeFrom(map);

  // Show shape submit buttons when created
  $("#delete-button").show();
});

$('#delete-button').on('click', function(e) {
  featureGroup.clearLayers();
  drawControlFull.addTo(map);
  newShapeDrawn = true;
  $('#delete-button').hide();
});

var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(34.0522, -118.2437)
);

var googleOptions = {
  location: defaultBounds,
  types: ['address']
};

var primary = document.getElementById('Primary_Street');
autocomplete = new google.maps.places.Autocomplete(primary, googleOptions);

var cross1 = document.getElementById('cross-street1');
autocomplete = new google.maps.places.Autocomplete(cross1, googleOptions);

var cross2 = document.getElementById('cross-street2');
autocomplete = new google.maps.places.Autocomplete(cross2, googleOptions);

//Show and hide attributes based on Funding Status
$('#Fund_St').on('click', function() {
  var fundedStatus = $('#Fund_St input[type="radio"]:checked').val();
  switch(fundedStatus) {
    case 'Funded':
    $('#fundedAndUnfundedAttributes').show();
    $('#fundedAttributes').show();
    $('#unfundedAttributes').hide();
    break;
    case 'Unfunded':
      $('#fundedAndUnfundedAttributes').show();
      $('#fundedAttributes').hide();
      $('#unfundedAttributes').show();
    break;
    case 'Idea Project':
    $('#fundedAndUnfundedAttributes').hide();
    $('#fundedAttributes').hide();
    $('#unfundedAttributes').hide();
  }
});


function showHide(project){

  switch(project.Fund_St){
    case 'Funded':
    $('#funded').prop('checked', true);
    $('#fundedAndUnfundedAttributes').show();
    $('#fundedAttributes').show();
    $('#unfundedAttributes').hide();
    break;

    case 'Unfunded':
    $('#unfunded').prop('checked', true);
    $('#fundedAndUnfundedAttributes').show();
    $('#fundedAttributes').hide();
    $('#unfundedAttributes').show();
    break;

    case 'Idea Project':
    $('#idea').prop('checked', true);
    $('#fundedAndUnfundedAttributes').hide();
    $('#fundedAttributes').hide();
    $('#unfundedAttributes').hide();
    break;

    case undefined:

    //will probably need to do something in case it's not set

    break;
  }
  populateData(project);
}

function populateData(project) {
  if (project.Fund_St != undefined) {
    $('#Fund_St input[type=radio][value="' + project.Fund_St + '"]').prop('checked', true);
  }
  if (project.Legacy_ID != undefined) {
    $('#Legacy_ID').val(project.Legacy_ID);
  }
  if (project.Lead_Ag != undefined) {
    $('#Lead_Ag').val(project.Lead_Ag);
  }
  if (project.Proj_Title != undefined) {
    $('#Proj_Title').val(project.Proj_Title);
  }
  if (project.Proj_Ty != undefined) {
    $('#Proj_Ty input[type=radio][value="' + project.Proj_Ty + '"]').prop('checked', true);
  }
  if (project.Proj_Desc != undefined) {
    $('#Proj_Desc').val(project.Proj_Desc);
  }
  if (project.Contact_info.Contact_info_name != undefined) {
    $('#Contact_info_name').val(project.Contact_info.Contact_info_name);
  }
  if (project.Contact_info.Contact_info_phone != undefined) {
    $('#Contact_info_phone').val(project.Contact_info.Contact_info_phone);
  }
  if (project.Contact_info.Contact_info_email != undefined) {
    $('#Contact_info_email').val(project.Contact_info.Contact_info_email);
  }
  if (project.More_info != undefined) {
    $('#More_info').val(project.More_info);
  }
  if (project.CD != undefined) {
    $('#CD').val(project.CD);
  }
  if (project.Proj_Status != undefined) {
    $('#Proj_Status').val(project.Proj_Status);
  }
  if (project.Proj_Man != undefined) {
    $('#Proj_Man').val(project.Proj_Man);
  }
  if (project.Access != undefined) {
    $('#Access input[type=radio][value="' + project.Access + '"]').prop('checked', true);
  }
  if (project.Dept_Proj_ID != undefined) {
    $('#Dept_Proj_ID').val(project.Dept_Proj_ID);
  }
  if (project.Other_ID != undefined) {
    $('#Other_ID').val(project.Other_ID);
  }
  if (project.Total_bgt != undefined) {
    $('#Total_bgt').val(project.Total_bgt);
  }
  if (project.Grant != undefined) {
    $('#Grant').val(project.Grant);
  }
  if (project.Other_funds != undefined) {
    $('#Other_funds').val(project.Other_funds);
  }
  if (project.Prop_c != undefined) {
    $('#Prop_c').val(project.Prop_c);
  }
  if (project.Measure_r != undefined) {
    $('#Measure_r').val(project.Measure_r);
  }
  if (project.Gas_Tax != undefined) {
    $('#Gas_tax').val(project.Gas_Tax);
  }
  if (project.General_fund != undefined) {
    $('#General_fund').val(project.General_fund);
  }
  if (project.Authorization != undefined) {
    $('#Authorization').val(project.Authorization);
  }
  if (project.Issues != undefined) {
    $('#Issues').val(project.Issues);
  }
  if (project.Deobligation != undefined) {
    $('#Deobligation input[type=radio][value="' + project.Deobligation + '"]').prop('checked', true);
  }
  if (project.Explanation != undefined) {
    $('#Explanation').val(project.Explanation);
  }
  if (project.Constr_by != undefined) {
    $('#Constr_by').val(project.Constr_by);
  }
  if (project.Info_source != undefined) {
    $('#Info_source').val(project.Info_source);
  }
  if (project.Grant_Cat != undefined) {
    $('#Grant_Cat').val(project.Grant_Cat);
  }
  if (project.Grant_Cycle != undefined) {
    $('#Grant_Cycle').val(project.Grant_Cycle);
  }
  if (project.Est_Cost != undefined) {
    $('#Est_Cost').val(project.Est_Cost);
  }
  if (project.Fund_Rq != undefined) {
    $('#Fund_Rq').val(project.Fund_Rq);
  }
  if (project.Lc_match != undefined) {
    $('#Lc_match').val(project.Lc_match);
  }
  if (project.Primary_Street != undefined) {
    $('#Primary_Street').val(project.Primary_Street);
  }
  if (project.Cross_Streets && project.Cross_Streets.Intersections && project.Cross_Streets.Intersections[0] != undefined) {
    var cross = project.Cross_Streets.Intersections;

    for(var i=1; i<=cross.length; i++)
      intersectionsValidated.push("cross-street"+i);
    console.log(intersectionsValidated);

    if (cross.length <=2) {
      for (var i = 0; i < cross.length; i++) {
        $('#cross-street' + (i + 1)).val(cross[i]);
      }
    } else {

      $('#undo-intersection').show();

      var intersections = cross.length - 2;
      for (var i = 0; i < intersections; i++) {
        intersectionCounter++;

        var div = $('<div class="form-group" id="cross-street'+intersectionCounter+'-group">');

        var input = $('<input class="form-control">');
        input.addClass('Intersections');
        input.attr('placeholder', 'Cross Street ' + intersectionCounter);
        input.attr('id', 'cross-street' + intersectionCounter);

        var span = $('<span id="cross-street'+intersectionCounter+'-span" area-hidden="true">');
        div.append(input);
        div.append(span);
        div.append($("<span>Cross Street " + intersectionCounter + "</span>"));
        $('#intersections').append(div);

        var input = document.getElementById('cross-street' + intersectionCounter);
        autocomplete = new google.maps.places.Autocomplete(input, googleOptions);
      }
      for (var i = 0; i < cross.length; i++) {
        $('#cross-street' + (i + 1)).val(cross[i]);
      }
    }
  }
  if (project.Geometry !=undefined) {
    geoJSON = L.geoJson(project.Geometry, {
      onEachFeature: function(feature, layer) {
        layer.on('click', function(e) {
          zoomToFeature(e);
        });
      }
    });
    featureGroup.addLayer(geoJSON);
    geoJSON.eachLayer(function(l) {
      l.fireEvent('click');
    });
    $("#delete-button").show();
  }
}

//Function that sets the map bounds to a project
//This essentially "zooms in" on a project
function zoomToFeature(e) {
    if (e.target.feature.geometry.type === 'Point') {
      var coordinates = e.target.feature.geometry.coordinates.slice().reverse();
      map.setView(coordinates, 16)
    } else {
      map.fitBounds(e.target.getBounds());
    }
}

// Add more intersections
$('#add-intersection').on('click', function() {
  intersectionCounter++;

  var div = $('<div class="form-group" id="cross-street'+intersectionCounter+'-group">');

  var input = $('<input type="text" class="form-control">');
  input.addClass('Intersections');
  input.attr('placeholder', '');
  input.attr('id', 'cross-street' + intersectionCounter);

  var span = $('<span id="cross-street'+intersectionCounter+'-span" area-hidden="true">');
  span.css({
      "height": "100%",
      "right": "9px",
      "top": "0px"
  });
  div.append(input);
  div.append(span);
  div.append($("<span>Cross Street " + intersectionCounter + "</span>"));
  $('#intersections').append(div);

  var input = document.getElementById('cross-street' + intersectionCounter);
  autocomplete = new google.maps.places.Autocomplete(input, googleOptions);
  $('#undo-intersection').show();

  checkForm();
});

$("#undo-intersection").on('click', function() {

  // If last intersection in validated, remove from intersection validation counter
  if(intersectionsValidated.length > 0){
    if(intersectionsValidated[intersectionsValidated.length-1].substring(12) == intersectionCounter)
      intersectionsValidated.pop();
  }

  $('#cross-street' + intersectionCounter + '-group').remove();
  intersectionCounter--;
  if (intersectionCounter === 2) {
    $('#undo-intersection').hide();
  }

  checkForm();
});

$('#update-project').on('click', function() {

    //Extract geoJSON from the featureGroup
    var data = featureGroup.toGeoJSON();
    var id = $(this).attr('data-id');
    //Check to make sure a feature was drawn on the map
    if (data.features.length >= 1) {

        //Check the fund status of the new project
        var fundStatus = $('#Fund_St input[type="radio"]:checked').val();

        //Push all the intersections into an array
        var interArr = [];
        $('.Intersections').each(function() {

            // Take out "United States" from at the end of intersections
            var tempAddress = $(this).val().replace(", United States", "");

            interArr.push(tempAddress);
        });

        //Create the newProject object and set common attributes
        var newProject = {
            //Common Attributes
            Fund_St: $('#Fund_St input[type="radio"]:checked').val(),
            Legacy_ID: $('#Legacy_ID').val(),
            Lead_Ag: $('#Lead_Ag').val(),
            Proj_Title: $('#Proj_Title').val(),
            Proj_Ty: $('#Proj_Ty input[type="radio"]:checked').val(),
            Proj_Desc: $('#Proj_Desc').val(),
            More_info: $('#More_info').val(),
            Contact_info: JSON.stringify({Contact_info_name: $('#Contact_info_name').val(), Contact_info_phone: $('#Contact_info_phone').val(), Contact_info_email: $('#Contact_info_email').val()})
        }
        //Funded and Unfunded but NOT Idea Attributes
        if (fundStatus != 'Idea Project') {
            // Take out "United States" primary
            var tempAddress = $('#Primary_Street').val().replace(", United States", "");

            newProject.Primary_Street = tempAddress;
            newProject.Cross_Streets = JSON.stringify({Intersections: interArr});
            newProject.CD = $('#CD').val();
            newProject.Proj_Status = $('#Proj_Status').val();
            newProject.Proj_Man = $('#Proj_Man').val();
        }

        if (fundStatus === 'Funded') {
            newProject.Dept_Proj_ID = $('#Dept_Proj_ID').val();
            newProject.Other_ID = $('#Other_ID').val();
            newProject.Total_bgt = parseInt($('#Total_bgt').val()).toFixed(2);
            newProject.Grant = parseInt($('#Grant').val()).toFixed(2);
            newProject.Other_funds = parseInt($('#Other_funds').val()).toFixed(2);
            newProject.Prop_c = parseInt($('#Prop_c').val()).toFixed(2);
            newProject.Measure_r = parseInt($('#Measure_r').val()).toFixed(2);
            newProject.Gas_Tax = parseInt($('#Gas_tax').val()).toFixed(2);
            newProject.General_fund = parseInt($('#General_fund').val()).toFixed(2);
            newProject.Authorization = $('#Authorization').val();
            newProject.Issues = $('#Issues').val();
            newProject.Deobligation = $('#Deobligation input[type="radio"]:checked').val();
            newProject.Explanation = $('#Explanation').val();
            newProject.Constr_by = $('#Constr_by').val();
            newProject.Info_source = $('#Info_source').val();
            newProject.Access = $('#Access input[type="radio"]:checked').val();
        }

        //Unfunded Attributes
        if (fundStatus === 'Unfunded') {
            newProject.Grant_Cat = $('#Grant_Cat').val();
            newProject.Grant_Cycle = $('#Grant_Cycle').val();
            newProject.Est_Cost = parseInt($('#Est_Cost').val()).toFixed(2);
            newProject.Fund_Rq = parseInt($('#Fund_Rq').val()).toFixed(2);
            newProject.Lc_match = parseInt($('#Lc_match').val()).toFixed(2);
            newProject.Match_Pt = $('#Match_Pt').val();
        }
        if (newShapeDrawn) {
          newProject.Geometry = JSON.stringify({
              type: data.features[0].geometry.type,
              coordinates: JSON.stringify(data.features[0].geometry.coordinates)
          })
        } else {
          newProject.Geometry = JSON.stringify({
              type: data.features[0].geometry.features[0].geometry.type,
              coordinates: JSON.stringify(data.features[0].geometry.features[0].geometry.coordinates)
          })
        }
        updateProject(newProject);
        return false;

    } else {

        // TODO: change this to a modal or something else nicer than an alert
        alert('Oops it looks like you forgot to add geometry to the map.');
        return false;
    }
});

function updateProject(project) {
    $.ajax({
        method: "PUT",
        url: "/projects/edit/" + id,
        dataType: "json",
        data: project,
        success: function(data) {
            window.location = '/'
        }
    });
}
