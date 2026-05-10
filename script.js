// ═══════════════════════════════════════════
// WEBHOOK URL — Make
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
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════
// REVEAL ON SCROLL (IntersectionObserver)
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
const tabBtns = document.querySelectorAll('.tab-btn');
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
// CHECKLIST
// ═══════════════════════════════════════════
const checklistData = [
  { id: 1, title: 'Prise de rendez-vous chez le médecin généraliste', desc: 'Planifiez votre consultation annuelle ou selon vos besoins' },
  { id: 2, title: 'Vérification des ordonnances expirées', desc: 'Vérifiez la date d\'expiration de vos ordonnances' },
  { id: 3, title: 'Mise à jour des coordonnées de contact', desc: 'Médecin, assurance, pharmacie, etc.' },
  { id: 4, title: 'Vérification des remboursements en attente', desc: 'Sécurité Sociale, mutuelle et autres organismes' },
  { id: 5, title: 'Bilan des dépenses de santé du mois', desc: 'Pharmacie, consultations, examens médicaux, etc.' },
  { id: 6, title: 'Prise régulière des médicaments prescrits', desc: 'Respectez votre traitement selon les prescriptions' },
  { id: 7, title: 'Vérification de la couverture complémentaire', desc: 'Mutuelle, garanties et couvertures additionnelles' },
  { id: 8, title: 'Mise à jour du carnet de santé ou DMP', desc: 'Dossier Médical Partagé avec vos informations récentes' },
  { id: 9, title: 'Planification des examens de santé recommandés', desc: 'Bilan sanguin, dépistages, vaccins, etc.' },
  { id: 10, title: 'Vérification des stocks de médicaments', desc: 'Médicaments et matériel médical à domicile' }
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
      if (checkedSet.has(item.id)) {
        checkedSet.delete(item.id);
      } else {
        checkedSet.add(item.id);
      }
      renderChecklist();
    });

    container.appendChild(el);

    // trigger reveal with slight delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('visible'));
    });
  });

  updateProgress();
}

function updateProgress() {
  const count = checkedSet.size;
  const total = checklistData.length;
  const pct = Math.round((count / total) * 100);
  document.getElementById('progress-text').textContent = `${count} sur ${total} tâches complétées`;
  document.getElementById('progress-percent').textContent = `${pct}%`;
  document.getElementById('progress-bar').style.width = `${pct}%`;
}

// Download checklist
document.getElementById('download-btn').addEventListener('click', () => {
  const lines = [
    'CHECKLIST SANTÉ MENSUELLE — AssurSanté Connect',
    `Date : ${new Date().toLocaleDateString('fr-FR')}`,
    `Progression : ${checkedSet.size}/${checklistData.length} (${Math.round((checkedSet.size/checklistData.length)*100)}%)`,
    '',
    'TÂCHES :',
    ...checklistData.map(item => `${checkedSet.has(item.id) ? '✓' : '☐'}  ${item.id}. ${item.title}`)
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `checklist-sante-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

// Reset
document.getElementById('reset-btn').addEventListener('click', () => {
  checkedSet.clear();
  renderChecklist();
});

renderChecklist();

// ═══════════════════════════════════════════
// CONTACT FORM — Make Webhook
// ═══════════════════════════════════════════
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const btnText    = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const submitBtn  = document.getElementById('submitBtn');
  const successEl  = document.getElementById('form-success');
  const errorEl    = document.getElementById('form-error');

  // reset
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  // loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;

  const payload = { nom, email, message };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      successEl.style.display = 'block';
      this.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    errorEl.style.display = 'block';
  } finally {
    btnText.style.display = 'flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// ═══════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════
const faqData = [
  {
    q: 'Comment créer mon compte AssurSanté Connect ?',
    a: 'La création de compte est simple et rapide. Cliquez sur "Mon espace", renseignez votre numéro de sécurité sociale, votre email et créez un mot de passe sécurisé. Vous recevrez un code de validation par SMS pour confirmer votre identité.'
  },
  {
    q: 'Mes données personnelles sont-elles sécurisées ?',
    a: 'Absolument. AssurSanté Connect utilise un chiffrement de niveau bancaire (AES-256) pour protéger vos données. Nous sommes conformes au RGPD et vos informations ne sont jamais partagées avec des tiers sans votre consentement explicite.'
  },
  {
    q: 'Puis-je gérer le compte de mes enfants ou de mes proches ?',
    a: 'Oui, avec la fonction "Gestion familiale", vous pouvez ajouter vos ayants droit (enfants, conjoint, personnes à charge) et gérer leurs démarches depuis votre compte principal, tout en respectant les droits de chacun.'
  },
  {
    q: 'Comment fonctionne l\'assistant virtuel ?',
    a: 'Notre assistant virtuel utilise l\'intelligence artificielle pour comprendre vos questions et vous orienter vers la bonne information ou démarche. Il est disponible 24h/24, 7j/7 et peut vous accompagner pas à pas dans vos démarches.'
  },
  {
    q: 'Quels documents puis-je télécharger ?',
    a: 'Vous pouvez télécharger toutes vos attestations : attestation de droits, carte mutuelle, relevés de remboursements, attestations fiscales, et bien plus encore. Tous les documents sont disponibles au format PDF signé électroniquement.'
  },
  {
    q: 'Le service est-il vraiment gratuit ?',
    a: 'Oui, AssurSanté Connect est un service public entièrement gratuit pour tous les assurés sociaux. Il n\'y a aucun frais caché, aucun abonnement, et toutes les fonctionnalités sont accessibles sans limitation.'
  }
];

function renderFAQ() {
  const container = document.getElementById('faq-container');
  container.innerHTML = '';

  faqData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item reveal';
    el.style.transitionDelay = `${i * 60}ms`;

    el.innerHTML = `
      <button class="faq-trigger">
        <span>${item.q}</span>
        <div class="faq-chevron">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
      <div class="faq-body">
        <p>${item.a}</p>
      </div>
    `;

    el.querySelector('.faq-trigger').addEventListener('click', () => {
      const isOpen = el.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(f => f.classList.remove('open'));
      if (!isOpen) el.classList.add('open');
    });

    container.appendChild(el);
    revealObserver.observe(el);
  });
}

renderFAQ();

// ═══════════════════════════════════════════
// ACTIVE NAV LINK ON SCROLL
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
      });
      const activeLink = document.querySelector(`.desktop-nav a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--blue-700)';
        activeLink.style.background = 'var(--blue-50)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));