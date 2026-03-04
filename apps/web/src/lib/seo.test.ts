import { describe, expect, it } from 'vitest';
import { siteMetadata } from './seo';

describe('siteMetadata', () => {
  it('기본 로케일이 ko-KR이어야 한다', () => {
    expect(siteMetadata.locale).toBe('ko-KR');
  });
});
