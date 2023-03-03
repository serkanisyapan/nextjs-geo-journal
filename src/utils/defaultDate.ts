const now = new Date();
const padNum = (num: number) => num.toString().padStart(2, '0');

export default function defaultDate() {
  return `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(
    now.getDate()
  )}`;
}
