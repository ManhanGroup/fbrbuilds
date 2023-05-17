import { copy } from '@ember/object/internals';
import { get } from '@ember/object';
import { decamelize } from '@ember/string';
import { statusOptions } from 'calbuilds/utils/status-colors';
import { capitalize } from 'calbuilds/helpers/capitalize';
import Development from 'calbuilds/models/development';


/**
 * Defaults
 */

const defaultMetric = {
  filter: 'metric',
  value: null,
  inflector: 'eq',
};

const defaultDiscrete = {
  filter: 'discrete',
  value: [],
};



/**
 * Constructs
 */


// Define any filters here that need custom `name` values or
// are string-based option values.

const filters = {

  // Discrete
  'apn': { name: 'APN', ...defaultDiscrete },
  'devlper': { name: 'Developer', ...defaultDiscrete },
  'municipal':  { name: 'Town/City', ...defaultDiscrete },
  'nhood': { name: 'Neighborhood', ...defaultDiscrete },

  // Key Info

  'status': { name: 'Status', glossaryKey: 'STATUS', type: 'string', options: statusOptions, ...defaultMetric },
  'statComts': { name: 'Status Comments', glossaryKey: 'STATUS_COMMENTS', type: 'string', ...defaultMetric },
  'totalCost': { name: 'Total cost', glossaryKey: 'COST_OF_CONSTRUCTION', type: 'number', ...defaultMetric },
  'placetype': { name: 'Place_Type', glossaryKey: 'PLACE_TYPE', type: 'string', ...defaultMetric },
  'gluc': { name: 'gluc', glossaryKey: 'GLUC', type: 'string', ...defaultMetric },
  'parkType': { name: 'Parking type', type: 'string', options: ['garage', 'underground', 'surface', 'other'], ...defaultMetric },
  'descr': { name: 'Description', glossaryKey: 'DESCRIPTION', type: 'string', ...defaultMetric },
  'notes': { name: 'NOTES', glossaryKey: 'NOTES', type: 'string', ...defaultMetric },
  'projId': { name: 'PROJ ID', glossaryKey: 'PROJID', type: 'number', ...defaultMetric },
  'projIdPresent': { name: 'PROJECT ID Present', glossaryKey: 'PROJID_PRESENT', type: 'boolean', ...defaultMetric },
 // 'apn': { name: 'Parcel APN', glossaryKey: 'APN', type: 'string', ...defaultMetric },
  'trafficCountData': { name: 'Traffic Count Data', glossaryKey: 'TRAFFIC_COUNT_DATA', type: 'string', ...defaultMetric },
  'trafficCountDataPresent': { name: 'Traffic Count Data Present', glossaryKey: 'TRAFFIC_COUNT_DATA_PRESENT', type: 'boolean', ...defaultMetric },
  'phased': { name: 'Phased', glossaryKey: 'PHASED', type: 'boolean', ...defaultMetric },
  'stalled': { name: 'Stalled', glossaryKey: 'STALLED', type: 'boolean', ...defaultMetric },
  'percomp_24': { name: 'Percent complete by year 2024', glossaryKey: 'PERCOMP24', type: 'number', ...defaultMetric },
  'percomp_28': { name: 'Percent complete by year 2028', glossaryKey: 'PERCOMP28', type: 'number', ...defaultMetric },
  'percomp_35': { name: 'Percent complete by year 2035', glossaryKey: 'PERCOMP35', type: 'number', ...defaultMetric },
  'percomp_45': { name: 'Percent complete by year 2045', glossaryKey: 'PERCOMP45', type: 'number', ...defaultMetric },
  'mixedUse': { name: 'Mixed use', glossaryKey: 'MIXED_USE', type: 'boolean', ...defaultMetric },
  'mixDescr': { name: 'Mixed use description', glossaryKey: 'MIXED_USE_DESCR', type: 'boolean', ...defaultMetric },

  'yearCompl': { name: 'Year complete', glossaryKey: 'YEAR_COMPLETE', type: 'number', ...defaultMetric },
  'yrcompEst': { name: 'Completion year is estimated',  type: 'boolean', ...defaultMetric },
  'prjarea': { name: 'Project area', glossaryKey: 'PROJECT_AREA', type: 'number', unit: 'sqft', ...defaultMetric },
  'publicsqft': { name: 'Public area', glossaryKey: 'PUBLIC_AREA', type: 'number', ...defaultMetric },
  'dNTrnsit': { name: 'Distance to transit', type: 'number', ...defaultMetric },
  
  'clusteros': { name: 'Cluster development.', type: 'boolean', ...defaultMetric },
  'floodzone': { name: 'In flood zone', type: 'boolean', ...defaultMetric },
  'rdv': { name: 'Redevelopment', glossaryKey: 'REDEVELOPMENT', type: 'boolean', ...defaultMetric },

  // Residential

  'hu': { name: 'Total housing units', glossaryKey: 'HOUSING_UNITS', type: 'number', ...defaultMetric },
  'singfamhu': { name: 'Single-family units', glossaryKey: 'SINGLE_FAMILY', type: 'number', ...defaultMetric },
  'multifam': { name: 'Multifamily units', glossaryKey: 'MULTI_FAMILY', type: 'number', ...defaultMetric },
  'units1bd': { name: 'Studio/1 bedroom units', type: 'number', ...defaultMetric },
  'units2bd': { name: '2 Bedroom units', type: 'number', ...defaultMetric },
  'units3bd': { name: '3 Bedroom units', type: 'number', ...defaultMetric },
  'affrdUnit': { name: 'Affordable units', glossaryKey: 'AFFORDABLE_UNITS', type: 'number', ...defaultMetric },
  'affU50': { name: 'Units <50% AMI', type: 'number', ...defaultMetric },
  'aff_50_80': { name: 'Units 50-80% AMI', type: 'number', ...defaultMetric },
  'aff_80_120': { name: 'Units 80-120% AMI', type: 'number', ...defaultMetric },
  'aff_120p': { name: 'Above Units 120% AMI', type: 'number', ...defaultMetric },
  'gqpop': { name: 'Group quarters population', type: 'number', ...defaultMetric },

  'asofright': { name: 'As of Right', glossaryKey: 'AS_OF_RIGHT', type: 'boolean', ...defaultMetric },
  'ovr55': { name: 'Age restricted', glossaryKey: 'AGE_RESTRICTED', type: 'boolean', ...defaultMetric },

  // Commercial

  'commsf': { name: 'Commercial area', glossaryKey: 'COMMERCIAL_AREA', type: 'number', ...defaultMetric },
  'retSqft': { name: 'Retail', glossaryKey: 'RETAIL_AREA', type: 'number', ...defaultMetric },
  'ofcmdSqft': { name: 'Office/Medical', glossaryKey: 'OFFICE_MEDICAL_AREA', type: 'number', ...defaultMetric },
  'indmfSqft': { name: 'Industrial/Manufacturing', glossaryKey: 'INDUSTRIAL_MANUFACTURING_AREA', type: 'number', ...defaultMetric },
  'whsSqft': { name: 'Warehouse/Shipping', glossaryKey: 'WAREHOUSE_SHIPPING_AREA', type: 'number', ...defaultMetric },
  'rndSqft': { name: 'Research/Development', glossaryKey: 'RESEARCH_DEVELOPMENT_AREA', type: 'number', ...defaultMetric },
  'eiSqft': { name: 'Educational/Institutional', glossaryKey: 'EDUCATIONAL_INSTITUTIONAL_AREA', type: 'number', ...defaultMetric },
  'otherSqft': { name: 'Other', glossaryKey: 'OTHER_AREA', type: 'number', ...defaultMetric },
  'hotelSqft': { name: 'Hotel room', glossaryKey: 'HOTEL_ROOM_AREA', type: 'number', ...defaultMetric },
  'hotelrms': { name: 'Hotel rooms', glossaryKey: 'HOTEL_ROOMS', type: 'number', ...defaultMetric },
  'rptdemp': { name: 'Reported employment', glossaryKey: 'REPORTED_EMPLOYMENT', type: 'number', ...defaultMetric },

  'headqtrs': { name: 'Company HQ', glossaryKey: 'COMPANY_HEADQUARTERS', type: 'boolean', ...defaultMetric },

};


