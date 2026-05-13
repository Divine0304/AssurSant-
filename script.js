// ═══════════════════════════════════════════
// WEBHOOK URL — Make.com
// ═══════════════════════════════════════════
const WEBHOOK_URL = 'https://hook.eu1.make.com/q4rs6s6z5iq5ly2x2frryjoq7j6039o7';

// ═══════════════════════════════════════════
// HEADER SCROLL
// ═══════════════════════════════════════════
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ═══════════════════════════════════════════
// MOBILE BURGER MENU
// ═══════════════════════════════════════════
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const top = document.querySelector(href).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════
// REVEAL ON SCROLL
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════
// PERSONAS TABS
// ═══════════════════════════════════════════
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.persona-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
  });
});

// ═══════════════════════════════════════════
// CHECKLIST DATA
// ═══════════════════════════════════════════
const checklistData = [
  { id: 1,  title: 'Prise de rendez-vous chez le médecin généraliste', desc: 'Planifiez votre consultation annuelle ou selon vos besoins' },
  { id: 2,  title: 'Vérification des ordonnances expirées',             desc: "Vérifiez la date d'expiration de vos ordonnances" },
  { id: 3,  title: 'Mise à jour des coordonnées de contact',            desc: 'Médecin, assurance, pharmacie, etc.' },
  { id: 4,  title: 'Vérification des remboursements en attente',        desc: 'Sécurité Sociale, mutuelle et autres organismes' },
  { id: 5,  title: 'Bilan des dépenses de santé du mois',              desc: 'Pharmacie, consultations, examens médicaux, etc.' },
  { id: 6,  title: 'Prise régulière des médicaments prescrits',        desc: 'Respectez votre traitement selon les prescriptions' },
  { id: 7,  title: 'Vérification de la couverture complémentaire',     desc: 'Mutuelle, garanties et couvertures additionnelles' },
  { id: 8,  title: 'Mise à jour du carnet de santé ou DMP',            desc: 'Dossier Médical Partagé avec vos informations récentes' },
  { id: 9,  title: 'Planification des examens de santé recommandés',   desc: 'Bilan sanguin, dépistages, vaccins, etc.' },
  { id: 10, title: 'Vérification des stocks de médicaments',           desc: 'Médicaments et matériel médical à domicile' }
];

const checkedSet = new Set();

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  container.innerHTML = '';

  checklistData.forEach((item, i) => {
    const isChecked = checkedSet.has(item.id);
    const el = document.createElement('div');
    el.className = `check-item${isChecked ? ' checked' : ''}`;
    el.style.transitionDelay = `${i * 40}ms`;

    el.innerHTML = `
      <div class="check-box">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="check-body">
        <p class="check-title">${item.title}</p>
        <p class="check-desc">${item.desc}</p>
      </div>
      <span class="check-num">${String(item.id).padStart(2, '0')}</span>
    `;

    el.addEventListener('click', () => {
      checkedSet.has(item.id) ? checkedSet.delete(item.id) : checkedSet.add(item.id);
      renderChecklist();
    });

    container.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  });

  updateProgress();
}

function updateProgress() {
  const count = checkedSet.size;
  const total = checklistData.length;
  const pct   = Math.round((count / total) * 100);
  document.getElementById('progress-text').textContent    = `${count} sur ${total} tâches complétées`;
  document.getElementById('progress-percent').textContent = `${pct}%`;
  document.getElementById('progress-bar').style.width     = `${pct}%`;
}

document.getElementById('reset-btn').addEventListener('click', () => {
  checkedSet.clear();
  renderChecklist();
});

renderChecklist();

// ═══════════════════════════════════════════
// MODAL — Ouvrir / Fermer
// ═══════════════════════════════════════════
const emailModal = document.getElementById('email-modal');

function openModal() {
  emailModal.classList.add('open');
  emailModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-form-container').style.display = 'block';
  document.getElementById('modal-success').style.display        = 'none';
  document.getElementById('modal-error').style.display          = 'none';
  document.getElementById('email-form').reset();
  setTimeout(() => document.getElementById('modal-prenom').focus(), 100);
}

