const aiChatbots = [
    {
        "id": "chatgpt",
        "name": "ChatGPT",
        "url": "https://chat.openai.com",
        "specialty": ["research", "coding", "business", "productivity"],
        "standoutFeature": "Versatile LLM with deep reasoning, multimodal inputs and agentic task execution",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Plus", "price": "$20/mo" },
                { "name": "Pro", "price": "$200/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/ios/100/chatgpt.png",
        "aiModels": ["GPT-5.2", "GPT-5.1", "GPT-4o"],
        "pros": ["Highly versatile", "Strong reasoning and context management", "Large ecosystem & plugins"],
        "cons": ["Can hallucinate", "Complex pricing for top tiers"],
        "briefHistory": "Developed by OpenAI, ChatGPT popularized consumer AI chat. It continuously evolves with new GPT-5.x models and a growing toolkit (web search, vision, code execution)"
    },
    {
        "id": "claude",
        "name": "Claude",
        "url": "https://claude.ai",
        "specialty": ["writing", "coding", "research", "safety"],
        "standoutFeature": "Focus on safe, aligned AI with very long context windows and structured outputs",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$20/mo" },
                { "name": "Max/Enterprise", "price": "$200+/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/claude-ai.png",
        "aiModels": ["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku"],
        "pros": ["Extremely large context window", "High-quality creative writing", "Strong alignment/safety"],
        "cons": ["More cautious/reserved tone", "Higher cost for advanced use"],
        "briefHistory": "Created by Anthropic, Claude is built with a Constitutional AI framework, emphasizing safe and transparent AI behavior. It is especially strong in long-form writing and follows-up"
    },
    {
        "id": "googleGemini",
        "name": "Google Gemini",
        "url": "https://gemini.google.com",
        "specialty": ["research", "productivity", "multimodal", "Google ecosystem"],
        "standoutFeature": "Deep integration with Google Workspace and multimodal (text/image/voice) capabilities",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Gemini Advanced", "price": "$19.99/mo" },
                { "name": "Workspace Enterprise", "price": "custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/3d-fluency/94/gemini-ai.png",
        "aiModels": ["Gemini 3 Ultra", "Gemini 3 Pro", "Gemini Nano Banana (mini)"],
        "pros": ["Excellent Google product integration", "Strong multimodal (images, documents, voice)"],
        "cons": ["Quality can vary; dependent on Google sign-in", "Fewer third-party plugins"],
        "briefHistory": "Built by Google DeepMind (formerly Bard), Gemini is Google’s flagship AI assistant that integrates tightly with Google services like Docs, Sheets, Gmail and Cloud AI Platform"
    },
    {
        "id": "microsoftCopilot",
        "name": "Microsoft Copilot",
        "url": "https://copilot.microsoft.com",
        "specialty": ["productivity", "business", "developer", "workflow"],
        "standoutFeature": "Native integration into Microsoft 365/Teams for enterprise use",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Microsoft 365 Business", "price": "varies by plan" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/microsoft-copilot.png",
        "aiModels": ["GPT-5.2", "GPT-5.1", "Claude 3 Haiku (via some enterprise tiers)"],
        "pros": ["Deep integration with Office apps", "Enterprise security and compliance"],
        "cons": ["Locked into Microsoft ecosystem", "Complex bundle pricing"],
        "briefHistory": "Microsoft embedded OpenAI’s LLMs into its products under the Copilot brand. Copilot appears in Word, Excel, Teams, etc., leveraging Microsoft Graph context (e.g. Copilot Vision can “see” your screen)"
    },
    {
        "id": "perplexity",
        "name": "Perplexity AI",
        "url": "https://www.perplexity.ai",
        "specialty": ["research", "search", "fact-checking"],
        "standoutFeature": "Conversational QA with real-time web search and source citations",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Perplexity Pro", "price": "$20/mo or $200/yr" },
                { "name": "Max", "price": "$200/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/ios-filled/100/perplexity-ai.png",
        "aiModels": ["GPT-4o", "GPT-5", "Claude 3", "Sonar (own model)", "Llama 3"],
        "pros": ["Citations with answers", "Up-to-date knowledge (web search)", "Multi-document search mode"],
        "cons": ["Less conversational feel", "Limited on extended prompts"],
        "briefHistory": "Founded in 2022, Perplexity blends LLM reasoning with live search, returning citation-backed answers. It pioneered conversational AI with built-in web research"
    },
    {
        "id": "metaAI",
        "name": "Meta AI",
        "url": "https://www.meta.ai",
        "specialty": ["social", "multimodal", "communication"],
        "standoutFeature": "AI assistant embedded across Meta’s platforms (Instagram, Messenger, WhatsApp)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$9.99/mo" },
                { "name": "Business", "price": "$49/mo per seat" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/meta.png",
        "aiModels": ["Meta LLaMA series variants"],
        "pros": ["Integrated into social platforms", "Supports voice & multimodal chat"],
        "cons": ["Limited outside Meta ecosystem", "Privacy concerns"],
        "briefHistory": "Meta’s AI (originally called “Meta Llama Chat”) is accessible within its social apps, enabling chat, image generation and short video ‘vibes’ directly in chats"
    },
    {
        "id": "zapierAgents",
        "name": "Zapier Agents",
        "url": "https://zapier.com/agents",
        "specialty": ["automation", "workflow", "productivity"],
        "standoutFeature": "Autonomous AI agents that perform multi-step tasks across 8,000+ apps",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Team", "price": "$50/mo (billed annually)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/zapier.png",
        "aiModels": ["Varies (third-party LLMs)"],
        "pros": ["No-code integration with thousands of apps", "Human-in-the-loop for complex tasks"],
        "cons": ["Requires initial setup of workflows", "Dependent on Zapier ecosystem"],
        "briefHistory": "Built on OpenAI/Anthropic models, Zapier Agents let you create AI “employees” that can handle tasks (like data lookup or email follow-ups) by chaining Zaps"
    },
    {
        "id": "zapierChatbots",
        "name": "Zapier Chatbots",
        "url": "https://zapier.com/chatbots",
        "specialty": ["automation", "customer support", "lead gen"],
        "standoutFeature": "No-code builder to create custom AI chatbots that trigger actions across apps",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Team", "price": "$20/mo (per user, billed annually)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/zapier-chatbots.png",
        "aiModels": ["OpenAI's GPT series"],
        "pros": ["Easily add AI chat to websites or support flows", "Automates tasks (e.g. ticket creation)"],
        "cons": ["Bots need connecting via Zapier (no standalone hosting)", "Limited by underlying LLM reliability"],
        "briefHistory": "Zapier Chatbots (Beta) enable businesses to deploy AI chat on their sites or support channels. Built on GPT, these bots can answer FAQs and perform actions (like adding CRM leads) via Zapier automations."
    },
    {
        "id": "deepseek",
        "name": "DeepSeek",
        "url": "https://chat.deepseek.com",
        "specialty": ["research", "coding", "open-source"],
        "standoutFeature": "Fully open-source reasoning chatbot (with toggleable “deep thinking” mode)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$8/mo" },
                { "name": "Research", "price": "$29/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/deepseek.png",
        "aiModels": ["DeepSeek R1 (open-source)"],
        "pros": ["Community-driven and research-oriented", "Fully transparent models & data"],
        "cons": ["Smaller model/feature set", "Less polished UX"],
        "briefHistory": "DeepSeek is a research project offering open-source LLMs for experimentation. It emphasizes transparency and lets users control inference depth, appealing to AI researchers."
    },
    {
        "id": "grok",
        "name": "Grok",
        "url": "https://x.ai",
        "specialty": ["social", "research", "real-time"],
        "standoutFeature": "AI agent by xAI integrated into the X/Twitter platform",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "SuperGrok / Premium+", "price": "$7–$22/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/ios-filled/100/grok.png",
        "aiModels": ["Grok 3", "Grok 4 (pro)"],
        "pros": ["Fast, real-time answers", "Access to live Twitter/X data and media generation (Grok Imagine)"],
        "cons": ["Early maturity (still evolving)", "Limited functionality outside X"],
        "briefHistory": "Developed by Elon Musk’s xAI, Grok is an AI assistant available on X (formerly Twitter). It provides quick, social-oriented chat and image generation, famously bragged as “based on TrustGPT.”"
    },
    {
        "id": "poe",
        "name": "Poe",
        "url": "https://poe.com",
        "specialty": ["model-hub", "experimentation", "multi-AI"],
        "standoutFeature": "Single interface to chat with multiple AI models side-by-side",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Plus", "price": "$4.99+/mo" }
            ]
        },
        "imageSrc": "https://psc2.cf2.poecdn.net/assets/favicon.svg",
        "aiModels": ["GPT-4o", "Gemini Ultra", "Claude 3", "Mistral Chat", "Sonar", "Llama 3"],
        "pros": ["Access many top models in one place", "Supports ‘chains’ and multi-model comparisons"],
        "cons": ["Interface dependent on partner models' availability", "User-responsibility for verifying answers"],
        "briefHistory": "Poe (by Quora) is a chat platform that connects to various AI engines. It lets users pick or combine models (computing with points). Poe simplifies experimentation with LLMs in one chat app."
    },
    {
        "id": "leChatMistral",
        "name": "Le Chat Mistral",
        "url": "https://chat.mistral.ai",
        "specialty": ["research", "experimentation", "memory"],
        "standoutFeature": "Research-focused chat with Mistral AI models, emphasizing long-term memory",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$12/mo" },
                { "name": "Team", "price": "$45/mo per user" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://mistral.ai/_next/image?url=%2Fimg%2Fmistral-ai-logo.svg&w=256&q=75",
        "aiModels": ["Mistral Chat 7B", "Mistral Chat 22B"],
        "pros": ["Open access to cutting-edge LLaMA-based models", "Features like 'Memories' to recall past chats"],
        "cons": ["Smaller community/ecosystem", "Less mainstream polish"],
        "briefHistory": "A demo/chatbot interface by Mistral AI, Le Chat Mistral lets users interact with their own LLMs. It was built to push context window limits and test new chat features like memory management."
    },
    {
        "id": "duckAI",
        "name": "Duck.ai",
        "url": "https://duckduckgo.com/?q=ai&ia=chat",
        "specialty": ["privacy", "research", "search"],
        "standoutFeature": "Anonymized access to multiple LLMs without tracking",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Privacy Pro", "price": "$4.99/mo" },
                { "name": "Business", "price": "$19/mo per user" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/duckduckgo.png",
        "aiModels": ["GPT-4o", "Claude 3", "LLaMA 3", "Other remixable models"],
        "pros": ["Privacy-first (no tracking or data retention)", "Meta-search style (anonymous)"],
        "cons": ["Feature-limited compared to full chat apps", "AI outputs cannot be personalized or stored"],
        "briefHistory": "Duck.ai is DuckDuckGo’s privacy-oriented AI tool: an anonymous “wrapper” around third-party LLMs. It fetches model outputs without tying queries to your identity, in line with DuckDuckGo’s privacy ethos"
    },
    {
        "id": "pi",
        "name": "Pi",
        "url": "https://pi.ai",
        "specialty": ["personal", "conversation", "wellbeing"],
        "standoutFeature": "AI designed for personal, empathetic conversation and coaching",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pi Plus", "price": "$4.99/mo" },
                { "name": "Pi Pro", "price": "$12.99/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://play-lh.googleusercontent.com/Ef7is-Xonqhs2agdsGarpTS_c1Is6Yvk-JhnL3qNvU1Nwdc7kn6Dml2IuCqlfa9Nuzk",
        "aiModels": ["Pi LLM family"],
        "pros": ["Friendly, easy-to-chat persona", "Focus on user well-being and support"],
        "cons": ["Not optimized for complex tasks or business use", "Less powerful for factual research"],
        "briefHistory": "Pi (from Inflection AI, makers of ChatGPT co-founders) is marketed as a personal chatbot for casual conversation, companionship and positive emotional support rather than productivity tasks."
    },
    {
        "id": "ibmWatson",
        "name": "IBM Watson Assistant",
        "url": "https://www.ibm.com/cloud/watson-assistant",
        "specialty": ["enterprise", "customer service", "NLP"],
        "standoutFeature": "Highly customizable AI assistant for complex enterprise needs",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Lite (free)", "price": "limited usage" },
                { "name": "Plus", "price": "per usage or custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/ibm-watson.png",
        "aiModels": ["Watsonx AI", "GPT-4o (via connectors)"],
        "pros": ["Robust NLP and analytics", "Deep integration with IBM Cloud and data sources"],
        "cons": ["Complex setup", "Higher cost for large deployments"],
        "briefHistory": "IBM Watson Assistant has been a leader in AI chat for business, providing NLP-based virtual agents since the 2010s. It can be trained on enterprise data, supporting multiple languages and channels"
    },
    {
        "id": "intercom",
        "name": "Intercom",
        "url": "https://www.intercom.com",
        "specialty": ["customer support", "sales", "chatbot"],
        "standoutFeature": "Live chat platform with built-in AI bot (Resolution Bot) for FAQs",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Starter", "price": "$39/mo" },
                { "name": "Pro", "price": "Custom (higher support tiers)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/intercom.png",
        "aiModels": ["OpenAI GPT", "Custom AI"],
        "pros": ["Combines human chat and AI smoothly", "Strong user engagement tools"],
        "cons": ["Pricing scales with seats", "AI bot needs training"],
        "briefHistory": "Intercom is a conversational messaging platform. Its AI-powered 'Resolution Bot' handles common support queries, freeing human agents for complex issues"
    },
    {
        "id": "drift",
        "name": "Drift",
        "url": "https://www.drift.com",
        "specialty": ["conversational marketing", "sales"],
        "standoutFeature": "AI chat that qualifies leads and books meetings automatically",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Standard", "price": "$50/mo" },
                { "name": "Pro/Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/drift.png",
        "aiModels": ["GPT-4o"],
        "pros": ["Optimized for lead conversion", "Integrates with CRM and email"],
        "cons": ["Focused on B2B use-case", "Can be pricey for SMBs"],
        "briefHistory": "Drift specializes in AI-driven sales chat. Its bots engage website visitors to book demos or answer sales questions, leveraging AI to qualify leads in real time"
    },
    {
        "id": "mobilemonkey",
        "name": "MobileMonkey",
        "url": "https://mobilemonkey.com",
        "specialty": ["multi-channel marketing", "messaging"],
        "standoutFeature": "Chatbots for Facebook Messenger, SMS and web all in one platform",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$21.75/mo" },
                { "name": "Team", "price": "$33.25/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/mobilemonkey.png",
        "aiModels": ["GPT-3.5", "Custom rule-based flows"],
        "pros": ["Easy multi-channel deployment", "Pre-built templates for sales/marketing"],
        "cons": ["Primarily marketing use-case", "Limited NLP compared to LLM-only tools"],
        "briefHistory": "MobileMonkey provides chat marketing bots across platforms (Messenger, SMS, Instagram). It automates broadcasts and drip campaigns via chat, serving small-to-medium businesses"
    },
    {
        "id": "freshchat",
        "name": "Freshchat",
        "url": "https://www.freshworks.com/live-chat-software/freshchat",
        "specialty": ["customer support", "engagement"],
        "standoutFeature": "AI-powered chatbots integrated into Freshworks helpdesk suite",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Growth", "price": "$15/mo per agent" },
                { "name": "Pro", "price": "$39/mo per agent" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/freshworks.png",
        "aiModels": ["GPT-3.5 (via Ada AI)"],
        "pros": ["Omnichannel support (chat, email)", "User-friendly UI"],
        "cons": ["AI limited to scripted responses", "Requires Freshworks subscription"],
        "briefHistory": "Part of the Freshworks suite, Freshchat combines live agent chat with AI bots. It offers customizable AI responses and integrates CRM, popular among tech support teams"
    },
    {
        "id": "manychat",
        "name": "ManyChat",
        "url": "https://manychat.com",
        "specialty": ["social media marketing", "chatbot builder"],
        "standoutFeature": "Easy chatbot creation for Facebook and Instagram DMs",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$15–$42/mo (based on subscribers)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/manychat.png",
        "aiModels": ["GPT-4 (optional integration)"],
        "pros": ["Templates for e-commerce and marketing", "Flow builder (no-code)"],
        "cons": ["Platform-specific (FB/Instagram)", "Limited free tier"],
        "briefHistory": "ManyChat is a popular social media chatbot platform. It specializes in automated marketing via Messenger/Instagram chats, supporting live sales and follow-ups with subscribers"
    },
    {
        "id": "dialogflow",
        "name": "Dialogflow",
        "url": "https://cloud.google.com/dialogflow",
        "specialty": ["conversational interfaces", "voice assistants"],
        "standoutFeature": "Google’s NLP platform with easy integration into apps and devices",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Essentials", "price": "per usage ($0.002–$0.017 per text query)" },
                { "name": "CX Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/google-cloud.png",
        "aiModels": ["Google PaLM 2", "GPT-3.5 (via Vertex AI)"],
        "pros": ["Strong NLU accuracy", "Integrates with Google Cloud and phone agents"],
        "cons": ["More technical setup", "Cost grows with traffic"],
        "briefHistory": "Google’s Dialogflow is a developer-friendly platform for building chat and voice bots. Used in Google Assistant and enterprise contact centers, it provides rich NLU and integrates with Google’s AI tools"
    },
    {
        "id": "tidio",
        "name": "Tidio",
        "url": "https://www.tidio.com",
        "specialty": ["live chat", "SMB support"],
        "standoutFeature": "Combination of live chat widget and basic AI chatbot for quick setup",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Communicator", "price": "$49/mo (includes 1 bot)" },
                { "name": "Chatbots", "price": "$13–$79/mo (additional bots)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/tidio-chat.png",
        "aiModels": ["GPT-3.5 (via GPT integration)"],
        "pros": ["User-friendly interface", "Good for SMEs with website chat needs"],
        "cons": ["Limited AI features compared to bigger platforms", "Custom bot logic needed"],
        "briefHistory": "Tidio offers an AI-augmented chat widget for small businesses. It provides template bots (lead capture, FAQ) and integrates with email/Shopify. It’s known for fast setup"
    },
    {
        "id": "zendeskAnswerBot",
        "name": "Zendesk Answer Bot",
        "url": "https://www.zendesk.com/answer-bot",
        "specialty": ["customer support", "Zendesk integration"],
        "standoutFeature": "Instant automated answers alongside human support agents",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Professional", "price": "$49/mo per agent (includes AI)" },
                { "name": "Enterprise", "price": "custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/zendesk.png",
        "aiModels": ["Proprietary Zendesk ML", "GPT-3.5 for certain queries"],
        "pros": ["Seamlessly works in Zendesk ticketing", "Learns from your knowledge base"],
        "cons": ["Best with Zendesk ecosystem", "Answers can be repetitive if docs limited"],
        "briefHistory": "Zendesk Answer Bot uses machine learning to reply to customer tickets with relevant help-center articles or canned replies. It deflects simple queries, freeing agents for complex issues"
    },
    {
        "id": "ada",
        "name": "Ada",
        "url": "https://ada.cx",
        "specialty": ["customer support", "self-service"],
        "standoutFeature": "Customer service chatbots with strong analytics for non-technical teams",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Team", "price": "$400/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/ada-chatbot.png",
        "aiModels": ["Ada proprietary LLM"],
        "pros": ["Fast deployment, no coding", "Built-in analytics for chat performance"],
        "cons": ["Less flexible for devs", "Premium pricing"],
        "briefHistory": "Ada is a no-code chatbot platform for customer support and marketing. It allows companies to build bots that answer FAQs via chat or integrate into apps, focusing on user-friendly setup."
    },
    {
        "id": "koreAi",
        "name": "Kore.ai",
        "url": "https://kore.ai",
        "specialty": ["enterprise", "omnichannel"],
        "standoutFeature": "AI-driven virtual assistants for complex enterprise workflows",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Pro", "price": "$150/user/mo" },
                { "name": "Enterprise", "price": "custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/kore-ai.png",
        "aiModels": ["GPT-4o", "Kore proprietary models"],
        "pros": ["Rich conversational analytics", "Supports voice, email, SMS bots"],
        "cons": ["Geared toward large companies", "Requires training data"],
        "briefHistory": "Kore.ai provides enterprise-grade conversational AI. It offers multi-lingual, omnichannel bots for customer care and IT helpdesk, with sophisticated dialog management."
    },
    {
        "id": "botpress",
        "name": "Botpress",
        "url": "https://botpress.com",
        "specialty": ["open-source", "developer-focused"],
        "standoutFeature": "Modular, open-source chatbot framework with visual flow builder",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Cloud", "price": "starting $12/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/botpress.png",
        "aiModels": ["OpenAI GPT-4o (self-hosted option)", "Botpress native NLP"],
        "pros": ["Full control over code and data", "Extensible with modules and APIs"],
        "cons": ["Requires technical setup", "Not turnkey out-of-box"],
        "briefHistory": "Botpress is an open-source platform for building chatbots. Originally rule-based, it now integrates LLMs. Many developers use it to host their own AI bots behind a corporate firewall."
    },
    {
        "id": "rasa",
        "name": "Rasa",
        "url": "https://rasa.com",
        "specialty": ["open-source", "custom NLP"],
        "standoutFeature": "Enterprise-ready open platform for building contextual chatbots",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$500/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/rasa.png",
        "aiModels": ["Custom Rasa models", "Optional GPT integration"],
        "pros": ["Highly customizable NLU/RL training", "Deploy on-premise or cloud"],
        "cons": ["Steep learning curve", "Developer expertise needed"],
        "briefHistory": "Rasa is a leading open-source conversational AI toolkit. Companies use Rasa to build tailor-made chat assistants, particularly when data privacy and customization are required."
    },
    {
        "id": "landbot",
        "name": "Landbot",
        "url": "https://landbot.io",
        "specialty": ["no-code", "conversational landing pages"],
        "standoutFeature": "Drag-and-drop chatbot builder for web/SMS/WhatsApp flows",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Starter", "price": "€30/mo" },
                { "name": "Pro", "price": "€80/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/landbot.png",
        "aiModels": ["GPT-3.5 (optional)"],
        "pros": ["Visual flow design (no code)", "Integrates with CRM and Zapier"],
        "cons": ["Chatbot logic only (no LLM by default)", "Limited to hosted platform"],
        "briefHistory": "Landbot provides a visual interface to build chatbots for marketing and customer support. It integrates with chat channels like WhatsApp and can use GPT-3.5 for smarter replies."
    },
    {
        "id": "chatfuel",
        "name": "Chatfuel",
        "url": "https://chatfuel.com",
        "specialty": ["Facebook Messenger", "chatbot builder"],
        "standoutFeature": "Easy bot creation for Facebook/Instagram with AI enhancements",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$15/mo per bot" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/chatfuel.png",
        "aiModels": ["GPT-3.5 (via plugin)"],
        "pros": ["Designed for social media commerce", "Template-based flows"],
        "cons": ["Platform-specific (Meta Messenger)", "Limited to marketing bots"],
        "briefHistory": "Chatfuel is a no-code chatbot builder focused on Facebook Messenger. It’s widely used by brands for automated customer interaction on social media."
    },
    {
        "id": "gamma",
        "name": "Gamma",
        "url": "https://gamma.app",
        "specialty": ["presentations", "documents", "landing pages"],
        "standoutFeature": "Instant slide deck creation from topics, with powerful design customization",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$22/mo billed annually" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/gamma.png",
        "aiModels": ["GPT-4", "Custom slide generation model"],
        "pros": ["Consistent aesthetics across teams", "Automates slide formatting and content"],
        "cons": ["AI usage limited by credits on free tier", "Not fully free-form editable by AI"],
        "briefHistory": "Gamma is an AI-powered presentation tool. You provide a topic or outline, and Gamma generates a polished slideshow. It also supports generating docs and embeds (Zapier offers automations for Gamma)"
    },
    {
        "id": "canva",
        "name": "Canva",
        "url": "https://www.canva.com",
        "specialty": ["design", "presentations", "graphics"],
        "standoutFeature": "All-in-one design platform with AI (Magic Write) for presentations and visuals",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$12.99/mo per user" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/canva.png",
        "aiModels": ["Custom generative models"],
        "pros": ["Wide template library", "Collaboration features", "AI writing and design assistance"],
        "cons": ["Overkill for simple slides", "Less focused on research/chat features"],
        "briefHistory": "Canva, known for graphic design, added AI features like Magic Write (text generation) and Smart Resize. It’s used for slide decks, social media, and more, in a highly user-friendly interface."
    },
    {
        "id": "beautifulai",
        "name": "Beautiful.ai",
        "url": "https://www.beautiful.ai",
        "specialty": ["presentations", "data visualization"],
        "standoutFeature": "Automates slide design (layouts and animations) to keep content tidy",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$12/mo" },
                { "name": "Team", "price": "$40/mo per user" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/beautiful-ai.png",
        "aiModels": ["Proprietary slide AI"],
        "pros": ["Professional-looking templates", "Automatic adaptation of charts/graphs"],
        "cons": ["Less flexibility for custom layouts", "Export limitations on free tier"],
        "briefHistory": "Beautiful.ai is a presentation tool emphasizing smart templates. It automates formatting as you add content, ensuring a clean look without manual adjustment"
    },
    {
        "id": "pitch",
        "name": "Pitch",
        "url": "https://pitch.com",
        "specialty": ["presentations", "collaboration"],
        "standoutFeature": "Team-focused slide software with live data integration and narrative templates",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$10/mo per user" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/pitch.png",
        "aiModels": ["GPT-4o (for text)"],
        "pros": ["Real-time collaboration", "Easy branding and custom templates"],
        "cons": ["Fewer AI “magic” features than startups", "Requires learning their UI"],
        "briefHistory": "Pitch is a modern alternative to PowerPoint focused on startups and teams. It offers data linking (e.g. auto-update charts from Sheets) and streamlined design tools. AI assists with content suggestions."
    },
    {
        "id": "chronicle",
        "name": "Chronicle",
        "url": "https://chronicle.app",
        "specialty": ["presentations", "clean design"],
        "standoutFeature": "Widget-based editor for on-brand slides and dynamic elements",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$10/mo" },
                { "name": "Business", "price": "custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/chronicle.png",
        "aiModels": ["Custom design tools"],
        "pros": ["Simple drag-and-drop editing", "Animated graphic templates"],
        "cons": ["Less AI content creation", "Smaller template library"],
        "briefHistory": "Chronicle is a presentation builder with emphasis on high-quality design. It's known for easy-to-use widgets (charts, callouts) and smooth animations, appealing to teams needing branded decks quickly"
    },
    {
        "id": "storyd",
        "name": "Storyd",
        "url": "https://storyd.io",
        "specialty": ["presentations", "storytelling"],
        "standoutFeature": "Guides users through narrative frameworks (e.g. storytelling arc) for slides",
        "pricing": {
            "free": true,
            "tiers": []
        },
        "imageSrc": "https://img.icons8.com/color/100/storyd.png",
        "aiModels": ["GPT-3.5 (for content prompts)"],
        "pros": ["Pre-built story frameworks (hero’s journey, problem-solution)", "Easy structuring of presentations"],
        "cons": ["Less freedom in design", "Very template-driven"],
        "briefHistory": "Storyd is a niche tool built on Mistral’s technology (hence French name). It helps presenters structure their talk according to storytelling techniques (like Pixar-style story arcs), with slides auto-generated to fit."
    },
    {
        "id": "prezi",
        "name": "Prezi",
        "url": "https://prezi.com",
        "specialty": ["presentations", "zoomable canvas"],
        "standoutFeature": "Non-linear, zoomable presentation format to highlight spatial relationships",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Plus", "price": "$7/mo" },
                { "name": "Premium", "price": "$15/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/prezi.png",
        "aiModels": [],
        "pros": ["Engaging visual style (zooming narrative)", "Web-based and collaborative"],
        "cons": ["Learning curve for zoom design", "Export limited (no PPT download on free plan)"],
        "briefHistory": "Prezi pioneered an alternative to slides by using one large canvas. You pan and zoom between topics. It's useful for big-picture visual storytelling and includes AI-suggested layouts."
    },
    {
        "id": "slidesai",
        "name": "SlidesAI",
        "url": "https://slidesai.io",
        "specialty": ["presentations", "AI text-to-slides"],
        "standoutFeature": "Browser plugin that auto-generates Google Slides from text prompts",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$15/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/slidesai.png",
        "aiModels": ["GPT-4o"],
        "pros": ["Quickly drafts slides from outlines or documents", "Integrates into existing Google Slides decks"],
        "cons": ["Requires Google Slides", "Basic design by default"],
        "briefHistory": "SlidesAI is a tool that adds AI to Google Slides. You highlight text or give a prompt, and it generates slides (bullet points and images) for you. It’s more of an add-on than a standalone app"
    },
    {
        "id": "decktopus",
        "name": "Decktopus",
        "url": "https://www.decktopus.com",
        "specialty": ["presentations", "AI content"],
        "standoutFeature": "AI content suggestions and auto-formatting for slides",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Premium", "price": "$20/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/decktopus.png",
        "aiModels": ["GPT-3.5"],
        "pros": ["Smart suggestions for text/images", "Analytical insights on audience engagement"],
        "cons": ["Must host on Decktopus servers", "Designs are formulaic"],
        "briefHistory": "Decktopus is an AI-driven slide maker that suggests content (text, images, charts) as you build a deck. It’s aimed at quick pitch decks with minimal manual editing."
    },
    {
        "id": "slidebean",
        "name": "Slidebean",
        "url": "https://slidebean.com",
        "specialty": ["startups", "presentation design"],
        "standoutFeature": "AI arranges content into slide templates; excels at pitch decks",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Premium", "price": "$29/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/slidebean.png",
        "aiModels": [],
        "pros": ["Templates tailored for startups/investors", "Clean automated layouts"],
        "cons": ["Limited customization", "Export only via PDF/PNG"],
        "briefHistory": "Slidebean is a presentation tool often used by startups. You enter your content, and Slidebean’s AI arranges it into professional slides. It’s particularly known for its investor pitch deck templates."
    },
    {
        "id": "visme",
        "name": "Visme",
        "url": "https://www.visme.co",
        "specialty": ["graphics", "presentations", "infographics"],
        "standoutFeature": "Online design tool with AI templates for slides and infographics",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Premium", "price": "$14/mo" },
                { "name": "Business", "price": "$25/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/visme.png",
        "aiModels": [],
        "pros": ["Versatile design options (slides, infographics, reports)", "Drag-and-drop simplicity"],
        "cons": ["No dedicated advanced AI writing engine", "Template library less modern"],
        "briefHistory": "Visme is a versatile content creation platform. It offers many pre-designed templates and simple AI tools (like automatic theming), and is used for presentations, reports, and data visualizations."
    },
    {
        "id": "googleVeo",
        "name": "Google Veo",
        "url": "https://labs.google/veo",
        "specialty": ["video generation", "AI research"],
        "standoutFeature": "State-of-the-art text-to-video (Veo 3.1) with high fidelity and creative control",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "AI Pro", "price": "$19.99/mo (1000 credits)" },
                { "name": "AI Ultra", "price": "$249.99/mo (25K credits, no watermark)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/google-logo.png",
        "aiModels": ["Veo 3.1", "Nano Banana Pro (image)"],
        "pros": ["High-quality video, detailed prompt adherence", "Inline text-to-voice with lip-sync"],
        "cons": ["Free tier watermarks videos", "Premium plans required for serious use"],
        "briefHistory": "Google Veo (part of Google Research) is one of the top AI video generators. It can start from text or images (e.g. Google’s Nano Banana models) and produces realistic videos. It shines in consistency and quality"
    },
    {
        "id": "runway",
        "name": "Runway",
        "url": "https://runwayml.com",
        "specialty": ["video editing", "filmmaking"],
        "standoutFeature": "Advanced AI models for video creation and editing (Gen-4.5, Aleph)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Standard", "price": "$15/mo" },
                { "name": "Pro", "price": "$35/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/runwayml.png",
        "aiModels": ["Gen-4.5", "Aleph", "MJF (Multigenre)", "Act Two"],
        "pros": ["Specialized film-making tools", "Extensive video model library", "Free tier for testing"],
        "cons": ["Learning curve is steep", "Subscription needed for full access"],
        "briefHistory": "Runway is a creative suite for AI video. Its latest Gen-4.5 model accepts images/text and focuses on cinematic output (camera movement, beats). Runway also offers frame interpolation (Aleph) and other modules"
    },
    {
        "id": "sora",
        "name": "Sora",
        "url": "https://sora.com",
        "specialty": ["video generation", "storytelling"],
        "standoutFeature": "High-end story-to-video generator with creative editing tools",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Creator", "price": "$15/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/sora.png",
        "aiModels": ["Sora AI Video"],
        "pros": ["Top quality visuals", "Includes video editor for refining outputs"],
        "cons": ["Harder to steer than simpler tools", "Can be inconsistent on complex scenes"],
        "briefHistory": "Sora.ai is an AI video creation app aimed at content creators. You input a script/story, and Sora generates a multi-scene video. It’s notable for high-quality output, though it may require edits for best results"
    },
    {
        "id": "lumaDreamMachine",
        "name": "Luma Dream Machine",
        "url": "https://www.luma-ai.com",
        "specialty": ["video generation", "3D scenes"],
        "standoutFeature": "AI tool for generating 3D environments and animated scenes from text or sketches",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Basic", "price": "$20/mo" },
                { "name": "Pro", "price": "$40/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/luma-ai.png",
        "aiModels": ["Luma AI models"],
        "pros": ["Unique 3D scene generation", "Good for VR/AR content"],
        "cons": ["More of a niche use-case", "Not as user-friendly as simpler apps"],
        "briefHistory": "Luma AI (Dream Machine) started as novel tech for generating 3D scenes (text-to-3D). Dream Machine is its mobile app focusing on AI-driven brainstorming and immersive video/VR creation."
    },
    {
        "id": "ltxStudio",
        "name": "LTX Studio",
        "url": "https://ltx.studio",
        "specialty": ["video generation", "creative control"],
        "standoutFeature": "Extreme creative control for video via detailed prompt engineering",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Basic", "price": "$25/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/ltx-studio.png",
        "aiModels": ["LTX Engine"],
        "pros": ["Flexible experimentation", "Fine-tuning of visual style"],
        "cons": ["Interface is technical", "Output may require manual tweaking"],
        "briefHistory": "LTX Studio is a web tool (based on a research project) that allows expert users to craft AI videos with custom settings. It’s geared toward creative control rather than simplicity."
    },
    {
        "id": "descript",
        "name": "Descript",
        "url": "https://www.descript.com",
        "specialty": ["audio & video editing", "podcast"],
        "standoutFeature": "Transcription-based editing (edit text script to edit audio/video) and realistic voice cloning",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Creator", "price": "$12/mo" },
                { "name": "Pro", "price": "$24/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/descript.png",
        "aiModels": ["Custom over-dubbing model", "Whisper ASR"],
        "pros": ["Very intuitive for podcasters/video", "Overdub voice cloning"],
        "cons": ["Not for live conversation", "Free plan has watermarked exports"],
        "briefHistory": "Descript is an audio/video editor where you can cut and rearrange content by editing the transcript. It offers a feature called Overdub for custom voice cloning and filler-word removal, useful for polishing recordings"
    },
    {
        "id": "wondershareFilmora",
        "name": "Wondershare Filmora",
        "url": "https://filmora.wondershare.com",
        "specialty": ["video editing", "consumer AI effects"],
        "standoutFeature": "Traditional editor with many AI-assisted features (auto-caption, smart cutout, etc.)",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Basic", "price": "$49.99/yr" },
                { "name": "Advanced", "price": "$59.99/yr (includes AI credits)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/wondershare-filmora.png",
        "aiModels": ["SmartCut AI", "AI audio features"],
        "pros": ["Easy UI for beginners", "Many AI tools (green screen, voice outlier removal)"],
        "cons": ["Not as powerful as pro editors", "Requires desktop install"],
        "briefHistory": "Filmora is a consumer video editor that has added AI features over time. It can auto-remove silence, do auto-captions, and even audio-to-video for podcasts"
    },
    {
        "id": "veed",
        "name": "VEED",
        "url": "https://www.veed.io",
        "specialty": ["video editing", "quick production"],
        "standoutFeature": "Browser-based video editor with AI tools (auto-caption, easy social video clips)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Lite", "price": "$24/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/veed.png",
        "aiModels": ["AutoSubtitle AI", "Clip AI"],
        "pros": ["No installation (web-based)", "Collaboration support", "Templates"],
        "cons": ["Watermark on free plan", "Limited export resolution on cheap tier"],
        "briefHistory": "VEED is a web video editor known for user-friendliness. It offers AI Quick Edits for social media (auto-snippets, captions, translation) and encourages fast workflow"
    },
    {
        "id": "capsule",
        "name": "Capsule",
        "url": "https://capsule.video",
        "specialty": ["branded video editing", "post-production"],
        "standoutFeature": "Automates post-production with design systems and transcript-based edits",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Standard", "price": "$19/mo" },
                { "name": "Enterprise", "price": "custom" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/capsule-video.png",
        "aiModels": ["Capsule AI toolset"],
        "pros": ["Templates for brand-consistent B-roll/captions", "AI assistant (CoProducer) for auto-edit suggestions"],
        "cons": ["Niche use-case (marketing videos)", "Learning curve for design system"],
        "briefHistory": "Capsule targets video producers working at scale. It provides a design system where assets (e.g. captions, intros) are pre-made. Its CoProducer AI can suggest cuts or effects to streamline workflow"
    },
    {
        "id": "eddieAI",
        "name": "Eddie AI",
        "url": "https://www.heyeddie.ai",
        "specialty": ["video editing", "quick rough cuts"],
        "standoutFeature": "AI tool that creates rough video cuts in minutes from raw footage",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$19/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/eddie-ai.png",
        "aiModels": ["Eddie AI editor"],
        "pros": ["Very fast initial edit creation", "Good for vloggers and quick storytelling"],
        "cons": ["Not fully polished output", "Best used as starting point only"],
        "briefHistory": "Eddie AI (by Rearc Labs) provides an AI assistant to generate an initial edit from footage. It auto-selects clips and organizes them on a timeline, letting you refine afterward"
    },
    {
        "id": "opusclip",
        "name": "OpusClip",
        "url": "https://www.opusclip.com",
        "specialty": ["video editing", "social content"],
        "standoutFeature": "Transforms long videos into viral short clips with captions and effects",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Starter", "price": "$29/mo" },
                { "name": "Pro", "price": "$49/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/opusclip.png",
        "aiModels": ["Auto clip detection AI"],
        "pros": ["Optimized for repurposing content (podcasts, webinars)", "Out-of-box settings for social platforms"],
        "cons": ["Limited to clipping, not full editing suite", "Subscription required"],
        "briefHistory": "OpusClip takes long-form videos and automatically extracts the most engaging moments as short clips (with subtitles and animations). It’s popular for social media content creators looking to repurpose content quickly."
    },
    {
        "id": "invideo",
        "name": "InVideo AI",
        "url": "https://invideo.io",
        "specialty": ["video creation", "social media"],
        "standoutFeature": "Prompts-to-video for social clips; AI text summarization",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Business", "price": "$15/mo" },
                { "name": "Unlimited", "price": "$30/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/invideo.png",
        "aiModels": ["InVideo AI engine"],
        "pros": ["Hundreds of templates", "Easy text-to-video from articles"],
        "cons": ["Quality is moderate", "Watermark on free plan"],
        "briefHistory": "InVideo is an online video creator targeting marketers. It added AI features to generate quick clips from text or summarize longer videos into highlights (similar to OpusClip)"
    },
    {
        "id": "vyond",
        "name": "Vyond",
        "url": "https://www.vyond.com",
        "specialty": ["animated videos", "business training"],
        "standoutFeature": "Create animated character videos from scripts",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Essential", "price": "$49/mo" },
                { "name": "Premium", "price": "$89/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/vyond.png",
        "aiModels": [],
        "pros": ["Large library of animated assets", "No drawing skills needed"],
        "cons": ["Less cutting-edge (no AI beyond stock motions)", "Subscription cost"],
        "briefHistory": "Vyond (formerly GoAnimate) allows businesses to make animated explainer videos. You script scenes and choose characters/animations. AI is minimal (auto-sync audio), focusing on ease of animation."
    },
    {
        "id": "synthesia",
        "name": "Synthesia",
        "url": "https://www.synthesia.io",
        "specialty": ["AI video avatars", "corporate training"],
        "standoutFeature": "Generates talking-head videos with digital avatars from text scripts",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Personal", "price": "$29/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/3d-fluency/100/synthesia.png",
        "aiModels": ["Synthesia avatar AI", "TTS AI"],
        "pros": ["Great for producing training videos without actors", "Supports 120+ languages"],
        "cons": ["Robotic voice if not using own voice clone", "Subscription required"],
        "briefHistory": "Synthesia is a pioneer in AI avatar video. You pick a realistic avatar and input text (or own voice) to generate a video of that avatar speaking. Widely used for e-learning and corporate demos"
    },
    {
        "id": "heygen",
        "name": "HeyGen (Live Avatar)",
        "url": "https://www.heygen.com",
        "specialty": ["AI video avatars", "interactive content"],
        "standoutFeature": "Real-time, interactive talking-head avatars",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Essential", "price": "$99/mo" },
                { "name": "Team", "price": "$129/mo per user" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/heygen.png",
        "aiModels": ["HeyGen avatar AI"],
        "pros": ["Interactive video calls with AI avatars", "High-fidelity visuals"],
        "cons": ["Resource-intensive (requires strong GPU)", "Beta-stage reliability"],
        "briefHistory": "HeyGen Live Avatar lets users have live video calls where an AI avatar of them (or a chosen character) speaks and moves in real time. It represents a new frontier of immersive AI chat."
    },
    {
        "id": "revid",
        "name": "Revid.ai",
        "url": "https://www.revid.ai",
        "specialty": ["video creation", "social media"],
        "standoutFeature": "AI-powered templates and effects for quick social videos",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Hobby", "price": "$39/mo" },
                { "name": "Pro", "price": "$79/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/revid-ai.png",
        "aiModels": ["Revid AI engine"],
        "pros": ["Large collection of modern video templates", "Easy one-click theme application"],
        "cons": ["Focused only on trendy styles", "Less control for advanced editing"],
        "briefHistory": "revid.ai provides ready-made video themes and uses AI to adapt your clips/photos into those templates. It’s designed to make flashy social videos quickly by just swapping in your content."
    },
    {
        "id": "pictory",
        "name": "Pictory",
        "url": "https://pictory.ai",
        "specialty": ["video editing", "content repurposing"],
        "standoutFeature": "Turns blog posts or articles into short videos with voiceover and subtitles",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Standard", "price": "$19/mo" },
                { "name": "Premium", "price": "$39/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/pictory.png",
        "aiModels": ["Pictory AI script parser"],
        "pros": ["Ideal for making videos from written content", "Simple drag-and-drop editor"],
        "cons": ["Limited creativity (mostly text-to-video)", "Subscription needed for high-res exports"],
        "briefHistory": "Pictory is an AI video editor that helps creators convert their scripts or articles into engaging videos. It auto-selects relevant stock footage and adds narration, useful for social marketing or YouTube."
    },
    {
        "id": "elevenlabs",
        "name": "ElevenLabs",
        "url": "https://elevenlabs.io",
        "specialty": ["voice cloning", "text-to-speech"],
        "standoutFeature": "State-of-the-art neural TTS with extremely realistic voices",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Personal", "price": "$9/mo" },
                { "name": "Pro", "price": "$27/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/eleven-labs.png",
        "aiModels": ["ElevenLabs Prime Voice model"],
        "pros": ["Very human-like voice quality", "Supports voice cloning from a short sample"],
        "cons": ["Output can still sound slightly robotic on long text", "Pricing scales with usage"],
        "briefHistory": "ElevenLabs is a leading AI voice platform. It offers an advanced voice cloning (with just seconds of audio) and TTS API. It’s widely recognized as having the most natural AI voices"
    },
    {
        "id": "murf",
        "name": "Murf.ai",
        "url": "https://murf.ai",
        "specialty": ["voiceover", "presentation narration"],
        "standoutFeature": "User-friendly AI voice platform with fine-tuning controls (pitch, speed, etc.)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$19/mo" },
                { "name": "Enterprise", "price": "$99/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/murf.png",
        "aiModels": ["Murf proprietary TTS", "Whisper for transcriptions"],
        "pros": ["Large voice library with accents", "Specialized on e-learning, podcasts"],
        "cons": ["Outputs can require tweaking", "No free commercial use"],
        "briefHistory": "Murf.ai offers AI voiceovers for presentations and podcasts. It ranks voices by quality and allows detailed control (e.g. SSML tags), making it great for beginners"
    },
    {
        "id": "resemble",
        "name": "Resemble.ai",
        "url": "https://www.resemble.ai",
        "specialty": ["voice cloning", "multi-speaker"],
        "standoutFeature": "High-fidelity voice cloning that supports multiple speakers in one conversation",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Starter", "price": "$30/mo" },
                { "name": "Custom", "price": "contact sales" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/resemble.png",
        "aiModels": ["Resemble TTS and cloning AI"],
        "pros": ["Easy API for voice generation", "Focus on scaling (supports dozens of voices)"],
        "cons": ["Premium product (no free plan)", "Primarily a developer tool"],
        "briefHistory": "Resemble.ai provides an API for custom voice clones and text-to-speech. It allows applications to have AI voices that sound like real people, often used in games and apps for conversational voice."
    },
    {
        "id": "playai",
        "name": "PlayAI",
        "url": "https://play.ai",
        "specialty": ["voice cloning", "text-to-speech"],
        "standoutFeature": "AI TTS with 200+ voices, real-time streaming, and advanced cloning (PlayDialog model)",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Pay-as-you-go", "price": "$49/mo (API access)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/playai.png",
        "aiModels": ["PlayDialog TTS model"],
        "pros": ["Real-time streaming API", "Voice style/pacing control"],
        "cons": ["Newer player (smaller voice library)", "Developer-focused (no GUI)"],
        "briefHistory": "Play.ai (PlayAI) provides an advanced Text-to-Speech API. It emphasizes live streaming and multi-speaker dialogs, with features like extensive voice variety and fine style control"
    },
    {
        "id": "descriptOverdub",
        "name": "Descript Overdub",
        "url": "https://www.descript.com/overdub",
        "specialty": ["voice cloning", "audio editing"],
        "standoutFeature": "Overdub voice cloning integrated in podcast/video editor",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Creator", "price": "$12/mo" },
                { "name": "Pro", "price": "$24/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/fluency/100/descript-overdub.png",
        "aiModels": ["Descript custom voice model"],
        "pros": ["Clone your own voice with training", "Seamless in workflow with Descript editor"],
        "cons": ["Voice training required (3–10 min sample)", "For content creators, not stand-alone use"],
        "briefHistory": "Overdub is Descript’s feature that lets you create a digital clone of your voice. Once trained, you can generate or replace words in your recorded audio simply by typing text."
    },
    {
        "id": "lovo",
        "name": "Lovo.ai",
        "url": "https://www.lovo.ai",
        "specialty": ["TTS", "voiceovers"],
        "standoutFeature": "AI voiceover platform with many character voices and languages",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Creator", "price": "$24.99/mo" },
                { "name": "Pro", "price": "$49.99/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/lovo.png",
        "aiModels": ["Lovo neural voices"],
        "pros": ["Large library of expressive voices", "Specific for audiobooks and dubbing"],
        "cons": ["No free tier", "Subscription needed even for demos"],
        "briefHistory": "Lovo is an AI voiceover marketplace. Users can select from dozens of voices (narrator, character), making it easy to produce narration, commercial voiceovers, or audiobooks."
    },
    {
        "id": "playht",
        "name": "Play.ht",
        "url": "https://play.ht",
        "specialty": ["TTS", "blogging tools"],
        "standoutFeature": "Text-to-speech with emphasis on blog/podcast narration and commercial licensing",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Personal", "price": "$9/mo" },
                { "name": "Premium", "price": "$19/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/play-ht.png",
        "aiModels": ["Hybrid TTS with Google, IBM voices"],
        "pros": ["Easy WordPress integration", "Audio embed for articles"],
        "cons": ["Less natural sounding than ElevenLabs", "Free voices are limited"],
        "briefHistory": "Play.ht offers AI voice generation for publishers and bloggers. You can convert articles into podcasts or add audio previews. It supports many languages and is known for its team plan."
    },
    {
        "id": "wellsaid",
        "name": "WellSaid Labs",
        "url": "https://wellsaidlabs.com",
        "specialty": ["TTS", "enterprise narration"],
        "standoutFeature": "High-end text-to-speech used in corporate videos and training",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Starter", "price": "$49/mo" },
                { "name": "Business", "price": "$99/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/well-said-labs.png",
        "aiModels": ["WellSaid premium voices"],
        "pros": ["Extremely natural, often indistinguishable from humans", "Enterprise-friendly licensing"],
        "cons": ["Very high audio quality means higher cost", "Primarily a professional tool"],
        "briefHistory": "WellSaid Labs provides studio-quality AI voices. It’s used in professional e-learning and commercials. The voices are often rated better than generic TTS, but the service targets enterprise."
    },
    {
        "id": "speechify",
        "name": "Speechify",
        "url": "https://speechify.com",
        "specialty": ["TTS", "accessibility"],
        "standoutFeature": "Mobile-first text-to-speech focused on productivity and reading comprehension",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Premium", "price": "$29.99/yr" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/speechify.png",
        "aiModels": ["Speechify Voice Engine"],
        "pros": ["Supports PDFs, web articles", "Designed for dyslexia & ADHD support"],
        "cons": ["Audio quality is good but not top-tier AI", "Subscription needed for full voices"],
        "briefHistory": "Speechify is a popular app that reads text aloud. It’s known in accessibility circles (helping people with reading difficulties), and it syncs across devices so you can listen to any content. It uses various TTS engines under the hood."
    },
    {
        "id": "uberduck",
        "name": "Uberduck AI",
        "url": "https://uberduck.ai",
        "specialty": ["voice cloning", "fun voices"],
        "standoutFeature": "Famous for celebrity and character voice clones (e.g. cartoons, games)",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$50/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/uberduck.png",
        "aiModels": ["OpenAI models fine-tuned"],
        "pros": ["Huge novelty appeal (thousands of voice skins)", "API for developers"],
        "cons": ["Not for professional use (mostly novelty)", "Varied quality across voices"],
        "briefHistory": "Uberduck is an AI voice tool known for its viral voice clones (e.g., celebrity voices, anime characters). It’s open to the public and often used for fun voice memes or indie game devs."
    },
    {
        "id": "voicemod",
        "name": "VoiceMod",
        "url": "https://www.voicemod.net",
        "specialty": ["voice changer", "real-time"],
        "standoutFeature": "Real-time voice transformation for gaming and streaming",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$3.99/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/voicemod.png",
        "aiModels": ["Real-time DSP filters", "AI voice models"],
        "pros": ["Immediate fun voice effects", "Gaming/streaming integrations"],
        "cons": ["Not actual speech synthesis (works on your mic input)", "Quality depends on input"],
        "briefHistory": "VoiceMod is not a TTS but a real-time voice modulator. Streamers use it to sound like robots, aliens, etc. It’s included here as an *audio AI tool* for creative chat."
    },
    {
        "id": "synthesys",
        "name": "Synthesys",
        "url": "https://synthesys.io",
        "specialty": ["AI video voiceovers", "human avatars"],
        "standoutFeature": "Text-to-speech combined with AI-generated talking head avatars",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Personal", "price": "$49/mo" },
                { "name": "Professional", "price": "$99/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/synthesys.png",
        "aiModels": ["Synthesys AIVA (avatars)"],
        "pros": ["Provides both video avatars and voiceovers", "Easy drag-drop builder"],
        "cons": ["Limited to provided avatars", "Quality lower than Synthesia/HeyGen"],
        "briefHistory": "Synthesys is a platform offering AI presenter avatars and voiceovers. You type a script and choose an AI actor who speaks it. It’s simpler but less advanced than Synthesia."
    },
    {
        "id": "woebot",
        "name": "Woebot",
        "url": "https://woebothealth.com",
        "specialty": ["mental health", "therapy bot"],
        "standoutFeature": "Psychologically-informed conversational agent for mood tracking and CBT exercises",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Premium", "price": "$19.99/mo" },
                { "name": "Therapy (live coach)", "price": "$49/mo" },
                { "name": "Workplace / Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/woebot.png",
        "aiModels": ["Woebot proprietary NLP"],
        "pros": ["Backed by psychological research", "Available 24/7 for check-ins"],
        "cons": ["Not a substitute for professional therapy", "Limited scope (mood support only)"],
        "briefHistory": "Woebot is an AI-powered mental health chatbot. It uses CBT techniques in conversation to help users manage anxiety and depression. It’s used by individuals and workplaces for well-being support."
    },
    {
        "id": "wysa",
        "name": "Wysa",
        "url": "https://www.wysa.io",
        "specialty": ["mental health", "support"],
        "standoutFeature": "AI friend for coaching on stress and anxiety",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Therapy", "price": "$30/mo (live coach chats)" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/wysa.png",
        "aiModels": ["Wysa proprietary conversational model"],
        "pros": ["Friendly chatbot with mood tracking", "Access to human therapists optionally"],
        "cons": ["AI can be repetitive", "Not FDA-approved for diagnosis"],
        "briefHistory": "Wysa is an AI chatbot designed like a friendly penguin. It guides users through exercises (CBT, DBT, mindfulness) and can connect to real therapists for paid tiers."
    },
    {
        "id": "kuki",
        "name": "Kuki",
        "url": "https://kuki.ai",
        "specialty": ["entertainment", "social"],
        "standoutFeature": "Award-winning chatbot for casual conversation and games",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Pro", "price": "$3.99/mo" },
                { "name": "Creator", "price": "$9.99/mo" },
                { "name": "Enterprise", "price": "custom pricing" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/kuki-ai.png",
        "aiModels": ["Pandorabots A.L.I.C.E."],
        "pros": ["Engaging personality (jokes, games)", "Accessible via web/mobile"],
        "cons": ["Conversationally shallow", "Based on older AIML tech"],
        "briefHistory": "Kuki (formerly Mitsuku) is a chatbot designed purely for fun chat. It’s won several Loebner Prizes. Users can chat with Kuki about anything, play trivia or just socialize."
    },
    {
        "id": "chatsonic",
        "name": "ChatSonic",
        "url": "https://writesonic.com/chat",
        "specialty": ["conversational writing", "image/chat hybrid"],
        "standoutFeature": "Chatbot by Writesonic that includes Google News integration and image support",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Basic", "price": "$12/mo" },
                { "name": "Professional", "price": "$40/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/chatsonic.png",
        "aiModels": ["GPT-3.5 (custom fine-tuned)"],
        "pros": ["Real-time info (news) and creative image generation", "Good for marketing copy"],
        "cons": ["Subscription required", "Less robust than ChatGPT on deep questions"],
        "briefHistory": "ChatSonic (by Writesonic) is an AI chatbot that mimics ChatGPT but adds up-to-date info (it can fetch news) and can generate images on demand. It’s often used for content marketing tasks."
    },
    {
        "id": "jasperChat",
        "name": "Jasper Chat",
        "url": "https://www.jasper.ai/chat",
        "specialty": ["copywriting", "creative assistant"],
        "standoutFeature": "Conversational interface of Jasper AI copywriting platform",
        "pricing": {
            "free": false,
            "tiers": [
                { "name": "Jasper AI", "price": "$39/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/jasper-ai.png",
        "aiModels": ["JasperAI LLM", "GPT-4o (via Chat integration)"],
        "pros": ["Specialized in marketing/content writing", "Guided templates"],
        "cons": ["No free chat mode", "AI voice is more formulaic"],
        "briefHistory": "Jasper AI is a content generation platform. Jasper Chat is its conversational mode, allowing users to ask for blog posts, ads, or social posts in a dialogue format, leveraging GPT-4 in the background."
    },
    {
        "id": "notionAI",
        "name": "Notion AI",
        "url": "https://www.notion.so/product/ai",
        "specialty": ["productivity", "knowledge management"],
        "standoutFeature": "AI assistant built into Notion workspace for note-taking and writing",
        "pricing": {
            "free": true,
            "tiers": [
                { "name": "Personal Pro", "price": "$5/mo" }
            ]
        },
        "imageSrc": "https://img.icons8.com/color/100/notion.png",
        "aiModels": ["GPT-4"],
        "pros": ["Seamless in Notion (docs, tables)", "Good for summarizing notes and brainstorming"],
        "cons": ["Tied to Notion platform", "Limited free usage per month"],
        "briefHistory": "Notion AI adds generative capabilities to the Notion workspace. It can rewrite text, generate lists, and summarize content directly in your Notion pages. It leverages OpenAI models under the hood."
    }
];

export default aiChatbots;
