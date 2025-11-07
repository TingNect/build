const metrics = [
  { label: "TVL đã token hóa", value: "$48.5M", trend: "+8.2% MoM" },
  { label: "Nhà đầu tư được whitelist", value: "5,420", trend: "KYC hoàn tất" },
  { label: "Tài sản đã tất toán", value: "162", trend: "12 vùng địa lý" },
  { label: "Tỷ lệ phân phối", value: "96.4%", trend: "Hoàn thành vòng trước" },
];

const timeline = [
  {
    phase: "Whitelisting",
    date: "03/12 - 10/12",
    status: "done",
    detail: "Xác thực hồ sơ & hạn mức đầu tư theo vai trò.",
  },
  {
    phase: "KYC & Compliance",
    date: "11/12 - 17/12",
    status: "done",
    detail: "Đối chiếu tài liệu pháp lý, kiểm tra nguồn vốn.",
  },
  {
    phase: "Raise Phase",
    date: "18/12 - 25/12",
    status: "active",
    detail: "Mở đăng ký đầu tư, phân bổ theo tier, thanh toán on-chain.",
  },
  {
    phase: "Settlement",
    date: "26/12 - 08/01",
    status: "upcoming",
    detail: "Khởi tạo SPV, phát hành chứng chỉ và khoá quỹ bảo chứng.",
  },
  {
    phase: "Secondary Market",
    date: "Q1/2025",
    status: "upcoming",
    detail: "Niêm yết trên TingX, mở giao dịch thứ cấp có kiểm soát.",
  },
];

const upcomingProjects = [
  {
    name: "Ting Coffee Estates",
    badge: "Đang mở",
    type: "Trái phiếu doanh nghiệp",
    raise: "$3.2M",
    stage: "Batch 2/2025",
    location: "Đà Lạt • 18 tháng",
    highlights: ["Lợi suất dự kiến 12.4%/năm", "Tài sản đảm bảo: 120ha trang trại"],
    progress: 64,
    chain: "Base L3",
  },
  {
    name: "Solar Rooftop Central",
    badge: "Sắp mở",
    type: "Leaseback",
    raise: "$1.1M",
    stage: "Pre-Launch",
    location: "Quảng Nam • 24 tháng",
    highlights: ["IRR mục tiêu 9.8%", "Đã ký PPA 15 năm"],
    progress: 32,
    chain: "Optimism",
  },
  {
    name: "Highlands Cacao Reserve",
    badge: "Đang thẩm định",
    type: "Revenue Sharing",
    raise: "$2.6M",
    stage: "Due Diligence",
    location: "Gia Lai • 30 tháng",
    highlights: ["Hợp đồng xuất khẩu Châu Âu", "Định giá tài sản độc lập"],
    progress: 18,
    chain: "Polygon",
  },
];

const tierList = [
  {
    name: "Explorer",
    stake: ">= 500 $TING",
    allocation: "2,500 USDC",
    benefits: ["Whitelist tự động", "Bản tin phân tích hàng tuần"],
    color: "tier-explorer",
  },
  {
    name: "Navigator",
    stake: ">= 2,500 $TING",
    allocation: "12,000 USDC",
    benefits: ["Phân bổ ưu tiên", "Bộ dữ liệu quản trị nội bộ", "Phòng họp trực tiếp với issuer"],
    color: "tier-navigator",
  },
  {
    name: "Governor",
    stake: ">= 10,000 $TING",
    allocation: "Không giới hạn",
    benefits: ["Đồng thiết kế sản phẩm", "Quyền vote TingDAO", "Quỹ bảo chứng bảo vệ vốn"],
    color: "tier-governor",
  },
];

const dueDiligence = [
  {
    title: "Thẩm định pháp lý",
    points: [
      "SPV tại Singapore, hợp đồng ủy thác 2 chiều",
      "Bản quyền đất & chứng thư tài sản số hoá",
      "Bảo hiểm trách nhiệm nghề nghiệp Marsh",
    ],
  },
  {
    title: "Giám sát hoạt động",
    points: [
      "Oracle kiểm toán số liệu đầu ra (Chainlink)",
      "Định vị IoT theo lô hàng / harvest batch",
      "Báo cáo ESG chuẩn IFRS S2",
    ],
  },
];