const metricGroups = {
  'Key Info': [
    {
      title: 'General',
      metrics: [
        'status',
        'totalCost',
        'yearCompl',
        'yrcompEst',
        'rdv',
        'phased',
        'stalled',
        'projId',
        'projIdPresent',
        'trafficCountData',
        'trafficCountDataPresent'
      ]
    },
   {
      title: 'Schedule',
      metrics: [
        'percomp_24',
        'percomp_28',
        'percomp_35',
        'percomp_45',
      ]
    },
    {
      title: 'Land Use',
      metrics: [
        'prjarea',
        'asofright',
        'mixedUse',
      ]
    },
  ],
  'Residential': [
    {
      title: 'Units',
      metrics: [
        'hu',
        'singfamhu',
        'multifam',
        'units1bd',
        'units2bd',
        'units3bd',
      ]
    },
    {
      title: 'Affordability',
      metrics: [
        'affrdUnit',
        'affU50',
        'aff_50_80',
        'aff_80_120',
        'aff_120p',
      ]
    },
    {
      title: 'Other',
      metrics: [
        'gqpop',
        'ovr55',
      ]
    },
  ],
  'Commercial': [
    {
      title: 'General',
      metrics: [
        'commsf',
        'rptdemp',
      ]
    },
    {
      title: 'Makeup',
      metrics: [
        'retSqft',
        'ofcmdSqft',
        'indmfSqft',
        'whsSqft',
        'rndSqft',
        'eiSqft',
        'hotelSqft',
        'otherSqft',
      ]
    },
    {
      title: 'Other',
      metrics: [
        'headqtrs',
        'hotelrms',
      ]
    },
  ],
};


const blacklist = [
  'notes',
  'tagline',
  'parcelId',
  'programs',
  'user',
  'statComts',
  'mixDescr'
];


const inflectorMap = {
  'lt': '<',
  'eq': '=',
  'gt': '>',
};


/**
 * Cleanup
 */

// Add any remaining undefined filters based upon model
// Assume they are 'metric' filters
Object.values(get(Development, 'attributes')._values)
      .forEach(attr => {
        let type = attr.type;
        let name = decamelize(attr.name)
                   .split('_')
                   .join(' ')
                   .capitalize();

        if (
          !filters[attr.name]
          && blacklist.indexOf(attr.name) === -1
        ) {
          filters[attr.name] = { name, type, ...defaultMetric };
        }
      });

Object.keys(filters).forEach(col => filters[col] = {col, ...filters[col]});


const fromQueryParams = params => {
  const newParams = {};

  Object.keys(params).forEach(_key => {
    let value = params[_key];
    let key = decamelize(_key);

    newParams[key] = copy(filters[_key]);
    newParams[key].col = key;

    if (newParams[key].type === 'number') {
      const [inflector, num] = value.split(';');

      newParams[key].inflector = inflectorMap[inflector];
      newParams[key].value = parseInt(num);
    }
    else {
      if (_key === 'municipal') {
        value = value.map(capitalize);
      }

      newParams[key].value = value;
    }
  });

  return newParams;
};


export {
  metricGroups,
  filters,
  fromQueryParams,
  inflectorMap
};

export default filters;
