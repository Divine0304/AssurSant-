// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (lastScrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// PERSONAS TABS
// ============================================
const personaTabs = document.querySelectorAll('.persona-tab');
const personaContents = document.querySelectorAll('.persona-content');

// Set initial active tab
personaTabs[0].setAttribute('data-active', 'true');
const initialPersona = personaTabs[0].getAttribute('data-persona');
document.querySelector(`.persona-content[data-persona="${initialPersona}"]`).classList.remove('hidden');

personaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const persona = tab.getAttribute('data-persona');

        // Remove active state from all tabs
        personaTabs.forEach(t => t.removeAttribute('data-active'));
        personaContents.forEach(c => c.classList.add('hidden'));

        // Add active state to clicked tab
        tab.setAttribute('data-active', 'true');
        document.querySelector(`.persona-content[data-persona="${persona}"]`).classList.remove('hidden');
    });
});

// ============================================
// CHECKLIST FUNCTIONALITY
// ============================================
const checklistItems = [
    { id: 1, title: "Prise de rendez-vous chez le médecin généraliste", description: "Planifiez votre consultation annuelle ou selon vos besoins" },
    { id: 2, title: "Vérification des ordonnances expirées", description: "Vérifiez la date d'expiration de vos ordonnances" },
    { id: 3, title: "Mise à jour des coordonnées de contact", description: "Médecin, assurance, pharmacie, etc." },
    { id: 4, title: "Vérification des remboursements en attente", description: "Sécurité Sociale, mutuelle et autres organismes" },
    { id: 5, title: "Bilan des dépenses de santé du mois", description: "Pharmacie, consultations, examens médicaux, etc." },
    { id: 6, title: "Prise régulière des médicaments prescrits", description: "Respectez votre traitement selon les prescriptions" },
    { id: 7, title: "Vérification de la couverture complémentaire", description: "Mutuelle, garanties et couvertures additionnelles" },
    { id: 8, title: "Mise à jour du carnet de santé ou DMP", description: "Dossier Médical Partagé avec vos informations récentes" },
    { id: 9, title: "Planification des examens de santé recommandés", description: "Bilan sanguin, dépistages, vaccins, etc." },
    { id: 10, title: "Vérification des stocks de médicaments", description: "Médicaments et matériel médical à domicile" }
];

const checkedItems = new Set();

function renderChecklist() {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    checklistItems.forEach((item, index) => {
        const isChecked = checkedItems.has(item.id);
        const itemEl = document.createElement('div');
        itemEl.className = `reveal opacity-0 bg-white rounded-2xl shadow-soft border border-slate-100 transition-all duration-200 cursor-pointer hover:shadow-md ${
            isChecked ? 'border-l-4 border-l-blue-700 bg-blue-50' : ''
        }`;
        itemEl.style.animationDelay = `${index * 50}ms`;

        itemEl.innerHTML = `
            <div class="p-6 lg:p-8">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 pt-1">
                        <input
                            type="checkbox"
                            ${isChecked ? 'checked' : ''}
                            class="w-6 h-6 text-blue-700 rounded cursor-pointer"
                            data-item-id="${item.id}"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-base transition-colors ${
                            isChecked ? 'text-slate-500 line-through' : 'text-slate-900'
                        }">
                            ${item.id}. ${item.title}
                        </h3>
                        <p class="text-sm text-slate-600 mt-1">
                            ${item.description}
                        </p>
                    </div>
                </div>
            </div>
        `;

        const checkbox = itemEl.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            toggleChecklistItem(item.id);
        });

        itemEl.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            toggleChecklistItem(item.id);
        });

        container.appendChild(itemEl);

        // Observe for animation
        observer.observe(itemEl);
    });

    updateProgress();
}

function toggleChecklistItem(id) {
    if (checkedItems.has(id)) {
        checkedItems.delete(id);
    } else {
        checkedItems.add(id);
    }
    renderChecklist();
}

function updateProgress() {
    const checkedCount = checkedItems.size;
    const totalCount = checklistItems.length;
    const progressPercent = Math.round((checkedCount / totalCount) * 100);

    document.getElementById('progress-text').textContent = `${checkedCount} sur ${totalCount} tâches complétées`;
    document.getElementById('progress-percent').textContent = `${progressPercent}%`;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
}

