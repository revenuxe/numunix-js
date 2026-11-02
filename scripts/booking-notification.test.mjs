import test from 'node:test';
import assert from 'node:assert/strict';
import { notifyRepairTeam } from '../src/lib/booking-notification.ts';

const booking = { reference: 'NX-TEST-123', name: 'Test customer', phone: '+919876543210', service: 'Mobile repair', timeline: 'Flexible', description: 'Screen not working', source: '/electronic/repairs/mobile-repair' };

test('enquiries send only to the fixed inbox with receipt and contact details', async () => {
  const result = await notifyRepairTeam(booking, 'test-key', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.headers['Idempotency-Key'], 'repair-booking/NX-TEST-123');
    const body = JSON.parse(options.body);
    assert.deepEqual(body.to, ['numunix@gmail.com']);
    assert.equal(body.from, 'Numunix Repairs <onboarding@resend.dev>');
    assert.match(body.subject, /Repair enquiry/);
    for (const value of [booking.phone, booking.reference, booking.service, booking.source, booking.description]) assert.ok(body.text.includes(value));
    return new Response(JSON.stringify({ id: 'email-id' }));
  });
  assert.equal(result, 'sent');
});

test('callbacks have a distinct subject and allow an empty description', async () => {
  const result = await notifyRepairTeam({ ...booking, name: 'Callback request', description: null }, 'test-key', async (_url, options) => {
    assert.match(JSON.parse(options.body).subject, /Callback requested/);
    return new Response(JSON.stringify({ id: 'email-id' }));
  });
  assert.equal(result, 'sent');
});

test('missing configuration does not attempt delivery', async () => {
  assert.equal(await notifyRepairTeam(booking, undefined, async () => { assert.fail('Must not send'); }), 'unconfigured');
});

test('provider rejection, malformed success and timeout never throw', async () => {
  for (const send of [async () => new Response('{}', { status: 403 }), async () => new Response('{}'), async () => { throw new Error('Timeout'); }]) {
    assert.equal(await notifyRepairTeam(booking, 'test-key', send), 'failed');
  }
});
