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
    }

    addSlideEvents() {
        // para o this, n ser uma referencia a 'this.wrapper' e sim ao meu class Slide preciso fazer a bind
        this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é quando eu clico
        this.wrapper.addEventListener('touchstart', this.onStart); // para mexer no mobile, pq é evento de toque
        this.wrapper.addEventListener('mouseup', this.onEnd); // acontece quando o mouse é desclicado
        this.wrapper.addEventListener('touchend', this.onEnd); // quando o usuario tira o dedo do mobile o evento é disparado
    }

    bindEvents() { // vou colocar aqui todos binds q eu precisar
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}