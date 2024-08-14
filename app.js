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
        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('texto').className += 'modal-header text-success'
        document.getElementById('tituloModal').innerText = 'Registro inserido com sucesso'
        document.getElementById('modalBody').innerText = 'Os dados da despesa foram inseridos no sistema.'
        document.getElementById('botaoVoltar').className += 'btn btn-success'
        document.getElementById('botaoVoltar').innerText = 'Voltar'
        

    } else {

        //resetModal()

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('texto').className += 'modal-header text-danger'
        document.getElementById('tituloModal').innerText = 'Erro na inclusão do registro'
        document.getElementById('modalBody').innerText = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('botaoVoltar').className += 'btn btn-danger'
        document.getElementById('botaoVoltar').innerText = 'Voltar e corrigir'

    }
    

}

/*
function resetModal () {

    // Remover classes de sucesso/erro
    document.getElementById('texto').className = ''
    document.getElementById(botaoVoltar).className = ''

    // Resetar o texto do modal
    document.getElementById('tituloModal').innerText = ''
    document.getElementById('modalBody').innerText = ''
    document.getElementById(botaoVoltar).innerText = ''

}*/

function carregaListaDespesas () {

    let despesas = []

    despesas = bd.recuperarTodosRegistros()

    console.log(despesas)

}