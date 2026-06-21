const maxVisible = 5;
function getPageNumbers(current, total) {
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - maxVisible + 1);
  }
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
const cases = [
  { current: 1, total: 10 },
  { current: 5, total: 10 },
  { current: 10, total: 10 },
  { current: 3, total: 3 },
];
cases.forEach(c => {
  console.log(`current ${c.current}, total ${c.total}:`, getPageNumbers(c.current, c.total));
});