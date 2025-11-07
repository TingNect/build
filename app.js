const scanSeries = [
  { d: "10/25", scans: 320 },
  { d: "10/26", scans: 410 },
  { d: "10/27", scans: 510 },
  { d: "10/28", scans: 680 },
  { d: "10/29", scans: 540 },
  { d: "10/30", scans: 720 },
  { d: "11/01", scans: 955 },
];

const riskSeries = [
  { d: "10/25", risk: 7 },
  { d: "10/26", risk: 5 },
  { d: "10/27", risk: 6 },
  { d: "10/28", risk: 8 },
  { d: "10/29", risk: 4 },
  { d: "10/30", risk: 6 },
  { d: "11/01", risk: 9 },
];

const batches = [
  {
    id: "CAF-2025-11",
    sku: "COF-ARABICA-250",
    name: "Cà phê Arabica 250g",
    qty: 10000,
    status: "Transforming",
    last: "Transform + COA",
    risk: "Low",
    updated: "2025-11-01 09:42",
    chain: "Base",
  },
  {
    id: "DRN-2025-10A",
    sku: "FR-DURIAN-AAA",
    name: "Sầu riêng Ri6",
    qty: 3500,
    status: "In Transit",
    last: "Shipped → ĐN",
    risk: "Medium",
    updated: "2025-10-31 18:10",
    chain: "Polygon",
  },
  {
    id: "COS-2025-09B",
    sku: "COS-SERUM-30ML",
    name: "Serum Vitamin C",
    qty: 8000,
    status: "At Retail",
    last: "Received → HN",
    risk: "Low",
    updated: "2025-10-30 15:02",
    chain: "Base",
  },
  {
    id: "JWL-2025-10C",
    sku: "JW-SILVER-RING",
    name: "Nhẫn bạc 925",
    qty: 1200,
    status: "Commissioned",
    last: "Commissioned",
    risk: "High",
    updated: "2025-10-29 10:25",
    chain: "Arbitrum",
  },
];

const events = [
  { t: "2025-11-01 09:42", type: "transform", title: "RoastX rang mẻ #12", cid: "QmX...123" },
  { t: "2025-10-31 18:10", type: "ship", title: "LGT-Express gửi pallet #58", cid: "QmBa...456" },
  { t: "2025-10-30 15:02", type: "receive", title: "BeanMart nhận kho Hà Nội", cid: "QmZy...789" },
];

const qrPayload = {
  v: 1,
  p: "tingtrace",
  cid: "bafybeigdyrx...",
  tid: "0xabc123:123456",
  c: "base",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "space_dashboard" },
  { id: "batch", label: "Batch Manager", icon: "inventory_2" },
  { id: "events", label: "Events Timeline", icon: "task_alt" },
  { id: "printing", label: "Printing Center", icon: "print" },
  { id: "risk", label: "Risk & Fraud", icon: "gpp_maybe" },
  { id: "org", label: "Organizations", icon: "apartment" },
  { id: "api", label: "API & Webhooks", icon: "key" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const riskIconMap = {
  ship: "local_shipping",
  transform: "factory",
  receive: "how_to_reg",
};

function createLineChart(data, key) {
  if (!data.length) return "";
  const max = Math.max(...data.map((item) => item[key]));
  const min = Math.min(...data.map((item) => item[key]));
  const range = max === min ? max || 1 : max - min;
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1 || 1)) * 100;
      const value = item[key];
      const normalized = max === min ? 50 : ((value - min) / range) * 80 + 10;
      const y = 100 - normalized;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(37,99,235,0.36)" />
          <stop offset="100%" stop-color="rgba(37,99,235,0)" />
        </linearGradient>
      </defs>
      <polyline points="${points}" fill="none" stroke="#2563eb" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round" />
      <polygon points="${points} 100,100 0,100" fill="url(#chartLine)" opacity="0.6"></polygon>
    </svg>
  `;
}

function createBarChart(data, key) {
  if (!data.length) return "";
  const max = Math.max(...data.map((item) => item[key])) || 1;
  const barWidth = 100 / data.length;
  const bars = data
    .map((item, index) => {
      const height = (item[key] / max) * 80 + 5;
      const x = index * barWidth + barWidth * 0.15;
      const width = barWidth * 0.7;
      const y = 100 - height;
      return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(
        2
      )}" rx="3" fill="#2563eb" />`;
    })
    .join("\n");

  return `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      ${bars}
    </svg>
  `;
}

