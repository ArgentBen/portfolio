const ts = Date.now() - 500; // too fast
const body = JSON.stringify({
  formType: 'contact',
  name: 'Fast User',
  contactMethod: 'telegram',
  contact: '@fast',
  message: 'Too fast submit test',
  website: '',
  company: '',
  formTs: ts,
});

const res = await fetch('https://argentum-web.ru/api/contact.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  },
  body,
});

console.log('fast submit status', res.status);
console.log(await res.text());
