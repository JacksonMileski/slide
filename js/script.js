import { SlideNav } from './slide.js'; // FIXME: eu poderia exportar só o SlideNav se eu quiser, ou os 
// dois, fica assim import {Slide, SlideNav} from './slide.js';

// agora q estou estendendo preciso puxar o SlideNav já q estou estendendo,
// antes estava assim const slide = new Slide('.slide', '.slide-wrapper');
// creio q preciso fazer new SlideNav() pq ele já contem os métodos do construtor do Slide, entao
// faz mais sentido usar o new no SlideNav()
const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');
// slide.changeSlide(3);
// slide.activePrevSlide();
