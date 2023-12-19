
const API_ENDPOINT_PLAYER = "https://api-football-v1.p.rapidapi.com/v3/players";
const API_ENDPOINT = "https://api.football-data.org/v2/competitions/PL/standings";
const API_KEY = "ff0680d1667f4efabdb17dbb59738ccc";
const YOUR_API_KEY = "6a77d0dc84msh4155cc0b389ef0bp11eb99jsnd76015030384";

const input = document.getElementById("player-name")
const searchButton = document.getElementById("search-button");

fetch(API_ENDPOINT, {
  headers: {
    "X-Auth-Token": API_KEY
  }
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Request failed");
    }
  })
  .then(data => {
    const standings = data.standings[0].table;
    const tableBody = document.getElementById("table-body");
    
    for (const team of standings) {
      const row = `
        <tr>
          <th scope="row">${team.position}</th>
          <td>${team.team.name}</td>
          <td>${team.won}</td>
          <td>${team.draw}</td>
          <td>${team.lost}</td>
          <td>${team.points}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    }
  })
  .catch(error => {
    console.error(error);
  });

 

  
  searchButton.addEventListener("click", () => {
    const playerName = input.value;
 
    fetch(`${API_ENDPOINT_PLAYER}?league=39&search=${playerName}`, {
      headers: {
        'X-RapidAPI-Key': YOUR_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then(data => {
        const players = data.response;
        const alertBody= document.getElementById("alert-body");
 
        let alertMessage = null;
        if (players.length === 0) {
          alertMessage = (`Player is not cannot be found. Search for players in the Premier League.`);
         
        } else {
            
          const playerBody = document.getElementById("card-container");
        alertMessage = (`Found ${players.length} players matching "${playerName}":`);
       
        playerBody.innerHTML ='';
          for (const player of players) {

            const content = `
            <section class="vh-75" >
        <div class="container py-5 h-75">
          
            
      
              <div class="card" style="border-radius: 15px;">
                <div class="card-body text-center">
                  <div class="mt-3 mb-4">
                    
                        <img src="${player.player.photo}"
                          class="rounded-circle img-fluid" style="width: 100px;" />
                      </div>
                  
                  <h4 class="mb-2">${player.player.firstname} (${player.player.lastname}, ${player.player.age})</h4>
                 
                  <div class="mb-4 pb-2">
                
                  <button type="button" class="btn btn-primary btn-rounded btn-lg">
                    CHECK FULL STATS
                  </button>
                  <div class="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <p class="mb-2 h3">${player.statistics[0].goals.total}</p>
                      <p class="text-muted mb-0">Goals</p>
                    </div>
                    <div class="px-3">
                      <p class="mb-2 h3">${player.statistics[0].goals.assists}</p>
                      <p class="text-muted mb-0">Assists</p>
                    </div>
                    <div>
                      <p class="mb-2 h3">${player.statistics[0].games.appearences}</p>
                      <p class="text-muted mb-0">Apperances</p>
                    </div>
                  </div>
                </div>
              </div>
      
           
         
        </div>
      </section>
          `;
          playerBody.innerHTML += content;
            console.log(`- ${player.player.firstname} (${player.player.lastname}, ${player.player.age})`);
            console.log(`- ${player.player.lastname} has made ${player.statistics[0].games.appearences} appearances this season and scored ${player.statistics[0].goals.total} goals.`);
          }
        }
        jQuery('#alert-body').slideDown();
        alertBody.innerHTML = alertMessage;
        jQuery('#alert-body').fadeOut(2000);
       
      })
      .catch(error => {
        console.error(error);
      });
  });

