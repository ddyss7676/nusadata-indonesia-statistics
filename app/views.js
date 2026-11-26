// views.js — one renderer per page. Each returns HTML for the main
// region; main.js wires the controls after every render.

import {
  HEADLINE, POPULATION_SERIES, GDP_GROWTH_SERIES, INFLATION_SERIES,
  LABOUR_SERIES, POVERTY_SERIES, STUNTING_SERIES, HDI_SERIES,
  ISLANDS, PROVINCES, PROVINCE_HDI, INDICATORS, SOURCES,
} from './data.js';
import { lineChart, pairedBarChart, barChart, donutChart, esc } from './charts.js';

function kpiCard(item) {
  return '<a class="kpi" href="#/' + item.route + '">' +
    '<span class="kpi-label">' + esc(item.label) + '</span>' +
    '<span class="kpi-value">' + esc(item.value) + '</span>' +
    '<span class="kpi-detail">' + esc(item.detail) + '</span>' +
    '<span class="kpi-source">' + esc(item.source) + ' · ' + esc(item.year) + '</span></a>';
}

function chartCard(title, unit, source, chartHtml, extra) {
  return '<section class="card chart-card"><div class="card-head"><h3>' + esc(title) + '</h3>' +
    '<span class="unit">' + esc(unit) + '</span></div>' + (extra || '') + chartHtml +
    '<p class="source">Source: ' + esc(source) + '</p></section>';
}

function factList(rows) {
  return '<dl class="facts">' + rows.map((r) =>
    '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>').join('') + '</dl>';
}

export function renderOverview() {
  const kpis = HEADLINE.map(kpiCard).join('');
  const metricButtons = '<div class="metric-row" role="group" aria-label="Choose a chart">' +
    '<button type="button" class="chip is-active" data-metric="population">Population</button>' +
    '<button type="button" class="chip" data-metric="growth">GDP growth</button>' +
    '<button type="button" class="chip" data-metric="inflation">Inflation 2024</button></div>';
  const sections = [
    ['population', 'Population', 'How many people, how fast the country is growing, and where people live.'],
    ['economy', 'Economy', 'Growth, output per person and the monthly path of prices through 2024.'],
    ['work', 'Work', 'Labour force, jobs and unemployment from the August 2024 survey.'],
    ['living', 'Living standards', 'Poverty, the poverty line and the Human Development Index.'],
    ['health', 'Health', 'Life expectancy, infant survival and child nutrition.'],
    ['education', 'Education', 'Expected and completed years of schooling, nationally and by province.'],
    ['regions', 'Regions', 'Island shares, the largest provinces and provincial development gaps.'],
    ['explorer', 'Indicator explorer', 'Search every indicator on this site and filter by topic.'],
  ].map((s) => '<a class="section-card" href="#/' + s[0] + '"><h3>' + s[1] + '</h3><p>' + s[2] + '</p></a>').join('');
  return '<div class="hero"><p class="eyebrow">Indonesia · National statistics</p>' +
    '<h2>The country in numbers, with every figure sourced.</h2>' +
    '<p class="lede">NusaData Atlas gathers the headline statistics of Indonesia — people, economy, work, health and schooling — from BPS, the World Bank and the Ministry of Health. Each number carries its source and year, so you can check it, cite it and act on it.</p></div>' +
    '<div class="kpi-grid">' + kpis + '</div>' +
    '<div class="two-col">' +
    chartCard('Indonesia at a glance', 'pick a measure', 'BPS and World Bank WDI', '<div id="overview-chart">' + lineChart(POPULATION_SERIES) + '</div>', metricButtons) +
    '<section class="card"><div class="card-head"><h3>Where people live</h3><span class="unit">share of population, 2020 census</span></div>' +
    '<div class="donut-wrap">' + donutChart(ISLANDS) + '<ul class="legend">' +
    ISLANDS.map((s) => '<li><strong>' + esc(s.name) + '</strong> — ' + s.share.toFixed(2) + '% · ' + esc(s.people) + '</li>').join('') +
    '</ul></div><p>More than half of all Indonesians live on Java. Sumatra holds about one in five; the remaining islands together hold a little over one in five.</p>' +
    '<p class="source">Source: BPS Census 2020</p></section></div>' +
    '<h2 class="page-title">Explore by topic</h2><div class="section-grid">' + sections + '</div>';
}

