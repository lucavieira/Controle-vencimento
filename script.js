const month = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const currentYear = document.querySelector('#ano')
const currentMonth = document.querySelector('#mes')
const calendary = document.querySelector('#container-calendario')
const containerDay = document.querySelector('#container-dias')
const products = document.getElementById('produtos')
const register = document.getElementById('cadastro')
const closeButtonProducts = document.querySelector('#btn-close-produtos')
const closeButtonRegister = document.querySelector('#btn-close-cadastro')
const addButton = document.querySelector('#btn-add')
const saveButton = document.querySelector('#btn-save')
const listProducts = document.querySelector('#produto')

// Informações do produto
const productName = document.querySelector('#nome-produto')
const productEan = document.querySelector('#ean-produto')
const productValidity = document.querySelector('#vencimento-produto')
const productAmount = document.querySelector('#quantidade-produto')

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

        boxDay.addEventListener('click', () => showProducts(day, Number(currentMonth.value) + 1, currentYear.value))
    
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

// Função para salvar o produto
function saveProduct() {
    let newValidity = productValidity.value.split('-').reverse().join('/')

    let product = {
        'name': productName.value,
        'ean': productEan.value,
        'validity': newValidity,
        'amount': productAmount.value
    }
    console.log(product)

    var productBox = document.createElement('div')
    productBox.innerHTML = `${product.name} | ${product.ean} | ${product.validity} | ${product.amount}`

    localStorage.setItem(`product-${product.name}`, productBox.outerHTML)
}

saveButton.addEventListener('click', saveProduct)

// Função para cadastrar produto
function addProduct() {
    register.style.display = 'flex'
}

addButton.addEventListener('click', addProduct)

// Função para mostrar os Produtos a vencer
function showProducts(day, month, year) {
    products.style.display = 'flex'

    for(let item in localStorage) {
        if(item.includes('product')) {
            if(localStorage.getItem(item).includes(`${day}/${month}/${year}`) || localStorage.getItem(item).includes(`${day}/0${month}/${year}`)) {
                listProducts.insertAdjacentHTML('afterbegin', localStorage.getItem(item))
            }
        }
    }
}

// Função para fechar janela de mostrar produtos
function closeWindow() {
    products.style.display = 'none'
    register.style.display = 'none'

    for(let index = listProducts.children.length - 1; index >= 0; index--) {
        listProducts.removeChild(listProducts.children[index])
    }
}

closeButtonProducts.addEventListener('click', closeWindow)
closeButtonRegister.addEventListener('click', closeWindow)

// Eventos ao mudar valor do ano ou do mês
currentMonth.addEventListener('change', () => {
    removeDays()
    changeDate()
})

currentYear.addEventListener('change', () => {
    removeDays()
    changeDate()
})
