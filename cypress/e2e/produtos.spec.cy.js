
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
            // expect(response.body.produtos[0].nome).to.equal('Logitech Produto teste infinito 2')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(40)
        })
    });
    it('Cadastrar produtos', () => {
        let produto = `Logitech Produto teste infinito ${Math.floor(Math.random() * 1000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 500,
                "descricao": "Mouse",
                "quantidade": 900,
            },
            headers: { authorization: token }
        }).then((response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        }))
    });
    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.CadastrarProduto(token, 'Logitech Produto teste infinito 4', 250, 'Descricao do produto novo', 180)
            .then((response => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal("Já existe produto com esse nome")
            }))
    });

    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body: {
                    "nome": "Logitech Produto teste ",
                    "preco": 500,
                    "descricao": "Produto editado",
                    "quantidade": 300
                }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });
    it('Deve editar produto cadastrado previamente', () => {
        let produto = `Logitech Produto teste infinito ${Math.floor(Math.random() * 1000000)}`
        cy.CadastrarProduto(token, produto, 250, 'Descricao do produto novo', 180)
            .then(response => {
                let id = response.body._id

                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 200,
                        "descricao": "Produto editado",
                        "quantidade": 400
                    }
                }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Logitech Produto teste infinito ${Math.floor(Math.random() * 1000000)}`
        cy.CadastrarProduto(token, produto, 250, 'Descricao do produto novo', 180)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                }).then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro excluído com sucesso');
                });
            });
    });


}); 