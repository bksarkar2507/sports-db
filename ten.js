function spinnerCase(system){
    document.getElementById('spinner').style.display=system;
}

function searchClick(){
    spinnerCase('block');
    const searchInput = document.getElementById('input-field').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchInput}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showPlayer(data.player));
};

const showPlayer = (players) =>{
    // console.log(players);
    const rowDiv = document.getElementById('row');
    for(const player of players){
        console.log(player);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('col-lg-3');
        cardDiv.classList.add('col-md-4');
        cardDiv.classList.add('col-sm-6');
        cardDiv.innerHTML = `
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">
                    PlayerId: ${player.idPlayer} <br>
                    Date of Birth: ${player.dateBorn} <br>
                    Gender: ${player.strGender} <br>
                    Nationality: ${player.strNationality} <br>
                    Sports: ${player.strSport}
                </p>
            </div>
            <button onclick="details('${player.idPlayer}')">Details</button>
        `;
        rowDiv.appendChild(cardDiv);
        spinnerCase('none');
    }
}

const details = (id) =>{
    // console.log(id);
    spinnerCase('block')
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url).then(response => response.json()).then(data => selected(data.players[0]));
}

const selected = (player) =>{
    const select = document.getElementById('select');
    select.innerHTML = `
        <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">
                    PlayerId: ${player.idPlayer} <br>
                    Date of Birth: ${player.dateBorn} <br>
                    Gender: ${player.strGender} <br>
                    Nationality: ${player.strNationality} <br>
                    Sports: ${player.strSport}
                </p>
            </div>
    `;
    select.style.border="2px solid tomato";
    spinnerCase('none');
    console.log(player);
}
