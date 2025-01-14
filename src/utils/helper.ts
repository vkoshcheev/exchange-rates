export const sleep = (ms?: number) => new Promise(r => setTimeout(r, ms || 0));

export function getCssUrl (input: string) {
  return `url("${input}")`;
}

export const newLine = '\r\n';

export const addModifierToClass = (
  className: string,
  modifier: string,
) => {
  return `${className} ${className}${modifier}`;
};

export const addModifierToClassWhenConditionIsTrue = (
  className: string,
  condition: boolean,
  modifier = '--selected',
) => {
  return condition ? addModifierToClass(className, modifier) : className;
};