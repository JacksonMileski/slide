import debounce from "./debounce";

export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        // esse objeto vai ter uma referencia dos numeros
        this.dist = {
            finalPosition:0, // posição final do slide
            startX: 0, // referencia da onde meu mouse estava(acho q é isso)
            movement: 0 // total q se moveu
        }
        this.activeClass = 'active';
    }

    transition(active) {
        // o transition no style.css ficou muito ruim pq ele está adicionando o transition toda vez que
        // eu mexo um um pixel do meu slide, entao fiz aqui
        this.slide.style.transition = active ? 'transform .3s' : '';
    }

    // TODO: creio que mousemove é só uma forma de falar que to no pc, e mousemove é q estou no celular no caso vou colocar
    // em addEventListener
    moveSlide(distX) {
        this.dist.movePosition = distX; // FIXME: para ter uma referencia da onde está o meu mouse, para tomar vez q eu clicar nao 
        // começar meu slide do inicio
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
    }

    updatePosition(clientX) {
        // FIXME: this.dist.startX recebe apenas o valor de quando eu clico, entao recebo um valor, já como estou no evento 'onMove' entao
        // o 'event.clientX' vai sendo atualizado
        this.dist.movement = (this.dist.startX - clientX) * 1.6; // FIXME: para n ficar tao lento para se mover os slides,
        // creio q o meu mouse n acompanha mais, n por algo do mouse e sim pq this.slide vai mais rapido, n tenho certeza
        return this.dist.finalPosition - this.dist.movement; // FIXME: dessa forma vou diminuir com o valor que eu tinha antes para
        // o slide ficar no lugar que deixei quando mexi, se nao toda vez que eu clicasse usuaria somente o valor novo de ' this.dist.movement'
        // no caso antes eu estava fazendo return  this.dist.movement; por isso retornava do inicio toda vez q eu clicava
        // FIXME: a mesma explicação para o 'this.dist.movement' q deixei no console vale pra cá, se der errado é só mudar
        // o sinal de menos pra mais, preciso ver conforme a regra dos sinais // deixei a explicao na pasta 'part14 explicacao'
    }

    onStart(event) {
        console.log(this);
        let movetype;
        if(event.type === 'mousedown') { // se n for mousedown entao n precisa do event.prevendDefault();
            event.preventDefault(); // FIXME: por padrao quando eu clico com o mouse e arasto o mouse ele tenta puxar a imagem,
            // entao eu vou prevenir isso pq vai bugar o meu slide
            this.dist.startX = event.clientX; // pelo o que entendi é o lugar onde o usuario está com o mouse
            console.log(event);
            movetype = 'mousemove';
        } else { // FIXME: tive q separar do evento do computador e do evento do celular pq para pegar o 'clientX' é um pouco diferente
            this.dist.startX = event.changedTouches[0].clientX; // FIXME: esse '0' que eu pego do 'changedTouches' é para dizer
            // que eu quero sempre pegar o primeiro touch pq o usuario pode clicar com dois dedos, entao eu quero sempre pegar
            // o primeiro dedo, no caso o primeiro toque
            console.log(event); // o evento de cima fica em TouchEvent, changedTouches e selecionar o '0' depois clientX
            movetype = 'touchmove';
        }
        
        this.wrapper.addEventListener(movetype, this.onMove); // esse evento é quando eu passar o mouse por cima ele dispara enquanto
        // eu estiver mexendo o mouse FIXME: mas eu fiz o seguinte, esse evento só vai disparar quando eu clicar no this.wrapper, ai sim
        // vai disparar esse evento, e ali no 'onEnd' vai tirar o evento de mousemove ao desclicar // essa logica vai servir para dispositivos
        //de touch tbm
        this.transition(false); // FIXME: quando começar o meu evento eu removo ele, no caso quando eu estiver com o mouse mexendo
        // ai quando eu largo o mouse ele ativa o evento transition
        // FIXME: no caso a animação no começo precisa estar em true, depois false para mover com o mouse, depois true ao largar
        // para funcionar a animação
    }

    onMove(event) {
        // se for mousemove entao faz isso, se nao faz o outro, no caso o outro é o evento de toque do mobile
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        // FIXME: this.dist.startX recebe apenas o valor de quando eu clico, entao recebo um valor, já como estou no evento 'onMove' entao
        // o 'event.clientX' vai sendo atualizado, isso serve para o event.changedTouches[0] tbm
        const finalPosition = this.updatePosition(pointerPosition); 
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        console.log('acabou');
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove'; // se n for o desclique entao é o tirar o dedo do celular
        this.wrapper.removeEventListener(movetype, this.onMove); // FIXME: tira o evento de mousemove ao desclicar, ou do evento do celular
        this.dist.finalPosition = this.dist.movePosition; // FIXME: para ter uma referencia da onde está o meu mouse, para tomar vez q eu clicar nao 
        // começar meu slide do inicio // vai receber o valor quando desclico com o mouse
        this.transition(true); // FIXME: quando eu terminar o meu movimento entao ai sim da true no transition
        // FIXME: o transition precisa ser antes do changeSlideOnEnd se nao só estaria fazendo a mudança quando o slide já
        // tinha ocorrido
        this.changeSlideOnEnd();
    }

    changeSlideOnEnd() {
        // FIXME: quando eu coloco pra frente o movement é positivo, se coloco pra trás ele é negativo, entao
        // n quero esperar o usuario colocar certinho onde quer a imagem, e sim ao arrastar um pouco e soltar a imagem
        // já vá para o local, entao fiz essa verificação
        if(this.dist.movement > 120 && this.index.next !== undefined) {
            this.activeNextSlide();
        } else if(this.dist.movement < -120 && this.index.prev !== undefined) {
            this.activePrevSlide();
        } else { // problema de quando chegar na no primeiro slide, ele n vai ter mais slide antes, entao vai dar erro
            // entao se n for o if nem o else if entao 
            this.changeSlide(this.index.active); // se n for nenhuma das opçoes vai pro meu slide atual
        }
        console.log(this.dist.movement)
    }
    addSlideEvents() {
        // para o this, n ser uma referencia a 'this.wrapper' e sim ao meu class Slide preciso fazer a bind
        this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é quando eu clico
        this.wrapper.addEventListener('touchstart', this.onStart); // para mexer no mobile, pq é evento de toque
        this.wrapper.addEventListener('mouseup', this.onEnd); // acontece quando o mouse é desclicado
        this.wrapper.addEventListener('touchend', this.onEnd); // quando o usuario tira o dedo do mobile o evento é disparado
    }

    slidePosition(slide) {
        // this.wrapper.offsetWidth vai pegar a largura total do this.wrapper, porém só o que aparece dele na tela, ou seja
        // seria o mesmo que pegar a largura da tela praticamente, pelo o que entendi, depois - slide.offsetWidth que é a largura de cada imagem 
        // dividido por 2, no caso eu quero fazer isso para poder colocar a imagem no centro
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin); // no caso o valor antes da imagem - a margin ou seja vai andar somente o distancia
        // que foi para a margin, e esse valor precisa ser negativo por isso coloquei -(), só o primeiro valor vai ser positivo pelo que entendi
    }

    slidesConfig() {
        // FIXME: aqui [...this.slide.children] estou pegando os filhos do slide e desestruturando ele, no caso era um HTMLCollection,
        // mas ao desestruturar vira uma array, entao posso usar o .map
        this.slideArray = [...this.slide.children].map((element) => {
            // element.offsetLeft; // se me lembro offsetLeft é a distancia da esquerda a até a esquerda do meu elemento
            const position = this.slidePosition(element);
            // pelo o que entendi retornar para o this.slideArray
            return { position, element }
        }); 
        console.log(this.slideArray)
    }

    slidesIndexNav(index) { // aqui pelo o que entendi vai ser para o usuario q estiver no script.js usar no slide.changeSlide(); algum numero
        // para poder ir para tal slide por exemplo slide.changeSlide(3);
        const last = this.slideArray.length - 1; // para pegar o ultimo item da array
        console.log(last);
        this.index = {
            prev: index ? index -1 : undefined, // FIXME: se o index for 0, entao vai entrar em false, e vou receber undefined pq n existe numero anterior
            active: index, // slide atual
            next: index === last ? undefined : index + 1, // se o slide atual for igual o ultimo, entao vai dar undefined pq n existe
            // mais proximo, se nao vai somar com mais um pq é o proximo slide 
        }
    }

    changeSlide(index) {
        const activeSlide = this.slideArray[index]
        this.moveSlide(activeSlide.position); // FIXME: no caso o this.slideArray ali no slidesConfig recebe
        // um novo array, eu estou acessando esse novo array, no caso ao colocar o index eu escolho qual array, e pego a position
        // de la, e vai para o this.moveSlide
        this.slidesIndexNav(index);
        console.log(this.index)
        this.dist.finalPosition = activeSlide.position; // preciso atualizar a distancia
        this.changeActiveClass();
    }

    changeActiveClass() {
        this.slideArray.forEach(item => item.element.classList.remove(this.activeClass)); // remove os ativos, para deixar somente um ativo
        // pq se nao ia add ativo e nao ia remover os anteriores
        this.slideArray[this.index.active].element.classList.add(this.activeClass); // add ativo ao passar de slid
    }

    activePrevSlide() {
        if(this.index.prev !== undefined) this.changeSlide(this.index.prev);
    }

    activeNextSlide() {
        if(this.index.next !== undefined) this.changeSlide(this.index.next);
    }

    onResize() {
        // FIXME: estava dando problema ainda, estava meio zoado o posicionamento, entao fiz o setTimeout para
        // esperar 1seg e depois atualizar as informações
        setTimeout(() => {
        // toda vez que eu dou resize na tela zua tudo, pq as posições que eu dei na minha array mudam todas, entao preciso
        // reatualizar as configurações quando dar o resize
        this.slidesConfig();
        this.changeSlide(this.index.active);
        }, 1000);  
    }

    addResizeEvent() {
        window.addEventListener('resize', this.onResize);
    }

    bindEvents() { // vou colocar aqui todos binds q eu precisar
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        // FIXME: enquanto eu estiver movimentando o resize da tela vai ativando diversos eventos de resize, entao vou usar
        // o debounce, o cara do curso falou q sempre uso o debounce no bind geralmente
        this.onResize = debounce(this.onResize.bind(this), 200);
    }

    init() {
        this.bindEvents();
        this.transition(true); // FIXME: ao iniciar o transition precisa estar em true pq se nao nao funciona parece
        this.addSlideEvents();
        this.slidesConfig();
        this.addResizeEvent();
        return this;
    }
}