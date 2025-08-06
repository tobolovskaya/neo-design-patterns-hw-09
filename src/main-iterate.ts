import { CsvIterator } from './iterators/CsvIterator';
import { JsonIterator } from './iterators/JsonIterator';
import { XmlIterator } from './iterators/XmlIterator';
import { EXPORTS_PATH } from './const';

console.log('--- CSV ---');
for (const user of new CsvIterator(`${EXPORTS_PATH}/users.csv`)) {
  console.log(user);
}

console.log('--- JSON ---');
for (const user of new JsonIterator(`${EXPORTS_PATH}/users.json`)) {
  console.log(user);
}

console.log('--- XML ---');
for (const user of new XmlIterator(`${EXPORTS_PATH}/users.xml`)) {
  console.log(user);
}