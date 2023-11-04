import SlideNav  from './slide.js'; // FIXME: eu poderia exportar só o SlideNav se eu quiser, ou os 
// dois, fica assim import {Slide, SlideNav} from './slide.js';
// TODO: como eu usei o default no export default class SlideNav extends Slide {} entao n preciso colocar
// assim aqui import {SlideNav}  from './slide.js';  pq eu já tenho como padrao la, caso n tivesse o default
// entao ai sim eu teria que user assim import {SlideNav}  from './slide.js'; no caso com as chaves no SlideNav

// agora q estou estendendo preciso puxar o SlideNav já q estou estendendo,
// antes estava assim const slide = new Slide('.slide', '.slide-wrapper');
// creio q preciso fazer new SlideNav() pq ele já contem os métodos do construtor do Slide, entao
// faz mais sentido usar o new no SlideNav()
const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');
// slide.changeSlide(3);
// slide.activePrevSlide();

slide.addControl('.custom-controls'); // TODO: IMPORTANTE esse .custom-controls é do meu index.html, q no caso ali no slide.js ele pergunta
// ou inseri algo no argumento no addControl, ou da o padrao que criei la, caso eu faça FIXME: slide.addControl(); entao  daria as fotos ali
// em cima, mas n funcionaria ao clicar nelas, e sim funcionaria umas bolinhas que daria pra trocar de imagem, 
// só eu fazer assim slide.addControl(); que eu vou entender, nesse jeito que coloquei slide.addControl('.custom-controls');  vai sumir as bolinhas
// de baixo e funcionar as bolinhas dos animais ali em cima