// API URL
let address = '/api/Ratings';

// Function to Display Data in Tabular Structure and collect from API
function loadRatings() {
    // Generate AJAX request for collecting All Tutorial Details
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            // Capture the reference of Table Body present in Home Page
            const tableBody = $("#table_rating");

            $(tableBody).empty(); // Empty the content of Previous Table Body 

            if (data.length == 0) { // If there is no data present
                // Prepare a row for display no data
                const tr = $("<tr></tr>")
                    .append('<td colspan="5" align="center">No Rating information</td>');
                // Add table row in table body
                tr.appendTo(tableBody);
            } else {
                // Iterate all JSON rating json present in data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.countryName))
                        .append($("<td></td>").text(item.playerName))
                        .append($("<td></td>").text(item.points))
                        .append($("<td></td>").append('<button class="btn btn-primary" data-toggle="modal" data-target="#update">Edit Ratings</button>')
                            .on("click", function () {
                                // Call fetch Rating For getting data for edit the details
                                fetchRating(item.id);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-danger">Delete Rating</button>')
                            .on("click", function () {
                                // Call Delete Rating Function For Removing Rating Details
                                deleteRating(item.id);
                            })
                        );
                    // Add The table row at the end of table body
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

// Function used to collect information, call the API for INsertion
function addRating() {
    // Collect Form Details
    let country_value = $('#country').val();
    let points_value = parseInt($('#points').val());
    let playername_value = $('#playername').val();

    // Prepare JSON data for storing 
    let rating = {
        countryname: country_value,
        points: points_value,
        playername: playername_value
    };

    // Request the API for Insertion
    $.ajax({
        type: "POST",
        url: address,
        data: JSON.stringify(rating),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#result").html("Rating Details are stored");
        // Call to again Load the Data for displaying
        loadRatings();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#result").html("Failure in storing Rating Details");
    });
}

// Function to call API for Updation
function updateRating() {
    // Collect Form Details
    let country_value = $('#country1').val();
    let points_value = parseInt($('#points1').val());
    let playername_value = $('#playername1').val();
    let id_value = parseInt($('#id').val());

    // Prpeare JSON Data
    let rating = {
        id: id_value,
        countryname: country_value,
        points: points_value,
        playername: playername_value
    };

    // Generate API request for Updating the Record
    $.ajax({
        type: "PUT",
        url: address + "/" + id_value,
        data: JSON.stringify(rating),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#resultUpdate").html("Rating Details are Updated");
        // Call to load details on page
        loadRatings();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#resultUpdate").html("Failure in Updation of Rating Details");
    });
}

// Function to call API for Delete the Record
function deleteRating(id) {
    // Display a confirm message before generating request of delete
    let result = confirm("Are You Sure to Remove Rating Details?");

    if (result) {
        // Generate Request of API for Delete the Rating Details
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            // Again Load the Table Data for Display
            loadRatings();
        });
    }
}

// Function to generate request based upon id
function fetchRating(id) {
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (detail) {
        // Update the Form data for edit rating details
        console.log(detail);
        $('#id').val(detail.id);
        $('#country1').val(detail.countryName);
        $('#points1').val(detail.points);
        $('#playername1').val(detail.playerName);
    });
}