function renderTimeline(list) {
  return list
    .map(
      (event) => `
        <div class="timeline-item">
          <div class="timeline-icon">
            <span class="material-symbols-rounded">${riskIconMap[event.type] || "task_alt"}</span>
          </div>
          <div class="timeline-body">
            <div class="title">${event.title}</div>
            <div class="muted">${event.t} • CID <span class="badge neutral" style="margin-left:6px;">${event.cid}</span></div>
            <button class="btn ghost" data-action="verify" style="padding:6px 10px; font-size:12px; margin-top:6px;">Verify on-chain</button>
          </div>
        </div>
      `
    )
    .join("\n");
}

function renderBatchTableRows() {
  return batches
    .map(
      (batch) => `
        <tr>
          <td>${batch.id}</td>
          <td>${batch.sku}</td>
          <td>${batch.name}</td>
          <td>${batch.qty.toLocaleString()}</td>
          <td><span class="badge ${batch.status === "In Transit" ? "secondary" : "neutral"}">${batch.status}</span></td>
          <td>${batch.last}</td>
          <td><span class="badge ${
            batch.risk === "High" ? "destructive" : batch.risk === "Medium" ? "secondary" : "neutral"
          }">${batch.risk}</span></td>
          <td>${batch.updated}</td>
          <td>${batch.chain}</td>
          <td style="text-align:right;"><button class="btn ghost" data-batch-id="${batch.id}" style="padding:6px 10px; font-size:12px;">Chi tiết</button></td>
        </tr>
      `
    )
    .join("\n");
}

function renderBatchDetail(batch) {
  if (!batch) return "";
  return `
    <div class="grid-2">
      <div class="card">
        <div class="card__body">
          <div class="section-title">SKU</div>
          <div>${batch.sku}</div>
          <div class="section-title" style="margin-top:12px;">Số lượng</div>
          <div>${batch.qty.toLocaleString()}</div>
          <div class="section-title" style="margin-top:12px;">Chain</div>
          <div>${batch.chain}</div>
        </div>
      </div>
      <div class="card">
        <div class="card__body">
          <div class="section-title">Trạng thái</div>
          <span class="badge secondary">${batch.status}</span>
          <div class="section-title" style="margin-top:12px;">Rủi ro</div>
          <span class="badge ${batch.risk === "High" ? "destructive" : "neutral"}">${batch.risk}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Timeline EPCIS</h3>
      </div>
      <div class="card__body">
        <div class="timeline">
          ${renderTimeline(events)}
        </div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">QR Preview</h3>
        </div>
        <div class="card__body" style="display:flex; flex-direction:column; align-items:center; gap:16px;">
          <div style="width:180px; height:180px; border-radius:24px; border:1px solid rgba(148,163,184,0.3); display:flex; align-items:center; justify-content:center; background:#ffffff; box-shadow:inset 0 0 0 1px rgba(15,23,42,0.05);">
            <span class="material-symbols-rounded" style="font-size:80px; color:var(--muted);">qr_code</span>
          </div>
          <code>${JSON.stringify(qrPayload)}</code>
        </div>
      </div>
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Bản đồ tuyến</h3>
        </div>
        <div class="card__body" style="height:220px; display:flex; align-items:center; justify-content:center; color:var(--muted); background:rgba(148,163,184,0.08); border-radius:18px;">
          (Map placeholder)
        </div>
      </div>
    </div>
  `;
}

function renderDashboardSection() {
  const kpiTiles = [
    { label: "Batch hiện tại", value: "154", sub: "+12 hôm nay" },
    { label: "Lượt quét/ngày", value: "955", sub: "+25%" },
    { label: "% quét rủi ro", value: "3.8%", sub: "↓ 1.2%" },
    { label: "COA đã verify", value: "89%", sub: "+5%" },
  ];

  return `
    <div class="card">
      <div class="card__body">
        <div class="kpi-grid">
          ${kpiTiles
            .map(
              (tile) => `
                <div class="kpi-tile">
                  <div class="muted">${tile.label}</div>
                  <div class="value">${tile.value}</div>
                  <div class="muted">${tile.sub}</div>
                </div>
              `
            )
            .join("\n")}
        </div>
      </div>
    </div>
    <div class="chart-grid">
      <div class="card">
        <div class="card__header"><h3 class="card__title">Lượt quét 7 ngày</h3></div>
        <div class="card__body"><div class="chart-wrapper">${createLineChart(scanSeries, "scans")}</div></div>
      </div>
      <div class="card">
        <div class="card__header"><h3 class="card__title">Điểm rủi ro</h3></div>
        <div class="card__body"><div class="chart-wrapper">${createBarChart(riskSeries, "risk")}</div></div>
      </div>
    </div>
    ${renderBatchTableCard()}
  `;
}

