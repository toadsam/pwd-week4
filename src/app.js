const express = require('express');
const cors = require('cors');
const restaurantsRouter = require('./routes/restaurants.routes');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');

function createApp() {
  const app = express();

  // 미들웨어 설정
  app.use(cors());
  app.use(express.json()); // JSON 형식의 본문(body)을 파싱
  app.use(express.urlencoded({ extended: true })); // URL 인코딩된 본문을 파싱

  // === 새로 추가된 루트(메인 페이지) 라우트 ===
  // GET / 요청이 들어오면 환영 메시지를 보냅니다.
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Express Server! API documentation is available at /api/restaurants.');
  });
  // ======================================

  // 서버 상태 확인 라우트
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // 레스토랑 API 라우트 연결
  app.use('/api/restaurants', restaurantsRouter);

  // 정의된 라우트 외의 모든 요청을 처리 (404 Not Found)
  app.use(notFound);
  // 에러 처리 미들웨어
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
