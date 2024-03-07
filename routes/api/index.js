const router = require('express').Router()

const gemini = require('./gemini')

router.get('/chat', gemini) //채팅
router.get('/caseSummary', gemini) //사례요약
router.get('/case', gemini) //사례
router.get('/precedent', gemini) //판례
router.get('/law', gemini) //법령
router.get('/analysis', gemini) //분석
router.get('/sample_sojang', gemini) //민사소장
router.get('/sample_gosojang', gemini) //형사고소장

module.exports = router