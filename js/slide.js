export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);

        
    }

    onStart(event) {
        console.log(this);
        event.preventDefault(); // FIXME: por padrao quando eu clico com o mouse e arasto o mouse ele tenta puxar a imagem,
        // entao eu vou prevenir isso pq vai bugar o meu slide
        this.wrapper.addEventListener('mousemove', this.onMove); // esse evento é quando eu passar o mouse por cima ele dispara enquanto
        // eu estiver mexendo o mouse FIXME: mas eu fiz o seguinte, esse evento só vai disparar quando eu clicar no this.wrapper, ai sim
        // vai disparar esse evento, e ali no 'onEnd' vai tirar o evento de mousemove ao desclicar
    }

    onMove(event) {
        console.log('moveu');
    }

    onEnd(event) {
        console.log('acabou');
        this.wrapper.removeEventListener('mousemove', this.onMove); // FIXME: tira o evento de mousemove ao desclicar
    }

    addSlideEvents() {
        // para o this, n ser uma referencia a 'this.wrapper' e sim ao meu class Slide preciso fazer a bind
        this.wrapper.addEventListener('mousedown', this.onStart); // mousedown é quando eu clico
        this.wrapper.addEventListener('mouseup', this.onEnd); // acontece quando o mouse é desclicado
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