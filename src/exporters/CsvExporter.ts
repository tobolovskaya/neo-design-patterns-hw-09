import { DataExporter } from './DataExporter';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { EXPORTS_PATH } from '../const';

export class CsvExporter extends DataExporter {
  protected render(): string {
    const headers = 'id,name,email,phone';
    const rows = this.data.map(u => `${u.id},${u.name},${u.email},${u.phone}`);
    return [headers, ...rows].join('\n');
  }

  protected save(): void {
    const filePath = `${EXPORTS_PATH}/users.csv`;
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, 'utf-8');
  }
}