import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.get('store').findAll('rpa').then(rpas => {
      if (rpas.length === 1) {
        // Handle the case where there is only one record
        console.log('Only one user found:', rpas.get('firstObject'));
      }
      return rpas;
    });
  },

});

