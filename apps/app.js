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

The q parameter specifies the query term to search for.
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
      // triggering the showResults function
      showResults(data.items);
    })
  }


  function showResults(results) {
    var html = ""

    $.each(results, function (key, value) {
        var thumbnails = value.snippet.thumbnails.medium.url;
        var title = value.snippet.title;
        var videoId = value.id.videoId;
      
        html += '<ul><li><p>' + title + ' - ' + videoId + '</p><img src="' + thumbnails +'></li></ul>';

        $('#search-results').html(html);
    })
  }

})
 
