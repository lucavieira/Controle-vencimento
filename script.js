const month = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const currentYear = document.querySelector('#ano')
const currentMonth = document.querySelector('#mes')
const calendary = document.querySelector('#container-calendario')
const containerDay = document.querySelector('#container-dias')
const products = document.getElementById('produtos')
const closeButton = document.querySelector('#btn-close')

// Preenchendo o campo dos meses
month.forEach((mes, index) => {
    currentMonth.options[currentMonth.options.length] = new Option(mes, index)
})

// Função que conta a quantidade de dias de um mês especifico
function numberOfDays(year, month) {
    let data = new Date(year, month, 0)
    return data.getDate()
}

// Criando cada dia e adicionando no calendário
function changeDate() {
    for(let day = 1; day <= numberOfDays(currentYear.value, (Number(currentMonth.value) + 1)); day++) {
        let boxDay = document.createElement('div')
        boxDay.classList.add('dia')
        boxDay.innerHTML = day

        boxDay.addEventListener('click', showProducts)
    
        containerDay.appendChild(boxDay)
    }
}
changeDate()

// Função para resetar o campo dos dias
function removeDays() {
    for(let day = (containerDay.children.length - 1); day >= 0; day--) {
        containerDay.removeChild(containerDay.children[day])
    }
}

// Função para cadastrar produto
function addProduct() {
    console.log('Add Products')
}

// Função para mostrar os Produtos a vencer
function showProducts() {
    products.style.display = 'flex'
}

// Função para fechar janela de mostrar produtos
closeButton.addEventListener('click', () => {
    products.style.display = 'none'
})

// Eventos ao mudar valor do ano ou do mês
currentMonth.addEventListener('change', () => {
    removeDays()
    changeDate()
})

currentYear.addEventListener('change', () => {
    removeDays()
    changeDate()
})