function renderBatchTableCard() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Batch gần đây</h3></div>
      <div class="card__body">
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>SKU/GTIN</th>
                <th>Tên SP</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Sự kiện cuối</th>
                <th>Rủi ro</th>
                <th>Cập nhật</th>
                <th>Chuỗi</th>
                <th style="text-align:right;">Hành động</th>
              </tr>
            </thead>
            <tbody>
              ${renderBatchTableRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderEventsSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">EPCIS Events</h3></div>
      <div class="card__body">
        <div class="timeline">${renderTimeline(events)}</div>
      </div>
    </div>
  `;
}

function renderPrintingSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Thiết lập in tem</h3></div>
      <div class="card__body">
        <div class="print-config">
          <div style="display:flex; flex-direction:column; gap:14px;">
            <label class="section-title" style="margin-bottom:4px;">Template</label>
            <select id="printTemplate">
              <option value="A4/48 tem">A4 / 48 tem</option>
              <option value="A6/8 tem">A6 / 8 tem</option>
              <option value="Label cuộn">Label cuộn</option>
            </select>
            <label class="section-title" style="margin-top:4px;">Số tem</label>
            <input type="number" id="printQty" min="0" value="48" />
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button class="btn" style="background:var(--accent-soft); color:var(--accent);">Export PDF</button>
              <button class="btn primary">In ngay</button>
            </div>
          </div>
          <div>
            <label class="section-title" style="display:block; margin-bottom:8px;">Preview</label>
            <div class="print-preview" id="printPreview"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRiskSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Risk &amp; Fraud (demo)</h3></div>
      <div class="card__body" style="color:var(--muted);">Heatmap &amp; case management sẽ đặt ở đây.</div>
    </div>
  `;
}

function renderOrgSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Tổ chức</h3></div>
      <div class="card__body" style="display:flex; flex-direction:column; gap:18px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="material-symbols-rounded" style="font-size:22px; color:var(--accent);">diversity_3</span>
          <div>
            <div class="section-title" style="margin-bottom:4px;">Org A (Đà Nẵng)</div>
            <div class="muted">14 thành viên • 6 vai trò</div>
          </div>
          <button class="btn" style="margin-left:auto; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="font-size:18px;">upload</span>Import
          </button>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="material-symbols-rounded" style="font-size:22px; color:var(--accent);">pin_drop</span>
          <div>
            <div class="section-title" style="margin-bottom:4px;">Địa điểm hoạt động</div>
            <div class="muted">ĐN, Đăk Lăk, Hà Nội</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span class="material-symbols-rounded" style="font-size:22px; color:var(--accent);">fact_check</span>
          <div>
            <div class="section-title" style="margin-bottom:4px;">COA đã xác thực</div>
            <div class="muted">89% tài liệu hợp lệ • cập nhật tuần trước</div>
          </div>
          <button class="btn" style="margin-left:auto; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-rounded" style="font-size:18px;">download</span>Export CSV
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderApiSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">API &amp; Webhooks</h3></div>
      <div class="card__body" style="display:flex; flex-direction:column; gap:16px;">
        <pre class="api-block">POST /api/batch
