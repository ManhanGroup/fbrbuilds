import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | defined term', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{defined-term key='DEVELOPER'}}`);

    assert.dom('*').hasText('Developer');

    // Template block usage:
    await render(hbs`
      {{#defined-term}}
        template block text
      {{/defined-term}}
    `);

    assert.dom('*').hasText('Undefined');
  });
});
