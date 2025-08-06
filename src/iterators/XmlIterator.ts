import { readFileSync } from 'fs';
import { UserData } from '../data/UserData';
import { XMLParser } from 'fast-xml-parser';

export class XmlIterator implements Iterable<UserData> {
  private data: UserData[];

  constructor(filePath: string) {
    const xmlContent = readFileSync(filePath, 'utf-8');

    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });

    const parsed = parser.parse(xmlContent);
    const users = parsed.users?.user ?? [];
    this.data = Array.isArray(users) ? users : [users];
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield {
        id: Number(item.id),
        name: item.name,
        email: item.email,
        phone: item.phone,
      };
    }
  }
}