// Download checklist
document.getElementById('download-btn').addEventListener('click', () => {
    const checkedCount = checkedItems.size;
    const totalCount = checklistItems.length;
    const progressPercent = Math.round((checkedCount / totalCount) * 100);

    const csvContent = [
        "Checklist Santé Mensuelle",
        `Date: ${new Date().toLocaleDateString("fr-FR")}`,
        `Progression: ${checkedCount}/${totalCount} (${progressPercent}%)`,
        "",
        "Tâches:",
        ...checklistItems.map(item => {
            const isChecked = checkedItems.has(item.id);
            return `${isChecked ? "✓" : "☐"} ${item.id}. ${item.title}`;
        })
    ].join("\n");

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", `checklist-sante-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

// Reset checklist
document.getElementById('reset-btn').addEventListener('click', () => {
    checkedItems.clear();
    renderChecklist();
});

// Initial render
renderChecklist();

// ============================================
// FAQ ACCORDION
// ============================================
const faqs = [
    {
        question: 'Comment créer mon compte AssurSanté Connect ?',
        answer: 'La création de compte est simple et rapide. Cliquez sur "Créer un compte", renseignez votre numéro de sécurité sociale, votre email et créez un mot de passe sécurisé. Vous recevrez un code de validation par SMS pour confirmer votre identité.'
    },
    {
        question: 'Mes données personnelles sont-elles sécurisées ?',
        answer: 'Absolument. AssurSanté Connect utilise un chiffrement de niveau bancaire (AES-256) pour protéger vos données. Nous sommes conformes au RGPD et vos informations ne sont jamais partagées avec des tiers sans votre consentement explicite.'
    },
    {
        question: 'Puis-je gérer le compte de mes enfants ou de mes proches ?',
        answer: 'Oui, avec la fonction "Gestion familiale", vous pouvez ajouter vos ayants droit (enfants, conjoint, personnes à charge) et gérer leurs démarches depuis votre compte principal, tout en respectant les droits de chacun.'
    },
    {
        question: 'Comment fonctionne l\'assistant virtuel ?',
        answer: 'Notre assistant virtuel utilise l\'intelligence artificielle pour comprendre vos questions et vous orienter vers la bonne information ou démarche. Il est disponible 24h/24, 7j/7 et peut vous accompagner pas à pas dans vos démarches.'
    },
    {
        question: 'Quels documents puis-je télécharger sur AssurSanté Connect ?',
        answer: 'Vous pouvez télécharger toutes vos attestations : attestation de droits, carte mutuelle, relevés de remboursements, attestations fiscales, et bien plus encore. Tous les documents sont disponibles au format PDF et signés électroniquement.'
    },
    {
        question: 'Que faire si je rencontre un problème technique ?',
        answer: 'Notre équipe de support est disponible par chat, email ou téléphone. Vous pouvez également consulter notre centre d\'aide qui contient des guides détaillés pour résoudre la plupart des problèmes courants.'
    },
    {
        question: 'Le service est-il vraiment gratuit ?',
        answer: 'Oui, AssurSanté Connect est un service public entièrement gratuit pour tous les assurés sociaux. Il n\'y a aucun frais caché, aucun abonnement, et toutes les fonctionnalités sont accessibles sans limitation.'
    },
    {
        question: 'Puis-je utiliser AssurSanté Connect sur mon téléphone ?',
        answer: 'Oui, notre plateforme est entièrement responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur. Nous proposons également une application mobile dédiée pour iOS et Android avec des fonctionnalités optimisées pour mobile.'
    }
];

  document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
      fields: {
        "Nom": document.getElementById("nom").value,
        "Email": document.getElementById("email").value,
        "Message": document.getElementById("message").value,
        "Statut": "Nouveau"
      }
    };

    const response = await fetch("https://api.airtable.com/v0/TON_BASE_ID/TON_NOM_TABLE", {
      method: "POST",
      headers: {
        "Authorization": "Bearer TON_TOKEN_AIRTABLE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Merci ! Vous allez recevoir un email de confirmation.");
    }
  });


function renderFAQ() {
    const container = document.getElementById('faq-container');
    container.innerHTML = '';

    faqs.forEach((faq, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'accordion-item reveal opacity-0';
        itemEl.style.animationDelay = `${index * 50}ms`;
        itemEl.setAttribute('data-state', 'closed');

        itemEl.innerHTML = `
            <button class="accordion-trigger w-full">
                ${faq.question}
                <span class="float-right">▼</span>
            </button>
            <div class="accordion-content" data-state="closed">
                ${faq.answer}
            </div>
        `;

        const trigger = itemEl.querySelector('.accordion-trigger');
        const content = itemEl.querySelector('.accordion-content');

        trigger.addEventListener('click', () => {
            const isOpen = itemEl.getAttribute('data-state') === 'open';

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== itemEl) {
                    item.setAttribute('data-state', 'closed');
                    item.querySelector('.accordion-content').setAttribute('data-state', 'closed');
                }
            });

            // Toggle current item
            if (isOpen) {
                itemEl.setAttribute('data-state', 'closed');
                content.setAttribute('data-state', 'closed');
            } else {
                itemEl.setAttribute('data-state', 'open');
                content.setAttribute('data-state', 'open');
            }
        });

        container.appendChild(itemEl);

        // Observe for animation
        observer.observe(itemEl);
    });
}

renderFAQ();

// ============================================
// INITIAL ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for elements already in view
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate-fade-in-up');
        }
    });
});
