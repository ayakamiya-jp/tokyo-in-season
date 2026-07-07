const VIATOR_PARAMS = 'pid=P00308827&mcid=42383&medium=link';

export function buildViatorAffiliateUrl(productUrl: string): string {
  const separator = productUrl.includes('?') ? '&' : '?';
  return `${productUrl}${separator}${VIATOR_PARAMS}`;
}
