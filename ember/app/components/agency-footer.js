import Component from '@ember/component';
import agencies from '../agencies';

export default class extends Component {

    constructor() {
        super();

        this.agencies = agencies
        this.currentAgency = agencies.FBRMPO.properties
    

    }

    
}
