document.addEventListener('DOMContentLoaded', function () {
  function getBeerNames () {
    fetch('http://localhost:3000/beers')
      .then(resp => resp.json())
      .then(data => showBeers(data))
  }

  getBeerNames()

  function showBeers (beers) {
    const listPanel = document.querySelector('#list-group')
    const showPanel = document.querySelector('#beer-detail')

    beers.forEach((beer) => {
      const beerItem = document.createElement('li')
      beerItem.innerHTML = `<li class='list-group-item'> ${beer.name}</li>`
      beerItem.id = beer.id
      listPanel.append(beerItem)

      beerItem.addEventListener('click', event => {
        if (parseInt(event.target.parentElement.id, 10) === beer.id) {
          showPanel.innerHTML =
          `
          <h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea id= "text-area">${beer.description}</textarea>
          <button id="edit-beer" class="btn btn-info"> Save </button>
          `
          const saveButton = document.querySelector('#edit-beer')
          saveButton.addEventListener('click', event => {
            const textArea = document.querySelector('#text-area')
            const inputValue = textArea.value
            console.log(inputValue)

            fetch(`http://localhost:3000/beers/${beer.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({description: inputValue})

            })
          })
        }
      })
    })
  }
})
