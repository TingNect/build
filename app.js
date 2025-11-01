const performanceData = [
  { month: '01/23', value: 3.2 },
  { month: '02/23', value: 3.35 },
  { month: '03/23', value: 3.42 },
  { month: '04/23', value: 3.57 },
  { month: '05/23', value: 3.62 },
  { month: '06/23', value: 3.91 },
  { month: '07/23', value: 4.02 },
  { month: '08/23', value: 4.18 },
  { month: '09/23', value: 4.25 },
  { month: '10/23', value: 4.31 },
  { month: '11/23', value: 4.22 },
  { month: '12/23', value: 4.28 }
];

const allocationData = [
  { name: 'Bất động sản thương mại', value: 36, color: '#4f46e5' },
  { name: 'Cơ sở hạ tầng', value: 24, color: '#0ea5e9' },
  { name: 'Thiết bị công nghiệp', value: 18, color: '#22c55e' },
  { name: 'Năng lượng tái tạo', value: 14, color: '#f59e0b' },
  { name: 'Khác', value: 8, color: '#a855f7' }
];

const pipelineItems = [
  {
    title: 'Ký hợp đồng tài trợ chuỗi cung ứng',
    timestamp: '25 Thg 05, 10:20',
    summary: 'Đang hoàn tất rà soát pháp lý với đối tác Singapore.'
  },
  {
    title: 'Thẩm định dự án năng lượng mặt trời',
    timestamp: '24 Thg 05, 16:05',
    summary: 'Hoàn tất định giá tài sản, chờ phê duyệt hội đồng.'
  },
  {
    title: 'Tái cấu trúc danh mục EU Logistics',
    timestamp: '23 Thg 05, 09:45',
    summary: 'Đạt tỉ lệ lấp đầy mới 92%, chuẩn bị báo cáo nhà đầu tư.'
  }
];

const activities = [
  {
    title: 'Chuyển tiền lợi tức tháng 4',
    detail: 'Trị giá $12.8K gửi tới 214 nhà đầu tư.',
    time: '2 giờ trước'
  },
  {
    title: 'Cập nhật dữ liệu tài sản London Hub',
    detail: 'Điểm tín dụng tăng từ BBB lên BBB+.',
    time: '6 giờ trước'
  },
  {
    title: 'Nhắc nộp báo cáo ESG Q2',
    detail: 'Hạn chót ngày 30/05 cho các tài sản liên quan.',
    time: 'Hôm qua'
  }
];

const tasks = [
  {
    title: 'Hoàn thiện mô hình định giá nhà kho Bắc Mỹ',
    owner: 'Quang Lê',
    status: 'in-progress',
    due: 'Hạn: 28/05'
  },
  {
    title: 'Rà soát hợp đồng bảo hiểm tài sản EMEA',
    owner: 'Minh Trần',
    status: 'blocked',
    due: 'Hạn: 27/05'
  },
  {
    title: 'Gửi báo cáo phân bổ quý cho nhà đầu tư',
    owner: 'Lan Anh',
    status: 'done',
    due: 'Hoàn thành 22/05'
  }
];

function createSvg(width = 600, height = 240) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  return svg;
}

