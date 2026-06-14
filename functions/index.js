const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const app = express();

// ⚠️ 모든 경로('*') 혹은 루트('/')에서 진입할 때 동적 HTML을 반환하도록 설정
app.get("*", (req, res) => {
    const serverTime = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    
    const dynamicHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>Firebase 동적 웹페이지</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; background: #fafafa; }
            .card { background: white; padding: 30px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .time { color: #e91e63; font-size: 24px; font-weight: bold; margin: 20px 0; }
            .btn { background: #2196F3; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;}
        </style>
    </head>
    <body>
        <div class="card">
            <h2>🔥 Firebase Functions 동적 페이지</h2>
            <p>이 페이지는 사용자가 접속할 때마다 서버에서 실시간으로 생성됩니다.</p>
            <div class="time">🕒 서버 렌더링 시간: ${serverTime}</div>
            <a href="/" class="btn">새로고침 (시간 업데이트)</a>
        </div>
    </body>
    </html>
    `;
    
    res.send(dynamicHtml);
});

// 'ssrApp' 이름 일치 여부 확인
exports.ssrApp = onRequest(app);
