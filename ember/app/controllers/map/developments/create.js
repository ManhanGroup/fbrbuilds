import { camelize } from '@ember/string';
import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { filters } from 'fbrbuilds/utils/filters';
import { action, computed } from '@ember-decorators/object';
import Development from 'fbrbuilds/models/development';
import castToModel from 'fbrbuilds/utils/cast-to-model';


export default class extends Controller {

  @service map
  @service currentUser
  @service notifications

  

  @computed('model', '_editing')
  get editing() {
    const { _editing, model } = this.getProperties('_editing', 'model');
    if (_editing) {
      return _editing;
    } else {
      return model.toJSON();
    }
  }

  @action
  updateEditing(partial) {
    this.set('_editing', Object.assign({}, this.get('editing'), partial));
  }

  @action
  updateDevelopmentType(devType) {
    this.set('developmentType', devType);
  }

  @action
  updateIsDamage(isDamage) {
    this.set('is_damage', isDamage);
  }


  @computed('currentUser.user.role')
  get hasPublishPermissions() {
    return this.get('currentUser.user.role') !== 'user';
  }

  @computed('hasPublishPermissions', 'is_damage')
  get submitText() {
    return this.get('hasPublishPermissions') ? (this.get('is_damage')?'Report Damage':'Create Development') : 'Submit for Review';
  }


  @computed('hasPublishPermissions')
  get loadingSpinnerText() {
    return this.get('hasPublishPermissions') ? 'Creating Development' : 'Submitting Development';
  }


  @action
  createDevelopment(data) {
    const model = this.get('model');
    data = castToModel(Development, data);

    Object.keys(data).forEach(attr => model.set(camelize(attr), data[attr]));

    model.set('state', 'NC');
    model.set('user', this.get('currentUser.user'));

    this.set('isCreating', true);
    if (this.get('is_damage')){
      model.set('status','damaged');
      this.get('notifications').show('Create Damage Record. This may take a few minutes.');   
    }else{
      this.get('notifications').show('Creating Development. This may take a few minutes.');
    }
    
    

    model
      .save()
      .then(development => {
        this.get('map').add(development);
        this.set('_editing', null);
        this.set('developmentType', null);
        if (this.get('is_damage')){
          this.get('notifications').show(`You have repported a new damage called ${data.name}.`);
        }else{
          this.get('notifications').show(`You have created a new development called ${data.name}.`);

        }
        
        this.transitionToRoute('map.developments.development', development);
      })
      .catch(e => {
        const column = this.findMistake(e);
        if (column) {
          const fieldName = filters[column].name;
          this.get('notifications').error(`The ${fieldName} field has invalid data.`);
        }
        else {
          this.get('notifications').error('Could not create development at this time. Please try again later.');
        }
      })
      .finally(() => {
        this.set('isCreating', false);
      });
  }


  @action
  createEdit(data) {
    data['state'] = 'NC';
    const newEdit = this.get('store').createRecord('edit', {
      user: this.get('currentUser.user'),
      approved: false,
      proposedChanges: castToModel(Development, data),
    });

    if (newEdit) {
      this.set('isCreating', true);

      newEdit
        .save()
        .then(() => {
          this.set('_editing', null);
          this.set('developmentType', null);
          if (data['is_damage']){
            this.get('notifications').show(`You have reported a damage. It may be published after review from a moderator.`);
          }else{
            this.get('notifications').show(`You have created a new development. It may be published after review from a moderator.`);
          }
          
          this.transitionToRoute('map.moderations.for.user', this.get('currentUser.user.id'));
        })
        .catch(e => {
          const column = this.findMistake(e);

          if (column !== null) {
            const fieldName = filters[column].name;
            this.get('notifications').error(`The ${fieldName} field has invalid data.`);
          }
          else {
            this.get('notifications').error('Could not create edit at this time. Please try again later.');
          }
        })
        .finally(() => {
          this.set('isCreating', false);
        });
    }
  }


  findMistake(error) {
    const errorDelim = "'#/";
    const errorIndex = error.message.indexOf(errorDelim);

    if (errorIndex !== -1) {
      const columnName = error.message.slice(errorIndex)
                          .split(' ')[0]
                          .replace(errorDelim, '')
                          .replace("'", '');

      return camelize(columnName);
    }
  }

}
