const express = require('express');
const app = express();
app.set('port', 3000);
app.use('/api', require('./routes/api'))

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})