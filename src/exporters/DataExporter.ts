import { UserData } from '../data/UserData';
import fetch from 'node-fetch';

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result = '';

  public async export() {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.data = await response.json();
    } catch (error) {
      console.info('Error while fetching data');
      console.error(error);
    }
  }

  protected transform() {
    this.data = this.data
      .map(({ id, name, email, phone }) => ({ id, name, email, phone }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender() {
    // hook
  }

  protected afterRender() {
    // hook
  }

  protected abstract render(): string;
  protected abstract save(): void;
}