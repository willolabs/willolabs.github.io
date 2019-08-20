// Get data from partners JSON
// Display data from JSON

$(document).ready(function(){

    var industryCollection  = [];
    var collegeCollection   = [];

    $.ajax({
		type: 'GET',
        url: 'assets/js/partners.json',
        dataType: 'json',
        cache: 'false',
        success: initializePage

    });

	function initializePage(response) {
		parseJSON(response);
		
		// Pass object size to functions that build our page
		var industryLength = industryCollection.length;
		var collegeLength = collegeCollection.length;
			
		industryCollection.sort(
			function(a,b) {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 0;
				}
			}
		);
		collegeCollection.sort(
			function(a,b) {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 0;
				}
			}
		);
		
		if ($('.partners-industry').length > 0 ) {
			buildPage(industryLength,'industry');
		}
		if ($('.partners-college').length > 0 ) {
			buildPage(collegeLength,'college');
		}
		
		
	}

    function parseJSON(response) {
        var result;
        result = response;

        $(result.industry).each(function(index,value){
            var industryArr = [];

            industryArr.name = value.name;
			industryArr.url = value.url;
			industryArr.img_path = value.img_path;
			industryArr.active = value.active;
		
            // Add to master array
            industryCollection.push(industryArr);		
        });

        $(result.college).each(function(index,value) {
            var collegeArr = [];

            collegeArr.name = value.name;
			collegeArr.url = value.url;
			collegeArr.img_path = value.img_path;
			collegeArr.active = value.active;

            // Add to master array
            collegeCollection.push(collegeArr);
            
        });
    }
	
	
	
	// Loop through the partner array
	// Build each ID card for that partner
	// Append to HTML
	// Could probably do this up in parseJSON, but let's keep things compartmentalized
	
	// See what page we're currently on and do things accordingly
	
	function buildPage(partnerCount,partnerType) {

		var catalog = '';
		
		
		for (var i = 0; i < partnerCount; i++) {
			var name = '';
			var url = '';
			var path = '';
			var active = '';
			var location = '';
			
			if (partnerType === 'industry') {
				name = industryCollection[i].name;
				url = industryCollection[i].url;
				path = industryCollection[i].img_path;
				active = industryCollection[i].active;
				location = '.partners-industry';
			}
			if (partnerType === 'college') {
				name = collegeCollection[i].name;
				url = collegeCollection[i].url;
				path = collegeCollection[i].img_path;
				active = collegeCollection[i].active;
				location = '.partners-college';
			}

			// Using display: grid so we don't have to worry about rows and columns here
				catalog += "<a class='card' href='" + url + "'>";
				catalog += "<img src='http://www.stmykal.com/willow/" + path + "' alt=''>";
				// We want there to be some screen reader text for assistive tech, but not display the text on screen
				catalog += "<p class='visuallyHidden'>" + name + "</p>";
				catalog += "</a>";			
			
		}
		// Append the card to the UI
		$(location + ' .catalog').append(catalog);
		
	}
	
	





});