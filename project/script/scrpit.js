// base color
const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255],
}



const search = document.querySelector("#search")
const baseStats = document.querySelector(".base-stats-title")
const pokemonCard = document.querySelector("#pokemonCard")
const identi = document.querySelector("#identi")
const pokeImage = document.querySelector('#pokemon-image')
const types = document.querySelector('#types')
const statNumber = document.querySelectorAll('.stat-number')
const barOutside = document.querySelectorAll('.bar-outside')
const barInner = document.querySelectorAll('.bar-inner')
const statDesc = document.querySelectorAll('.stat-desc')
const listBar = document.querySelector('.list-bar')
const pokemonList = document.querySelector('.pokemon-list')
const closeBtn = document.querySelector('.closeBtn')
const listWrapper = document.querySelector('.list-wrapper')

const fetchApi = async(pokemonName)=>{
    pokeNameApi = pokemonName.split(' ').join('-').toLowerCase()
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNameApi}`)
    if(response.status===200){
        const pokeData = await response.json()
        return pokeData
    }

    return false
}
const fetchPokeList = async()=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1008`)
    const pokeList = await response.json()
    return pokeList
}
const pokemonListInit = async()=>{
    const pokeList = await fetchPokeList()
    listWrapper.innerHTML=''
    pokeList.results.forEach((pokemon)=>{
    let liTag = `
        <li class="poke-item ${pokemon.name}">
            <div class="row">
                <span class="song-name-list ">${pokemon.name}</span>
            </div>
        </li>
    `
    listWrapper.insertAdjacentHTML('beforeEnd',liTag)
    })
    const pokeItem = document.querySelectorAll('.poke-item')
    pokeItem.forEach((item)=>{
        item.addEventListener('click', ()=>handleOption(item))
    })
}
pokemonListInit()
search.addEventListener('keypress',async(e)=>{
    if (e.key==="Enter")
    {
        const pokeData = await fetchApi(e.target.value)

        if (!pokeData){
            alert('Pokemon does not exist!')
            return
        }
    
        // Change UI theme when pokemon exist
        const mainCardColor = typeColors[pokeData.types[0].type.name];
        baseStats.style.color = `rgb(${mainCardColor[0]}, ${mainCardColor[1]}, ${mainCardColor[2]})`
        pokemonCard.style.backgroundColor = `rgb(${mainCardColor[0]}, ${mainCardColor[1]}, ${mainCardColor[2]})`
    
        // id of pokemon
        identi.innerHTML = `#${pokeData.id.toString().padStart(3,'0')}`
    
        // pokemon image
        pokeImage.src=pokeData.sprites.other.home.front_default
    
        // types of pokemon
        types.innerHTML='' //update types' span when invoke a new pokemon
        pokeData.types.forEach((tpe)=>{
            let newType = document.createElement('span')
            const color = typeColors[tpe.type.name]
            newType.innerHTML=tpe.type.name
            newType.classList.add('type')
            newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            types.appendChild(newType)
        })
    
        // update stats
        pokeData.stats.forEach((sta,i)=>{
            statNumber[i].innerHTML = sta.base_stat.toString().padStart(3,'0')
            barOutside[i].style.backgroundColor = `rgba(${mainCardColor[0]}, ${mainCardColor[1]}, ${mainCardColor[2]}, 0.3)`
            barInner[i].style.backgroundColor= `rgb(${mainCardColor[0]}, ${mainCardColor[1]}, ${mainCardColor[2]})`
            statDesc[i].style.color = `rgb(${mainCardColor[0]}, ${mainCardColor[1]}, ${mainCardColor[2]})`
            
            barInner[i].style.width = `${sta.base_stat}%`
        })
    }else{
        return
    }
    
})

listBar.addEventListener('click', handleShow)
function handleShow(){
    pokemonList.classList.toggle('show')
}
closeBtn.addEventListener('click', handleShow)
function handleShow(){
    pokemonList.classList.toggle('show')
}

function handleOption(item){
    const pokeInfo = item.className.split(' ')[1]
    search.value = pokeInfo
    keypress = new KeyboardEvent('keypress',{'key':'Enter'})
    search.dispatchEvent(keypress)
}