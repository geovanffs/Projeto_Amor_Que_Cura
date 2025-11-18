/* ============================================================
   MÓDULO 1: TEMPLATES (O HTML das páginas fica aqui)
   ============================================================ */
const templates = {
  home: `
    <div class="grid-12 fade-in">
      <div class="col-6">
        <img src="images/tela-inicio.jpg" alt="Família" style="height: 100%; object-fit: cover;">
      </div>
      <div class="col-6">
        <h1 style="color: var(--cor-primary); margin-bottom: 20px;">Bem-vindo à SPA Amor que Cura</h1>
        <p>Transformando a experiência do usuário com Single Page Application.</p>
        <br>
        <div class="grid-12">
            <div class="col-6"><h3 style="color: var(--cor-secondary);">SPA</h3><p>Navegação Rápida</p></div>
            <div class="col-6"><h3 style="color: var(--cor-secondary);">DOM</h3><p>Manipulação Total</p></div>
        </div>
      </div>
    </div>
  `,
  
  projetos: `
    <div class="fade-in">
      <h2 style="margin-bottom: 24px;">Nossas Iniciativas</h2>
      <div class="grid-12">
        <div class="col-4">
          <article class="card">
            <img src="images/tela-aulas.png" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <span class="badge bg-esporte">Esporte</span>
              <h3>Aulas Gratuitas</h3>
              <p>Jiu-jitsu e Ballet para todos.</p>
            </div>
          </article>
        </div>
        <div class="col-4">
           <article class="card">
            <img src="images/tela-acoes-realizadas.png" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <span class="badge bg-saude">Saúde</span>
              <h3>Ações Sociais</h3>
              <p>Atendimentos médicos mensais.</p>
            </div>
          </article>
        </div>
         <div class="col-4">
           <article class="card">
            <div style="height: 200px; background: var(--cor-secondary); display:flex; align-items:center; justify-content:center; color:white; font-size:3rem;">❤</div>
            <div class="card-body">
              <span class="badge">Voluntariado</span>
              <h3>Faça Parte</h3>
              <button class="btn" onclick="app.router.navigate('cadastro')">Cadastrar</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,

  cadastro: `
    <div class="grid-12 fade-in">
      <div class="col-6" style="grid-column: span 8; grid-start: 3; margin: 0 auto;">
        <h2>Cadastro Interativo</h2>
        <p>Seus dados serão validados e salvos no LocalStorage.</p>
        
        <form id="spaForm" novalidate>
          <div class="form-group">
            <label>Nome Completo:</label>
            <input type="text" id="nome" placeholder="Mínimo 3 caracteres">
            <span class="error-message" id="error-nome"></span>
          </div>

          <div class="form-group">
            <label>E-mail:</label>
            <input type="email" id="email" placeholder="ex: nome@email.com">
            <span class="error-message" id="error-email"></span>
          </div>

          <div class="grid-12" style="grid-template-columns: 1fr 1fr; gap: 10px; display: grid;">
             <div>
               <label>CPF:</label>
               <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="14">
               <span class="error-message" id="error-cpf"></span>
             </div>
             <div>
               <label>Telefone:</label>
               <input type="tel" id="telefone" placeholder="(00) 00000-0000" maxlength="15">
             </div>
          </div>

          <button type="submit" class="btn" style="margin-top: 20px;">SALVAR DADOS</button>
        </form>
      </div>
    </div>
  `
};

/* ============================================================
   MÓDULO 2: LÓGICA PRINCIPAL (APP)
   ============================================================ */
const app = {
  // Roteador: Gerencia qual tela mostrar
  router: {
    init: () => {
      // Carrega a home por padrão
      app.router.navigate('home');
      
      // Configura menu mobile
      const btn = document.querySelector('.hamburger');
      const menu = document.querySelector('.nav-menu');
      if(btn) btn.addEventListener('click', () => menu.classList.toggle('active'));
    },

    navigate: (route) => {
      const container = document.getElementById('app-container');
      
      // 1. Injeta o HTML do template
      if (templates[route]) {
        container.innerHTML = templates[route];
      } else {
        container.innerHTML = "<h1>404 - Página não encontrada</h1>";
      }

      // 2. Se for a tela de cadastro, ativa as máscaras e validações
      if (route === 'cadastro') {
        app.validation.init();
        app.utils.loadSavedData(); // Carrega dados do LocalStorage se existirem
      }

      // 3. Fecha menu mobile se estiver aberto
      document.querySelector('.nav-menu').classList.remove('active');
    }
  },

  // Validação e Formulários
  validation: {
    init: () => {
      const form = document.getElementById('spaForm');
      const inputs = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        cpf: document.getElementById('cpf'),
        tel: document.getElementById('telefone')
      };

      // Máscaras em tempo real
      inputs.cpf.addEventListener('input', (e) => e.target.value = app.utils.maskCPF(e.target.value));
      inputs.tel.addEventListener('input', (e) => e.target.value = app.utils.maskPhone(e.target.value));

      // Evento de Submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Limpa erros anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('input').forEach(el => el.classList.remove('input-error'));

        // Regra 1: Nome
        if (inputs.nome.value.length < 3) {
          app.validation.showError('nome', 'O nome deve ter pelo menos 3 letras.');
          isValid = false;
        }

        // Regra 2: Email
        if (!inputs.email.value.includes('@') || !inputs.email.value.includes('.')) {
          app.validation.showError('email', 'Digite um e-mail válido.');
          isValid = false;
        }

        // Regra 3: CPF
        if (inputs.cpf.value.length < 14) {
          app.validation.showError('cpf', 'CPF incompleto.');
          isValid = false;
        }

        // Se tudo ok, salva e avisa
        if (isValid) {
          app.utils.saveData({
            nome: inputs.nome.value,
            email: inputs.email.value
          });
          alert('✅ Dados validados e salvos no LocalStorage!');
        }
      });
    },

    showError: (fieldId, message) => {
      const input = document.getElementById(fieldId);
      const span = document.getElementById('error-' + fieldId);
      if(input) input.classList.add('input-error');
      if(span) span.textContent = message;
    }
  },

  // Utilitários (Máscaras e LocalStorage)
  utils: {
    maskCPF: (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
    
    maskPhone: (v) => {
       v = v.replace(/\D/g, '');
       if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
       return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    },

    saveData: (data) => {
      localStorage.setItem('user_data', JSON.stringify(data));
    },

    loadSavedData: () => {
      const data = JSON.parse(localStorage.getItem('user_data'));
      if (data) {
        if(document.getElementById('nome')) document.getElementById('nome').value = data.nome;
        if(document.getElementById('email')) document.getElementById('email').value = data.email;
      }
    }
  }
};

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', app.router.init);
