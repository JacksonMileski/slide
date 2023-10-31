export default function debounce(callback, delay) {
  let timer;
  return (...args) => { // FIXME: pelo o que entendi aqui recebe os argumentos e coloca numa array, podem ser varios pelo o que entendi
    if (timer) clearTimeout(timer);
    console.log(timer);
    timer = setTimeout(() => {
      callback(...args); // agora posso usar esses argumentos
      timer = null;
    }, delay);
  };
}
