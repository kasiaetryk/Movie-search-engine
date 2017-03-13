var urlBase = 'https://www.omdbapi.com/?';
var serchForm = $('form');
var movieCont = $('#container');

movieCont.hide();

$('#search').on('click', function(mEvent) {
  mEvent.preventDefault();
  $('#container').empty();
  var urlTitle = '&s=' + $('#movie-title').val();
  var urlYear = '&y=' + $('#movie-year').val();
  var newUrl = urlBase + urlTitle + urlYear + '&type=movie';
  console.log(newUrl);
  $.ajax(newUrl, {
    complete: function(data) {
      var mData = $.parseJSON(data.responseText);
      console.log(mData);

      var mTable = mData.Search;
      console.log(mTable);

     
      for(var i = 0; i < mTable.length; i++) {
            var mDiv = document.createElement('div');
            var mTitle = document.createElement('h3');
            var mPlot = document.createElement('p');
            var mPoster = document.createElement('span');
            var mYear = document.createElement('p');
            var mDirector = document.createElement('p');
            var mGenre = document.createElement('p');
            var mActor = document.createElement('p');


            mDiv.className = 'searchResult searchResult' + i;
            mDiv.id = 'searchResult' + i;
            mTitle.className = 'title title' + i;
            mPlot.className = 'plot plot' + i;
            mPoster.className = 'poster poster' + i;
            mYear.className = 'year year' + i;
            mDirector.className = 'director director' + i;
            mGenre.className = 'genre genre' + i;
            mActor.className = 'actor actor' + i;

            document.getElementById('container').appendChild(mDiv);

            document.getElementById('searchResult' + i).appendChild(mPoster);
            document.getElementById('searchResult' + i).appendChild(mTitle);
            document.getElementById('searchResult' + i).appendChild(mYear);
            document.getElementById('searchResult' + i).appendChild(mGenre);
            document.getElementById('searchResult' + i).appendChild(mDirector);
            document.getElementById('searchResult' + i).appendChild(mActor);
            document.getElementById('searchResult' + i).appendChild(mPlot);
            
            var detailedURL = urlBase + '&i=' + mTable[i].imdbID;
            $.ajax(detailedURL, { 
              indexValue: i,
              complete: function(data){
                var detailedData = $.parseJSON(data.responseText);
                $('#searchResult' + this.indexValue).find('.poster' + this.indexValue).html('<img src="' + detailedData.Poster + '"/>');
                $('#searchResult' + this.indexValue).find('.title' + this.indexValue).text(detailedData.Title);
                $('#searchResult' + this.indexValue).find('.year' + this.indexValue).text('Year: ' + detailedData.Year + ' ');
                $('#searchResult' + this.indexValue).find('.genre' + this.indexValue).text('Genre: ' + detailedData.Genre + ' ');
                $('#searchResult' + this.indexValue).find('.director' + this.indexValue).text('Director: ' + detailedData.Director + ' ');
                $('#searchResult' + this.indexValue).find('.actor' + this.indexValue).text('Actors: ' + detailedData.Actors + ' ');
                $('#searchResult' + this.indexValue).find('.plot' + this.indexValue).text('Plot: ' + detailedData.Plot + ' '); 
              }
            });
          }
          $('footer').css('position', 'relative');
        movieCont.show();       
    }
  });
});