// Get data from partners JSON
// Display data from JSON

$(document).ready(function(){

    var releaseCollection  = [];

    $.ajax({
		type: 'GET',
        url: 'assets/js/press.json',
        dataType: 'json',
        cache: 'false',
        success: initializePage

    });

	function initializePage(response) {
		parseJSON(response);

		// Pass object size to functions that build our page
		var releaseLength = releaseCollection.length;

        // Sort releases by julian date

		releaseCollection.sort(
			function(a,b) {
				if (a.date_julian > b.date_julian) {
					return -1;
				}
				if (a.date_julian < b.date_julian) {
					return 0;
				}
			}
		);
		buildPage(releaseLength);
	}

    function parseJSON(response) {
        var result;
        result = response;

        $(result.release).each(function(index,value){
            var releaseArr = [];
            var releaseDay      = value.day;
            var releaseMonth    = value.month;
            var releaseYear     = value.year;
            
            releaseArr.day      = value.day;
            releaseArr.month    = value.month;
            releaseArr.year     = value.year; 
			releaseArr.category	= value.category;
            releaseArr.headline = value.headline;
			releaseArr.text		= value.text;
			releaseArr.url      = value.url;
            
            // Gernerate julian date
            Date.prototype.getJulian = function() {
                return Math.floor((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
            }
            var formattedDate = new Date(releaseYear, releaseMonth, releaseDay);
            var julianDate = formattedDate.getJulian();
            // Add julian date to release object array
            releaseArr.date_julian = julianDate;

            // Add to master array
            releaseCollection.push(releaseArr);		
        });


    }
	
	
	
	// Loop through the release array
	// Build entry for each release
	// Append to HTML
	
	function buildPage(releaseCount) {
		// console.log(releaseCount);
		var catalog = '';
		
		
		for (var i = 0; i < releaseCount; i++) {
			var day         = '';
			var month       = '';
			var year        = '';
			var category	= '';
			var headline    = '';
			var teaser		= '';
			var url         = '';
			
            day         = releaseCollection[i].day;
            month       = releaseCollection[i].month;
            year        = releaseCollection[i].year;
			category	= releaseCollection[i].category;
            headline    = releaseCollection[i].headline;
            teaser		= releaseCollection[i].text;
            url         = releaseCollection[i].url;
			
			switch(month) {
				case '1':
					month = "January";
				break;
				case '2':
					month = "February";
				break;
				case '3':
					month = "March";
				break;
				case '4':
					month = "April";
				break;
				case '5':
					month = "May";
				break;
				case '6':
					month = "June";
				break;
				case '7':
					month = "July";
				break;
				case '8':
					month = "August";
				break;
				case '9':
					month = "September";
				break;
				case '10':
					month = "October";
				break;
				case '11':
					month = "November";
				break;
				default:
					month = "December";
			}

			
			catalog += "<div class='release'>";
			if (category.length > 0) {
				catalog += "<div class='category'><p>" + category + "</p></div>";
			}
			catalog += "<h2 class='news-headline'><a href='"+ url +"'>" + headline + "</a></h2>";
			if (teaser.length > 0) {
				catalog += "<p class='teaser'>" + teaser + "</p>";
			}
			catalog += "<p class='dateline'>" + month + " " + day + ", " + year +"</p>";
			catalog += "</div>";		
			
		}
		// Append the card to the UI
		$('#content-news').append(catalog);
		
	}
	
	





});