POST /api/event
GET /api/public/:token_id</pre>
        <button class="btn" style="background:var(--accent-soft); color:var(--accent); display:inline-flex; align-items:center; gap:6px; width:max-content;">
          <span class="material-symbols-rounded" style="font-size:18px;">key</span>Tạo API Key
        </button>
      </div>
    </div>
  `;
}

function renderSettingsSection() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Cài đặt</h3></div>
      <div class="card__body">
        <div class="grid-2">
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label class="section-title" for="settingChain">Chuỗi khối</label>
            <select id="settingChain">
              <option value="base">Base</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
            </select>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label class="section-title" for="settingLang">Ngôn ngữ</label>
            <select id="settingLang">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; grid-column:1 / -1;">
            <label class="section-title" for="settingDesc">Mô tả tổ chức</label>
            <textarea id="settingDesc" rows="4" placeholder="Mô tả ngắn..."></textarea>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPwaBlock() {
  return `
    <div class="card">
      <div class="card__header"><h3 class="card__title">Giả lập màn quét PWA</h3></div>
      <div class="card__body">
        <div class="pwa-grid">
          <div class="phone-shell">
            <div class="phone-screen" id="pwaScreen"></div>
          </div>
          <div>
            <h4 class="section-title">Mô tả &amp; ghi chú</h4>
            <ul class="list">
              <li>Màn hình xác thực hiển thị badge <strong>On-chain</strong>, token, chain.</li>
              <li>Timeline rút gọn + liên kết verify COA (CID/IPFS).</li>
              <li>CTA cho bảo hành &amp; ưu đãi (kết nối TingX/TingVote).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAppShell() {
  const sidebarNav = navItems
    .map(
      (item) => `
        <button type="button" data-nav="${item.id}" ${item.id === "dashboard" ? "class=\"active\"" : ""}>
          <span class="material-symbols-rounded">${item.icon}</span>
          ${item.label}
        </button>
      `
    )
    .join("\n");

  return `
    <div class="app">
      <aside class="sidebar">
        <div class="sidebar__brand">
          <span class="icon"><span class="material-symbols-rounded">qr_code_2</span></span>
          TingTrace
        </div>
        <nav class="sidebar__nav">${sidebarNav}</nav>
        <div class="sidebar__footer">© 2025 Ting</div>
      </aside>
      <div class="main">
        <div class="topbar">
          <div class="topbar__inner">
            <div class="field">
              <input type="text" placeholder="Tìm batch, SKU, COA, CID..." />
              <span class="material-symbols-rounded">search</span>
            </div>
            <select id="orgSwitcher" style="width:200px;">
              <option value="OrgA">Org A (Đà Nẵng)</option>
              <option value="OrgB">Org B (Đăk Lăk)</option>
            </select>
            <div class="topbar__actions">
              <button class="btn ghost" aria-label="Thông báo"><span class="material-symbols-rounded">notifications</span></button>
              <button class="btn primary">Tạo batch</button>
            </div>
          </div>
        </div>
        <div class="content">
          <section class="view active" data-view="dashboard">${renderDashboardSection()}</section>
          <section class="view" data-view="batch">${renderBatchTableCard()}</section>
          <section class="view" data-view="events">${renderEventsSection()}</section>
          <section class="view" data-view="printing">${renderPrintingSection()}</section>
          <section class="view" data-view="risk">${renderRiskSection()}</section>
          <section class="view" data-view="org">${renderOrgSection()}</section>
          <section class="view" data-view="api">${renderApiSection()}</section>
          <section class="view" data-view="settings">${renderSettingsSection()}</section>
          ${renderPwaBlock()}
        </div>
      </div>
    </div>
    <div class="sheet" id="batchSheet" aria-hidden="true">
      <div class="sheet__overlay" data-close-sheet></div>
      <div class="sheet__panel">
        <div class="sheet__header">
          <div>
            <h2 class="sheet__title" id="sheetTitle">Batch detail</h2>
            <div class="sheet__subtitle">Hồ sơ on-chain, EPCIS timeline, Documents &amp; Map</div>
          </div>
          <button class="btn ghost" data-close-sheet><span class="material-symbols-rounded">close</span></button>
        </div>
        <div class="sheet__body" id="sheetBody"></div>
      </div>
    </div>
  `;
}

function updatePrintPreview(quantity) {
  const preview = document.getElementById("printPreview");
  if (!preview) return;
  const total = Math.max(0, Math.min(Number(quantity) || 0, 96));
  const cells = [];
  for (let i = 0; i < total; i += 1) {
    cells.push(`<div class="qr-cell"><span class="material-symbols-rounded">qr_code</span></div>`);
  }
  preview.innerHTML = cells.join("");
}

function setupNavigation() {
  const buttons = document.querySelectorAll('[data-nav]');
  const views = document.querySelectorAll('.view');

  function setView(id) {
    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.nav === id);
    });
    views.forEach((view) => {
      view.classList.toggle('active', view.dataset.view === id);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.nav));
  });

  setView('dashboard');
}

