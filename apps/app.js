$(function() {

  // an event function that submits a value in the form with id search-term
  $('#search-term').submit(function(event) {
    //cancels the event if cancelable
    event.preventDefault();
    // variable called searchTerm when a value is in the input id query
    var searchTerm = $('#query').val()
    console.log(searchTerm)
    // calling the getRequest function with the searchTerm parameter that will search for text input
    getRequest(searchTerm);

  })

  //     $.getJSON('https://www.googleapis.com/youtube/v3/search', {key: 'AIzaSyC7Cs4QsHnXZGxabOV1V9lEoPE3WErU35I', part: 'snippet', q: searchTerm}, function(data) {
//   var myData = data;
//   console.log(myData);
// });

//The q parameter specifies the query term to search for.
  function getRequest(searchTerm) {
    // query parameters the youtube api supports
    var params = {
      // The required part parameter tthat specifies a comma-separated list of one or more search resource properties
      part: 'snippet',
      // my api developer key
      key: 'AIzaSyC7Cs4QsHnXZGxabOV1V9lEoPE3WErU35I',
      //The q parameter specifies the query term to search for.
      q: searchTerm
    }
    // the url (endpoint)
    url='https://www.googleapis.com/youtube/v3/search'

    // getting the data and returning the JSON
    $.getJSON(url, params, function(data) {
      console.log(data)
      // triggering the showResults function and filtering by items
      showResults(data.items);
       $('#query').val('')
    })
  }


  function showResults(results) {
    var html = ""

    $.each(results, function (key, item) {
        var thumbnails = item.snippet.thumbnails.medium.url;
        var title = item.snippet.title;
        var videoId = item.id.videoId;
        var videoURL = "https://www.youtube.com/watch?v=" + videoId
        
        html += '<div class="col-sm-6 col-md-4"><p>' + title + '</p><a href="' + videoURL + '"  target="_blank"><img src="' + thumbnails +'" class="thumbnails img-responsive"></a></div>';
        // content from var html will display in the div id search-results
        $('#search-results').html(html);
    })
  }

})
 