export function renderPopulation() {
  const rows = PROVINCES.map((p) => ({ name: p.name, value: Math.round(p.people / 100000) / 10 }));
  return '<h2 class="page-title">Population</h2>' +
    '<p class="lede">Indonesia is the world’s fourth most populous country. The World Bank puts the 2024 population at 283.5 million; the 2020 census counted 270.2 million.</p>' +
    '<div class="toggle-row" role="group" aria-label="Choose a population snapshot">' +
    '<button type="button" class="chip is-active" data-snapshot="2024">2024 estimate</button>' +
    '<button type="button" class="chip" data-snapshot="2020">2020 census</button></div>' +
    '<div id="population-facts">' + factList([
      ['Population', '283,487,931 people (World Bank WDI, 2024)'],
      ['Growth', 'About 0.8% a year in recent estimates'],
      ['Life expectancy', '71.3 years at birth (World Bank WDI, 2024)'],
    ]) + '</div>' +
    chartCard(POPULATION_SERIES.title, POPULATION_SERIES.unit, POPULATION_SERIES.source, lineChart(POPULATION_SERIES)) +
    chartCard('Largest provinces in the 2020 census', 'million people', 'BPS Census 2020', barChart(rows, { format: (v) => v.toFixed(1) + 'm' })) +
    '<section class="card"><h3>Reading the two totals</h3><p>The census is a full count taken in September 2020. The 2024 figure is a mid-year estimate built from census results and later demographic data, which is why the two numbers differ in method as well as size. Density averaged 141 people per km2 in 2020, and the population grew by 1.25% a year between 2010 and 2020.</p></section>';
}

export function renderEconomy() {
  return '<h2 class="page-title">Economy</h2>' +
    '<p class="lede">Growth held near 5% through 2024 while inflation fell back inside the target range. Output reached Rp22,139 trillion, or US$4,960 per person.</p>' +
    factList([
      ['Real GDP growth, 2024', '5.03% (BPS)'],
      ['Nominal GDP, 2024', 'Rp22,138.96 trillion (BPS)'],
      ['GDP in US dollars, 2024', 'US$1,396.3 billion (World Bank WDI)'],
      ['Inflation, December 2024', '1.57% year on year; core 2.26% (BPS CPI)'],
    ]) +
    chartCard(GDP_GROWTH_SERIES.title, GDP_GROWTH_SERIES.unit, GDP_GROWTH_SERIES.source, lineChart(GDP_GROWTH_SERIES, { format: (v) => v.toFixed(2) + '%' })) +
    chartCard(INFLATION_SERIES.title, INFLATION_SERIES.unit, INFLATION_SERIES.source, lineChart(INFLATION_SERIES, { format: (v) => v.toFixed(2) + '%' })) +
    '<section class="card"><h3>What moved prices in 2024</h3><p>Monthly inflation eased from 3.05% in March to 1.55% in November before a small December rise to 1.57%. Food, drink and tobacco added the largest share to December’s increase, while core inflation stayed steady at 2.26%.</p></section>';
}

export function renderWork() {
  return '<h2 class="page-title">Work</h2>' +
    '<p class="lede">The labour force reached 152.11 million in August 2024 and open unemployment fell to 4.91% — below its pre-pandemic level.</p>' +
    factList([
      ['Labour force', '152.11 million people (BPS Sakernas, Aug 2024)'],
      ['In work', '144.64 million people'],
      ['Unemployed', '7.47 million people · 4.91%'],
      ['Participation rate', '70.63% of working-age people'],
      ['Formal work', '42.05% of people in work (60.81 million)'],
    ]) +
    chartCard(LABOUR_SERIES.title, LABOUR_SERIES.unit, LABOUR_SERIES.source, pairedBarChart(LABOUR_SERIES)) +
    '<section class="card"><h3>Where unemployment bites</h3><p>Young people aged 15 to 24 face the highest rate, 17.32%. By education, vocational-school graduates record 9.01%, while workers with primary schooling or less record 2.32%. Participation is 84.66% for men and 56.42% for women.</p></section>';
}