function setupBatchDetails() {
  const sheet = document.getElementById('batchSheet');
  const sheetBody = document.getElementById('sheetBody');
  const sheetTitle = document.getElementById('sheetTitle');

  function closeSheet() {
    sheet?.classList.remove('active');
    sheet?.setAttribute('aria-hidden', 'true');
  }

  function openSheet(id) {
    const batch = batches.find((item) => item.id === id);
    if (!batch) return;
    if (sheetTitle) sheetTitle.textContent = `Batch detail – ${batch.id}`;
    if (sheetBody) sheetBody.innerHTML = renderBatchDetail(batch);
    sheet?.classList.add('active');
    sheet?.setAttribute('aria-hidden', 'false');
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const batchId = target.dataset.batchId;
    if (batchId) {
      event.preventDefault();
      openSheet(batchId);
    }
    if (target.closest('[data-close-sheet]')) {
      event.preventDefault();
      closeSheet();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSheet();
    }
  });
}

function setupPrinting() {
  const qtyInput = document.getElementById('printQty');
  if (!qtyInput) return;
  updatePrintPreview(qtyInput.value);
  qtyInput.addEventListener('input', () => {
    updatePrintPreview(qtyInput.value);
  });
}

function setupPwaSimulation() {
  const screen = document.getElementById('pwaScreen');
  if (!screen) return;
  let step = 0;

  function renderStep() {
    if (step === 0) {
      screen.innerHTML = `
        <div class="phone-step">
          <span class="material-symbols-rounded" style="font-size:64px; color:var(--muted);">qr_code_scanner</span>
          <h4>Quét mã QR trên sản phẩm</h4>
          <p>PWA sẽ xác thực và hiển thị hành trình on-chain</p>
          <button class="btn primary" style="align-self:center;" id="simulateScan">Giả lập quét</button>
        </div>
      `;
    } else {
      screen.innerHTML = `
        <div class="phone-step" style="align-items:flex-start; text-align:left;">
          <div style="display:flex; align-items:center; gap:8px;">
            TingTrace Verified <span class="badge secondary">On-chain</span>
          </div>
          <div class="muted" style="font-size:12px;">Token: 0xabc123:123456 • Chain: Base</div>
          <div class="card" style="width:100%; box-shadow:none; border:1px solid rgba(148,163,184,0.2);">
            <div class="card__body" style="padding:14px 16px;">
              Sản phẩm: <strong>Cà phê Arabica 250g</strong><br />
              Batch: <strong>CAF-2025-11</strong>
            </div>
          </div>
          <div class="card" style="width:100%; box-shadow:none; border:1px solid rgba(148,163,184,0.2);">
            <div class="card__body" style="padding:14px 16px;">
              Hành trình: Harvest → Roast → Ship → Receive<br />
              <button class="btn" style="margin-top:10px; padding:6px 10px; font-size:12px; background:transparent; border:1px solid rgba(148,163,184,0.4);">Xem timeline</button>
            </div>
          </div>
          <div class="card" style="width:100%; box-shadow:none; border:1px solid rgba(148,163,184,0.2);">
            <div class="card__body" style="padding:14px 16px;">
              COA: CID <span class="badge neutral" style="margin-left:4px;">QmX...123</span>
              <button class="btn" style="margin-left:8px; padding:6px 10px; font-size:12px; background:var(--accent-soft); color:var(--accent);">Verify</button>
            </div>
          </div>
          <div style="display:flex; gap:10px; width:100%;">
            <button class="btn primary" style="flex:1;">Kích hoạt bảo hành</button>
            <button class="btn" style="flex:1; background:transparent; border:1px solid rgba(148,163,184,0.4);">Ưu đãi</button>
          </div>
          <div class="phone-actions">
            <button class="btn ghost" id="pwaBack" style="padding:4px 6px;"><span class="material-symbols-rounded">chevron_left</span></button>
            <span>v1.0 • TingTrace PWA</span>
            <button class="btn ghost" style="padding:4px 6px;"><span class="material-symbols-rounded">chevron_right</span></button>
          </div>
        </div>
      `;
    }
  }

  function attachEvents() {
    const simulateButton = document.getElementById('simulateScan');
    if (simulateButton) {
      simulateButton.addEventListener('click', () => {
        step = 1;
        renderStep();
        attachEvents();
      });
    }
    const backButton = document.getElementById('pwaBack');
    if (backButton) {
      backButton.addEventListener('click', () => {
        step = 0;
        renderStep();
        attachEvents();
      });
    }
  }

  renderStep();
  attachEvents();
}

function bootstrap() {
  const root = document.getElementById('root');
  if (!root) return;
  root.innerHTML = renderAppShell();
  setupNavigation();
  setupBatchDetails();
  setupPrinting();
  setupPwaSimulation();
}

bootstrap();
