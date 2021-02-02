export default function () {
  function formatDate(isoDate: string, locale: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString(locale, options);
  }
  return formatDate;
}