export function renderLiving() {
  const split = [
    { name: 'Urban', value: 6.66 },
    { name: 'National', value: 8.57, highlight: true },
    { name: 'Rural', value: 11.34 },
  ];
  return '<h2 class="page-title">Living standards</h2>' +
    '<p class="lede">Poverty fell to 8.57% in September 2024, the lowest rate BPS has recorded, and the Human Development Index rose to 75.02.</p>' +
    chartCard(POVERTY_SERIES.title, POVERTY_SERIES.unit, POVERTY_SERIES.source, lineChart(POVERTY_SERIES, { format: (v) => v.toFixed(2) + '%' })) +
    chartCard('Poverty by place of residence, September 2024', 'percent of population', 'BPS Susenas', barChart(split, { labelWidth: 120, format: (v) => v.toFixed(2) + '%' })) +
    factList([
      ['People in poverty', '24.06 million (Sep 2024)'],
      ['Poverty line', 'Rp595,242 per person per month; food is 74.50% of it'],
      ['Extreme poverty', '1.13% · 3.17 million people (Sep 2024)'],
      ['Adjusted spending per person', 'Rp12.34 million a year (2024)'],
    ]) +
    chartCard(HDI_SERIES.title, HDI_SERIES.unit, HDI_SERIES.source, lineChart(HDI_SERIES));
}

export function renderHealth() {
  return '<h2 class="page-title">Health</h2>' +
    '<p class="lede">A child born in Indonesia in 2024 can expect to live 71.3 years. Child stunting fell below 20% for the first time in the 2024 nutrition survey.</p>' +
    factList([
      ['Life expectancy at birth', '71.3 years (World Bank WDI, 2024)'],
      ['Women / men, 2023', '73.3 years / 69.0 years (UN via World Bank)'],
      ['Infant mortality', '17.1 deaths per 1,000 live births (UN, 2023)'],
      ['Stunting, under-fives', '19.8% (Kemenkes SSGI, 2024)'],
      ['Wasting, under-fives', '7.4% (Kemenkes SSGI, 2024)'],
      ['Exclusive breastfeeding', '74.73% of infants 0-5 months (SSGI, 2024)'],
    ]) +
    chartCard(STUNTING_SERIES.title, STUNTING_SERIES.unit, STUNTING_SERIES.source, lineChart(STUNTING_SERIES, { format: (v) => v.toFixed(1) + '%' })) +
    '<section class="card"><h3>Two life-expectancy numbers</h3><p>BPS publishes 74.15 years for 2024 from its own life tables, the figure used inside the Human Development Index. The UN-based series published by the World Bank gives 71.3 years. Both are shown here with their sources because the methods differ; compare each series only with itself over time.</p></section>';
}

export function renderEducation() {
  const rows = [
    { name: 'Expected years, 2024', value: 13.21 },
    { name: 'Expected years, 2020', value: 12.98 },
    { name: 'Mean years (25+), 2024', value: 8.85, highlight: true },
    { name: 'Mean years (25+), 2020', value: 8.48 },
  ];
  return '<h2 class="page-title">Education</h2>' +
    '<p class="lede">A child starting school can expect 13.21 years of education, while adults aged 25 and over have completed 8.85 years on average — about junior-secondary level.</p>' +
    chartCard('Years of schooling', 'years', 'BPS, HDI release 2024', barChart(rows, { format: (v) => v.toFixed(2) })) +
    factList([
      ['Expected years of schooling', '13.21 years (BPS, 2024)'],
      ['Mean years of schooling', '8.85 years, age 25+ (BPS, 2024)'],
      ['Highest province (expected)', 'Yogyakarta, 15.70 years'],
      ['Lowest province (expected)', 'Central Papua, 9.63 years'],
    ]) +
    '<section class="card"><h3>Expectation versus completion</h3><p>Expected years describe the schooling a child entering school today would receive if current enrolment patterns hold. Mean years describe what adults have already completed. The gap between 13.21 and 8.85 is the distance between today’s classrooms and yesterday’s.</p></section>';
}

