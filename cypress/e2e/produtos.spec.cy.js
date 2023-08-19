
describe('Testes da funcionalidade Produtos', () => {
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
                "nome": "Logitech Produto teste infinito",
                // TODO: CRIAR PRODUTOS DINAMICAMENTE
                "preco": 400,
                "descricao": "Mouse",
                "quantidade": 300,
            },
            headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNjkyNDAzMDQxLCJleHAiOjE2OTI0MDM2NDF9.Kz-VoS-Ws5PG929CEHa-OB3BbczjqZ0bUCtQfzvbJPs' }
            // TODO: GERAR TOKEN DINAMICAMENTE
        }).then((response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        }))

    });
}); 