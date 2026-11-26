// main.js — hash router and control wiring for NusaData Atlas.

import {
  renderOverview, renderPopulation, renderEconomy, renderWork,
  renderLiving, renderHealth, renderEducation, renderRegions,
  renderExplorer, renderNotes, provinceTable, indicatorRows,
} from './views.js';
import { POPULATION_SERIES, GDP_GROWTH_SERIES, INFLATION_SERIES, INDICATORS } from './data.js';
import { lineChart } from './charts.js';

const ROUTES = {
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  work: renderWork,
  living: renderLiving,
  health: renderHealth,
  education: renderEducation,
  regions: renderRegions,
  explorer: renderExplorer,
  notes: renderNotes,
};

const mainEl = document.getElementById('app-main');
const navLinks = Array.from(document.querySelectorAll('[data-route]'));

function currentRoute() {
  const hash = window.location.hash.replace(/^#\//, '');
  return ROUTES[hash] ? hash : 'overview';
}

function markActiveNav(route) {
  navLinks.forEach((link) => {
    const active = link.getAttribute('data-route') === route;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function wireOverviewChart() {
  const slot = document.getElementById('overview-chart');
  if (!slot) return;
  const seriesByMetric = {
    population: () => lineChart(POPULATION_SERIES),
    growth: () => lineChart(GDP_GROWTH_SERIES, { format: (v) => v.toFixed(2) + '%' }),
    inflation: () => lineChart(INFLATION_SERIES, { format: (v) => v.toFixed(2) + '%' }),
  };
  document.querySelectorAll('[data-metric]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-metric]').forEach((b) => b.classList.remove('is-active'));
      button.classList.add('is-active');
      slot.innerHTML = seriesByMetric[button.getAttribute('data-metric')]();
    });
  });
}

function wirePopulationToggle() {
  const facts = document.getElementById('population-facts');
  if (!facts) return;
  const snapshots = {
    '2024': [['Population', '283,487,931 people (World Bank WDI, 2024)'], ['Growth', 'About 0.8% a year in recent estimates'], ['Life expectancy', '71.3 years at birth (World Bank WDI, 2024)']],
    '2020': [['Population', '270,203,917 people (BPS Census, Sep 2020)'], ['Growth 2010-2020', '1.25% a year on average'], ['Density', '141 people per km2; men 50.58% of the population']],
  };
  document.querySelectorAll('[data-snapshot]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-snapshot]').forEach((b) => b.classList.remove('is-active'));
      button.classList.add('is-active');
      const rows = snapshots[button.getAttribute('data-snapshot')];
      facts.innerHTML = '<dl class="facts">' + rows.map((r) => '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>').join('') + '</dl>';
    });
  });
}

function wireRegionPicker() {
  const picker = document.getElementById('island-picker');
  const table = document.getElementById('province-table');
  if (!picker || !table) return;
  picker.addEventListener('change', () => {
    table.innerHTML = provinceTable(picker.value);
  });
}

function wireExplorer() {
  const search = document.getElementById('indicator-search');
  const sort = document.getElementById('indicator-sort');
  const results = document.getElementById('explorer-results');
  const count = document.getElementById('explorer-count');
  if (!search || !results) return;
  let topic = 'All topics';
  function yearKey(item) {
    const match = String(item.year).match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  }
  function refresh() {
    const query = search.value.trim().toLowerCase();
    let rows = INDICATORS.filter((item) => {
      const inTopic = topic === 'All topics' || item.topic === topic;
      const text = (item.name + ' ' + item.topic + ' ' + item.note + ' ' + item.source).toLowerCase();
      return inTopic && text.indexOf(query) >= 0;
    });
    if (sort.value === 'topic') rows.sort((a, b) => a.topic.localeCompare(b.topic) || a.name.localeCompare(b.name));
    else if (sort.value === 'year') rows.sort((a, b) => yearKey(b) - yearKey(a) || a.name.localeCompare(b.name));
    else rows.sort((a, b) => a.name.localeCompare(b.name));
    results.innerHTML = indicatorRows(rows);
    count.textContent = rows.length + (rows.length === 1 ? ' indicator' : ' indicators') + ' shown';
  }
  search.addEventListener('input', refresh);
  sort.addEventListener('change', refresh);
  document.querySelectorAll('[data-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-topic]').forEach((b) => b.classList.remove('is-active'));
      button.classList.add('is-active');
      topic = button.getAttribute('data-topic');
      refresh();
    });
  });
  refresh();
}

function render() {
  const route = currentRoute();
  mainEl.innerHTML = ROUTES[route]();
  markActiveNav(route);
  wireOverviewChart();
  wirePopulationToggle();
  wireRegionPicker();
  wireExplorer();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
