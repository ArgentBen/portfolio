const ts = Date.now() - 10000;
const body = JSON.stringify({
  formType: 'contact',
  name: 'Test User',
  contactMethod: 'telegram',
  contact: '@testuser',
  message: 'Test with honeypot',
  website: 'http://spam.com',
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

console.log('honeypot test status', res.status);
console.log(await res.text());
