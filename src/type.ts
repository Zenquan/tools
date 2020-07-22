/**
 * 
 * @param type 要判断的对象
 */
const type = <T extends {}>(type: T): string => {
  return Object.prototype.toString.call(type).slice(8, -1);
}

export {
  type
}
