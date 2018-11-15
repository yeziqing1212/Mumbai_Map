mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZW55eWUiLCJhIjoiY2puNHd6YjBoMDY5MzNydGQwMDRwcWxpOCJ9.kukCVm-EdbP8OTICHp8zvg'; 

var map = new mapboxgl.Map({
	container: 'map', 
	style: 'mapbox://styles/greenyye/cjodi0ei50yek2rp8us5y7bx5', // replace this value with the style URL from Mapbox Studio
	customAttribution: '18F LAR7415 / Ziqing Ye',
});

$("#Layers").on('click',function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("memu").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
});

$(".sidenav>.closebtn").on('click', function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("memu").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
});

var layers = [ 
        ['religiousplaces', 'Religious Buildings'], // layers[0]
        ['zoroastrianism', 'Zoroastrianism'],                       
        ['islamism', 'Islamism'], 
        ['christianity', 'Christianity'],
        ['buddhism', 'Buddhism'], 
        ['hinduism', 'Hinduism'],
        ['others', 'Others'],
        ['All_heatmap', 'Heatmap']
        ];

    
map.on('load', function () {

	for (i=0; i<layers.length; i++) {

            // add a button for each layer
        $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });
    });





//pup up

    map.on('mousemove', function(e) {   // Event listener to do some code when the mouse moves, see https://www.mapbox.com/mapbox-gl-js/api/#events. 

        var places = map.queryRenderedFeatures(e.point, {    
            layers: ['religiousplaces']    // replace 'cville-parks' with the name of the layer you want to query (from your Mapbox Studio map, the name in the layers panel). For more info on queryRenderedFeatures, see the example at https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/. Documentation at https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures.
        });
              
        if (places.length > 0) {   // if statement to make sure the following code is only added to the info window if the mouse moves over a state

            $('#info-window-body').html('<p> Religion:<strong>' + places[0].properties.Religion + '</strong></p> Buildings Name: <strong>' + places[0].properties.NAME + '</strong> ');

        } else {    // what shows up in the info window if you are NOT hovering over a park

            $('#info-window-body').html('<p>Zoom in to hover over a <strong>Religious Place</strong>.</p>');
            
        }

    });

