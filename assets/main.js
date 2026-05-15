/* De BeeldBrekers: site interactions */

document.addEventListener('DOMContentLoaded', () => {

  // Mark current page as active in nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Reveal animations
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Word-reveal: split text and animate
  document.querySelectorAll('.word-reveal').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = text;
    el.appendChild(span);
    io.observe(el);
    el.addEventListener('transitionend', () => el.classList.add('in'));
    setTimeout(() => el.classList.add('in'), 200);
  });

  // Mobile menu
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Form submit (demo only)
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const redirectUrl = form.dataset.redirect;
      btn.textContent = 'Verzonden. We mailen je terug';
      btn.disabled = true;
      btn.style.background = 'var(--mint)';
      btn.style.color = 'var(--purple)';
      if (redirectUrl) {
        btn.textContent = 'Verzonden. Je gaat door naar het aanbod';
        window.setTimeout(() => {
          window.location.href = redirectUrl;
        }, 650);
      }
    });
  }

  const currentPath = window.location.pathname;
  const isNestedPage = /\/(blog|diensten|landing|werk)\//.test(currentPath);
  const assetPath = (path) => `${isNestedPage ? '../' : ''}${path}`;
  const casePath = (slug) => {
    if (currentPath.includes('/werk/')) return `${slug}.html`;
    if (isNestedPage) return `../werk/${slug}.html`;
    return `werk/${slug}.html`;
  };
  const portfolioCases = [
    {
      slug: 'kinderkoepel',
      video: 'assets/previews/cards/kinderkoepel-card.mp4',
      label: 'Bekijk case',
      tags: ['Recruitment', 'Hero film', 'Kinderkoepel'],
      title: 'Een recruitmentcampagne die laat zien wat het werk in de kinderopvang écht is.',
      meta: 'Kinderkoepel · Kinderopvang · Hero film + cuts'
    },
    {
      slug: 'parnassia-beveiliging',
      video: 'assets/previews/cards/parnassia-beveiliging-card.mp4',
      label: 'Bekijk case',
      tags: ['Recruitment', 'Employer branding', 'Parnassia'],
      title: 'GGZ-beveiliging menselijk, betekenisvol en zichtbaar gemaakt.',
      meta: 'Parnassia · GGZ · Recruitmentcampagne'
    },
    {
      slug: 'parnassia',
      poster: 'assets/media/parnassia-poster.jpg',
      video: 'assets/previews/cards/parnassia-card.mp4',
      label: 'Bekijk case',
      tags: ['Animatie', 'Zorgcommunicatie', 'Autisme'],
      title: 'Voor Parnassia een complex intakeproces helder uitgelegd.',
      meta: 'Parnassia · Centrum Autisme Haaglanden · Uitleganimatie'
    },
    {
      slug: 'gemiva',
      poster: 'assets/media/gemiva-poster.jpg',
      video: 'assets/previews/cards/gemiva-card.mp4',
      label: 'Bekijk case',
      tags: ['E-learning', 'Zorgdomotica', 'Gemiva'],
      title: 'Complexe zorgdomotica vertaald naar trainingscontent die medewerkers dagelijks gebruiken.',
      meta: 'Gemiva · Zorgdomotica · Trainingscontent'
    },
    {
      slug: 'leraren-van-het-jaar',
      video: 'assets/previews/cards/leraren-van-het-jaar-card.mp4',
      label: 'Bekijk case',
      tags: ['Uitleganimatie', 'Activatie', 'Onderwijs'],
      title: 'Een landelijke onderwijsverkiezing vertaald naar een speelse animatie die mensen activeert.',
      meta: 'Leraren van het Jaar · ImpactAll · Publiekscampagne'
    },
    {
      slug: 'cao-rijk',
      video: 'assets/previews/cards/cao-rijk-card.mp4',
      label: 'Bekijk case',
      tags: ['Awareness', 'Motion graphics', 'CAO Rijk'],
      title: 'Een duurzame CAO-pilot vertaald naar een filmcampagne over beweging en systeemverandering.',
      meta: 'Ministerie van BZK · CAO Rijk · Awarenesscampagne'
    },
    {
      slug: 'world-bank',
      poster: 'assets/media/worldbank-poster.jpg',
      video: 'assets/previews/cards/world-bank-card.mp4',
      label: 'Bekijk case',
      tags: ['Datavisualisatie', 'Motion design', 'World Bank'],
      title: 'Complexe voedselzekerheidsdata vertaald naar heldere animaties voor internationale besluitvorming.',
      meta: 'World Bank · Voedselzekerheid · Uitleganimaties'
    },
    {
      slug: 'channext',
      poster: 'assets/media/channext-poster.jpg',
      video: 'assets/previews/cards/channext-card.mp4',
      label: 'Bekijk case',
      tags: ['SaaS', 'Positionering', 'Channext'],
      title: 'Complexe AI-gedreven channel marketing vertaald naar een helder B2B-verhaal.',
      meta: 'Channext · SaaS / B2B · Positioneringsvideo'
    },
    {
      slug: 'ict-group',
      poster: 'assets/media/ictgroup-poster.jpg',
      video: 'assets/previews/cards/ict-group-card.mp4',
      label: 'Bekijk case',
      tags: ['Marketing video', 'Campagne', 'ICT Group'],
      title: 'Een campagnefilm voor Applied Solutions die meer doet dan uitleggen.',
      meta: 'ICT Group · Tech / Industrie · Marketing campagne'
    }
  ];
  const shuffle = (items) => {
    const list = [...items];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };
  const randomizeLogoMarquees = () => {
    document.querySelectorAll('.marquee--logos').forEach(marquee => {
      const tracks = marquee.querySelectorAll('.marquee__track');
      const primaryTrack = tracks[0];
      const duplicateTrack = tracks[1];
      if (!primaryTrack || !duplicateTrack) return;

      const logos = shuffle(Array.from(primaryTrack.querySelectorAll('.marquee__logo')));
      primaryTrack.replaceChildren(...logos);
      duplicateTrack.replaceChildren(...logos.map(logo => {
        const clone = logo.cloneNode(true);
        clone.querySelectorAll('img').forEach(img => img.alt = '');
        return clone;
      }));
    });
  };
  const renderPortfolioCard = (item, templateCard, showMeta = false) => {
    const card = document.createElement('a');
    card.className = templateCard?.className || 'card';
    card.href = casePath(item.slug);
    const posterAttr = item.poster ? ` poster="${assetPath(item.poster)}"` : '';
    card.innerHTML = `
      <div class="card__media">
        <video class="thumb" autoplay muted loop playsinline preload="metadata"${posterAttr}>
          <source src="${assetPath(item.video)}" type="video/mp4">
        </video>
        <span class="play-pill">${item.label}</span>
      </div>
      <div class="card__body">
        <div class="card__tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <h3 class="card__title">${item.title}</h3>
        ${showMeta ? `<p class="muted" style="font-size: 0.9375rem; margin-top: 0.5rem;">${item.meta}</p>` : '<span class="case-link-note">Naar case</span>'}
      </div>
    `;

    const originalMedia = templateCard?.querySelector('.card__media');
    const newMedia = card.querySelector('.card__media');
    if (originalMedia?.getAttribute('style')) {
      newMedia.setAttribute('style', originalMedia.getAttribute('style'));
    }

    return card;
  };
  const randomizePortfolioBlocks = () => {
    const blocks = new Set();
    document.querySelectorAll('.work-carousel__track, .work-grid, .grid').forEach(block => {
      const caseCards = block.querySelectorAll('a[href*="werk/"], a[href$=".html"]');
      const portfolioCards = Array.from(caseCards).filter(card => {
        const href = card.getAttribute('href') || '';
        return card.querySelector('video.thumb') && portfolioCases.some(item => href.includes(item.slug));
      });
      if (portfolioCards.length >= 2) {
        blocks.add(block);
      }
    });

    blocks.forEach(block => {
      const templateCard = block.querySelector('a.card');
      const isFullPortfolio = block.classList.contains('work-grid');
      const showMeta = isFullPortfolio;
      const selection = shuffle(portfolioCases).slice(0, isFullPortfolio ? portfolioCases.length : 3);
      block.innerHTML = '';
      selection.forEach(item => block.appendChild(renderPortfolioCard(item, templateCard, showMeta)));
    });
  };

  randomizeLogoMarquees();
  randomizePortfolioBlocks();

  // Work carousel
  document.querySelectorAll('[data-work-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-work-carousel-track]');
    const prev = carousel.querySelector('[data-work-carousel-prev]');
    const next = carousel.querySelector('[data-work-carousel-next]');
    const items = Array.from(track?.children || []);
    if (!track || !items.length) return;

    let index = 0;
    const visibleCount = () => {
      if (window.matchMedia('(max-width: 620px)').matches) return 1;
      if (window.matchMedia('(max-width: 980px)').matches) return 2;
      return 3;
    };
    const update = () => {
      const maxIndex = Math.max(0, items.length - visibleCount());
      index = Math.min(Math.max(index, 0), maxIndex);
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(${index * -(itemWidth + gap)}px)`;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === maxIndex;
    };

    prev?.addEventListener('click', () => {
      index -= 1;
      update();
    });
    next?.addEventListener('click', () => {
      index += 1;
      update();
    });
    window.addEventListener('resize', update, { passive: true });
    update();
  });

  // Keep muted preview videos moving consistently across portfolio cards.
  const previewVideos = document.querySelectorAll('.card__media video.thumb, .surface-video video.thumb, .hero__bg video');
  const startPreviewVideo = (video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    const source = video.currentSrc || video.querySelector('source')?.src || video.src || '';
    const needsOffset = source.includes('kinderkoepel');
    const applyOffset = () => {
      if (!needsOffset || video.dataset.previewOffsetApplied === 'true') return;
      if (!Number.isFinite(video.duration) || video.duration <= 1.8) return;
      video.currentTime = Math.min(1.4, video.duration - 0.6);
      video.dataset.previewOffsetApplied = 'true';
    };

    if (video.readyState >= 1) {
      applyOffset();
    } else {
      video.addEventListener('loadedmetadata', applyOffset, { once: true });
    }

    video.play().catch(() => {});
  };

  const videoObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          startPreviewVideo(video);
        } else if (!video.closest('[data-video-modal]')) {
          video.pause();
        }
      });
    }, { threshold: 0.15, rootMargin: '160px 0px' })
    : null;

  previewVideos.forEach(video => {
    startPreviewVideo(video);
    videoObserver?.observe(video);
  });

  // Nav surface detection: scroll state + light-section overlap
  const navEl = document.querySelector('.nav');
  if (navEl) {
    const lightSections = document.querySelectorAll('.surface-light');
    let rafId = null;
    const checkNav = () => {
      // Scrolled state (after 60px)
      navEl.classList.toggle('nav--scrolled', window.scrollY > 60);
      // Light surface overlap
      let onLight = false;
      lightSections.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 30) onLight = true;
      });
      navEl.classList.toggle('nav--on-light', onLight);
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { checkNav(); rafId = null; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    checkNav();
  }

  // WhatsApp floating bubble: injected once on every page
  if (!document.querySelector('.wa-fab')) {
    const wa = document.createElement('a');
    wa.className = 'wa-fab';
    wa.href = 'https://wa.me/31623626768?text=Hoi%20De%20BeeldBrekers%2C%20';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Stuur ons een appje via WhatsApp');
    wa.innerHTML = ''
      + '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
      + '<path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.471-.149-.67.149-.198.297-.768.966-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.992c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>'
      + '</svg>'
      + '<span class="wa-fab__label">Stuur een appje</span>';
    document.body.appendChild(wa);
  }

  const openVideoModal = (src) => {
    const overlay = document.createElement('div');
    overlay.className = 'video-modal';
    overlay.innerHTML = `
      <button class="video-modal__close" aria-label="Sluit video">×</button>
      <div class="video-modal__inner">
        <video controls autoplay playsinline src="${src}"></video>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const video = overlay.querySelector('video');
    if (video) {
      const enableSound = () => {
        video.defaultMuted = false;
        video.muted = false;
        video.removeAttribute('muted');
        video.volume = 1;
      };
      enableSound();
      video.addEventListener('loadedmetadata', enableSound, { once: true });
      video.addEventListener('play', enableSound, { once: true });
      video.play().then(enableSound).catch(() => {});
    }

    const escClose = (e) => {
      if (e.key === 'Escape') close();
    };

    const close = () => {
      if (video) video.pause();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', escClose);
      overlay.remove();
    };

    overlay.querySelector('.video-modal__close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', escClose);
  };

  // Video modal: click opens playable video with sound.
  document.querySelectorAll('[data-video-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openVideoModal(trigger.dataset.videoModal);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      openVideoModal(trigger.dataset.videoModal);
    });
  });
});
