# Canon Bench: the open canon

[Canon Bench](https://organic-human-benchmark.vercel.app) is a general-knowledge platform where players decide what's worth knowing. Every player has a budget of points to put on the questions they think everyone should know. A question's **weight** is the team's starting weight plus everyone's points.

The **canon** is the heaviest questions that together hold 95% of all weight. Those are the questions drawn in rooms and training. Below the line, a question isn't played.

This repo is a copy of the canon, updated once a day when it changed. The git history is the canon's history: diff two days to see what moved, or follow a question's line to see when it came in.

- [`CANON.md`](CANON.md): the canon as a table, with answers.
- [`canon.json`](canon.json): everything, question by question.

## canon.json

```jsonc
{
  "share": 0.95,      // share of all weight the canon holds
  "line": 630,        // weight of the lightest question in the canon
  "questions": [      // heaviest first
    {
      "rank": 1,
      "weight": 3870,
      "id": "earth-age",
      "field": "Earth science",
      "prompt": "How old is the Earth, in years?",
      "asOf": null,          // for answers that change over time
      "type": "number",      // "mcq" | "number" | "gap"
      // mcq:    options, multi, answer (indexes of the right options)
      // number: unit, scale ("linear" | "log"), min, max, step, answer, zeroAt
      //         (score = max(0, 1 - error / zeroAt), the error in orders of magnitude when log)
      // gap:    pattern ("_" marks a blank), prefix, suffix, answer
      "explanation": "…",
      "url": "https://organic-human-benchmark.vercel.app/q/earth-age"
    }
  ]
}
```

## Licence

The questions, answers and weights are under [CC BY 4.0](LICENSE): use them for anything, crediting the authors.
