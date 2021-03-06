// Get data from team JSON
// Display data from JSON

$(document).ready(function(){

    // Arrays for our JSON data
    var teamCollection      = [];
    var investorsCollection = [];
	
	// Arrays for building display order
	var managementArr = [];
	var nonmanagementArr = [];

    // Get the data, call to set up the page
    $.ajax({
        type: 'GET',
        url: 'assets/js/team.json',
        dataType: 'json',
        cache: 'false',
        success: initializePage
    });

    // set up the page
    function initializePage(response) {
		
        // read data, build arrays
        parseJSON(response);

        // pass object sizes to functions that build the page
        var teamLength      = teamCollection.length;
        var investorsLength = investorsCollection.length;

		
		
		
        // sort investor data by display order
        investorsCollection.sort(
            function(a,b) {
                if (a.display_order < b.display_order) {
                    return -1;
                }
                if (a.display_order > b.display_order) {
                    return 0;
                }
            }
        );
        // this originally helped me to figure out which page was in the view
		// but I don't think it can help me now, since I have both staff
		// and investors on the same page
		buildSection(teamLength,"team");
		buildSection(investorsLength,"investors");
		
    } // end initializePage()

    // dig through the data, push to global arrays
    // pass in the ajax response
    function parseJSON(response) {
        var result;
        result = response;

        // loop through data types
        $(result.team).each(function(index,value) {
            //local array for each entry
			// teamArr now memberArr
            var memberArr = [];

            memberArr.id          = value.id;
            memberArr.name_last   = value.name_last;
            memberArr.name_first  = value.name_first;
            memberArr.name_middle = value.name_middle;
            memberArr.title       = value.title;
            memberArr.url         = value.url;
            memberArr.image       = value.image;

			// process team members for display
			// separate out management
			
			switch(memberArr.id) {
				case "HallAndy":
					managementArr[0] = memberArr;
					break;
				case "McKainKate":
					managementArr[1] = memberArr;
					break;
				case "HangerMatt":
					managementArr[2] = memberArr;
					break;
				default:
					nonmanagementArr.push(memberArr);
			}

        });
		
		// Sort non-management alphabetically
		nonmanagementArr.sort(function(a, b) {
			
			if (a.name_last < b.name_last) { return -1; }
			if (a.name_last > b.name_last) { return 1;}
			return 0;
			
		});
		
		teamCollection = managementArr.concat(nonmanagementArr);

        $(result.investors).each(function(index,value){
            // local array for each entry
            var investorArr = [];
            investorArr.display_order = value.display_order;
            investorArr.id              = value.id;
            investorArr.name_last       = value.name_last;
            investorArr.name_first      = value.name_first;
            investorArr.name_middle     = value.name_middle;
            investorArr.company_name    = value.company_name;
            investorArr.title           = value.title;
            investorArr.url             = value.url;
            investorArr.image           = value.image;

            // add to master array
            investorsCollection.push(investorArr);
        });
    }

    // build the page
    // pass in the number of entries and the type of entries
    function buildSection(count,type) {

        var catalog = '';

        for (var i = 0; i < count; i++) {
			
            var teamID      = '';
            var last_name   = '';
            var first_name  = '';
            var middle_name = '';
            var company_name = '';
            var title       = '';
            var img         = '';
            var url         = '';
            // set the proper container div
            var location = '';

            // see what kind of team member we have
            if (type === "team") {
				
                teamID      = teamCollection[i].id;
                last_name   = teamCollection[i].name_last;
                first_name  = teamCollection[i].name_first;
                middle_name = teamCollection[i].name_middle;
                title       = teamCollection[i].title;
                img         = teamCollection[i].img;
                url         = teamCollection[i].url;
                location    = 'team-company';
            }
	
            if (type === "investors") {
				
                teamID      = investorsCollection[i].id;
                last_name   = investorsCollection[i].name_last;
                first_name  = investorsCollection[i].name_first;
                middle_name = investorsCollection[i].name_middle;
                company_name    = investorsCollection[i].company_name;
                title       = investorsCollection[i].title;
                url         = investorsCollection[i].url;
				img			= investorsCollection[i].image;
                location    = 'team-investors';
            }
	
            // create the HTML for the card
            // we're using display: grid, so we don't have to worry about columns and rows


            // need to figure out if this is an invsetor and if this is a company
            // the key is company_name

            // format names 
            if (first_name.length > 0) {
                var full_name;
                full_name = first_name;
                if (middle_name.length > 0) {
                    full_name += " " + middle_name;
                }
                full_name += " " + last_name;
            }
			

            catalog += "<div id='idCard"+ teamID +"' class='idCard'>";
            
            if (type === "team") {
                // this is a staff member
                catalog += "<div class='idImageSocialContainer'>";
                catalog += " <div class='idImage'></div>";
                    // if url, link image overlay
                    if (url.length > 0) {
                        catalog += "<div class='idSocial'>";
                        catalog += "<a class='peekaboo' href='" + url + "' aria-hidden='true'><i class='fa fa-linkedin-square idIcon'></i></a>";
                        catalog += "</div>";
                    } 
                catalog += "</div>"; // end socialContainer

                catalog += "<div class='idBio'>";
                catalog += "<p class='idCardName'>";

                    if (url.length > 0) { 
                        catalog += "<a href='" + url + "'>" + full_name + "</a>";
                    } else {
                        catalog += full_name;
                    }

                catalog += "</p>";
                catalog += "<p class='idCardTitle'>" + title + "</p>";
                catalog += "</div>";
            } else {
                // this is an investor
                // see if it's a person or a company
                if (company_name.length > 0) {
                    // this is a company
                    if (url.length > 0) {
                        catalog += "<a href='" + url + "'><img src='" + img + "' alt='" + company_name + " logo'></a>"
                        catalog += "<div class='idBio'>";
                        catalog += "<p class='idCardName'><a href='" + url + "'>" + company_name + "</a></p>";
                        catalog += "</div>";
                    } else {
                        catalog += "<img src='" + img + "' alt='" + company_name + " logo'>"
                        catalog += "<div class='idBio'>";
                        catalog += "<p class='idCardName'>" + company_name + "</p>";
                        catalog += "</div>";
                    }
                } else {
                    // this is a person
                    catalog += "<div class='idImageSocialContainer'>";
                    catalog += " <div class='idImage'></div>";
                        // if url, link image overlay
                        if (url.length > 0) {
                            catalog += "<div class='idSocial'>";
                            catalog += "<a class='peekaboo' href='" + url + "' aria-hidden='true'><i class='fa fa-linkedin-square idIcon'></i></a>";
                            catalog += "</div>";
                        } 
                    catalog += "</div>"; // end socialContainer

                    catalog += "<div class='idBio'>";
                    catalog += "<p class='idCardName'>";

                        if (url.length > 0) { 
                            catalog += "<a href='" + url + "'>" + full_name + "</a>";
                        } else {
                            catalog += full_name;
                        }

                    catalog += "</p>";
                    catalog += "<p class='idCardTitle'>" + title + "</p>";
                    catalog += "</div>";
                }
            }


            catalog += "</div>"; // end idCard
            
        }
		
        // Append the card to the UI
		
		$('#' + location).prepend(catalog);
		
    }
});




