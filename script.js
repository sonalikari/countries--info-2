let grid = document.querySelector('.grid')
  let select = document.querySelector('#regions')
  let searchInput = document.querySelector('.search-input')
  let darkMode = document.querySelector('.toggleBtn')
  let box = document.querySelector('.box')
  let api = 'https://restcountries.com/v3.1/all'
  async function requestApi(url) {
      try {
          box.classList.remove('hidden')
          const request = await fetch(url)
          const datas = await request.json()
          getData(datas)

      } catch (err) {
          console.log(err.message) 
      }
  }
  requestApi(api)
  
  function getData(datas) {
      box.classList.add('hidden')
      const allCountry = datas
      for (i = 1; i <= allCountry.length; i++) {
          console.log(allCountry[i], i);
      }
      allCountry.forEach(data => {
          const { name, flags, capital, population, region, subregion, area, timezones, } = data
  
          let span = document.createElement('span')
          span.setAttribute('id', `${name.common}`);
          span.setAttribute('data-set', `${region}`);
          console.log(data)
          span.classList.add('span');
          span.innerHTML = `
          <img src= ${flags.png} alt="country flag">
          <h1 class="co-name">${name.common}</h1>
          <h2 class="pop">Population: ${population}</h2>
          <h2 class="reg"> Region: ${region}</h2>
          <h2 class="subreg"> Sub-Region: ${subregion}</h2>
          <h2 class="cap"> Capital: ${capital}</h2>
          <h2 class="area"> Area: ${area}</h2>
          <h2 class="timez"> Timezones: ${timezones}</h2>
          <div class='cent'>
          <a href='#?${name.common}' class='about'>About this country</a>
          </div>
          `
          grid.appendChild(span)
      });
      searchInput.addEventListener('input', (e) => {
          let searchStr = e.target.value.toLowerCase()
          for (i = 1; i < grid.childNodes.length; i++) {
              console.log(grid.childNodes[i].getAttribute('id'));
              const country = grid.childNodes[i].getAttribute('id').toLowerCase()
              if (country.includes(searchStr)) {
                  grid.childNodes[i].classList.remove('hidden1')
              } else {
                  grid.childNodes[i].classList.add('hidden1')
              }
          }
      })
  
      select.addEventListener('change', e => {
          const region = select.value
  
          for (i = 1; i < grid.childNodes.length; i++) {
              const country = grid.childNodes[i].getAttribute('data-set')
  
              if (country.includes(region) || select.value == '0') {
                  grid.childNodes[i].classList.remove('hidden1')
  
              } else {
                  grid.childNodes[i].classList.add('hidden1')
              }
          }
      })

      getData
      darkMode.addEventListener('click', () => {
          document.body.classList.toggle('active')
          grid.classList.toggle('active')
          searchInput.classList.toggle('active')
          document.querySelector('.site-header').classList.toggle('active')
          document.getElementById('regions').classList.toggle('active')
      })
  }