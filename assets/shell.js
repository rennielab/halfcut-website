// Shared shell: nav + footer + menu + updates panel + reveal observer. Vanilla JS, no framework.
(function () {

  // =========================================================================
  // UPDATES (news / climate / careers), small CMS-shaped data seeded inline.
  // HalfCut can replace this with a fetch later. Posts include a `fresh` flag
  // that drives the flashing dot next to "Updates" in the header.
  // =========================================================================
  const UPDATES = {
    news: [
      { fresh: true,  date: '19 Apr 2026', title: 'BDO audit completed for FY25', body: 'Third consecutive unqualified audit. 92.4¢ of every dollar reached Country. Full notes published with the annual impact report on Monday.' },
      { fresh: true,  date: '12 Apr 2026', title: 'Jabalbina ranger program expanded to 18 rangers', body: 'Four new positions funded through the March cohort. Two roles are year-round for the first time since 2019, a shift the Corporation has been asking for.' },
      { fresh: false, date: '02 Apr 2026', title: 'Yalada Tour Q2 cohort confirmed', body: 'Twelve partners, three days on Kuku Yalanji Country, one very long dinner. Application reopens for Q3 in June.' },
      { fresh: false, date: '21 Mar 2026', title: 'New manifesto published', body: '"The bridge, not the saviour." Twelve years in, we\'ve rewritten how we talk about the work. Read it on the Journal.' },
      { fresh: false, date: '08 Mar 2026', title: 'Reached $4.2M raised since inception', body: 'Quietly crossed the line last week. Thank you to the 11,400 people who have shaved, donated, or written a big cheque since 2014.' },
      { fresh: false, date: '24 Feb 2026', title: 'Aunty Marilyn Wallace joins the board', body: 'Kuku Yalanji Elder and long-time collaborator takes the Jabalbina seat, with veto power over program and partnership decisions.' },
      { fresh: false, date: '11 Feb 2026', title: 'Shave in August 2026 is open', body: 'Register a team, a workplace, or just yourself. Toolkits ship in May. Pledge levels unchanged, this year\'s target is $1.1M.' },
      { fresh: false, date: '02 Feb 2026', title: 'Signed on two new partners', body: 'A B-Corp outdoor brand and a Sydney architecture practice. Both completed the partnership framework before the contracts went near a lawyer.' },
    ],
    climate: [
      { fresh: true,  date: '18 Apr 2026', title: 'State of the Forests 2026 released', body: 'Department of Climate Change and Energy confirms continued net loss in NSW and Queensland. Australia remains in the top five deforesting nations in the developed world.', source: 'ABC News' },
      { fresh: false, date: '10 Apr 2026', title: 'IPCC: 1.5°C window effectively closed', body: 'Synthesis report finds current policy pathways align with ~2.7°C. The "remaining carbon budget" framing has been quietly retired.', source: 'Guardian' },
      { fresh: false, date: '03 Apr 2026', title: 'Reef bleaching returns, earlier than modelled', body: 'Severe bleaching recorded across 68% of surveyed reefs on the GBR in a non-La Niña year, a first.', source: 'AIMS' },
      { fresh: false, date: '25 Mar 2026', title: 'Native title determinations accelerate', body: 'Federal Court recognises an additional 14,000 km² under traditional ownership in Q1 alone. Biggest quarter since 2019.', source: 'NNTT' },
      { fresh: false, date: '12 Mar 2026', title: 'Australia ratifies global plastics treaty', body: 'Late to the table but signed. Implementation begins Q4.', source: 'DCCEEW' },
      { fresh: false, date: '28 Feb 2026', title: 'Private land conservation doubles', body: 'National covenant area passes 6M hectares, still only ~0.8% of the continent.', source: 'TNC' },
    ],
    careers: [
      { fresh: true,  date: '15 Apr 2026', title: 'Program Coordinator · On Country', body: 'Full-time, based between Sydney and Mossman, Qld. Working directly with the Jabalbina rangers. Aboriginal and Torres Strait Islander candidates strongly encouraged.', type: 'Full-time' },
      { fresh: false, date: '08 Apr 2026', title: 'Partnerships Manager', body: 'Sydney-based, hybrid. Owns the corporate partnership framework end-to-end. Must be comfortable saying no.', type: 'Full-time' },
      { fresh: false, date: '28 Mar 2026', title: 'Campaign Producer · Shave in August', body: '8-month contract, Apr–Nov. Runs the August campaign. Must know their clipper attachments.', type: 'Contract' },
      { fresh: false, date: '14 Mar 2026', title: 'Journal Editor (part-time)', body: '3 days/week. Edits field dispatches and long-form essays. Remote with regular time on Country.', type: 'Part-time' },
      { fresh: false, date: '02 Mar 2026', title: 'Finance & Compliance Lead', body: 'Full-time, Sydney. BDO liaison. Publishes the audit notes. Keeps us honest.', type: 'Full-time' },
    ],
  };
  const hasFresh = (tab) => UPDATES[tab].some(u => u.fresh);
  const totalFresh = () => Object.values(UPDATES).flat().filter(u => u.fresh).length;

  // =========================================================================
  // HEADER (transparent, floating, Inversa-style, right-aligned controls)
  // =========================================================================
  function buildNav() {
    const nav = document.createElement('header');
    nav.className = 'nav';
    const dotCls = totalFresh() > 0 ? 'nav-dot pulse' : 'nav-dot';
    nav.innerHTML = `
      <a href="index.html" class="nav-logo" aria-label="HalfCut home">
        <img src="assets/logo-wordmark-transparent.png" alt="HalfCut">
      </a>
      <div class="nav-right">
        <button class="nav-item" data-open="updates" aria-label="Latest updates">
          <span class="${dotCls}" aria-hidden="true"></span>Updates
        </button>
        <a href="donate.html" class="nav-item nav-donate-pill" aria-label="Donate">
          <span class="donate-h" aria-hidden="true">H</span>
          <span>Donate</span>
        </a>
        <button class="nav-item nav-menu-btn" data-open="menu" aria-label="Open menu">
          <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
          Menu
        </button>
      </div>
    `;
    document.body.prepend(nav);

    nav.querySelector('[data-open="menu"]').addEventListener('click', () => openPanel('menu'));
    nav.querySelector('[data-open="updates"]').addEventListener('click', () => openPanel('updates'));
  }

  // =========================================================================
  // SLIDE-OUT PANEL (shared shell; content swaps between menu and updates)
  // =========================================================================
  function buildPanel() {
    const p = document.createElement('div');
    p.className = 'slideout';
    p.setAttribute('aria-hidden', 'true');
    p.innerHTML = `
      <div class="slideout-scrim" data-close></div>
      <aside class="slideout-panel" aria-label="Site navigation" role="dialog" aria-modal="true">
        <div class="slideout-topo" aria-hidden="true"></div>
        <header class="slideout-head">
          <span class="slideout-label" id="slideoutLabel">Menu</span>
          <button class="slideout-close" data-close aria-label="Close">
            Close <span aria-hidden="true">✕</span>
          </button>
        </header>
        <div class="slideout-body" id="slideoutBody"></div>
        <footer class="slideout-foot">
          <div class="slideout-foot-l">© 2026 Halfcut Ltd</div>
          <div class="slideout-foot-r">Gadigal &amp; Kuku Yalanji Country</div>
        </footer>
      </aside>
    `;
    document.body.appendChild(p);

    p.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closePanel));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });
  }

  let currentActive = '';
  function openPanel(which) {
    const p = document.querySelector('.slideout');
    const body = document.getElementById('slideoutBody');
    const label = document.getElementById('slideoutLabel');
    label.textContent = which === 'updates' ? 'Updates' : 'Menu';
    body.innerHTML = which === 'updates' ? renderUpdates() : renderMenu(currentActive);
    p.setAttribute('aria-hidden', 'false');
    p.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    if (which === 'updates') wireTabs();
  }
  function closePanel() {
    const p = document.querySelector('.slideout');
    if (!p) return;
    p.classList.remove('open');
    p.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  // ---- Menu content ----
  function renderMenu(active) {
    const links = [
      { label: 'Origins', href: 'about.html', key: 'about' },
      { label: 'Impact',  href: 'impact.html', key: 'impact' },
      { label: 'Projects',href: 'projects.html', key: 'projects' },
      { label: 'Partners',href: 'partners.html', key: 'partners' },
      { label: 'Team',    href: 'team.html', key: 'team' },
      { label: 'Journal', href: 'journal.html', key: 'journal' },
    ];
    return `
      <nav class="menu-list">
        ${links.map((l, i) =>
          `<a class="menu-link ${i===0?'is-accent':''} ${active===l.key?'is-current':''}" href="${l.href}">
            <span class="menu-link-num">${String(i+1).padStart(2,'0')}</span>
            <span class="menu-link-label">${l.label}</span>
          </a>`
        ).join('')}
      </nav>
      <div class="menu-secondary">
        <a href="https://halfcut.gumroad.com" target="_blank" rel="noopener" class="menu-secondary-link">Store <span aria-hidden="true">↗</span></a>
        <div class="menu-social">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Newsletter</a>
        </div>
      </div>
      <a class="menu-contact" href="contact.html">Contact →</a>
    `;
  }

  // ---- Updates content ----
  function renderUpdates() {
    const tabs = [
      { key: 'news',    label: 'News' },
      { key: 'climate', label: 'Climate' },
      { key: 'careers', label: 'Careers' },
    ];
    return `
      <div class="upd-head">
        <p class="upd-lede">Short dispatches from the operation. Longer pieces live in the Journal.</p>
      </div>
      <div class="upd-tabs" role="tablist">
        ${tabs.map((t, i) =>
          `<button class="upd-tab ${i===0?'is-active':''}" data-tab="${t.key}" role="tab" aria-selected="${i===0?'true':'false'}">
            ${t.label}
            ${hasFresh(t.key) ? '<span class="upd-tab-dot" aria-hidden="true"></span>' : ''}
          </button>`
        ).join('')}
      </div>
      <div class="upd-list" id="updList">
        ${renderUpdateList('news')}
      </div>
    `;
  }
  function renderUpdateList(tab) {
    return UPDATES[tab].map(u => `
      <article class="upd-item ${u.fresh?'is-fresh':''}">
        <div class="upd-meta">
          <span class="upd-date">${u.date}</span>
          ${u.fresh ? '<span class="upd-fresh"><span class="upd-fresh-dot" aria-hidden="true"></span>New</span>' : ''}
          ${u.source ? `<span class="upd-source">${u.source}</span>` : ''}
          ${u.type ? `<span class="upd-source">${u.type}</span>` : ''}
        </div>
        <h4 class="upd-title">${u.title}</h4>
        <p class="upd-body">${u.body}</p>
      </article>
    `).join('');
  }
  function wireTabs() {
    document.querySelectorAll('.upd-tab').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.upd-tab').forEach(x => {
          x.classList.remove('is-active');
          x.setAttribute('aria-selected','false');
        });
        t.classList.add('is-active');
        t.setAttribute('aria-selected','true');
        document.getElementById('updList').innerHTML = renderUpdateList(t.dataset.tab);
      });
    });
  }

  // =========================================================================
  // FOOTER
  // =========================================================================
  function buildFooter() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `
      <div class="footer-grid">
        <div>
          <img class="footer-wordmark" src="assets/logo-wordmark-transparent.png" alt="HalfCut">
          <p style="max-width: 380px; font-family: var(--f-serif); font-weight: 300; font-size: 17px; line-height: 1.5; opacity: .75;">
            The bridge between people who want to help heal Country and the Traditional Owners who have the knowledge, the authority, and the deep connection to Country to actually do it.
          </p>
        </div>
        <div>
          <h5>Explore</h5>
          <div class="footer-links">
            <a href="about.html">Origins</a>
            <a href="impact.html">Impact</a>
            <a href="projects.html">Projects</a>
            <a href="partners.html">Partners</a>
            <a href="team.html">Team &amp; Board</a>
            <a href="journal.html">Journal</a>
          </div>
        </div>
        <div>
          <h5>Act</h5>
          <div class="footer-links">
            <a href="donate.html">Donate</a>
            <a href="#">Shave in August</a>
            <a href="https://halfcut.gumroad.com" target="_blank" rel="noopener">Store ↗</a>
            <a href="contact.html">Partner with us</a>
          </div>
        </div>
        <div>
          <h5>Follow</h5>
          <div class="footer-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
      </div>
      <div class="footer-partners" aria-label="Our partners">
        <div class="footer-partners-head">
          <span class="eyebrow">Resourced by</span>
          <span class="footer-partners-count">10 foundation partners · FY25</span>
        </div>
        <div class="footer-partners-row">
          <span class="partner-mark" data-mark="bj">Ben &amp; Jerry's</span>
          <span class="partner-mark" data-mark="rl">Rennie Lab</span>
          <span class="partner-mark" data-mark="smb">Seven Mile Brewing</span>
          <span class="partner-mark" data-mark="pat">Patagonia</span>
          <span class="partner-mark" data-mark="aes">Aesop</span>
          <span class="partner-mark" data-mark="kms">Koskela</span>
          <span class="partner-mark" data-mark="byg">Bangalow Growers</span>
          <span class="partner-mark" data-mark="tws">The Wilderness Society</span>
          <span class="partner-mark" data-mark="fol">Foundation for Country</span>
          <span class="partner-mark" data-mark="nab">NAB Foundation</span>
        </div>
        <div class="footer-partners-foot">
          <a href="contact.html" class="footer-partners-cta">Become a partner →</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 HalfCut Ltd. ABN 00 000 000 000. Registered charity.</div>
        <div>We acknowledge the Traditional Owners of the lands on which we work, and pay respects to Elders past and present.</div>
      </div>
    `;
    document.body.appendChild(f);
  }

  // =========================================================================
  // REVEAL OBSERVER
  // =========================================================================
  function revealObserver() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  window.HC = {
    init(active) {
      currentActive = active || '';
      buildNav();
      buildPanel();
      buildFooter();
      revealObserver();
    }
  };
})();
