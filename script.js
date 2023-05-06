const clientId = 'b92238b3a7c94861b9ebf4d1b4ce4dcd';
const clientSecret = 'b2c394bc6e6849768b18b73c3776c769';

      document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('search-btn').addEventListener('click', searchAlbums);
      });

      function searchAlbums() {
        const bandName = document.getElementById('band-name').value;
        const request = new XMLHttpRequest();
        const url = `https://api.spotify.com/v1/search?q=${bandName}&type=artist`;
        
        request.open('GET', url);
        request.setRequestHeader('Authorization', 'Bearer ' + getToken());
        request.onload = function() {
          const response = JSON.parse(request.responseText);
          const artistId = response.artists.items[0].id;
          getAlbums(artistId);
        };
        request.send();
      }

      function getAlbums(artistId) {
        const request = new XMLHttpRequest();
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`;
        
        request.open('GET', url);
        request.setRequestHeader('Authorization', 'Bearer ' + getToken());
        request.onload = function() {
          const response = JSON.parse(request.responseText);
          const albums = response.items;
          displayAlbums(albums);
        };
        request.send();
      }

      function displayAlbums(albums) {
        const albumsDiv = document.getElementById('albums');
        albumsDiv.innerHTML = '';
        if (albums.length > 0) {
          for (let i = 0; i < albums.length; i++) {
            const album = albums[i];
            const albumDiv = document.createElement('div');
            albumDiv.innerHTML = `<h2>${album.name}</h2><img src="${album.images[0].url}">`;
            albumsDiv.appendChild(albumDiv);
          }
        } else {
          albumsDiv.innerHTML = '<p>No albums found.</p>';
        }
      }

      function getToken() {
        const request = new XMLHttpRequest();
        const url = 'https://accounts.spotify.com/api/token';
        const data = 'grant_type=client_credentials';
        
        request.open('POST', url, false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
        request.send(data);
        
        const response = JSON.parse(request.responseText);
        const token = response.access_token;
        return token;
      }
