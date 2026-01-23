import { sanitizeHtml } from '../sanitize-html';

describe('sanitizeHtml', () => {
  describe('script tag removal', () => {
    it('removes script tags and their content', () => {
      const input = '<p>Hello</p><script>alert("xss")</script><p>World</p>';
      expect(sanitizeHtml(input)).toBe('<p>Hello</p><p>World</p>');
    });

    it('removes multiple script tags', () => {
      const input = '<script>bad1</script>text<script>bad2</script>';
      expect(sanitizeHtml(input)).toBe('text');
    });

    it('removes script tags with attributes', () => {
      const input = '<script type="text/javascript" src="evil.js">code</script>safe';
      expect(sanitizeHtml(input)).toBe('safe');
    });

    it('handles script tags with newlines', () => {
      const input = `<script>
        console.log("evil");
      </script>safe`;
      expect(sanitizeHtml(input)).toBe('safe');
    });
  });

  describe('style tag removal', () => {
    it('removes style tags and their content', () => {
      const input = '<style>body { display: none; }</style><p>Content</p>';
      expect(sanitizeHtml(input)).toBe('<p>Content</p>');
    });

    it('removes multiple style tags', () => {
      const input = '<style>.a{}</style>text<style>.b{}</style>';
      expect(sanitizeHtml(input)).toBe('text');
    });

    it('removes style tags with attributes', () => {
      const input = '<style type="text/css">h1{color:red}</style>text';
      expect(sanitizeHtml(input)).toBe('text');
    });
  });

  describe('anchor tag handling', () => {
    it('adds target="_blank" to anchor tags', () => {
      const input = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('target="_blank"');
    });

    it('adds rel="noopener noreferrer" to anchor tags', () => {
      const input = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('removes existing target attribute before adding new one', () => {
      const input = '<a href="https://example.com" target="_self">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('target="_self"');
      expect(result).toContain('target="_blank"');
    });

    it('removes existing rel attribute before adding new one', () => {
      const input = '<a href="https://example.com" rel="nofollow">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('rel="nofollow"');
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('handles multiple anchor tags', () => {
      const input = '<a href="a.com">A</a><a href="b.com">B</a>';
      const result = sanitizeHtml(input);
      expect((result.match(/target="_blank"/g) || []).length).toBe(2);
      expect((result.match(/rel="noopener noreferrer"/g) || []).length).toBe(2);
    });

    it('preserves other anchor attributes', () => {
      const input = '<a href="https://example.com" class="link" id="mylink">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('class="link"');
      expect(result).toContain('id="mylink"');
      expect(result).toContain('href="https://example.com"');
    });
  });

  describe('edge cases', () => {
    it('returns empty string for empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('returns empty string for null/undefined', () => {
      expect(sanitizeHtml(null as unknown as string)).toBe('');
      expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    });

    it('handles nested tags correctly', () => {
      const input = '<div><script>evil</script><p>safe</p></div>';
      expect(sanitizeHtml(input)).toBe('<div><p>safe</p></div>');
    });

    it('preserves normal HTML content', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      expect(sanitizeHtml(input)).toBe('<p>Hello <strong>World</strong></p>');
    });

    it('handles plain text without HTML', () => {
      const input = 'Just plain text';
      expect(sanitizeHtml(input)).toBe('Just plain text');
    });

    it('handles combined script, style, and anchor tags', () => {
      const input = '<script>bad</script><style>.evil{}</style><a href="test.com">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('<style>');
      expect(result).toContain('target="_blank"');
    });
  });
});
