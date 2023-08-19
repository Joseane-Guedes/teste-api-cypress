
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
    it.only('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body: {
                "nome": 'Logitech Produto teste infinito 2',
                "preco": 400,
                "descricao": "Mouse",
                "quantidade": 300,
            },
            failOnStatusCode: false
        }).then((response => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Já existe produto com esse nome")
        }))
    });
}); 