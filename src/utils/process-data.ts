export function mapToObject<T, K, R>(map: Map<T, K>): R {
  const obj: any = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value instanceof Map ? mapToObject(value) : value;
  }
  return obj;
}
