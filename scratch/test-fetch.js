fetch('https://easy-go-jade.vercel.app/api/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken: "test" })
}).then(res => res.json()).then(console.log).catch(console.error);
