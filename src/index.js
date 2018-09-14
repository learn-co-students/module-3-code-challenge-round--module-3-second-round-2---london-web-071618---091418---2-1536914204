document.addEventListener("DOMContentLoaded", function() {

const listGroup= document.querySelector('.list-group')
const beerDetails = document.querySelector("#beer-detail")


getBeers()

function getBeers(){
  return fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(data => appendBeers(data))
}

function appendBeers(beers){
  beers.forEach(beer =>{
    const beerEl = document.createElement('li')
    beerEl.innerHTML = `${beer.name}`
    listGroup.append(beerEl)
    beerEl.addEventListener('click', ()=>{
      beerDetails.innerHTML = ""
      appendBeer(beer)
      }
    )
  })
}

function appendBeer(beer){
  const beerEl = document.createElement('div')
  beerEl.innerHTML=
    `
      <h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>${beer.tagline}</h3>
      <textarea> ${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info">
      Save </button>
    `
  beerDetails.append(beerEl)
    const button = document.querySelector('#edit-beer')
      button.addEventListener('click', () => {
        const beerCurrentDescription = document.querySelector('textarea').value
          beer.description = beerCurrentDescription
        updateBeerDetails(beer,beerCurrentDescription)
        beerDetails.innerHTML = ""

    appendBeer(beer)
  })
 }

function updateBeerDetails(beer, beerCurrentDescription){
  fetch(`http://localhost:3000/beers/${beer.id}`,{
    method: 'PATCH',
    headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
    body: JSON.stringify({description: beerCurrentDescription})
  }).then(resp =>resp.json()).then (resp => console.log(beerCurrentDescription))
}

})
