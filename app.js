const state = {
  active: 'collection',
  sku: 'RING',
  qty: 1,
  maxQty: 2,
  tier: 'Allowlist',
  certSerialCounter: 12
};

const el = (id) => document.getElementById(id);
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));

function activate(view) {
  state.active = view;

  qsa('.tab').forEach((tab) => {
    const isActive = tab.dataset.tab === view;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  qsa('.view').forEach((section) => {
    const shouldShow = section.id === `view-${view}`;
    section.classList.toggle('hidden', !shouldShow);
    section.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  });

  qsa('.nav a').forEach((link) => {
    link.classList.toggle('active', link.id === `nav-${view}`);
  });

  if (location.hash !== `#${view}`) {
    history.replaceState(null, '', `#${view}`);
  }
}

function startTimer(targetId, seconds) {
  const target = el(targetId);
  if (!target) return;

  let remaining = seconds;

  const tick = () => {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    target.textContent = `${hours}:${minutes}:${secs}`;
    if (remaining > 0) {
      remaining -= 1;
      setTimeout(tick, 1000);
    }
  };

  tick();
}

function startHold(seconds = 300) {
  const target = el('hold');
  if (!target) return;

  let remaining = seconds;

  const tick = () => {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    target.textContent = `${minutes}:${secs}`;
    if (remaining > 0) {
      remaining -= 1;
      setTimeout(tick, 1000);
    }
  };

  tick();
}

function setSKU(sku) {
  state.sku = sku;
  const nameMap = {
    RING: 'Signature Ring',
    PENDANT: 'Signature Pendant',
    BRACELET: 'Signature Bracelet'
  };
  const name = nameMap[sku] || 'Signature Ring';
  el('selected-product').textContent = name;
  el('preview').textContent = `Ảnh sản phẩm 360° · ${name}`;
}

function setQty(value) {
  state.qty = Math.max(1, Math.min(state.maxQty, value));
  el('qv').textContent = state.qty;
}

function initQtyControls() {
  el('q-')?.addEventListener('click', () => setQty(state.qty - 1));
  el('q+')?.addEventListener('click', () => setQty(state.qty + 1));
}

function issueCertificate(orderId = 'TGL-2025') {
  state.certSerialCounter += 1;
  const serial = String(state.certSerialCounter).padStart(3, '0');
  el('cert-title').textContent = `Certificate #${orderId}-${serial}`;
  const issued = new Date();
  el('issued-at').textContent = issued.toISOString().slice(0, 16).replace('T', ' ');
  activate('certificate');
}

function downloadCSV() {
  const rows = [
    ['ID', 'Epic', 'Task', 'Owner', 'Due', 'Depends_On', 'Notes'],
    [
      'UI-01',
      'Collection',
      'Thiết kế trang Collection (grid + countdown)',
      'Frontend Dev',
      '2025-11-17',
      '',
      'Macro ảnh/Video placeholder'
    ],
    [
      'UI-02',
      'Purchase',
      'Form mua (KYC nhẹ, OTP, limit)',
      'Frontend Dev',
      '2025-11-24',
      'UI-01',
      'Hold 5 phút trong giỏ'
    ],
    [
      'UI-03',
      'Payment',
      'Tích hợp QR banking + thẻ',
      'Backend Dev',
      '2025-11-24',
      'UI-02',
      'Webhook xác nhận'
    ],
    [
      'UI-04',
      'Anti-bot',
      'Captcha v3 + SMS OTP',
      'Backend Dev',
      '2025-12-01',
      'UI-02',
      'Rate-limit OTP'
    ],
    [
      'UI-05',
      'Certificate',
      'Trang chứng thư + hash + ảnh macro',
      'Backend Dev',
      '2025-11-24',
      'UI-02',
      'Mask thông tin cá nhân'
    ],
    [
      'UI-06',
      'Dashboard',
      'Bảng điều khiển vận hành + logs',
      'Backend Dev',
      '2025-12-08',
      'UI-03|UI-04|UI-05',
      'Realtime stat'
    ],
    [
      'UI-07',
      'Analytics',
      'Gắn analytics + event tracking',
      'Backend Dev',
      '2025-12-08',
      'UI-01',
      'Heatmap/Conversion funnel'
    ],
    [
      'UI-08',
      'UAT',
      'Kiểm thử tải cao & bảo mật',
      'QA',
      '2025-12-08',
      'UI-03|UI-04|UI-05|UI-06',
      'JMeter/K6 + OWASP basic'
    ],
    [
      'UI-09',
      'Content',
      'Ảnh macro, video 360°, copy',
      'Content Lead',
      '2025-12-01',
      'UI-01',
      'Tone: craftsmanship/tech'
    ],
    [
      'UI-10',
      'Event',
      'Livestream, rehearsal drop',
      'Event Lead',
      '2025-12-15',
      'UI-08',
      'Script Q&A, soi laser'
    ]
  ];

  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'TingGold_UI_Tasks.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

function initRouter() {
  const initial = (location.hash || '#collection').replace('#', '');
  activate(initial);

  qsa('.tab').forEach((tab) =>
    tab.addEventListener('click', () => {
      activate(tab.dataset.tab);
    })
  );

  qsa('.nav a').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      activate(target);
    })
  );

  qsa('[data-goto="purchase"]').forEach((button) => {
    button.addEventListener('click', () => {
      setSKU(button.dataset.sku || 'RING');
      activate('purchase');
      startHold(300);
    });
  });

  el('back-to-collection')?.addEventListener('click', () => activate('collection'));
  el('pay-qr')?.addEventListener('click', () => issueCertificate());
  el('issue-1')?.addEventListener('click', () => issueCertificate());
  el('download-csv')?.addEventListener('click', downloadCSV);
}

document.addEventListener('DOMContentLoaded', () => {
  startTimer('countdown', 3600 * 24);
  initQtyControls();
  initRouter();
  el('tier-badge').textContent = `Tier đang mở: ${state.tier}`;
});
