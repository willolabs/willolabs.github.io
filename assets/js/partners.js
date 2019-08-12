// Get data from partners JSON
// Display data from JSON

$(document).ready(function(){
    industryCollection  = [];
    collegeCollection   = [];
    $.ajax({
        url: 'assets/js/partners.json',
        dataType: 'json',
        type: 'get',
        cache: 'false',
        success: parseJSON,
    });


    parseJSON(response);
    
    function parseJSON(response) {
        var result;
        result = response;

        $(result.industry).each(function(index,value){
            var industryArr = [];

            industryArr.name = value.name;

            //
        });
    }


});