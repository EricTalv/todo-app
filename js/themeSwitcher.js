

/* theme switching */
let styleSheet = document.getElementById('stylesheet');

let switcher = document.querySelector('#themes');

let themes = [
  { value: 'grey', url: './css/themes/grey.css'},
  { value: 'bios', url: './css/themes/bios.css'},
  { value: 'console', url: './css/themes/console.css'},

]

document.addEventListener('DOMContentLoaded', checkForTheme);

// see what theme should be loaded
function checkForTheme() {
  let localTheme;

  if (localStorage.getItem('localTheme') === null) {
     localTheme = themes[0].url;
      
  } else {
    localTheme = JSON.parse(localStorage.getItem('localTheme'));
  }

  let themeValue = themes.find(item => item.url === localTheme);

  switcher.value = themeValue.value;

  styleSheet.setAttribute('href', localTheme);
  localStorage.setItem('localTheme', JSON.stringify(localTheme));

}

function changeTheme(event) {


  switch(event.target.value) {
    case 'grey':
      styleSheet.setAttribute('href', './css/themes/grey.css');
      localStorage.setItem('localTheme', JSON.stringify('./css/themes/grey.css'))

      break;
    
    case 'bios':
      styleSheet.setAttribute('href', './css/themes/bios.css');

      localStorage.setItem('localTheme', JSON.stringify('./css/themes/bios.css'))
      

      break;

    case 'console':
      styleSheet.setAttribute('href', './css/themes/console.css');
      localStorage.setItem('localTheme', JSON.stringify('./css/themes/console.css'))

      
      
      break;
    
  }

}



