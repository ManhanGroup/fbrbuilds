import Service from '@ember/service';
import { service } from '@ember-decorators/service';



export default class extends Service {
  @service store;

  constructor() {
    super();

    this.lstcntys=null;

    this.get('store')
      .findAll('county', { include: 'places' })
      .then((results) => {
      this.set('lstcntys', results);        
    });
    
    
  }

  }