function renderPerformanceChart(container, data) {
  const svg = createSvg(600, 260);
  const padding = { top: 32, right: 24, bottom: 50, left: 48 };
  const innerWidth = 600 - padding.left - padding.right;
  const innerHeight = 260 - padding.top - padding.bottom;
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const min = Math.min(...data.map((d) => d.value)) * 0.95;

  const points = data.map((d, i) => {
    const x = padding.left + (innerWidth / (data.length - 1)) * i;
    const y =
      padding.top + innerHeight - ((d.value - min) / (max - min)) * innerHeight;
    return { x, y, label: d.month, value: d.value };
  });

  const gradientId = 'line-gradient';
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', gradientId);
  gradient.setAttribute('x1', '0');
  gradient.setAttribute('x2', '0');
  gradient.setAttribute('y1', '0');
  gradient.setAttribute('y2', '1');

  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', 'rgba(79, 70, 229, 0.55)');
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', 'rgba(79, 70, 229, 0.05)');
  gradient.append(stop1, stop2);
  defs.append(gradient);
  svg.append(defs);

  const areaPath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  area.setAttribute(
    'd',
    `${areaPath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`
  );
  area.setAttribute('fill', `url(#${gradientId})`);
  area.setAttribute('stroke', 'none');
  svg.append(area);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', areaPath);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#6366f1');
  line.setAttribute('stroke-width', '3');
  line.setAttribute('stroke-linecap', 'round');
  svg.append(line);

  const circlesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  points.forEach((point) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', '#818cf8');
    circle.setAttribute('stroke', '#c7d2fe');
    circle.setAttribute('stroke-width', '2');

    const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    labelBg.setAttribute('x', point.x - 30);
    labelBg.setAttribute('y', point.y - 44);
    labelBg.setAttribute('rx', '8');
    labelBg.setAttribute('width', '60');
    labelBg.setAttribute('height', '24');
    labelBg.setAttribute('fill', 'rgba(15, 23, 42, 0.9)');
    labelBg.setAttribute('stroke', 'rgba(129, 140, 248, 0.35)');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', point.x);
    text.setAttribute('y', point.y - 28);
    text.setAttribute('fill', '#e0e7ff');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', '600');
    text.textContent = `$${point.value.toFixed(2)}M`;

    labelBg.classList.add('point-label');
    text.classList.add('point-label-text');

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.append(labelBg, text, circle);
    circlesGroup.append(group);
  });

  svg.append(circlesGroup);

  const axisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  axisGroup.setAttribute('fill', 'none');
  axisGroup.setAttribute('stroke-width', '1');
  axisGroup.setAttribute('stroke', 'rgba(148, 163, 184, 0.25)');

  const step = innerHeight / 4;
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + innerHeight - step * i;
    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineEl.setAttribute('x1', padding.left);
    lineEl.setAttribute('x2', padding.left + innerWidth);
    lineEl.setAttribute('y1', y);
    lineEl.setAttribute('y2', y);
    lineEl.setAttribute('stroke-dasharray', '4 6');
    axisGroup.append(lineEl);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', padding.left - 16);
    label.setAttribute('y', y + 4);
    label.setAttribute('fill', '#94a3b8');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'end');
    const value = min + ((max - min) / 4) * i;
    label.textContent = `$${value.toFixed(2)}M`;
    axisGroup.append(label);
  }

  points.forEach((point) => {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', point.x);
    label.setAttribute('y', padding.top + innerHeight + 24);
    label.setAttribute('fill', '#94a3b8');
    label.setAttribute('font-size', '12');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = point.label;
    axisGroup.append(label);
  });

  svg.append(axisGroup);
  container.append(svg);
}

function renderAllocationChart(container, legendContainer, data) {
  const maxValue = Math.max(...data.map((d) => d.value));
  data.forEach((item) => {
    const bar = document.createElement('div');
    bar.className = 'allocation-bar';
    bar.style.setProperty('--bar-color', item.color);
    bar.innerHTML = `
      <div class="allocation-label">
        <strong>${item.name}</strong>
        <span>${item.value}%</span>
      </div>
      <div class="allocation-track">
        <span style="width: ${(item.value / maxValue) * 100}%"></span>
      </div>
    `;
    container.append(bar);

    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.innerHTML = `
      <span class="legend-color" style="background:${item.color}"></span>
      ${item.name}
    `;
    legendContainer.append(legendItem);
  });
}

function renderTimeline(container, items) {
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    li.innerHTML = `
      <strong>${item.title}</strong>
      <span>${item.timestamp}</span>
      <p>${item.summary}</p>
    `;
    container.append(li);
  });
}

function renderList(container, items, className) {
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = className;

    if (className === 'activity-item') {
      li.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.detail}</span>
        <span>${item.time}</span>
      `;
    } else if (className === 'task-item') {
      li.dataset.status = item.status;
      li.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.owner}</span>
        <span>${item.due}</span>
      `;
    }

    container.append(li);
  });
}

function init() {
  const performanceChart = document.getElementById('performance-chart');
  const allocationChart = document.getElementById('allocation-chart');
  const allocationLegend = document.getElementById('allocation-legend');
  const pipelineList = document.getElementById('pipeline-list');
  const activityList = document.getElementById('activity-list');
  const taskList = document.getElementById('task-list');

  renderPerformanceChart(performanceChart, performanceData);
  renderAllocationChart(allocationChart, allocationLegend, allocationData);
  renderTimeline(pipelineList, pipelineItems);
  renderList(activityList, activities, 'activity-item');
  renderList(taskList, tasks, 'task-item');
}

document.addEventListener('DOMContentLoaded', init);
