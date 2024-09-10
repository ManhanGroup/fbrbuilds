import DS from 'ember-data';
import { computed } from '@ember-decorators/object';
import { attr, hasMany } from '@ember-decorators/data';


export default class extends DS.Model {

  @attr('string') email
  @attr('string') password
  @attr('string') firstName
  @attr('string') lastName
  @attr('string') municipality
  @attr('string') role
  @attr('string') agency

  @attr('boolean') requestVerifiedStatus

  @attr('date') createdAt

  @hasMany('edits', {async: true}) edits
  @hasMany('developments', {async: true}) developments

  @computed('firstName', 'lastName')
  get fullName() {
    const { firstName, lastName } = this.getProperties('firstName', 'lastName');
    return `${firstName} ${lastName}`;  
  }

  @computed('firstName', 'lastName', 'email', 'agency')
  get displayName() {
    const { fullName, email, agency } = this.getProperties('fullName', 'email', 'agency');
    if(email.endsWith('landofsky.org') || agency==='FBRMPO' ){
      return 'FBRMPO Staff';
    } else if(email.endsWith('buncombecounty.org') || agency==='Buncombe'){
      return 'STransylvania County Staff';
    }else if(email.endsWith('haywoodcounty.org') || agency==='Haywood'){
      return 'Transylvania County Staff';
    }else if(email.endsWith('madisoncounty.org') || agency==='Madison'){
      return 'Madison County Staff';
    }else if(email.endsWith('transylvaniacounty.org') || agency==='Transylvania'){
      return 'Transylvania County Staff';
    } else if(email.endsWith('manhangroup.com') || agency==='consulting'){
      return 'Consulting Staff';
    }  else{
      return null;
    }

  }

  @computed('agency', 'email')
  get userAgency() {
    const {agency, email } = this.getProperties('agency', 'email');
   
    if(email.endsWith('landofsky.org') || agency==='FBRMPO' ){
      return 'FBRMPO MPO';
    } else if(email.endsWith('buncombecounty.org') || agency==='Buncombe'){
      return 'STransylvania County';
    }else if(email.endsWith('haywoodcounty.org') || agency==='Haywood'){
      return 'Transylvania County';
    }else if(email.endsWith('madisoncounty.org') || agency==='Madison'){
      return 'Madison County';
    }else if(email.endsWith('transylvaniacounty.org') || agency==='Transylvania'){
      return 'Transylvania County';
    } else if(email.endsWith('manhangroup.com') || agency==='consulting'){
      return 'Consulting';
    }  else{
      return null;
    }
  }


}
