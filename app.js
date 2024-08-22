class Despesa {

    constructor (ano, mes, dia, tipo, descricao, valor) {

        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor

    }

    validarDados () {

        for (let i in this) {

            if (this[i] === undefined || this[i] === '' || this[i] === null) {

                return false

            }
        }

        return true

    }
}

class Bd {

    constructor () {

        let id = localStorage.getItem('id')

        if (id === null) {

            localStorage.setItem('id', 0)

        }

    }

    getProximoId () {

        let proximoId = localStorage.getItem('id')
        
        return parseInt(proximoId) + 1

    }

    gravar (d) {

        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    
    }

    recuperarTodosRegistros () {

        // Array de despesas

        let despesas = []

        let id = localStorage.getItem('id')

        // Recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            // Recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Testar if null não incluir no array 'despesas'

            if (despesa === null) {

                continue

            } else {

                despesas.push(despesa)

            }

            

        }

        return despesas

    }

    pesquisar (despesa) {

        let despesasFiltradas = []

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        // Ano
        if (despesa.ano != "") {

            console.log('Filtro de ano acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)

        }

        // Mês
        if (despesa.mes != "") {

            console.log('Filtro de mes acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)

        }


        // Dia
        if (despesa.dia != "") {

            console.log('Filtro de dia acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)

        }


        // Tipo
        if (despesa.tipo != "") {

            console.log('Filtro de tipo acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        }


        // Descrição
        if (despesa.descricao != "") {

            console.log('Filtro de descricao acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        }


        // Valor
        if (despesa.valor != "") {

            console.log('Filtro de valor acionado!')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)

        }

        console.log(despesasFiltradas)


    }

}

let bd = new Bd()


function cadastrarDespesa () {

    let ano = document.getElementById('ano') 
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(

        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value

    )

    if (despesa.validarDados()) {

        //resetModal()
        
        bd.gravar(despesa)

        limparFormulario()

        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('texto').className = 'modal-header text-success'
        document.getElementById('tituloModal').innerText = 'Registro inserido com sucesso'
        document.getElementById('modalBody').innerText = 'Os dados da despesa foram inseridos no sistema.'
        document.getElementById('botaoVoltar').className = 'btn btn-success'
        document.getElementById('botaoVoltar').innerText = 'Voltar'
        

    } else {

        //resetModal()

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('texto').className = 'modal-header text-danger'
        document.getElementById('tituloModal').innerText = 'Erro na inclusão do registro'
        document.getElementById('modalBody').innerText = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('botaoVoltar').className = 'btn btn-danger'
        document.getElementById('botaoVoltar').innerText = 'Voltar e corrigir'

    }
    

}

/*
function resetModal () {

    let texto = document.getElementById('texto')
    let botaoVoltar = document.getElementById('botaoVoltar')
    let tituloModal = document.getElementById('tituloModal')
    let modalBody = document.getElementById('modalBody')
    */

    /*
    // Remover classes de sucesso/erro
    document.getElementById('texto').className = ''
    document.getElementById(botaoVoltar).className = ''

    // Resetar o texto do modal
    document.getElementById('tituloModal').innerText = ''
    document.getElementById('modalBody').innerText = ''
    document.getElementById(botaoVoltar).innerText = ''
    */
    /*
    // Verificando e resetando os elementos
    if (texto) {
        texto.className = '';
    }
    if (botaoVoltar) {
        botaoVoltar.className = 'btn';
        botaoVoltar.innerText = '';
    }
    if (tituloModal) {
        tituloModal.innerText = '';
    }
    if (modalBody) {
        modalBody.innerText = '';
    }

}
*/

function carregaListaDespesas () {

    let despesas = []

    despesas = bd.recuperarTodosRegistros()

    // Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    // Percorrer o array 'despesas' listando cada despesa de forma dinâmica
    despesas.forEach (function (d) {

        console.log(d)
        
        // Criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // Criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Ajustar o tipo

        switch (parseInt(d.tipo)) {
            
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break

        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

}

function limparFormulario () {

   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   ano.value = ''
   mes.value = ''
   dia.value = ''
   tipo.value = ''
   descricao.value = ''
   valor.value = ''

}

function pesquisarDespesa () {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)

}

/* Exemplos de Array filters

** Utilizando arrow function, utilizamos o retorno implicito e como só recebemos um parâmetro, também suprimimos a atribuição através do método function

funcionarios.filter( f => f.salario < 2000 ).filter( f => f.status == 'ativo' )

** os dois métodos

funcionarios.filter(function (f) { return f.salario < 2000 }).filter(f => f.status == 'ativo' )

** apenas o método convencional

funcionarios.filter(function (f) { return f.salario < 2000 }).filter(function (f) { return f.status == 'ativo' })
*/