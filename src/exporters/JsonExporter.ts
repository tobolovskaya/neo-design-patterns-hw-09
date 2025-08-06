import { DataExporter } from './DataExporter';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { EXPORTS_PATH } from '../const';

export class JsonExporter extends DataExporter {
  protected render(): string {
    return JSON.stringify(this.data, null, 2);
  }

  protected save(): void {
    const filePath = `${EXPORTS_PATH}/users.json`;
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, 'utf-8');
  }
}