// data.js — every figure shown by NusaData Atlas, with its source and year.
// Values were checked against BPS releases, World Bank WDI and Kemenkes
// SSGI 2024 during the build; nothing here is estimated by the site itself.

export const HEADLINE = [
  { id: 'pop', label: 'Population', value: '283.5 million', detail: '283,487,931 people', source: 'World Bank WDI', year: '2024', route: 'population' },
  { id: 'gdp-growth', label: 'GDP growth', value: '5.03%', detail: 'year on year, full year', source: 'BPS', year: '2024', route: 'economy' },
  { id: 'gdp-capita', label: 'GDP per person', value: 'US$4,960', detail: 'Rp78.62 million', source: 'BPS', year: '2024', route: 'economy' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', detail: '24.06 million people', source: 'BPS Susenas', year: 'Sep 2024', route: 'living' },
  { id: 'unemployment', label: 'Open unemployment', value: '4.91%', detail: '7.47 million people', source: 'BPS Sakernas', year: 'Aug 2024', route: 'work' },
  { id: 'inflation', label: 'Inflation', value: '1.57%', detail: 'year on year, December', source: 'BPS CPI', year: 'Dec 2024', route: 'economy' },
  { id: 'life', label: 'Life expectancy', value: '71.3 years', detail: 'at birth', source: 'World Bank WDI', year: '2024', route: 'health' },
  { id: 'hdi', label: 'Human Development Index', value: '75.02', detail: 'scale 0 to 100, high category', source: 'BPS', year: '2024', route: 'living' },
];

export const POPULATION_SERIES = {
  title: 'Population, 2021 to 2024',
  unit: 'million people',
  source: 'World Bank WDI (SP.POP.TOTL)',
  points: [
    { year: '2021', value: 276.76 },
    { year: '2022', value: 278.83 },
    { year: '2023', value: 281.19 },
    { year: '2024', value: 283.49 },
  ],
};

export const GDP_GROWTH_SERIES = {
  title: 'Real GDP growth, 2021 to 2024',
  unit: 'percent per year',
  source: 'BPS national accounts',
  points: [
    { year: '2021', value: 3.70 },
    { year: '2022', value: 5.31 },
    { year: '2023', value: 5.05 },
    { year: '2024', value: 5.03 },
  ],
};

export const INFLATION_SERIES = {
  title: 'Consumer price inflation in 2024, month by month',
  unit: 'percent, year on year',
  source: 'BPS CPI release, December 2024',
  points: [
    { year: 'Jan', value: 2.57 }, { year: 'Feb', value: 2.75 },
    { year: 'Mar', value: 3.05 }, { year: 'Apr', value: 3.00 },
    { year: 'May', value: 2.84 }, { year: 'Jun', value: 2.51 },
    { year: 'Jul', value: 2.13 }, { year: 'Aug', value: 2.12 },
    { year: 'Sep', value: 1.84 }, { year: 'Oct', value: 1.71 },
    { year: 'Nov', value: 1.55 }, { year: 'Dec', value: 1.57 },
  ],
};

export const LABOUR_SERIES = {
  title: 'Labour force and people in work, August each year',
  unit: 'million people',
  source: 'BPS Sakernas',
  points: [
    { year: '2019', value: 135.86, second: 128.76 },
    { year: '2020', value: 138.22, second: 128.45 },
    { year: '2021', value: 140.15, second: 131.05 },
    { year: '2022', value: 143.72, second: 135.30 },
    { year: '2023', value: 147.71, second: 139.85 },
    { year: '2024', value: 152.11, second: 144.64 },
  ],
};

export const POVERTY_SERIES = {
  title: 'Poverty rate, March 2023 to September 2024',
  unit: 'percent of population',
  source: 'BPS Susenas',
  points: [
    { year: 'Mar 2023', value: 9.36 },
    { year: 'Mar 2024', value: 9.03 },
    { year: 'Sep 2024', value: 8.57 },
  ],
};

export const STUNTING_SERIES = {
  title: 'Stunting among children under five',
  unit: 'percent',
  source: 'Kemenkes Riskesdas and SSGI',
  points: [
    { year: '2013', value: 37.2 }, { year: '2018', value: 30.8 },
    { year: '2019', value: 27.7 }, { year: '2021', value: 24.4 },
    { year: '2022', value: 21.6 }, { year: '2023', value: 21.5 },
    { year: '2024', value: 19.8 },
  ],
};

export const HDI_SERIES = {
  title: 'Human Development Index (IPM)',
  unit: 'index, 0 to 100',
  source: 'BPS',
  points: [
    { year: '2020', value: 72.81 },
    { year: '2021', value: 73.16 },
    { year: '2023', value: 74.39 },
    { year: '2024', value: 75.02 },
  ],
};

export const ISLANDS = [
  { name: 'Java', share: 56.10, people: '151.6 million' },
  { name: 'Sumatra', share: 21.68, people: '58.6 million' },
  { name: 'All other islands', share: 22.22, people: '60.0 million' },
];

export const PROVINCES = [
  { name: 'West Java', island: 'Java', people: 48274162, share: '17.87%' },
  { name: 'East Java', island: 'Java', people: 40665696, share: '15.05%' },
  { name: 'Central Java', island: 'Java', people: 36516035, share: '13.51%' },
  { name: 'Banten', island: 'Java', people: 11904562, share: '4.41%' },
  { name: 'Jakarta', island: 'Java', people: 10562088, share: '3.91%' },
  { name: 'Bali', island: 'Bali', people: 4317404, share: '1.60%' },
  { name: 'Papua', island: 'Papua', people: 4303707, share: '1.59%' },
  { name: 'Yogyakarta', island: 'Java', people: 3668719, share: '1.36%' },
  { name: 'North Kalimantan', island: 'Kalimantan', people: 701814, share: '0.26%' },
];

export const PROVINCE_HDI = [
  { name: 'Jakarta', value: 84.15 },
  { name: 'Yogyakarta', value: 81.62 },
  { name: 'Riau Islands', value: 79.89 },
  { name: 'East Kalimantan', value: 78.79 },
  { name: 'Bali', value: 78.63 },
  { name: 'Indonesia (national)', value: 75.02 },
  { name: 'Central Papua', value: 60.25 },
  { name: 'Highland Papua', value: 54.43 },
];

export const INDICATORS = [
  { name: 'Population', topic: 'Population', value: '283,487,931', unit: 'people', source: 'World Bank WDI', year: '2024', note: 'Mid-year estimate; the 2020 census counted 270,203,917.' },
  { name: 'Population growth 2010-2020', topic: 'Population', value: '1.25%', unit: 'per year', source: 'BPS Census 2020', year: '2020', note: 'Average annual growth between the 2010 and 2020 censuses.' },
  { name: 'Population density', topic: 'Population', value: '141', unit: 'people per km2', source: 'BPS Census 2020', year: '2020', note: 'National average over 1.9 million km2 of land.' },
  { name: 'Share living on Java', topic: 'Population', value: '56.10%', unit: 'of population', source: 'BPS Census 2020', year: '2020', note: '151.6 million people on about 7% of the land area.' },
  { name: 'GDP growth', topic: 'Economy', value: '5.03%', unit: 'year on year', source: 'BPS', year: '2024', note: 'Full-year real growth; 5.05% in 2023.' },
  { name: 'Nominal GDP', topic: 'Economy', value: 'Rp22,138.96 trillion', unit: 'current prices', source: 'BPS', year: '2024', note: 'Up from Rp20,892.4 trillion in 2023.' },
  { name: 'GDP in US dollars', topic: 'Economy', value: 'US$1,396.3 billion', unit: 'current US$', source: 'World Bank WDI', year: '2024', note: 'Converted at market exchange rates.' },
  { name: 'GDP per person', topic: 'Economy', value: 'US$4,960.33', unit: 'per person', source: 'BPS', year: '2024', note: 'Rp78.62 million per person.' },
  { name: 'Inflation, December', topic: 'Economy', value: '1.57%', unit: 'year on year', source: 'BPS CPI', year: 'Dec 2024', note: 'Core inflation was 2.26%; the CPI stood at 106.80 (2022 = 100).' },
  { name: 'Labour force', topic: 'Work', value: '152.11 million', unit: 'people aged 15+', source: 'BPS Sakernas', year: 'Aug 2024', note: 'Up 4.40 million on August 2023.' },
  { name: 'People in work', topic: 'Work', value: '144.64 million', unit: 'people', source: 'BPS Sakernas', year: 'Aug 2024', note: 'Up 4.79 million on August 2023.' },
  { name: 'Open unemployment rate', topic: 'Work', value: '4.91%', unit: 'of labour force', source: 'BPS Sakernas', year: 'Aug 2024', note: 'Down 0.41 points on August 2023; below the pre-pandemic 5.23%.' },
  { name: 'Labour force participation', topic: 'Work', value: '70.63%', unit: 'of working-age people', source: 'BPS Sakernas', year: 'Aug 2024', note: 'Men 84.66%, women 56.42%.' },
  { name: 'Formal-sector workers', topic: 'Work', value: '42.05%', unit: 'of people in work', source: 'BPS Sakernas', year: 'Aug 2024', note: '60.81 million people in formal work.' },
  { name: 'Youth unemployment (15-24)', topic: 'Work', value: '17.32%', unit: 'of youth labour force', source: 'BPS Sakernas', year: 'Aug 2024', note: 'The highest rate of any age group.' },
  { name: 'Poverty rate', topic: 'Living standards', value: '8.57%', unit: 'of population', source: 'BPS Susenas', year: 'Sep 2024', note: '24.06 million people; the lowest rate BPS has recorded.' },
  { name: 'Urban poverty rate', topic: 'Living standards', value: '6.66%', unit: 'of urban population', source: 'BPS Susenas', year: 'Sep 2024', note: 'Down from 7.09% in March 2024.' },
  { name: 'Rural poverty rate', topic: 'Living standards', value: '11.34%', unit: 'of rural population', source: 'BPS Susenas', year: 'Sep 2024', note: 'Down from 11.79% in March 2024.' },
  { name: 'Poverty line', topic: 'Living standards', value: 'Rp595,242', unit: 'per person per month', source: 'BPS Susenas', year: 'Sep 2024', note: 'Food makes up 74.50% of the line.' },
  { name: 'Human Development Index', topic: 'Living standards', value: '75.02', unit: 'index 0-100', source: 'BPS', year: '2024', note: 'Up 0.63 points on 2023; high category.' },
  { name: 'Adjusted spending per person', topic: 'Living standards', value: 'Rp12.34 million', unit: 'per year', source: 'BPS', year: '2024', note: 'The living-standard component of the HDI.' },
  { name: 'Life expectancy at birth', topic: 'Health', value: '71.3 years', unit: 'years', source: 'World Bank WDI', year: '2024', note: 'In 2023: women 73.3 years, men 69.0 years.' },
  { name: 'Life expectancy (BPS measure)', topic: 'Health', value: '74.15 years', unit: 'years', source: 'BPS', year: '2024', note: 'BPS life-table measure used in the HDI; methods differ from the UN series.' },
  { name: 'Infant mortality', topic: 'Health', value: '17.1', unit: 'deaths per 1,000 live births', source: 'UN World Population Prospects', year: '2023', note: 'Down from 144.8 in 1960.' },
  { name: 'Stunting, under-fives', topic: 'Health', value: '19.8%', unit: 'of children under five', source: 'Kemenkes SSGI', year: '2024', note: 'First reading below 20%; 21.5% in 2023.' },
  { name: 'Wasting, under-fives', topic: 'Health', value: '7.4%', unit: 'of children under five', source: 'Kemenkes SSGI', year: '2024', note: 'Down from 12.1% in 2013.' },
  { name: 'Exclusive breastfeeding', topic: 'Health', value: '74.73%', unit: 'of infants 0-5 months', source: 'Kemenkes SSGI', year: '2024', note: 'Coverage among infants aged 0 to 5 months.' },
  { name: 'Expected years of schooling', topic: 'Education', value: '13.21 years', unit: 'years', source: 'BPS', year: '2024', note: 'Up from 12.98 years in 2020.' },
  { name: 'Mean years of schooling', topic: 'Education', value: '8.85 years', unit: 'years, age 25+', source: 'BPS', year: '2024', note: 'Roughly junior-secondary level; 8.48 years in 2020.' },
  { name: 'Highest expected schooling', topic: 'Education', value: '15.70 years', unit: 'years, Yogyakarta', source: 'BPS', year: '2024', note: 'Central Papua is lowest at 9.63 years.' },
  { name: 'Most populous province', topic: 'Regions', value: 'West Java, 48,274,162', unit: 'people', source: 'BPS Census 2020', year: '2020', note: '17.87% of the national population.' },
  { name: 'Highest provincial HDI', topic: 'Regions', value: 'Jakarta, 84.15', unit: 'index 0-100', source: 'BPS', year: '2024', note: 'Highland Papua is lowest at 54.43.' },
];

export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', detail: 'National accounts, CPI, Sakernas labour survey, Susenas poverty profile, HDI release and the 2020 Population Census.' },
  { name: 'World Bank World Development Indicators', detail: 'Population (SP.POP.TOTL), GDP in current US dollars and life expectancy at birth (SP.DYN.LE00.IN), built on UN estimates.' },
  { name: 'Kemenkes — Ministry of Health', detail: 'Survei Status Gizi Indonesia (SSGI) 2024 for stunting, wasting and breastfeeding, with Riskesdas for earlier years.' },
  { name: 'UN World Population Prospects', detail: 'Infant mortality estimates as published through UN and World Bank channels.' },
];
