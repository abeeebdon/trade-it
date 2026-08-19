export const FILTERS = [
  { v: 'all' as const, l: 'All' },
  { v: 'in_transit' as const, l: 'In Transit' },
  { v: 'delivered' as const, l: 'Delivered' },
  { v: 'processing' as const, l: 'Processing' },
];

export function categoryOf(
  status: string,
): 'in_transit' | 'delivered' | 'processing' | 'other' {
  const s = status.toLowerCase();
  if (['shipped', 'in_transit', 'at_customs', 'customs'].includes(s))
    return 'in_transit';
  if (['delivered', 'released'].includes(s)) return 'delivered';
  if (
    [
      'pending',
      'created',
      'paid',
      'processing',
      'packed',
      'confirmed',
    ].includes(s)
  )
    return 'processing';
  return 'other';
}
