// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// 빌드된 React 앱을 제공
app.use(express.static(path.join(__dirname, 'build')));

// 모든 GET 요청에 대해 React 앱을 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 실행 중입니다.`);
});