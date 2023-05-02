document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "6cbb453dbf994b38d4d5b8939b3068d5";
  const apiUrl = "https://api.deezer.com/";

  function getAlbums() {
    //Hier holen wir uns das Eingegebene aus der Website
    const artistName = document.getElementById("artist-name").value;

    // Request für die API
    fetch(apiUrl + "search?q=" + artistName + "&limit=2&output=json", {
      
    })
      .then(response => response.json())
      .then(data => {
        
        // Get the artist ID from the search results
        const artistId = data.data[0].artist.id;

        // Make a request to the Deezer API to get the artist's albums
        fetch(apiUrl + "artist/" + artistId + "/albums?output=json", {
          mode: 'no-cors'
        })
          .then(response => response.json())
          .then(data => {
            // Display the albums in the HTML
            const albumList = document.getElementById("album-list");
            albumList.innerHTML = "";
            data.data.forEach(album => {
              albumList.innerHTML += `<p>${album.title}</p>`;
            });
          });
      });
  }

  // Call the function on button click
  document.getElementById("btn-get-albums").addEventListener("click", getAlbums);
});