const releaseSchedule = [
  { label: "TGE", percentage: "15%", note: "Unlock khi settle SPV" },
  { label: "Cliff", percentage: "2 tháng", note: "Khoá tạo thanh khoản ban đầu" },
  { label: "Vesting", percentage: "7.5% / quý", note: "Linear cho 12 tháng" },
  { label: "Secondary Pool", percentage: "10%", note: "Cấp cho AMM của TingX" },
];

const faqItems = [
  {
    question: "Ai có thể tham gia Ting RWA Launchpad?",
    answer:
      "Nhà đầu tư đáp ứng điều kiện pháp lý tại Việt Nam hoặc quốc tế, hoàn tất quy trình KYC/KYB và nắm giữ tối thiểu 500 $TING để đủ điều kiện whitelist.",
  },
  {
    question: "Tài sản được lưu ký như thế nào?",
    answer:
      "Mỗi deal được tách biệt trong SPV riêng, tài sản bảo chứng ký quỹ tại ngân hàng đối tác và chứng nhận quyền lợi được ghi nhận on-chain dưới dạng token chuẩn ERC-3643.",
  },
  {
    question: "Làm sao để rút vốn sớm?",
    answer:
      "Sau giai đoạn cliff, nhà đầu tư có thể giao dịch token trên TingX hoặc chuyển nhượng OTC thông qua smart contract escrow với mức phí 0.35%.",
  },
  {
    question: "Ting hỗ trợ issuer ra sao?",
    answer:
      "Đội ngũ Ting hỗ trợ từ cấu trúc pháp lý, phát hành tài sản số, thiết kế mô hình dòng tiền đến chiến dịch marketing và phân phối cộng đồng.",
  },
];

function renderMetricCards() {
  return metrics
    .map(
      (metric) => `
        <div class="metric-card">
          <div class="metric-card__value">${metric.value}</div>
          <div class="metric-card__label">${metric.label}</div>
          <div class="metric-card__trend">${metric.trend}</div>
        </div>
      `
    )
    .join("\n");
}

function renderTimeline() {
  return timeline
    .map(
      (item, index) => `
        <div class="timeline-step timeline-step--${item.status}">
          <div class="timeline-step__indicator">${index + 1}</div>
          <div class="timeline-step__body">
            <div class="timeline-step__phase">${item.phase}</div>
            <div class="timeline-step__date">${item.date}</div>
            <p>${item.detail}</p>
          </div>
        </div>
      `
    )
    .join("\n");
}

function renderProjects() {
  return upcomingProjects
    .map(
      (project) => `
        <article class="project-card">
          <div class="project-card__header">
            <span class="badge badge--soft">${project.badge}</span>
            <span class="project-card__stage">${project.stage}</span>
          </div>
          <h3>${project.name}</h3>
          <div class="project-card__meta">${project.type} • ${project.location}</div>
          <div class="project-card__raise">${project.raise} cần huy động</div>
          <ul class="project-card__highlights">
            ${project.highlights.map((text) => `<li>${text}</li>`).join("")}
          </ul>
          <div class="project-card__progress">
            <div class="project-card__progress-bar" style="width:${project.progress}%"></div>
          </div>
          <div class="project-card__footer">
            <span>${project.progress}% đã đăng ký</span>
            <span class="badge badge--outline">${project.chain}</span>
          </div>
          <button class="btn btn--ghost">Xem chi tiết</button>
        </article>
      `
    )
    .join("\n");
}

function renderTiers() {
  return tierList
    .map(
      (tier) => `
        <article class="tier-card ${tier.color}">
          <div class="tier-card__header">
            <span class="badge badge--glow">Tier</span>
            <h3>${tier.name}</h3>
          </div>
          <div class="tier-card__allocation">
            <span>Phân bổ tối đa</span>
            <strong>${tier.allocation}</strong>
          </div>
          <div class="tier-card__stake">Yêu cầu stake ${tier.stake}</div>
          <ul>
            ${tier.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
          </ul>
          <button class="btn btn--secondary">Đăng ký tier</button>
        </article>
      `
    )
    .join("\n");
}

