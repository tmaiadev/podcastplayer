export function sanitizeHtml(html: string): string {
  if (!html) return '';

  let sanitized = html;

  // Remove script tags and their contents
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove style tags and their contents
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Add target="_blank" and rel="noopener noreferrer" to all anchor tags
  sanitized = sanitized.replace(
    /<a\s+([^>]*?)>/gi,
    (match, attributes) => {
      // Remove existing target and rel attributes to avoid duplicates
      const cleanAttrs = attributes
        .replace(/\s*target\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\s*rel\s*=\s*["'][^"']*["']/gi, '')
        .trim();

      return `<a ${cleanAttrs} target="_blank" rel="noopener noreferrer">`;
    }
  );

  return sanitized;
}
