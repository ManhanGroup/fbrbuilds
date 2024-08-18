import Component from '@ember/component';
import { later, next } from '@ember/runloop';
import agencies from '../agencies';

export default class extends Component {

    constructor() {
        super();

        this.agencies = agencies
        this.currentAgency = agencies.FBRMPO.properties
    

    }

    
}
