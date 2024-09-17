import DS from 'ember-data';
import { computed } from '@ember-decorators/object';
import { attr, belongsTo, hasMany } from '@ember-decorators/data';

export default class extends DS.Model {
  @belongsTo('user', { async: true }) user;
  @hasMany('edit', { async: true }) edits;
  @hasMany('flag', { async: true }) flags;

  @attr('string') name;
  @attr('string') status;
  @attr('string') descr;
  @attr('string') prjUrl;
  @attr('string') tagline;
  @attr('string') nhood;
  @attr('string') address;
  @attr('string', { default: 'NC' }) state;
  @attr('string') zipCode;
  @attr('string') parkType;
  @attr('string') parcelId;
  @attr('string') municipal;
  @attr('string') county;
  @attr('string') pinnum;
  @attr('string') devlper;
  @attr('string') trafficCountData;

  @attr('number') height;
  @attr('number') stories;
  @attr('number') percomp25;
  @attr('number') percomp30;
  @attr('number') percomp35;
  @attr('number') percomp40;
  @attr('number') percomp45;
  @attr('number') yearCompl;
  @attr('number') prjarea;
  @attr('number') singfamhu;
  @attr('number') multifam;
  @attr('number') unknownhu;
  @attr('number') hu;
  @attr('number') gqpop;
  @attr('number') rptdemp;
  @attr('number') commsf;
  @attr('number') hotelrms;
  @attr('number') totalCost;
  @attr('number') retSqft;
  @attr('number') ofcmdSqft;
  @attr('number') indmfSqft;
  @attr('number') whsSqft;
  @attr('number') rndSqft;
  @attr('number') eiSqft;
  @attr('number') otherSqft;
  @attr('number') hotelSqft;
  @attr('number') unkSqft;
  @attr('number') latitude;
  @attr('number') longitude;
  @attr('number') units1bd;
  @attr('number') units2bd;
  @attr('number') units3bd;
  @attr('number') affrdUnit;
  @attr('number') affU30;
  @attr('number') aff3050;
  @attr('number') aff5080;  
  @attr('number') aff80p;
  @attr('number') affUnknown;
  @attr('number') publicsqft;
  @attr('number') projId;
  

  @attr('boolean', { default: false }) rdv;
  @attr('boolean', { default: false }) asofright;
  @attr('boolean', { default: false }) ovr55;
  @attr('boolean', { default: false }) clusteros;
  @attr('boolean', { default: false }) phased;
  @attr('boolean', { default: false }) stalled;
  @attr('boolean', { default: false }) headqtrs;
  @attr('boolean', { default: false }) mixedUse;
  @attr('boolean', { default: false }) yrcompEst;
  @attr('boolean', { default: false }) flag;
  @attr('boolean', { default: true }) ispublic;

  @attr('date') createdAt;
  @attr('date') updatedAt;

  @attr nTransit; // []String

  @computed('address', 'municipal', 'state', 'zipCode')
  get fullAddress() {
    const props = this.getProperties(
      'address',
      'municipal',
      'state',
      'zipCode'
    );
    const address = props.address || 'Unknown Address';
    const municipal = props.municipal || 'Unknown City';
    const zipCode = props.zipCode || '';
    return `${address}, ${municipal}, ${props.state || 'CA'} ${zipCode}`;
  }
}
