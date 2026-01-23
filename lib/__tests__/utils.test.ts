import { cn } from '../utils';

describe('cn (className utility)', () => {
  it('merges multiple class strings', () => {
    const result = cn('class1', 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('handles undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    const result = cn('class1', '', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles boolean conditions (clsx feature)', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base', isActive && 'active', isDisabled && 'disabled');
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });

  it('handles object syntax (clsx feature)', () => {
    const result = cn({
      'base-class': true,
      'active-class': true,
      'disabled-class': false,
    });
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
    expect(result).not.toContain('disabled-class');
  });

  it('handles array syntax (clsx feature)', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('resolves Tailwind class conflicts (tailwind-merge feature)', () => {
    // Later padding should override earlier padding
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('handles conflicting text colors', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('handles conflicting background colors', () => {
    const result = cn('bg-white', 'bg-black');
    expect(result).toBe('bg-black');
  });

  it('preserves non-conflicting classes', () => {
    const result = cn('p-4', 'text-red-500', 'm-2');
    expect(result).toContain('p-4');
    expect(result).toContain('text-red-500');
    expect(result).toContain('m-2');
  });

  it('handles responsive modifiers correctly', () => {
    const result = cn('p-2', 'md:p-4', 'lg:p-6');
    expect(result).toContain('p-2');
    expect(result).toContain('md:p-4');
    expect(result).toContain('lg:p-6');
  });

  it('returns empty string for no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles complex nested structures', () => {
    const result = cn(
      'base',
      ['nested1', 'nested2'],
      { conditional: true },
      undefined,
      'final'
    );
    expect(result).toContain('base');
    expect(result).toContain('nested1');
    expect(result).toContain('nested2');
    expect(result).toContain('conditional');
    expect(result).toContain('final');
  });
});
