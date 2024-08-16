const containerVideos = document.querySelector('.videos__container')
async function buscarEMmostrar() {
  try{ 
    const buscar = await fetch("http://localhost:3000/videos")
    const videos = await buscar.json()
      videos.forEach((video) => {
        
        containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>   
            </li>
          `  
    })
  }catch(error){
    containerVideos.innerHTML = `<p>Disculpe houve um erro!<br> Tipo: ${error}</p>`
  }
}
buscarEMmostrar()

const barraDePesquisa = document.querySelector(".pesquisar__input")
barraDePesquisa.addEventListener('input', filtrarPesquisa)

function filtrarPesquisa(){

  const videos = document.querySelectorAll('.videos__item')

  if (barraDePesquisa.value != "") {
    for(let video of videos){
      let titulo = video.querySelector('.titulo-video').textContent.toLowerCase()
      let valorFiltro = barraDePesquisa.value.toLowerCase()

        if (!titulo.includes(valorFiltro)) {
          video.style.display = "none";
        }else{
          video.style.display = "block";
        }
      }
}
}

const botaoCategoria = document.querySelectorAll('.superior__item')
botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute('name')
  botao.addEventListener('click', () => filtroCategoria(nomeCategoria))
})

function filtroCategoria(filtro) {
  const videos = document.querySelectorAll('.videos__item')
  for(let video of videos){
    let categoria = video.querySelector('.categoria').textContent.toLowerCase()
    let valorFiltro = filtro.toLowerCase()
      if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
        video.style.display = "none";
      } else{
        video.style.display = "block";
      }
  }
}