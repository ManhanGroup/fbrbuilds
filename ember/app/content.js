import glucDicts from 'calbuilds/utils/gluc-dicts';
let glucDefinition=['GLUC of the Project?',
      'Select from the drop-down what the current project GLUC type is.' ,
      'Refer to the density information below for each GLUC type.'
      ];
      
let glucTable = [['GLUC:', 'Density Range']];

for (let key in glucDicts ) {
  let value = glucDicts[key];
  glucTable.push([key.toString(), value.toString()]);
  // Use `key` and `value`
}


const content = {
  GLOSSARY: {
    APN:{
      label: 'Parcel APN',
      definition: ['Parcel APN.']},
    STREET_ADDRESS: {
      label: 'Street Address',
      definition: ['Enter the street address of the project and Zip Code (required in order to submit the project). If exact address is unknown or covers a wide area, enter an address as close to the site as possible and note that address is not exact/site spans a wide area in the Description.'],
    },
    PROJECT_WEBSITE: {
      label: 'Project Website',
      definition: ['Enter the project website where updates can be found on the project.'],
    },
    PLACE_TYPE: {
      label: 'Place Type',
      definition: ['Place Type of the Project?'],
    },
    DEVELOPER: {
      label: 'Developer',
      definition: ['If known, enter the project developer(s) only (not including construction team, architects, etc)'],
    },
    DESCRIPTION: {
      label: 'Description',
      definition: ['Note basic background, type of development, interesting facts, and other items not covered by the other fields.'],
    },
    NOTES: {
      label: 'Additional Notes',
      definition: ['Additional Notes.'],
    },
    GLUC: {
      label: 'GLUC',
      definition: glucDefinition,
      table: glucTable,
    },
    STATUS: {
      label: 'Status',
      definition: [
        'Select from the drop-down what the current status of the project is.',
        'Select Unverified if it is not certain whether development will occur on a site/area',
        'Select Projected if it is known development will occur on a site/area but no specifics have been given for the project.',
        'Select Planning if plans for a development have been submitted, and fill out the remaining fields based on the submitted plan. Projects are still Planning even when they are approved.',
        'Select In Construction once a project has officially breaks ground and begun construction work.',
        'Select Completed once a project has officially topped off and finished construction.',
      ],
    },
    STATUS_COMMENTS: {
      label: 'Comments on Status',
      definition: [
        'Additional comments on development status',
      ],
    },
    YEAR_COMPLETE: {
      label: 'Year complete',
      definition: [
        'If you know the year the project is complete, input the year into Year Complete (Known) and in Year Complete (Estimate) input 0.',
        'If it is an estimate, input 2027 into Year Complete (Known) and in Year Complete (Estimate) input 1.',
      ],
    },
    COST_OF_CONSTRUCTION: {
      label: 'Cost of Construction',
      definition: ['Enter total cost (can be estimate) of construction only of development, not including purchase price and other soft costs of project.'],
    },
    PROJECT_AREA: {
      label: 'Project Area',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['Total area of development site only, not including areas on the site/parcel that are not developed.'],
    },
    percomp25: {
      label: 'Percent by 2025',
      definition: ['Percent completed by year 2025.'],
    },
    percomp30: {
      label: 'Percent by 2030',
      definition: ['Percent completed by year 2030.'],
    },
    PERCOMP35: {
      label: 'Percent by 2035',
      definition: ['Percent completed by year 2035.'],
    },
    PERCOMP40: {
      label: 'Percent by 2040',
      definition: ['Percent completed by year 2040.'],
    },
    PERCOMP45: {
      label: 'Percent by 2045',
      definition: ['Percent completed by year 2045.'],
    },
    PARKING_SPACES: {
      label: 'Number of Parking Spaces',
      definition: [
        'Total new vehicle parking spaces on site. Does not include spaces reserved for development in different buildings/parking lots.',
        'If parking spaces are entered, you will be asked to designate what type of parking the spaces are in. Select Garage if the spaces are in an enclosed garage on site, Underground if the spaces are located underneath (below grade) the development, or Surface if they are located on a surface lot (at grade).',
        'If there are multiple types of parking, select one based on where most of the spaces are located and note the breakdowns in the Description.',
      ],
    },
    RHNA: {
      label: 'Completed in the current RHNA cycle?',
      definition: [
        'Indicator for whether the development will be completed in the current RHNA cycle or not.',
      ],

    },
    REDEVELOPMENT: {
      label: 'Redevelopment',
      definition: ['Check if this development is known to be reuse of previously developed land.'],
    },
    PHASED: {
      label: 'Phased',
      definition: ['Check if this development is part of a larger, multi-phased project. All developments in a Phased project should start with the larger project in the Development Name.'],
    },
    STALLED: {
      label: 'Stalled',
      definition: ['Check if this development is stalled and not actively moving forward.'],
    },
    SBTYPE: {
      label: 'SB Type',
      definition: ['Check if this development is SB6 or SB8.'],
    },
    AB1317: {
      label: 'AB1317',
      definition: ['Indicator for whether AB1317 is applicable or not?'],
    },
    AS_OF_RIGHT: {
      label: 'As of Right',
      definition: ['Check if this development required no special permit or zoning variance.'],
    },
    MIXED_USE: {
      label: 'Mixed Use',
      definition: ['Check if this development is a mixed use development (both residential and commercial on same site).'],
    },
    MIXED_USE_DESCR: {
      label: 'Mixed Use Description',
      definition: ['Detailed description on mixed use.'],
    },

    GROUP_QUARTERS_POPULATION: {
      label: 'Group Quarters Population',
      definition: ['Input estimated new beds (the total new population) in group quarters (dorms, nursing homes, military barracks, etc).'],
    },
    AGE_RESTRICTED: {
      label: 'Age Restricted',
      definition: ['Check this box if there is an age restriction to residential development, ie. If the development is senior housing.'],
    },
    HOUSING_UNITS: {
      label: 'Housing Units',
      definition: [
        'Input the total # of units in each type of housing, ie. If the project includes 20 single family community with 6 townhouses (totaling 12 units) and a building with 10 units, input 20 into Single Family and 12 in Multi-family, and 10 into Large Multi-family.',
        'If known, input the number of units that are studio/1 Bedroom, 2 Bedroom and 3 Bedroom.',
      ],
    },
    SINGLE_FAMILY: {
      label: 'Single Family',
      definition: [
        'A standalone house for one family.'
      ],
    },
    MULTI_FAMILY: {
      label: 'Multi-family',
      definition: [
        'Attached single family homes or townhouses and multifamily homes.',
      ],
    },
    MULTI_FAMILY_2TO4: {
      label: 'Medium Density Multi-family',
      definition: [
        'Structures with 2 to 4 units.',
      ],
    },
    MULTI_FAMILY_5UP: {
      label: 'High Density Multi-family',
      definition: [
        'Structures with 5 or more units.',
      ],
    },
    MOBILE: {
      label: 'Mobile Home',
      definition: [
        'Mobile home.',
      ],
    },
    LARGE_MULTI_FAMILY: {
      label: 'Large Multi-family',
      definition: [
        'Structures with 6 or more units.',
      ],
    },
    AFFORDABLE_UNITS: {
      label: 'Affordable Units',
      definition: [
        'If the affordability restrictions are known for the affordable units of a project, input into the field that has the range the restrictions fall under and input 0 into the other fields. Ie., If a project with 100 units has 30 designated affordable units where 20 are restricted for households earning up to 50% AMI and 10 for those earning up to 80% AMI, input 20 into Units <50% AMI and 10 into Units 50-80% AMI and 0 for the rest. If you know there are 30 units that are designated affordable but dont known the AMI restrictions, input 0 into all fields and 30 into Unknown.',
        'If there are restrictions that dont fall neatly into the ranges, ie., if units are designated affordable between 30-60% AMI, input the units into the <50% AMI range and make sure to include the specific AMI in the Descriptions.',
      ],
    },
    ESTIMATED_AND_REPORTED_EMPLOYMENT: {
      label: 'Estimated and Reported Employment',
      definition: ['If new employment figures are given for a development, enter them into Estimated if the figures are estimates or Reported if they are officially reported new employment figures.'],
    },
    HOTEL_ROOMS: {
      label: 'Hotel Rooms',
      definition: ['Enter total new hotel rooms on site, if known.'],
    },
    PUBLIC_AREA: {
      label: 'Public Area',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['Total sqft created through the project that is designated for public use, ie., a new community room, publically accessible green space, a new park, etc.'],
    },
    COMPANY_HEADQUARTERS: {
      label: 'Company Headquarters',
      definition: ['Check if the development will be used as company headquarters. Note in the Descriptions which company/companies, and any other information available (ie., if a company is locating global headquarters in the finished development).'],
    },
    COMMERCIAL_AREA: {
      label: 'Commercial Area',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: [
        'In the Retail field, enter total floor area dedicated to retail uses.',
        'In Office/Medical, enter floor area dedicated to office and health care uses.',
        'In Industrial/Manufacturing, enter floor area dedicated to industrial and manufacturing uses. ',
        'In Warehouse/Shipping, enter floor area dedicated to warehouse, wholesale, and trucking/shipping uses.',
        'In Research/Development, enter floor area dedicated to research and development uses (including medical research).',
        'In Educational/Institutional, enter floor area dedicated to education and institutional uses (schools, religious institutions, etc.).',
        'In Hotel Room, enter floor area dedicated to hotel room uses.',
        'In Other, enter floor area dedicated to other uses. Note the other uses in Description. ',
        'In Unknown, enter floor area dedicated to nonresidential uses on site (not including parking) that are unknown. ',
      ],
      definitionShort: [
        'The floor area for all commercial uses broken down by category.',
      ],
    },
    PARCEL_FISCAL_YEAR: {
      label: 'Parcel Fiscal Year',
      definition: ['Fiscal Year of the assessor\'s data from which the parcel\'s information was extracted.'],
    },
    TRAFFIC_COUNT_DATA: {
      label: 'Traffic Count URL',
      definition: ['A URL linking to the Caltrans DOT Transportation Impact Assessment Monitoring Report database or another source of data about traffic monitoring/traffic counts.']
    },
    STUDENT_ENROLLMENT_KTOHIGH: {
      label: 'Enrollment Kindergarten to 12th Grade',
      definition: ['Estimated or reported student Enrollment from Kindergarten to 12th Grade for the development dedicated to education uses.']
    },
    STUDENT_ENROLLMENT_UNIVERSITY: {
      label: 'Enrollment University',
      definition: ['Estimated or reported university student Enrollment for the development dedicated to college education uses.']
    },
  }, // End of Glossary

  OTHER_TERMS: {
    ESTIMATED_EMPLOYMENT: {
      label: 'Estimated Employment',
      definition: ['If new employment figures are given for a development, enter them into Estimated if the figures are estimates or Reported if they are officially reported new employment figures.'],
    },
    REPORTED_EMPLOYMENT: {
      label: 'Reported Employment',
      definition: ['If new employment figures are given for a development, enter them into Estimated if the figures are estimates or Reported if they are officially reported new employment figures.',
          ],
    },
    RETAIL_AREA: {
      label: 'Retail',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The total floor area dedicated to retail uses.'],
    },
    OFFICE_MEDICAL_AREA: {
      label: 'Office/Medical',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to office and health care uses.'],
    },
    INDUSTRIAL_MANUFACTURING_AREA: {
      label: 'Industrial/Manufacturing',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to industrial and manufacturing uses.'],
    },
    WAREHOUSE_SHIPPING_AREA: {
      label: 'Warehouse/Shipping',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to warehouse, wholesale, and trucking/shipping uses.'],
    },
    RESEARCH_DEVELOPMENT_AREA: {
      label: 'Research/Development',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to research and development uses (including medical research).'],
    },
    EDUCATIONAL_INSTITUTIONAL_AREA: {
      label: 'Educational/Institutional',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to education and institutional uses (schools, religious institutions, etc.).'],
    },
    HOTEL_ROOM_AREA: {
      label: 'Hotel Room',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to hotel room uses.'],
    },
    OTHER_AREA: {
      label: 'Other',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to other uses. Note the other uses in Description.'],
    },
    UNKNOWN_AREA: {
      label: 'Unknown',
      unitsShort: 'sq ft',
      unitsLong: 'Square Feet',
      definition: ['The floor area dedicated to nonresidential uses on site (not including parking) that are unknown.'],
    },
    UNKNOWN_HOUSING_UNITS: {
      label: 'Unknown',
      definition: [
        'If the unit types are unknown, enter the number of housing units here.',
      ],
    },
    EDUCATION_EMPLOYMENT: {
      label: 'Education',
      definition: ['Employment of the development dedicated to educational uses.'],
    },
    FOOD_EMPLOYMENT: {
      label: 'Food Service',
      definition: ['Employment of the development dedicated to food prepartion or services uses.'],
    },
    GOVERNMENT_EMPLOYMENT: {
      label: 'Government',
      definition: ['Employment of the development dedicated to government uses.'],
    },
    INDUSTRY_EMPLOYMENT: {
      label: 'Industry',
      definition: ['Employment of the development dedicated to industry uses.'],
    },
    MEDICAL_EMPLOYMENT: {
      label: 'Medical Service',
      definition: ['Employment of the development dedicated to medical service uses.'],
    },
    OFFICE_EMPLOYMENT: {
      label: 'Office',
      definition: ['Employment of the development dedicated to office uses.'],
    },
    OTHER_EMPLOYMENT: {
      label: 'Other',
      definition: ['Employment of the development dedicated to other uses.'],
    },
    RETAIL_EMPLOYMENT :{
      label: 'Retail',
      definition: ['Employment of the development dedicated to retail uses.'],
    },
    SERVICE_EMPLOYMENT: {
      label: 'Service',
      definition: ['Employment of the development dedicated to service uses.'],
   },
  }
};

content['TERMS'] = Object.assign({}, content.GLOSSARY, content.OTHER_TERMS);

export default content;
