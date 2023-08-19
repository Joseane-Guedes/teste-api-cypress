
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
    it.only('Cadastrar produtos', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": "Logitech Produto teste infinito 2",
                // TODO: CRIAR PRODUTOS DINAMICAMENTE
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
}); 