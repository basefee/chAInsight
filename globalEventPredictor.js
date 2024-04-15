const newsRequest = Functions.makeHttpRequest({
  url: "https://newsapi.org/v2/everything",
  params: {
    q: "BJP",
    from: "2024-04-09",
    sortBy: "popularity",
    apiKey: secrets.newsApiKey,
  },
})

const [newsResponse] = await Promise.all([newsRequest])

let news = ""
if (!newsResponse.error) {
  for (let index = 1; index < 3; index++) {
    news = news + newsResponse.data.articles[index].title + "; "
    news = "India"
  }
} else {
  console.log(newsResponse)
}

const data = {
  contents: [
    {
      parts: [
        {
          text:
            "State the most possible outcome of the election result according to the given news and your knowledge" +
            news, // Change the prompt
        },
      ],
    },
  ],
}
const geminiPromptRequest = Functions.makeHttpRequest({
  method: "POST",
  url: " https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
  params: {
    key: secrets.geminiApiKey,
  },
  data: data,
})

const geminiPromptResponse = await Promise.all([geminiPromptRequest])

let outcome = ""
if (!geminiPromptResponse.error) {
  outcome = outcome + geminiPromptResponse[0].data.candidates[0].content.parts[0].text
} else {
  console.log(geminiPromptResponse)
}

return Functions.encodeString(outcome)
