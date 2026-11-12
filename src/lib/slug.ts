// "Spring Boot" → "spring-boot". Used to match tags between rows.
export const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
