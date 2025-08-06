import { DataExporter } from './DataExporter';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { EXPORTS_PATH } from '../const';

export class XmlExporter extends DataExporter {
  protected render(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<users>\n';

    for (const data of this.data) {
      xml += '  <user>\n';
      for (const key in data) {
        xml += `    <${key}>${data[key as keyof typeof data]}</${key}>\n`;
      }
      xml += '  </user>\n';
    }

    xml += '</users>';

    return xml;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    const filePath = `${EXPORTS_PATH}/users.xml`;
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, 'utf-8');
  }
}