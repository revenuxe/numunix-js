import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { repairBrandsForService, REPAIR_BRANDS } from '../src/content/repair-brands.ts';
import { enquirySchema } from '../src/lib/enquiry-schema.ts';

test('each specific repair service has its own brands; doorstep supports the combined list', () => {
  const catalogue = readFileSync('src/content/repair-services.ts', 'utf8');
  const services = [...catalogue.matchAll(/"name": "([^"]+)"/g)].map(match => match[1]);
  assert.equal(services.length, 16);
  for (const service of services) {
    if (service !== 'Doorstep Electronics Service') assert.ok(REPAIR_BRANDS[service]?.length, service);
    const brands = repairBrandsForService(service);
    assert.equal(new Set(brands).size, brands.length);
    assert.ok(brands.includes('Other brand'));
    assert.ok(brands.includes('Not sure'));
  }
  assert.ok(repairBrandsForService('Mobile Repair').includes('Apple'));
  assert.ok(!repairBrandsForService('Washing Machine Repair').includes('Apple'));
  assert.ok(repairBrandsForService('AC Service & Repair').includes('Daikin'));
});

test('brand persists through validation, accepts legacy/callback omissions and rejects oversized input', () => {
  const enquiry = { name: 'Test', phone: '+919876543210', service: 'Washing Machine Repair', brand: ' LG ', timeline: 'Flexible', description: '', source: '/contact' };
  assert.equal(enquirySchema.parse(enquiry).brand, 'LG');
  assert.equal(enquirySchema.parse({ ...enquiry, brand: undefined }).brand, null);
  assert.equal(enquirySchema.parse({ ...enquiry, brand: '' }).brand, null);
  assert.equal(enquirySchema.safeParse({ ...enquiry, brand: 'a'.repeat(101) }).success, false);
});
