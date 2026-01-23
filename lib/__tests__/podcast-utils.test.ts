import { hashString, getPodcastInitials, getPodcastColor } from '../podcast-utils';

describe('hashString', () => {
  it('returns a number for any string input', () => {
    expect(typeof hashString('test')).toBe('number');
    expect(typeof hashString('')).toBe('number');
    expect(typeof hashString('a very long string with lots of characters')).toBe('number');
  });

  it('returns the same hash for the same input', () => {
    const input = 'The Daily';
    expect(hashString(input)).toBe(hashString(input));
  });

  it('returns different hashes for different inputs', () => {
    expect(hashString('hello')).not.toBe(hashString('world'));
    expect(hashString('abc')).not.toBe(hashString('cba'));
  });

  it('always returns a non-negative number', () => {
    const testStrings = ['test', 'negative', '!@#$%', '', '12345', 'ñoño'];
    testStrings.forEach((str) => {
      expect(hashString(str)).toBeGreaterThanOrEqual(0);
    });
  });

  it('handles unicode characters', () => {
    expect(typeof hashString('こんにちは')).toBe('number');
    expect(typeof hashString('🎧🎵')).toBe('number');
    expect(hashString('こんにちは')).toBeGreaterThanOrEqual(0);
  });

  it('handles special characters', () => {
    expect(hashString('!@#$%^&*()')).toBeGreaterThanOrEqual(0);
    expect(hashString('<script>alert("xss")</script>')).toBeGreaterThanOrEqual(0);
  });
});

describe('getPodcastInitials', () => {
  it('returns first two characters for single-word titles', () => {
    expect(getPodcastInitials('Dhalgren')).toBe('DH');
    expect(getPodcastInitials('Pod')).toBe('PO');
    expect(getPodcastInitials('X')).toBe('X');
  });

  it('returns first letter of first two words for multi-word titles', () => {
    expect(getPodcastInitials('The Daily')).toBe('TD');
    expect(getPodcastInitials('Hello World Show')).toBe('HW');
    expect(getPodcastInitials('New York Times')).toBe('NY');
  });

  it('handles titles starting with numbers', () => {
    expect(getPodcastInitials('99% Invisible')).toBe('9I');
    expect(getPodcastInitials('24 Hours')).toBe('2H');
  });

  it('returns uppercase initials', () => {
    expect(getPodcastInitials('the daily')).toBe('TD');
    expect(getPodcastInitials('hello')).toBe('HE');
  });

  it('returns ?? for empty or null input', () => {
    expect(getPodcastInitials('')).toBe('??');
    expect(getPodcastInitials(null as unknown as string)).toBe('??');
    expect(getPodcastInitials(undefined as unknown as string)).toBe('??');
  });

  it('removes special characters before processing', () => {
    expect(getPodcastInitials('!@#Hello World')).toBe('HW');
    expect(getPodcastInitials('...Test')).toBe('TE');
  });

  it('handles titles with only special characters', () => {
    // When cleaned title is empty, falls back to original first 2 chars
    const result = getPodcastInitials('!!');
    expect(result).toBe('!!');
  });

  it('handles extra whitespace', () => {
    expect(getPodcastInitials('  Hello   World  ')).toBe('HW');
    expect(getPodcastInitials('Single')).toBe('SI');
  });
});

describe('getPodcastColor', () => {
  it('returns an object with from and to properties', () => {
    const color = getPodcastColor(123);
    expect(color).toHaveProperty('from');
    expect(color).toHaveProperty('to');
    expect(color.from).toMatch(/^#[0-9a-f]{6}$/i);
    expect(color.to).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('returns the same color for the same podcast ID', () => {
    const id = 42;
    expect(getPodcastColor(id)).toEqual(getPodcastColor(id));
  });

  it('works with string IDs', () => {
    const color = getPodcastColor('test-podcast-id');
    expect(color).toHaveProperty('from');
    expect(color).toHaveProperty('to');
  });

  it('handles number IDs', () => {
    const color = getPodcastColor(12345);
    expect(color).toHaveProperty('from');
    expect(color).toHaveProperty('to');
  });

  it('returns valid colors from the palette', () => {
    // Test multiple IDs to ensure they all return valid colors
    for (let i = 0; i < 20; i++) {
      const color = getPodcastColor(i);
      expect(color.from).toMatch(/^#[0-9a-f]{6}$/i);
      expect(color.to).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
