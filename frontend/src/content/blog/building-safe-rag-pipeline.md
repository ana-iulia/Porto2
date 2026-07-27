# How I Built the RAG Pipeline for Lumi — and What I'd Improve

RAG (Retrieval-Augmented Generation) is how you give an LLM access to *your* documents without retraining it. Instead of baking knowledge into the model's weights, you retrieve relevant text at query time and pass it as context. The LLM answers based on what you retrieved — not just what it memorised during training.

I used this in Lumi, a health companion for underrepresented women. Every response is grounded in a curated knowledge base of NHS-aligned documents covering conditions like PCOS, anaemia, and cardiovascular risk — plus symptom guides and GP question templates.

---

## How the pipeline works

The process has four steps.

First, the documents get **chunked** — split into small overlapping pieces so individual topics can be retrieved cleanly. Then each chunk is **embedded**, meaning it's converted into a numerical representation that captures its meaning, and stored in a vector database (ChromaDB in Lumi's case).

When a user sends a message, the same embedding process runs on their question. The system finds the chunks whose meaning is closest to the question and pulls the top results. Those chunks get injected into the LLM's context window alongside the question — that's the **retrieve and generate** step.

One small thing worth mentioning: Lumi appends the user's demographic profile to the search query. Because the knowledge base documents explicitly talk about South Asian women and Black women, including that context in the search naturally surfaces more relevant chunks — no extra infrastructure needed.

---

## Safety guardrails

In a health context, what the system *refuses* to do matters as much as what it does. Every response is governed by rules baked into the system prompt:

- Never diagnose or name a condition as certain
- Never suggest or name medications
- If a message suggests an emergency — chest pain, breathing difficulty — tell the user to call 999 immediately and stop
- Every response ends with: *"It's always worth mentioning this to your GP."*

These rules are rebuilt on every single request, so they can't be talked around through conversation history.

---

## What I didn't do — and what I'd improve

This is a working baseline, not a finished pipeline. To be straightforward about what's missing:

**Better retrieval.** Right now the system uses pure similarity search on embeddings. That works well for natural language but can miss medical acronyms and exact term matches. Combining it with keyword search (BM25) would help — this is called hybrid search and is a standard next step.

**Reranking.** After retrieving the top candidates, a second model could score each one specifically against the user's question — rather than just relying on raw similarity. This tends to meaningfully improve the quality of what actually ends up in the prompt.

**Evaluation.** There's no test suite measuring whether the answers are faithful to the retrieved documents, whether the right chunks are being fetched, or whether the guardrails hold up after changes. That's the most important thing missing.

**Metadata filtering.** The KB documents are already tagged by type at ingest — conditions, symptoms, GP questions — but the retriever doesn't use those tags yet. Scoping searches by category would make retrieval more precise.

The knowledge base is also small by design — 15 files. That's a feature for now (easier to audit, easier to control) but it limits how much Lumi can cover.

---

The core idea is genuinely simple. The hard work is in the quality of the knowledge base, the safety constraints, and the evaluation you build around it — and there's still plenty of room to grow on all three.
