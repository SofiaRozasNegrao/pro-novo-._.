var estadoDoJogo="inicio"
var menino1,menino1Animacao,menino1CaidoImg,sereiaAnimacao,sereiaCaida 
var grupoMonstro,monstro
var carangueijoImg,monstroImg
var fundo
var moeda,grupoMoeda
var bau,bauImg
var pontuacao=0
var gameOver,gameOverImg,restart,restartImg
var genero
var botaoInicio,botaoInicioImg
var escolha,escolhaImg
var chaoInvisivel,tetoInvisivel
var larguraTela= window.innerWidth

function Monstroo() {
    if(frameCount % 300===0){
        monstro=createSprite(600,500,50,50)
        monstro.y=random(100,500)
        monstro.velocityX=fundo.velocityX
        monstro.lifeTime=600
        var sla=Math.round(random(1,2))
        switch(sla){
            case 1:monstro.addImage(carangueijoImg)
            monstro.scale=0.38
            break
            case 2: monstro.addImage(monstroImg)
            monstro.scale=0.48
            break
        }
        grupoMonstro.add(monstro)
     }
}

function EstadoJogo() {
    if(estadoDoJogo==="inicio"){
        fill("white")
        textSize(52)
        text("Clique para começar",50,290)
        textSize(25)
        text("Clique em 'A' para menina e 'B' para menino",55,420)
        menino1.visible=false
        fundo.visible=false
        gameOver.visible=false
        restart.visible=false
        grupoMonstro.visible=false
        grupoMoeda.visible=false
        
    }

    if(estadoDoJogo==="inicio"&& keyDown('A')){
        estadoDoJogo="jogando"
        menino1.changeAnimation('meninaNadando',sereiaAnimacao)
        genero="menina"
    }

    if(estadoDoJogo==="inicio"&& keyDown('B')){
        estadoDoJogo="jogando"
        menino1.changeAnimation('nadando',menino1Animacao)
        genero="menino"
    }
    
    if(estadoDoJogo==="fim"&& genero==="menino"){
        fundo.velocityX=0
        grupoMoeda.setVelocityXEach(0)
        grupoMonstro.setVelocityXEach(0)
        menino1.changeAnimation('caido',menino1CaidoImg)
        menino1.velocityY=3
        restart.visible=true
        gameOver.visible=true
        fill("black")
        textSize(18)
        //if(mousePressedOver(restart)){
            //reset()
          //}
       }

       if(estadoDoJogo==="fim"&& genero==="menina"){
        fundo.velocityX=0
        grupoMoeda.setVelocityXEach(0)
        grupoMonstro.setVelocityXEach(0)
        menino1.changeAnimation('meninaCaida',sereiaCaida)
        menino1.velocityY=3
        restart.visible=true
        gameOver.visible=true
        fill("black")
        textSize(18)
        //if(mousePressedOver(restart)){
            //reset()
        //}
       }

       if(estadoDoJogo==="fim"&& keyDown('R')){
           reset()
       }
      }

function reset() {
    estadoDoJogo="inicio"
    grupoMoeda.destroyEach()
    grupoMonstro.destroyEach()
    pontuacao=0
    gameOver.visible=false
    restart.visible=false
    menino1.y=500
}

function preload(){
    menino1Animacao=loadAnimation('menino1.png','menino2.png','Menino3.png','menino4.png','menino5.png','menino6.png','menino7.png')
    menino1CaidoImg=loadAnimation('menino1Caido.png')
    carangueijoImg=loadImage("carangueijo.png")
    monstroImg=loadImage("tubarao.png")
    fundoImg=loadImage("fundo.png")
    moedaImg=loadImage("moeda.png")
    bauImg=loadImage("bau.png")
    gameOverImg=loadImage("GameOver.png")
    restartImg=loadImage("clique-em-r.png")
    sereiaAnimacao=loadAnimation('Menina1.png','menina2.png')
    sereiaCaida=loadAnimation('Menina1.png')
}

function setup() {
    fundo=createSprite(300,10,50,50)

    menino1=createSprite(150,500,50,50)
    menino1.addAnimation('nadando',menino1Animacao)
    menino1.addAnimation('caido',menino1CaidoImg)
    menino1.addAnimation('meninaNadando',sereiaAnimacao)
    menino1.addAnimation('meninaCaida',sereiaCaida)

    chaoInvisivel=createSprite(300,599,600,1)
    chaoInvisivel.visible=false
    tetoInvisivel=createSprite(300,1,600,1)
    tetoInvisivel.visible=false

    restart=createSprite(300,450,50,50)
    restart.addImage(restartImg)
    restart.visible=false

    gameOver=createSprite(300,300,50,50)
    gameOver.addImage(gameOverImg)
    gameOver.scale=1.8

    grupoMonstro=new Group()
    grupoMonstro.visible=false
    grupoMoeda=new Group()
    grupoMoeda.visible=false
    grupoBau=new Group()
}

function draw() {
    createCanvas(600,600)

    background("black")

    EstadoJogo()

    if(estadoDoJogo==="jogando"){ 
    menino1.visible=true
    fundo.visible=true
    fundo.addImage(fundoImg)
    fundo.velocityX=-(1+pontuacao/1.347609)
    if(fundo.x<120){
        fundo.x=480
    }

        if(frameCount % 600===0){
            moeda=createSprite(650,600,10,10)
            moeda.addImage(moedaImg)
            moeda.scale=0.6
            moeda.velocityX=fundo.velocityX
            moeda.y=random(50,550)
            moeda.lifeTime=600
            moeda.depth=menino1.depth
            grupoMoeda.add(moeda)
        }

        if (menino1.isTouching(grupoMoeda)){
            grupoMoeda.destroyEach()
            grupoMonstro.destroyEach()
            pontuacao+=1
        }

        if(frameCount % 10000===0){
            bau=createSprite(300,500,50,50)
            bau.velocityX=fundo.velocityX
            bau.lifeTime(600)
            bau.addImage(bauImg)
            bau.scale=0.6
            grupoBau.add(bau)
        }

        if(menino1.isTouching(grupoBau)){
            pontuacao+=10
            grupoBau.destroyEach()
        }

        if(keyDown(UP_ARROW)){
            menino1.y-=2
        }

        if(keyDown(DOWN_ARROW)){
            menino1.y+=2
        }

        if(menino1.isTouching(grupoMonstro)){
            estadoDoJogo="fim"
        }

        Monstroo()
    }

    menino1.collide(chaoInvisivel)
    menino1.collide(tetoInvisivel)

    grupoMonstro.depth=gameOver.depth
    gameOver.depth=gameOver.depth+1
    restart.depth=gameOver.depth
       
    drawSprites()

    fill("black")
    textSize(50)
    text("Pontuação:"+pontuacao,100,70)
}