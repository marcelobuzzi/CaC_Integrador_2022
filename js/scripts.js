const borrar           = document.querySelector('.borrar');
const resumen          = document.querySelector('.resumen');
const cantidad         = document.querySelector('#cantidad');
const categoria        = document.querySelector('#categoria');
const cantidad_error   = document.querySelector('.cantidad-error');
const inputs_text      = document.querySelectorAll('input[type = "text"]');
const input_text_error = document.querySelectorAll('.inputs-error');
const email            = document.querySelector('.email');
const email_error      = document.querySelector('.email-error');
const ticket           = 200;
const regEx            = {
  alpha  : /^[a-zA-Z áéíóúñÑâêîôû]*$/,
  numeric: /^[0-9]+$/,
  email  : /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
};

function calcular() {
  let descuento      = ticket * 0;
  let cantidad_value = cantidad.value;

  let required = document.querySelectorAll('input[required]');
  for(item of required) {
    if(item.type == 'email') {
      if(!regEx.email.test(email.value) || email.value == '' ) {
        item.focus();
        break;
      }
    }

    if(item.value == '') {
      item.focus();
      break;
    }
  }

  if(!regEx.numeric.test(cantidad.value) || cantidad.value <= 0 ) {
    cantidad_value = 1;
    cantidad.value = 1
    cantidad.classList.remove('border-danger');
    cantidad_error.classList.add('d-none');
  }

  switch(categoria.value) {
    case '1':
      descuento = ticket * 0.8;
      break;
    case '2':
      descuento = ticket * 0.5;
      break;
    case '3':
      descuento = ticket * 0.15;
      break;
  }

  return (ticket - descuento) * cantidad_value;
}

cantidad.addEventListener('blur', function() {
  if(!regEx.numeric.test(cantidad.value) || cantidad.value <= 0 ) {
    cantidad.classList.add('border-danger');
    cantidad_error.classList.remove('d-none');
  }
});

cantidad.addEventListener('focus', function() {
  cantidad.classList.remove('border-danger');
  cantidad_error.classList.add('d-none');
});

email.addEventListener('blur', function() {
  if(!regEx.email.test(email.value) || email.value == '' ) {
    email.classList.add('border-danger');
    email_error.classList.remove('d-none');
  }
});

email.addEventListener('focus', function() {
  email.classList.remove('border-danger');
  email_error.classList.add('d-none');
});

borrar.addEventListener('click', function() {
  document.querySelector('.form').reset();
  document.querySelector('.total').innerHTML = '0.00';
});

resumen.addEventListener('click', function() {
  let total = calcular();
  document.querySelector('.total').innerHTML = total.toFixed(2);
});

inputs_text.forEach((item, i) => {
  item.addEventListener('blur', function() {
    if(!regEx.alpha.test(item.value) || item.value == '') {
      item.classList.add('border-danger');
      input_text_error[i].classList.remove('d-none');
    }
  })
});

inputs_text.forEach((item, i) => {
  item.addEventListener('focus', function() {
    item.classList.remove('border-danger');
    input_text_error[i].classList.add('d-none');
  })
});
