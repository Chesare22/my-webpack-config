// Styles
import 'src/assets/sass/common.scss';
import 'src/assets/sass/index.scss';
import 'src/assets/sass/photo-gallery.scss';

// Images
import 'src/assets/images/handlebars_logo.png';
import 'src/assets/images/webpack_logo.png';
import 'src/assets/images/sass_logo.png';
import 'src/assets/images/easter_egg.png';

const timeout = 1500;

const listenKeyOnce = key => () => new Promise((resolve, reject) => {
  let elementRemoved = false;

  const callback = event => {
    if(event.key.toLowerCase() === key.toLowerCase()){
      document.removeEventListener('keydown', callback);
      elementRemoved = true;
      resolve();
    }
  };
  document.addEventListener('keydown', callback);
  
  setTimeout(() => {
    if(!elementRemoved){
      document.removeEventListener('keydown', callback);
      reject();
    }
  }, timeout);
});

const initialCallback = ({ key }) => {
  if(key === 'ArrowUp'){
    document.removeEventListener('keydown', initialCallback);
    listenKeyOnce('ArrowUp')()
      .then(listenKeyOnce('ArrowDown'))
      .then(listenKeyOnce('ArrowDown'))
      .then(listenKeyOnce('ArrowLeft'))
      .then(listenKeyOnce('ArrowRight'))
      .then(listenKeyOnce('ArrowLeft'))
      .then(listenKeyOnce('ArrowRight'))
      .then(listenKeyOnce('B'))
      .then(listenKeyOnce('A'))
      .then(() => {
        const easterEggElement = document.getElementById('easter-egg');
        easterEggElement.style.visibility = 'visible';
      })
      .catch(() => {
        console.log('Oh no :(');
        document.addEventListener('keydown', initialCallback); 
      });
  }
};

document.addEventListener('keydown', initialCallback);