//Erste API: Bored API, Aktivitäten getter
const btnActivity = document.getElementById("btnActivity");
const lastActivities = document.getElementById("lastActivities");
let previousActivity = null;

btnActivity.addEventListener("click", () => {
  //diese Zeile setzt den style der ID activity von "none" im HTML code auf "block", damit es Sichtbar wird
  document.getElementById("activity").style.display="block";
  //Anfrage an die API
  fetch("https://www.boredapi.com/api/activity")
    .then(response => response.json())
    .then(data => {
      //Erstellt ein neues p element für die neuste Aktivität
      const newActivity = document.createElement("p");
      newActivity.textContent = data.activity;
      newActivity.classList.add("output");

      //Wenn es eine vorherige aktivität gibt, wird diese angehängt
      if (previousActivity) {
        lastActivities.insertBefore(previousActivity, lastActivities.firstChild);
      }

      //Updated den aktivitäten output mit der neusten aktivität
      if (data.activity) {
        document.getElementById("activity").textContent = data.activity;
      }

      //Speichert die neuste aktivität mit einer vorherigen
      previousActivity = newActivity;

      
      //Löscht die äterste aktivität, wenn es mehr als zwei alte gibt
      if (lastActivities.children.length > 2) {
        lastActivities.removeChild(lastActivities.children[2]);
      }
    })
    .catch(error => {
      document.getElementById("activity").textContent = "Oops, something went wrong!";
      console.error(error);
    });
});

//Age und Nation API

function predictAge() {
  const name = document.getElementById("name").value;
  fetch(`https://api.agify.io?name=${name}&country_id=AT`)
    .then(response => response.json())
    .then(data => {
      const age = data.age;
      document.getElementById("age").textContent = age;
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while predicting your age. Please try again later.");
    });
}

function predictNationality() {
  const name = document.getElementById("name").value;
  fetch(`https://api.nationalize.io/?name=${name}`)
    .then(response => response.json())
    .then(data => {
      const country = data.country[0].country_id;
      document.getElementById("nationality").textContent = country;
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while predicting your nationality. Please try again later.");
    });
  }


//Dog API


function getRandomDogImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
      const dogImage = data.message;
      document.getElementById("dog").setAttribute("src", dogImage);
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching the dog image. Please try again later.");
    });
}
