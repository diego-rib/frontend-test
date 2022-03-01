export default function formatDate(dateString) {
  // divide a string no caractere 'T' = ['2014-12-10', '11:37:19.144000Z']
  const [dateWithoutTime, timeWithoutDate] = dateString.split('T');

  // separa usando os hifens = ['2014', '12', '10']
  const splittedDate = dateWithoutTime.split('-');
  // inverte e junta com '/' = '10/12/2014'
  const date = splittedDate.reverse().join('/');

  // remove segundos e milissegundos = '11:37'
  const time = timeWithoutDate.replace(/:\d{2}\..*/, '');

  return `${date} - ${time}`;
}
