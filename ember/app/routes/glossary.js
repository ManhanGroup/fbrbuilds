import Route from '@ember/routing/route';
import content from 'fbrbuilds/content';

export default class extends Route {
  constructor() {
    super();
    this.glossaryTerms = Object.values(content.GLOSSARY);
  }
}
