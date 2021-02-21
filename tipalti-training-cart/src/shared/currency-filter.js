export default function (amount, Currency) {
  let CurrencySymbol = '';
  if (Currency === 'USD') {
    CurrencySymbol = '$';
  } else if (Currency === 'EUR') {
    CurrencySymbol = '€';
  }

  return `${amount}${CurrencySymbol}`;
}
