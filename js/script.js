// js/script.js
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(value) {
  value = value.replace(/\D/g, '');
  if (value.length <= 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }
  return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
}

function maskCEP(value) {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0,9);
}

// Função que anexa listeners com checagens de existência
function setupFormAndMasks() {
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('formApadrinhamento');

  if (cpf) {
    cpf.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskCPF(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (tel) {
    tel.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskPhone(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (cep) {
    cep.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskCEP(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      // validação nativa HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }

      e.preventDefault(); // impedir envio real (até você configurar backend)
      alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
      form.reset();
    });
  }
}

// Garantir que o DOM esteja pronto antes de procurar elementos
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupFormAndMasks);
} else {
  setupFormAndMasks();
}