export function renderRegions() {
  const islands = ['All islands'].concat(Array.from(new Set(PROVINCES.map((p) => p.island))));
  const options = islands.map((name) => '<option value="' + esc(name) + '">' + esc(name) + '</option>').join('');
  return '<h2 class="page-title">Regions</h2>' +
    '<p class="lede">Java holds 56.10% of the population on about 7% of the land. Development levels range from 84.15 in Jakarta to 54.43 in Highland Papua.</p>' +
    '<div class="two-col"><section class="card"><div class="card-head"><h3>Island shares</h3><span class="unit">2020 census</span></div>' +
    '<div class="donut-wrap">' + donutChart(ISLANDS) + '<ul class="legend">' +
    ISLANDS.map((s) => '<li><strong>' + esc(s.name) + '</strong> — ' + s.share.toFixed(2) + '% · ' + esc(s.people) + '</li>').join('') +
    '</ul></div><p class="source">Source: BPS Census 2020</p></section>' +
    '<section class="card"><div class="card-head"><h3>Provinces by population</h3><span class="unit">2020 census</span></div>' +
    '<label class="picker">Island <select id="island-picker">' + options + '</select></label>' +
    '<div id="province-table">' + provinceTable('All islands') + '</div></section></div>' +
    chartCard('Human Development Index by province, 2024', 'index 0-100', 'BPS', barChart(PROVINCE_HDI.map((p) => ({ name: p.name, value: p.value, highlight: p.name.indexOf('national') >= 0 })), { format: (v) => v.toFixed(2) }));
}

export function provinceTable(island) {
  const rows = PROVINCES.filter((p) => island === 'All islands' || p.island === island);
  if (!rows.length) return '<p>No province in this list sits on that island.</p>';
  return '<table class="data-table"><thead><tr><th>Province</th><th>Island</th><th>People</th><th>Share</th></tr></thead><tbody>' +
    rows.map((p) => '<tr><td>' + esc(p.name) + '</td><td>' + esc(p.island) + '</td><td class="num">' + p.people.toLocaleString('en-US') + '</td><td class="num">' + esc(p.share) + '</td></tr>').join('') +
    '</tbody></table><p class="source">Source: BPS Census 2020 · selected provinces</p>';
}

export function renderExplorer() {
  const topics = ['All topics'].concat(Array.from(new Set(INDICATORS.map((i) => i.topic))));
  const chips = topics.map((t, i) => '<button type="button" class="chip' + (i === 0 ? ' is-active' : '') + '" data-topic="' + esc(t) + '">' + esc(t) + '</button>').join('');
  return '<h2 class="page-title">Indicator explorer</h2>' +
    '<p class="lede">Every indicator on this site in one place. Search by name, filter by topic, and sort the list — each row keeps its source and year.</p>' +
    '<div class="explorer-controls"><label class="search-box">Search indicators <input id="indicator-search" type="search" placeholder="Try poverty, schooling, Java…" autocomplete="off"></label>' +
    '<label class="picker">Sort <select id="indicator-sort"><option value="name">Name A-Z</option><option value="topic">Topic</option><option value="year">Newest year</option></select></label></div>' +
    '<div class="metric-row" role="group" aria-label="Filter by topic">' + chips + '</div>' +
    '<p id="explorer-count" class="count-line"></p><div id="explorer-results"></div>';
}

export function indicatorRows(rows) {
  if (!rows.length) return '<section class="card"><h3>No indicator matches</h3><p>Try a shorter search word, or clear the topic filter to see the full list again.</p></section>';
  return '<div class="indicator-list">' + rows.map((i) =>
    '<article class="indicator"><div class="indicator-main"><h3>' + esc(i.name) + '</h3><p>' + esc(i.note) + '</p>' +
    '<p class="source">' + esc(i.source) + ' · ' + esc(i.year) + ' · ' + esc(i.topic) + '</p></div>' +
    '<div class="indicator-value"><strong>' + esc(i.value) + '</strong><span>' + esc(i.unit) + '</span></div></article>').join('') + '</div>';
}

export function renderNotes() {
  const sources = SOURCES.map((s) => '<section class="card"><h3>' + esc(s.name) + '</h3><p>' + esc(s.detail) + '</p></section>').join('');
  return '<h2 class="page-title">Data notes and sources</h2>' +
    '<p class="lede">NusaData Atlas is a reading layer over official statistics, not a statistics office. Figures are reproduced from the releases named below, each with its reference year.</p>' +
    '<div class="section-grid">' + sources + '</div>' +
    '<section class="card"><h3>How to cite a figure from this site</h3><p>Name the indicator, its value, its source and its year — for example: “Poverty rate 8.57% (BPS Susenas, September 2024)”. Reference periods differ by indicator: labour figures describe August 2024, poverty September 2024, prices December 2024, and census geography September 2020.</p></section>' +
    '<section class="card"><h3>Methods in brief</h3><p>Census figures are full counts. Sakernas and Susenas figures come from BPS household surveys. World Bank series republish UN demographic estimates and converted national accounts. Where two official methods give different values — life expectancy is the clearest case — this site shows both and labels each.</p></section>';
}
