export function stringInject<T extends object>(string: string, obj: T) {
  let s = string;
  for (const prop in obj) {
    // @ts-expect-error should be correct.
    s = s.replace(new RegExp("{" + prop + "}", "g"), obj[prop]);
  }
  return s;
}
