const express = require('express')
const router = express.Router()

const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        /* {
            category: HarmCategory.HARM_CATEGORY_TOXICITY,
            threshold: HarmBlockThreshold.BLOCK_LOW,
        }, */
        /* {
          category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        }, */
    ]
});

router.get('/chat', async (req, res) => { //채팅
    try {
        const { query } = req.query;

        const result = await model.generateContent(query);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/caseSummary', async (req, res) => { //사례요약
    try {
        const { query } = req.query;
        const q = "'" + query + "'" + " 이 승소사례의 주요 내용을 간결하게 요약해줘 답변은 **요약** 한가지 항목으로 작성해줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/case', async (req, res) => { //사례
    try {
        const { query } = req.query;
        //const q = "'" + query + "'" + " 이 사건과 유사한 승소 사례를 법률적인 판단 및 승소 가능성을 예측하지 말고, ** 승소 사례 유사도 약 % **, **승소 사례**, **승소 요인**, **사례간의 유사점**의 네가지 항목으로만 알려줘"
        const q = "'" + query + "'" + " 이 사건과 유사한 승소 사례를 ** 승소 사례 유사도 약 % **, **승소 사례**, **승소 요인**, **사례간의 유사점**의 네가지 항목으로 상세하게 알려줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/precedent', async (req, res) => { //판례
    try {
        const { query } = req.query;
        //const q = "'" + query + "'" + " 이 사건을 법률적인 판단 및 승소 가능성을 제외하고, 유사한 판례를 3개 이하로**유사 판례 요약**의 항목으로 알려줘"
        const q = "'" + query + "'" + " 이 사건과 유사한 판례를 3개 이하로 **판례 제목**, **판례 요약**의 두가지 항목으로 알려줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/law', async (req, res) => { //법령
    try {
        const { query } = req.query;
        const q = "'" + query + "'" + " 관련 법률, 법규, 법령을 상세내용을 포함해서 알려줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/analysis', async (req, res) => { //분석
    try {
        const { query } = req.query;
        //const q = "'" + query + "'" + " 이 사건을 법률적인 판단 및 승소 가능성을 제외하고, **사건 분석**, **추가 고려 사항** 두가지의 항목으로 분석 내용을 간단하게 알려줘"
        const q = "'" + query + "'" + " 이 사건을 **사건 분석**, **추가 고려 사항**의 두가지의 항목으로 분석해줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/sample_sojang', async (req, res) => { //민사소장
    try {
        const { query } = req.query;
        const q = "'" + query + "'" + " 소장을 작성해줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

router.get('/sample_gosojang', async (req, res) => { //형사고소장
    try {
        const { query } = req.query;
        const q = "'" + query + "'" + " 고소장을 작성해줘"

        const result = await model.generateContent(q);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json(text)
    } catch (error) {
        console.log(error);
        return res.status(500).json("InternalServerError");
    }
})

module.exports = router