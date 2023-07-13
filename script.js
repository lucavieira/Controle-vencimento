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
        boxDay.id = day
        boxDay.innerHTML = day

        boxDay.addEventListener('click', () => showProducts(day, Number(currentMonth.value) + 1, currentYear.value))
    
        containerDay.appendChild(boxDay)
    }

    paintBox()
}
changeDate()

// Função para pintar a caixa do dia que possuir algum produto cadastrado
function paintBox () {
    for(let item in localStorage) {
        if(item.includes('product')) {
            let fullDate = localStorage.getItem(item).split('><')[3].trim().slice(28, 38).trim()
            let day = fullDate.slice(0, 2)
            let month = fullDate.slice(3, 5)
            let year = fullDate.slice(6)
            if(localStorage.getItem(item).includes(fullDate)) {
                if(Number(currentMonth.value) + 1 == month) {
                    if(currentYear.value == year) {
                        let fieldDay = document.getElementById(day)
                        fieldDay.classList.add('dia-produto')
                    }
                }
            }
        }
    }
}

// Função que remove produtos ja vencidos
function removeProducts() {
    for(let item in localStorage) {
        if(item.includes('product')) {
            let endName = localStorage.getItem(item).split(' ')[2].slice(20).indexOf('<')
            if(localStorage.getItem(item).split('><')[3].trim().slice(28, 38) < new Date().toLocaleDateString('pr-BR')) {
                localStorage.removeItem(`product-${localStorage.getItem(item).split(' ')[2].slice(20, (20 + endName))}`)
            }
        }
    }
}
removeProducts()

// Função para resetar o campo dos dias
function removeDays() {
    for(let day = (containerDay.children.length - 1); day >= 0; day--) {
        containerDay.removeChild(containerDay.children[day])
    }
}

// Função para salvar o produto
function saveProduct() {
    let error = ''
    let newValidity = productValidity.value.split('-').reverse().join('/')

    let product = {
        'name': productName.value,
        'ean': productEan.value,
        'validity': newValidity,
        'amount': productAmount.value
    }

    if(product.ean.length != 13 || product.ean == null) {
        error += 'EAN Inválido! Máximo de 13 digitos \n'
    }

    if(product.validity == '' ) {
        error += 'Validade Inválida! Preencha o vencimento! \n'
    }

    if(product.validity < new Date().toLocaleDateString('pt-BR')) {
        error += 'Validade Inválida! Data precisa ser posterior a data atual! \n'
    }

    if(error == 0) {
        var productBox = document.createElement('div')
        productBox.classList.add('produto')

        // let nameProduct = document.getElementById('produtoNome')
        let name = document.createElement('div')
        name.classList.add('produtoNome')
        name.innerHTML = product.name

        // let eanProduct = document.getElementById('produtoEan')
        let ean = document.createElement('div')
        ean.classList.add('produtoEan')
        ean.innerHTML = product.ean

        // let validityProduct = document.getElementById('produtoValidade')
        let validity = document.createElement('div')
        validity.classList.add('produtoValidade')
        validity.innerHTML = product.validity

        // let amountProduct = document.getElementById('produtoQuantidade')
        let amount = document.createElement('div')
        amount.classList.add('produtoQuantidade')
        amount.innerHTML = product.amount

        // productBox.innerHTML = `${product.name} | ${product.ean} | ${product.validity} | ${product.amount}`
        productBox.appendChild(name)
        productBox.appendChild(ean)
        productBox.appendChild(validity)
        productBox.appendChild(amount)
    
        localStorage.setItem(`product-${product.name}`, productBox.outerHTML)
    
        location.reload()
    } else {
        alert('Erro: \n' + error)
    }
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
