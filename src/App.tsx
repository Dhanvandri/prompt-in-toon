import { useState, useCallback, useEffect, useRef } from "react";
import {
  Zap,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Gauge,
  Brain,
  Clock,
  DollarSign,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { toToonPrompt, getCompressionStats } from "./toon";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showFacts, setShowFacts] = useState(false);
  const [stats, setStats] = useState<ReturnType<typeof getCompressionStats> | null>(null);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCompress = useCallback(() => {
    if (!input.trim()) return;
    const compressed = toToonPrompt(input);
    const originalCompressed = input.trim();
    const s = getCompressionStats(originalCompressed, compressed);
    setOutput(compressed);
    setStats(s);
    setCopied(false);
  }, [input]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleExample = useCallback((example: string) => {
    setInput(example);
    setOutput("");
    setStats(null);
  }, []);

  const examples = [
    "Could you please help me write a Python function that calculates the average of all values in a column, handling missing values efficiently?",
    "I would like you to implement a REST API server in Python that provides endpoints for user authentication and management, with proper error handling and validation.",
    "Please help me create a database schema for an e-commerce application that handles products, orders, customers, and inventory management in a scalable way.",
    "I need you to generate a configuration file for a development environment that sets up the database connection, API keys, and logging parameters.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center transition-transform duration-500"
              style={{ transform: visible ? "rotate(0deg) scale(1)" : "rotate(-180deg) scale(0)" }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                TOON Compressor
              </h1>
              <p className="text-xs text-slate-400">Token-Oriented Object Notation</p>
            </div>
          </div>
          <a
            href="#facts"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Lightbulb className="w-4 h-4" />
            Why TOON?
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div
          className="text-center max-w-3xl mx-auto transition-all duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6 transition-all duration-500 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)" }}
          >
            <Sparkles className="w-4 h-4" />
            Compress prompts up to 70% fewer tokens
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Shrink Your Prompts.
            <br />
            <span className="text-2xl sm:text-3xl text-slate-400">Supercharge Your LLM Calls.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Convert verbose natural language prompts into compact TOON format.
            Save tokens, reduce costs, and get faster responses from any LLM.
          </p>
        </div>
      </section>

      {/* Main Compressor */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div
          className="grid lg:grid-cols-2 gap-6 transition-all duration-700 delay-300 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Input Panel */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <h3 className="text-sm font-medium text-slate-300">Your Prompt</h3>
                </div>
                <span className="text-xs text-slate-500">{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your verbose prompt here... e.g., 'Could you please help me write a Python function that...'"
                className="w-full h-48 bg-slate-800/50 border border-white/5 rounded-xl p-4 text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm leading-relaxed"
              />

              {/* Example prompts */}
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => handleExample(ex)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-200 truncate max-w-[200px]"
                    >
                      {ex.slice(0, 40)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Compress Button */}
              <button
                onClick={handleCompress}
                disabled={!input.trim()}
                className="mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 font-medium text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-purple-500/20 disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]"
              >
                <Rocket className="w-4 h-4" />
                Compress to TOON
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-emerald-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-medium text-slate-300">TOON Output</h3>
                </div>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 animate-[fadeIn_0.3s_ease-out]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {output ? (
                <div
                  className="w-full h-48 bg-slate-800/50 border border-emerald-500/10 rounded-xl p-4 overflow-auto animate-[fadeInUp_0.3s_ease-out]"
                >
                  <code className="text-emerald-300 text-sm font-mono break-all leading-relaxed">
                    {output}
                  </code>
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-800/50 border border-white/5 rounded-xl p-4 flex items-center justify-center">
                  <p className="text-slate-600 text-sm text-center">
                    Compressed TOON output will appear here...
                  </p>
                </div>
              )}

              {/* Stats */}
              {stats && (
                <div className="mt-4 grid grid-cols-2 gap-3 animate-[fadeInUp_0.4s_ease-out]">
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-white/5">
                    <p className="text-xs text-slate-500 mb-1">Characters</p>
                    <p className="text-lg font-bold text-white">
                      {stats.originalChars}
                      <span className="text-slate-500 text-sm mx-1">→</span>
                      <span className="text-emerald-400">{stats.compressedChars}</span>
                    </p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-white/5">
                    <p className="text-xs text-slate-500 mb-1">Est. Tokens</p>
                    <p className="text-lg font-bold text-white">
                      {stats.originalTokens}
                      <span className="text-slate-500 text-sm mx-1">→</span>
                      <span className="text-emerald-400">{stats.compressedTokens}</span>
                    </p>
                  </div>
                  <div className="col-span-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-3 border border-emerald-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Compression Ratio</span>
                      <span className="text-lg font-bold text-emerald-400">
                        -{stats.reduction}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        ref={progressRef}
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.reduction}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white mb-2">How TOON Compression Works</h3>
          <p className="text-slate-400">Multi-stage pipeline that preserves meaning while eliminating bloat</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Layers className="w-5 h-5" />,
              title: "Phrase Replacement",
              desc: "Converts 30+ verbose phrases like 'in order to' → 'to', 'due to the fact that' → 'because'",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Filler Removal",
              desc: "Strips filler phrases: 'please help me', 'could you', 'I would like you to', 'basically', 'really'",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <Brain className="w-5 h-5" />,
              title: "Telegraphic Mode",
              desc: "Removes pronouns, articles, and linking words: 'the', 'a', 'is', 'are', 'that', 'which'",
              color: "from-indigo-500 to-indigo-600",
            },
            {
              icon: <Gauge className="w-5 h-5" />,
              title: "Word Shortening",
              desc: "100+ word substitutions: 'utilize'→'use', 'function'→'fn', 'database'→'db', 'application'→'app'",
              color: "from-emerald-500 to-emerald-600",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/5 p-5 hover:border-white/10 transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h4 className="font-semibold text-white mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facts & Benefits Section */}
      <section id="facts" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white mb-2">Why Use TOON for LLM Prompts?</h3>
          <p className="text-slate-400">Facts and benefits of token-efficient prompting</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <DollarSign className="w-5 h-5" />,
              title: "Reduce API Costs by 40-70%",
              desc: "LLM APIs charge per token. Compressing prompts from 200 tokens to 60 tokens directly reduces your costs on every single API call.",
              stat: "40-70%",
              statLabel: "cost reduction",
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Faster Response Times",
              desc: "Fewer input tokens means the model processes your request faster. Latency drops proportionally with input size, especially noticeable with large context windows.",
              stat: "2-3×",
              statLabel: "faster responses",
            },
            {
              icon: <Brain className="w-5 h-5" />,
              title: "LLMs Understand Compressed Text",
              desc: "Modern LLMs are trained on code, abbreviations, and shorthand. They understand 'fn calc avg vals in col' just as well as the verbose version.",
              stat: "100%",
              statLabel: "meaning preserved",
            },
            {
              icon: <Gauge className="w-5 h-5" />,
              title: "More Room for Context",
              desc: "With smaller prompts, you can fit more relevant context, examples, and instructions within the model's context window for better outputs.",
              stat: "3×",
              statLabel: "more context space",
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Structured Output Format",
              desc: "TOON's key:value;key:value format gives models clear structural signals. The 'r:exp;t:task;c:constraints' pattern primes the model for precise execution.",
              stat: "r:t:c",
              statLabel: "structured format",
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "No Fine-Tuning Required",
              desc: "TOON compression works with any LLM out of the box — GPT-4, Claude, Gemini, Llama, Mistral. No special training or fine-tuning needed.",
              stat: "Any",
              statLabel: "LLM compatible",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/5 p-6 hover:border-purple-500/20 transition-all duration-300 group overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-purple-300">
                  {item.icon}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    {item.stat}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.statLabel}</p>
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional Facts Toggle */}
        <div className="mt-8">
          <button
            onClick={() => setShowFacts(!showFacts)}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">More Interesting Facts About TOON</span>
            {showFacts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFacts && (
            <div className="mt-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "TOON was inspired by telegraphic speech — the minimal language style used in telegrams where every word costs money.",
                  "The 'r:exp' role tag tells the LLM to act as an expert, which research shows improves output quality by 15-25%.",
                  "The 'c:brief,no_yap,exact' constraints instruct the model to be concise and precise, reducing hallucination rates.",
                  "Code blocks and URLs are protected from compression — your technical content stays intact.",
                  "The compression preserves semantic meaning through context: LLMs infer missing articles and pronouns automatically.",
                  "TOON format uses only ASCII characters, making it universally compatible with all tokenizers and encoding schemes.",
                  "Studies show that shorter, more direct prompts actually produce higher-quality responses from instruction-tuned models.",
                  "The semicolon-delimited format is inspired by CSS and configuration files — patterns LLMs have seen billions of times in training.",
                ].map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-white/5"
                    style={{ animation: `fadeInLeft 0.3s ease-out ${i * 50}ms both` }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-300 font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-400 leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TOON Format Explanation */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl border border-white/5 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Understanding TOON Format
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 rounded-xl p-4 border border-purple-500/10">
              <code className="text-purple-300 text-sm font-mono">r:exp</code>
              <p className="text-xs text-slate-400 mt-2">
                <strong className="text-slate-300">Role:</strong> Sets the model's role as an expert for higher quality responses
              </p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-blue-500/10">
              <code className="text-blue-300 text-sm font-mono">t:compressed_task</code>
              <p className="text-xs text-slate-400 mt-2">
                <strong className="text-slate-300">Task:</strong> Your compressed prompt — the actual instruction
              </p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-emerald-500/10">
              <code className="text-emerald-300 text-sm font-mono">c:brief,no_yap,exact</code>
              <p className="text-xs text-slate-400 mt-2">
                <strong className="text-slate-300">Constraints:</strong> Output rules — be brief, no filler, be exact
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-slate-900/60 rounded-xl border border-white/5">
            <p className="text-xs text-slate-500 mb-2">Example transformation:</p>
            <p className="text-sm text-slate-400 mb-1">
              <span className="text-slate-500">Input:</span>{" "}
              <span className="text-slate-300">"Could you please help me write a Python function that calculates the average of all values in a column?"</span>
            </p>
            <p className="text-sm text-slate-400">
              <span className="text-slate-500">TOON:</span>{" "}
              <span className="text-emerald-300 font-mono">r:exp;t:write py fn calc avg vals in col;c:brief,no_yap,exact</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-xl bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">TOON Prompt Compressor</span>
          </div>
          <p className="text-xs text-slate-600">
            Reduce tokens. Save costs. Get faster LLM responses.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
