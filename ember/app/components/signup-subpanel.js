import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';


export default class extends Component {

  @service session
  @service store
  @service lstrpas


  constructor() {
    super();

    this.classNames = ['component', 'subpanel', 'form-subpanel', 'signup-subpanel'];

    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.password = '';
    this.municipality = null;
    this.agency=null;
    this.confirmPassword = '';

    this.errorMessage = null;

    this.selaction="updateMunicipality";
    this.isFetching = false;
    this.muniFailure = false;
    this.requesting = null;
  }

  @action
  updateMunicipality(muni) {
    let mycity =this.get('store').peekRecord('place', muni);
    let cityname=mycity.get('namelsad');
    let rpaname = mycity.get('rpa').get('acronym');
    this.set('municipality', cityname);
    this.set('agency', rpaname);
  }

 
  @action
  updateAgency(agency) {
    this.set('agency', agency);
  }


  @computed('fullName', 'username', 'password', 'confirmPassword')
  get submittable() {
    return [
      'firstName',
      'lastName',
      'username',
      'password',
      'confirmPassword'
    ].every(field => this.get(field) !== '');
  }


  @action
  signup() {
    if (!this.get('submittable')) {
      return;
    }

    let noErrors = true;
    let errorMessage = 'You must fill in all fields.';

    const email = this.get('username');
    const { firstName, lastName } = this.getProperties('firstName', 'lastName');
    const { password, confirmPassword } = this.getProperties('password', 'confirmPassword');
    const requesting = this.get('requesting');
    const municipality = requesting == 'municipal'
        ? this.get('municipality')
        : (requesting == 'state' ? 'STATE' : null);
    const agency = requesting=='state'
        ? this.get('agency') 
        :(requesting == 'municipal'
          ? this.get('agency')
          :(email.endsWith('ambag.org')
            ? 'AMBAG' 
            :(email.endsWith('srta.org')
              ? 'SRTA' 
              : (email.endsWith('slocog.org')
                ? 'SLOCOG' 
                : (email.endsWith('bcag.org')
                  ? 'BCAG'
                  : (email.endsWith('trpa.org')
                    ? 'TRPA'
                    : null))))));
   
    const requestVerifiedStatus = !!requesting;


    /**
     * Validations
     */

    if (!email) {
      noErrors = false;
    }

    if (firstName && lastName) {
      const nameRegex = /^[A-Za-z\-']+$/;

      if ([firstName,lastName].any(name => !nameRegex.test(name))) {
        noErrors = false;
        errorMessage = 'Name may only contain letters.';
      }
    }
    else {
      noErrors = false;

      if (!lastName) {
        errorMessage = 'Must enter both a first and last name.';
      }
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        noErrors = false;
        errorMessage = 'Passwords do not match.';
      }
    }
    else {
      noErrors = false;
    }


    /**
     * Create new user and login.
     */

    if (noErrors) {
      const userSchema = { firstName, lastName, email, password, municipality, agency, requestVerifiedStatus };

      this.set('loadingText', 'Signing Up');
      this.set('isCreating', true);

      this.get('store')
      .createRecord('user', userSchema)
      .save()
      .then(() => {
        this.set('loadingText', 'Logging In')

        this.get('session')
        .authenticate('authenticator:devise', email, password)
        .catch(() => {
          this.set('errorMessage', 'Account was created, but cannot be logged in at this time.');
        })
        .finally(() => {
          this.set('isCreating', false);
        });
      })
      .catch(() => {
        this.set('isCreating', false);
        this.set('errorMessage', 'Not able to sign up at this time.');
      });
    }
    else {
      this.set('errorMessage', errorMessage);
    }
  }

}