function renderDueDiligence() {
  return dueDiligence
    .map(
      (item) => `
        <article class="diligence-card">
          <h3>${item.title}</h3>
          <ul>
            ${item.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("\n");
}

function renderReleaseSchedule() {
  return releaseSchedule
    .map(
      (item) => `
        <tr>
          <td>${item.label}</td>
          <td>${item.percentage}</td>
          <td>${item.note}</td>
        </tr>
      `
    )
    .join("\n");
}

function renderFaq() {
  return faqItems
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("\n");
}

function renderHeroPanel() {
  return `
    <div class="hero-panel">
      <div class="hero-panel__header">
        <span class="badge badge--outline">Đợt mở bán</span>
        <span class="hero-panel__date">Kỳ #06 • 18/12 - 25/12</span>
      </div>
      <div class="hero-panel__body">
        <div>
          <div class="hero-panel__value">$1,250,000</div>
          <div class="hero-panel__label">Mục tiêu raise</div>
        </div>
        <div>
          <div class="hero-panel__value">72%</div>
          <div class="hero-panel__label">Đã cam kết</div>
        </div>
      </div>
      <div class="hero-panel__footer">
        <div class="hero-panel__avatars">
          <span class="avatar">LT</span>
          <span class="avatar">HN</span>
          <span class="avatar">QL</span>
          <span class="avatar">+128</span>
        </div>
        <button class="btn btn--primary">Khóa suất phân bổ</button>
      </div>
    </div>
  `;
}

function bootstrap() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div class="launchpad">
      <header class="hero" id="overview">
        <div class="hero__overlay"></div>
        <nav class="nav">
          <div class="nav__brand">Ting<span>Launchpad</span></div>
          <div class="nav__links">
            <a href="#overview">Tổng quan</a>
            <a href="#projects">Dự án</a>
            <a href="#process">Quy trình</a>
            <a href="#tiers">Tier</a>
            <a href="#faq">FAQ</a>
            <a href="#apply" class="btn btn--ghost">Tài liệu</a>
          </div>
        </nav>
        <div class="hero__inner">
          <div class="hero__copy">
            <span class="badge badge--glow">RWA Launchpad của Ting</span>
            <h1>Token hóa tài sản thực, kết nối dòng vốn toàn cầu.</h1>
            <p>
              Launchpad giúp issuer đưa tài sản vật lý lên on-chain với hạ tầng pháp lý, quản trị rủi ro và phân phối minh bạch.
              Nhà đầu tư nhận dòng tiền thật, kiểm toán thời gian thực.
            </p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#apply">Khởi chạy dự án</a>
              <a class="btn btn--ghost" href="#projects">Khám phá deal đang mở</a>
            </div>
            <div class="hero__metrics">
              ${renderMetricCards()}
            </div>
          </div>
          ${renderHeroPanel()}
        </div>
      </header>
      <main class="main">
        <section class="section spotlight" id="spotlight">
          <div class="section__head">
            <span class="section__badge">Spotlight</span>
            <h2>Pacific Coffee Estates</h2>
            <p>Token hóa dòng tiền từ chuỗi cung ứng cà phê đặc sản, hợp tác cùng SPV Ting Agritech Fund.</p>
          </div>
          <div class="spotlight__grid">
            <div class="spotlight__summary">
              <ul>
                <li><strong>Issuer:</strong> Pacific Roastery JSC • EY kiểm toán</li>
                <li><strong>Dòng tiền:</strong> Doanh thu bán hạt rang & hợp đồng xuất khẩu 24 tháng.</li>
                <li><strong>Bảo chứng:</strong> Quyền sử dụng đất, kho hàng và hợp đồng mua trước (offtake) đã ký.</li>
              </ul>
              <div class="spotlight__pillars">
                <div>
                  <span class="label">Dòng tiền dự kiến</span>
                  <strong>13.2% APR</strong>
                  <p>Phân phối hàng quý qua smart contract settlement.</p>
                </div>
                <div>
                  <span class="label">Chứng nhận</span>
                  <strong>Rainforest • ISO 22000</strong>
                  <p>Tích hợp dữ liệu truy xuất nguồn gốc TingTrace.</p>
                </div>
                <div>
                  <span class="label">Hình thức</span>
                  <strong>Token hóa trái phiếu</strong>
                  <p>Chuẩn ERC-3643, hỗ trợ quỹ hưu trí & pháp nhân.</p>
                </div>
              </div>
            </div>
            <aside class="spotlight__card">
              <div class="spotlight__row">
                <span>Giá mở bán</span>
                <strong>1,000 USDC / token</strong>
              </div>
              <div class="spotlight__row">
                <span>Minimum</span>
                <strong>5 token</strong>
              </div>
              <div class="spotlight__row">
                <span>Quyền lợi</span>
                <strong>Chia sẻ lợi nhuận + quyền vote quỹ bảo chứng</strong>
              </div>
              <hr />
              <div class="spotlight__stack">
                <div>
                  <span>SPV</span>
                  <strong>Ting SPV #18</strong>
                </div>
                <div>
                  <span>Chuỗi</span>
                  <strong>Base L3</strong>
                </div>
                <div>
                  <span>Kỳ hạn</span>
                  <strong>24 tháng</strong>
                </div>
              </div>
              <button class="btn btn--primary">Tham gia vòng Raise</button>
              <button class="btn btn--ghost">Tải factsheet</button>
            </aside>
          </div>
        </section>

        <section class="section timeline" id="process">
          <div class="section__head">
            <span class="section__badge">Quy trình</span>
            <h2>Hành trình on-board tài sản thực</h2>
            <p>Mô hình 4 bước của Ting đảm bảo tính pháp lý, minh bạch dữ liệu và thanh khoản thứ cấp.</p>
          </div>
          <div class="timeline__grid">${renderTimeline()}</div>
        </section>

        <section class="section projects" id="projects">
          <div class="section__head">
            <span class="section__badge">Pipeline</span>
            <h2>Deal đang mở & chuẩn bị mở bán</h2>
            <p>Danh mục đa dạng từ nông nghiệp, năng lượng tái tạo đến hạ tầng số.</p>
          </div>
          <div class="projects__grid">${renderProjects()}</div>
        </section>

        <section class="section tiers" id="tiers">
          <div class="section__head">
            <span class="section__badge">Tier nhà đầu tư</span>
            <h2>Chọn cấu trúc phù hợp với chiến lược của bạn</h2>
            <p>Staking $TING mang lại phân bổ, quyền biểu quyết và quyền truy cập dữ liệu riêng tư.</p>
          </div>
          <div class="tiers__grid">${renderTiers()}</div>
        </section>

        <section class="section diligence" id="compliance">
          <div class="section__head">
            <span class="section__badge">Compliance</span>
            <h2>Khung kiểm soát & vận hành đa tầng</h2>
            <p>Hệ thống thẩm định xuyên suốt nhằm bảo vệ lợi ích nhà đầu tư và bảo chứng nguồn vốn.</p>
          </div>
          <div class="diligence__grid">${renderDueDiligence()}</div>
        </section>

        <section class="section release" id="tokenomics">
          <div class="section__head">
            <span class="section__badge">Tokenomics</span>
            <h2>Lịch phân phối & tạo thanh khoản</h2>
            <p>Cân bằng lợi ích dài hạn giữa issuer, nhà đầu tư và quỹ bảo chứng Ting Protect.</p>
          </div>
          <div class="release__content">
            <div class="release__table">
              <table>
                <thead>
                  <tr>
                    <th>Giai đoạn</th>
                    <th>Tỷ lệ</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>${renderReleaseSchedule()}</tbody>
              </table>
            </div>
            <div class="release__note">
              <h3>Phân bổ quỹ</h3>
              <ul>
                <li>65% phân phối cho nhà đầu tư đã KYC & stake.</li>
                <li>20% cấp cho issuer theo milestone KPI.</li>
                <li>15% nạp vào quỹ bảo chứng & vận hành Ting.</li>
              </ul>
              <p class="muted">Tất cả dòng tiền được theo dõi realtime qua TingTrace và đồng bộ sang báo cáo IFRS.</p>
            </div>
          </div>
        </section>

        <section class="section faq" id="faq">
          <div class="section__head">
            <span class="section__badge">Hỏi đáp</span>
            <h2>Giải đáp nhanh cho nhà đầu tư & issuer</h2>
          </div>
          <div class="faq__grid">${renderFaq()}</div>
        </section>

        <section class="section cta" id="apply">
          <div class="cta__inner">
            <h2>Bắt đầu hành trình token hóa cùng Ting</h2>
            <p>Gửi thông tin dự án hoặc đăng ký whitelist nhà đầu tư. Đội ngũ của chúng tôi sẽ liên hệ trong 24 giờ.</p>
            <div class="cta__actions">
              <a class="btn btn--primary" href="mailto:launchpad@ting.finance">Gửi pitch deck</a>
              <a class="btn btn--ghost" href="https://ting.finance" target="_blank" rel="noreferrer">Xem tài liệu pháp lý</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;

  setupSmoothScroll();
}

function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"], .hero__actions a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

bootstrap();
