const express = require('express');
const router = express.Router();

const jogos = [
    {
            id: 1,
        nome: 'Mortal Kombat',
        imagem: 'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MortalKombat11_image1600w.jpg',
        genero: 'Luta',
        nota: '8',  
        jogado: false,
    },
    {
        id: 2,
        nome: 'Dragon ball Z Budokai Tenkaichi 3',
        imagem: 'https://upload.wikimedia.org/wikipedia/pt/7/7e/Dragon_Ball_Z_Budokai_Tenkaichi.jpg',
        genero: 'Luta e Ação',
        nota: '10',
        jogado: false,  
    },
    {
        id: 3,
        nome: 'Dragon ball Xenoverse 2',
        imagem: 'https://4.bp.blogspot.com/-AoXmuGTxDHg/WCRTLYH0mpI/AAAAAAAAL50/3CiP9i94tLsDQBbdRFSM4p5FpR60EN6WwCEw/s1600/Xenoverse%2B2.jpg',
        genero: 'Luta',
        nota: '8', 
        jogado: false,
    },
]


router.get('/', (req, res) => {
    res.send(jogos);
})


router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const jogo = jogos.find(jogo => jogo.id == idParam);

    // verifica se a vaga nao foi encontrada
    if(!jogo) {
        res.status(404).send({error: 'Jogo nao encontrada'});
        return;
    }

    res.send(jogo);
})


router.post('/add', (req, res) => {

    const jogo = req.body;

    if(!jogo || !jogo.nome || !jogo.imagem || !jogo.genero || !jogo.nota) {
        res.status(400).send({
            message: 'vaga inválida, esta faltando os campos titulo e salario'
        })
        return;
    }
    
    jogo.id = jogos[jogos.length -1].id + 1;
    jogos.push(jogo);
    res.status(201).send({
        message: `Jogo ${jogo.nome} Foi Cadastrado com Sucesso!!`,
        data: jogos
    });
})


router.put('/editar/:id', (req, res) => {
    const idParam = req.params.id;

    const jogoEdit = req.body;

    let index = jogos.findIndex(jogo => jogo.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'o Jogo que voce está tentando editar nao foi encontrado!!'
        })
        return;
    }


    jogos[index] = {
        ...jogos[index],
        ...jogoEdit
    }

    res.send({
        message: `Jogo ${jogos[index].nome} atualizado com sucesso!!!`,
        data: jogos[index]
    })
})


router.delete('/delete/:id', (req, res) => {

    const idParam = req.params.id;

    const index = jogos.findIndex(jogo => jogo.id == idParam);
    const nome = jogos[index];

    jogos.splice(index, 1);
    res.send({
        message: `Jogo ${nome.nome} excluida com sucesso !`,
    })
})

router.put('/:status/:id',(req,res) =>{
    const idParam = req.params.id;
    const okParams = req.params.status;
    let okParamsBolean = (okParams == 'true'); 
    let index = jogos.findIndex(jogo => jogo.id == idParam);
    jogos[index].jogado = okParamsBolean;
    const statusEditado = jogos[index];    
    res.send({
        statusEditado
    })
        
});


module.exports = router;