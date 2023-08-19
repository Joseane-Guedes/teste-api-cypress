
describe('Testes da funcionalidade Produtos', () => {
    let token
    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });


    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) => {
            expect(response.body.produtos[0].nome).to.equal('Longo celular Horizontal para teste de token')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(15)
        })
    });
    it('Cadastrar produtos', () => {
        let produto = `Logitech Produto teste infinito ${Math.floor(Math.random() * 1000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": 'produto',
                "preco": 400,
                "descricao": "Mouse",
                "quantidade": 300,
            },
            headers: { authorization: token }
        }).then((response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        }))
    });
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.CadastrarProduto(token, 'Logitech Produto teste infinito 2', 250, 'Descricao do produto novo', 180)
            .then((response => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal("Já existe produto com esse nome")
            }))
    });
}); 