function closeModal() {
  emailModal.classList.remove('open');
  emailModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('download-btn').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
emailModal.addEventListener('click', (e) => { if (e.target === emailModal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && emailModal.classList.contains('open')) closeModal();
});

// ═══════════════════════════════════════════
// ENVOI CHECKLIST → WEBHOOK MAKE
// ═══════════════════════════════════════════
document.getElementById('email-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formContainer = document.getElementById('modal-form-container');
  const successEl     = document.getElementById('modal-success');
  const errorEl       = document.getElementById('modal-error');
  const submitBtn     = document.getElementById('modal-submit-btn');
  const btnText       = document.getElementById('modal-btn-text');
  const btnLoading    = document.getElementById('modal-btn-loading');

  const prenom = document.getElementById('modal-prenom').value.trim();
  const nom    = document.getElementById('modal-nom').value.trim();
  const email  = document.getElementById('modal-email').value.trim();

  if (!prenom || !nom || !email) return;

  // État chargement
  errorEl.style.display    = 'none';
  btnText.style.display    = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled       = true;

  // Payload complet envoyé à Make
  const payload = {
    prenom,
    nom,
    email,
    date: new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }),
    stats: {
      total:     checklistData.length,
      completed: checkedSet.size,
      pending:   checklistData.length - checkedSet.size,
      percent:   Math.round((checkedSet.size / checklistData.length) * 100)
    },
    tasks: checklistData.map(item => ({
      id:        item.id,
      title:     item.title,
      desc:      item.desc,
      completed: checkedSet.has(item.id)
    }))
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    if (response.ok) {
      formContainer.style.display = 'none';
      successEl.style.display     = 'block';
      setTimeout(closeModal, 4000);
    } else {
      throw new Error(`Erreur serveur : ${response.status}`);
    }
  } catch (err) {
    console.error('Erreur webhook :', err);
    errorEl.style.display = 'block';
  } finally {
    btnText.style.display    = 'flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled       = false;
  }
});

// ═══════════════════════════════════════════
// FORMULAIRE DE CONTACT (simulation locale)
// ═══════════════════════════════════════════
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('form-success');
  submitBtn.disabled = true;
  successEl.style.display = 'block';
  this.reset();
  setTimeout(() => {
    successEl.style.display = 'none';
    submitBtn.disabled = false;
  }, 5000);
});

// ═══════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════
const faqData = [
  {
    q: 'Comment créer mon compte AssurSanté Connect ?',
    a: 'La création de compte est simple et rapide. Cliquez sur "Mon espace", renseignez votre numéro de sécurité sociale, votre email et créez un mot de passe sécurisé. Vous recevrez un code de validation par SMS.'
  },
  {
    q: 'Mes données personnelles sont-elles sécurisées ?',
    a: 'Absolument. AssurSanté Connect utilise un chiffrement de niveau bancaire (AES-256). Nous sommes conformes au RGPD et vos informations ne sont jamais partagées sans votre consentement.'
  },
  {
    q: 'Puis-je gérer le compte de mes enfants ou de mes proches ?',
    a: 'Oui, avec la fonction "Gestion familiale", vous pouvez ajouter vos ayants droit et gérer leurs démarches depuis votre compte principal.'
  },
  {
    q: 'Comment fonctionne la checklist santé ?',
    a: 'Cochez les tâches au fur et à mesure. Cliquez sur "Recevoir ma checklist par email" pour recevoir un récapitulatif personnalisé dans votre boîte mail.'
  },
  {
    q: 'Le service est-il vraiment gratuit ?',
    a: 'Oui, AssurSanté Connect est un service public entièrement gratuit. Aucun frais caché, aucun abonnement.'
  }
];

function renderFAQ() {
  const container = document.getElementById('faq-container');
  faqData.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'faq-item reveal';
    el.innerHTML = `
      <button class="faq-trigger">
        <span>${item.q}</span>
        <div class="faq-chevron">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
      <div class="faq-body"><p>${item.a}</p></div>
    `;
    el.querySelector('.faq-trigger').addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(f => f.classList.remove('open'));
      if (!isOpen) el.classList.add('open');
    });
    container.appendChild(el);
    revealObserver.observe(el);
  });
}

renderFAQ();

// ═══════════════════════════════════════════
// NAV ACTIVE ON SCROLL
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => { l.style.color = ''; l.style.background = ''; });
      const active = document.querySelector(`.desktop-nav a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color      = 'var(--blue-700)';
        active.style.background = 'var(--blue-50)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));