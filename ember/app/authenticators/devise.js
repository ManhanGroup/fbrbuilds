import url from 'url';
import config from 'fbrbuilds/config/environment';
import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: url.resolve(config.host, 'my/users/sign_in'),
});
