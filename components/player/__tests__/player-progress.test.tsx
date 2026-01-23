import { formatTime } from '../player-progress';

describe('formatTime', () => {
  it('returns "0:00" for zero seconds', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('formats seconds under a minute correctly', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(30)).toBe('0:30');
    expect(formatTime(59)).toBe('0:59');
  });

  it('formats minutes correctly', () => {
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(125)).toBe('2:05');
  });

  it('formats hours correctly', () => {
    expect(formatTime(3600)).toBe('1:00:00');
    expect(formatTime(3661)).toBe('1:01:01');
    expect(formatTime(7325)).toBe('2:02:05');
  });

  it('pads minutes and seconds with zeros when needed', () => {
    expect(formatTime(3661)).toBe('1:01:01'); // 1h 1m 1s
    expect(formatTime(3605)).toBe('1:00:05'); // 1h 0m 5s
    expect(formatTime(65)).toBe('1:05'); // 1m 5s
  });

  it('handles negative numbers', () => {
    expect(formatTime(-1)).toBe('0:00');
    expect(formatTime(-100)).toBe('0:00');
  });

  it('handles Infinity', () => {
    expect(formatTime(Infinity)).toBe('0:00');
    expect(formatTime(-Infinity)).toBe('0:00');
  });

  it('handles NaN', () => {
    expect(formatTime(NaN)).toBe('0:00');
  });

  it('handles large durations', () => {
    expect(formatTime(36000)).toBe('10:00:00'); // 10 hours
    expect(formatTime(86400)).toBe('24:00:00'); // 24 hours
  });

  it('floors decimal seconds', () => {
    expect(formatTime(1.9)).toBe('0:01');
    expect(formatTime(59.9)).toBe('0:59');
    expect(formatTime(90.5)).toBe('1:30');
  });
});
