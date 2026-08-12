import { Ebook, Category, Order, Purchase, Review, Coupon, ReadingProgress, Bookmark, UserProfile } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    name: 'Wealth & Business',
    slug: 'wealth-business',
    description: 'Master money, investing, strategic growth, and financial independence.',
    icon_name: 'TrendingUp',
    created_at: new Date().toISOString(),
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    name: 'Mindset & Psychology',
    slug: 'mindset-psychology',
    description: 'Rewire your mental models, conquer fears, and unlock elite performance.',
    icon_name: 'Brain',
    created_at: new Date().toISOString(),
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Personal Finance',
    slug: 'personal-finance',
    description: 'Budgeting, wealth preservation, retirement planning, and debt elimination.',
    icon_name: 'Wallet',
    created_at: new Date().toISOString(),
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    name: 'Productivity & Leadership',
    slug: 'productivity-leadership',
    description: 'Focus protocols, executive presence, and building high-impact habits.',
    icon_name: 'Zap',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_EBOOKS: Ebook[] = [
  {
    id: 'eb-1',
    slug: 'billionaire-mindset',
    title: 'Understand the Billionaire Mindset',
    subtitle: 'Unconventional Mental Frameworks of World-Changing Founders',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000001',
    category_name: 'Wealth & Business',
    page_count: 248,
    published: true,
    featured: true,
    bestseller: false,
    rating: 4.9,
    review_count: 1742,
    cover_url: '/images/billionaire-mindset.jpg',
    file_path: 'private/billionaire-mindset.pdf',
    short_description: 'Discover how self-made billionaires think about risk, leverage, time compounding, and asymmetrical bets.',
    description: `Understand the Billionaire Mindset by John AG Family is a masterclass publication in high-stakes decision making, leverage creation, and strategic risk management. Drawn from years of studying high-net-worth innovators, this book breaks down the non-linear mental models used to build generational wealth.

### The Philosophy of Non-Linear Scale
Most individuals are taught to avoid failure at all costs. The billionaire mindset, however, views calculated failure as a minor option fee paid for asymmetric discovery. When your potential downside is fixed while your potential upside is infinite, taking the bet is mathematically compulsory.

### Core Strategic Pillars Included:
1. **Asymmetric Risk & Reward**: Master the mathematical principles where downside is strictly capped while upside compounding remains infinite.
2. **Permissionless Digital Leverage**: Harness software code, digital media, and automated funnels to scale global distribution at zero marginal cost.
3. **Capital Allocation Engines**: Reinvest cashflows into resilient, high-yield assets that compound uninterrupted over decades.
4. **Monopolistic Thinking**: Build defensible personal moats and enterprise positioning that protect your market share against competition.

### Who This Book Is Built For
Whether you are an entrepreneur scaling an enterprise, an investor managing capital, or an executive seeking high-leverage frameworks, this masterclass provides actionable blueprints to insulate your assets and build perpetual freedom.`,
    benefits_json: [
      'Master the 5 asymmetry principles used by top 0.01% investors.',
      'Learn how to leverage capital, media, and automated code to scale infinite upside.',
      'Eliminate reactive decision-making with battle-tested mental frameworks.',
      'Build long-term defensible moats around your personal brand and businesses.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Asymmetry of Risk & Reward', page: 12 },
      { id: 'ch-2', title: 'Chapter 2: Permissionless Leverage in the Digital Age', page: 48 },
      { id: 'ch-3', title: 'Chapter 3: Capital Allocation & Compounding Engine', page: 94 },
      { id: 'ch-4', title: 'Chapter 4: Monopolistic Thinking & Defensible Moats', page: 142 },
      { id: 'ch-5', title: 'Chapter 5: Long-Term Horizon & Legacy Architecture', page: 198 }
    ],
    preview_content: `### Chapter 1: The Asymmetry of Risk & Reward

Most people are taught to avoid failure at all costs. The billionaire mindset, however, views failure as a cheap option fee paid for asymmetric discovery.

When your potential downside is fixed (e.g. losing $1,000 or 3 months of focused effort) while your potential upside is infinite (a 100x return or market leadership), taking the bet is mathematically compulsory.

> "The largest returns come from asymmetric opportunities where the downside is strictly bounded, but the upside has no ceiling."`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Asymmetry of Risk & Reward',
        pageNumber: 1,
        content: `### 1.1 The Definition of Asymmetry

In conventional finance, risk and return are considered linearly proportional. Standard theory suggests that to get higher returns, you must accept proportionally larger catastrophic risk. High-yield investors and legendary builders know this is a fundamental misconception.

True wealth creation relies on **Asymmetric Risk Profiles**: bets where the maximum loss is fixed, manageable, and known beforehand, while the potential upside is uncapped.

#### Key Principles:
1. **Defined Downside**: Never risk capital or reputation that causes catastrophic wipeout.
2. **Infinite Upside**: Seek platforms, networks, and software where customer acquisition cost trends toward zero while market capacity scales globally.
3. **Optionality**: Keep flexible positions that gain value from market turbulence.

### 1.2 The Power of Permissionless Leverage

Naval Ravikant popularized the concept of permissionless leverage: code and media. Unlike capital or labor, which require permission from bankers or workers, code and media work for you 24/7 without marginal cost of replication.

When you pair permissionless leverage with asymmetric bets, you construct an unstoppable wealth engine.`
      },
      {
        id: 'ch-2',
        title: 'Chapter 2: Permissionless Leverage in the Digital Age',
        pageNumber: 2,
        content: `### 2.1 The Four Forms of Leverage

To achieve non-linear output, you must understand the four primary forms of leverage available in the modern economy:

1. **Labor**: People working for you. Requires high management overhead.
2. **Capital**: Money working for you. Highly effective, but requires permission from investors or banks.
3. **Code**: Software operating automatically on your behalf.
4. **Media**: Written, video, or audio content reaching millions simultaneously.

#### The Golden Combination
By combining high-margin digital products (such as eBooks, courses, and SaaS tools) with permissionless distribution, you achieve 90%+ gross margins with zero inventory friction.`
      },
      {
        id: 'ch-3',
        title: 'Chapter 3: Capital Allocation & Compounding Engine',
        pageNumber: 3,
        content: `### 3.1 The Magic of Uninterrupted Compounding

Albert Einstein famously called compound interest the eighth wonder of the world. In business and personal wealth, compounding applies to:
- **Capital**: Reinvesting profits into higher-yielding assets.
- **Knowledge**: Synthesizing insights across multidisciplinary fields.
- **Reputation**: Maintaining flawless integrity over decades.

Never interrupt compounding unnecessarily. Avoid impulse liquidations or speculative gambles that restart your growth clock.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-2',
    slug: 'psychology-of-wealth',
    title: 'The $100K Wealth Blueprint',
    subtitle: 'How to build your first $100,000.',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000002',
    category_name: 'Mindset & Psychology',
    page_count: 210,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.9,
    review_count: 1718,
    cover_url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/psychology-of-wealth.pdf',
    short_description: 'Why intelligence isn’t enough for financial success. Discover how your emotional habits dictate your net worth.',
    description: `The Psychology of Wealth by John AG Family reveals why financial success is not a science of complex math formulas, but a discipline of behavioral self-mastery. Hyper-intelligent professionals frequently make disastrous financial blunders while disciplined everyday investors quietly build multi-million dollar fortunes.

### The Hidden Emotional Triggers of Money
Through cognitive psychology and real-world wealth case studies, John AG Family provides concrete tools to master greed, fear, status-seeking, and delayed gratification.

### What You Will Learn:
1. **Unconscious Money Scripts**: Identify and dismantle deep-seated childhood beliefs about money that limit your retention rate.
2. **Freedom vs. Display Wealth**: Realize that true wealth is what you do not see: the unpurchased luxury items, the unencumbered time, and complete schedule freedom.
3. **Room for Error**: Design financial buffer zones that allow you to survive economic recessions without selling long-term compounding assets.
4. **Behavioral Consistency**: Develop emotional immunity against market panics, speculative FOMO cycles, and lifestyle inflation.`,
    benefits_json: [
      'Uncover and rewrite deep-seated subconscious money scripts.',
      'Protect yourself from status-seeking consumption and lifestyle creep.',
      'Develop emotional immunity against market panics and FOMO cycles.',
      'Establish sustainable habits for lifelong financial peace.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: Money as a Lens for Self-Mastery', page: 8 },
      { id: 'ch-2', title: 'Chapter 2: The Trap of Relative Status', page: 42 },
      { id: 'ch-3', title: 'Chapter 3: Freedom vs. Display Wealth', page: 86 },
      { id: 'ch-4', title: 'Chapter 4: Room for Error & Survival Instincts', page: 130 }
    ],
    preview_content: `### Chapter 1: Money as a Lens for Self-Mastery

Doing well with money has little to do with how smart you are and a lot to do with how you behave. Behaviors are hard to teach, even to really smart people.

Real wealth is what you don’t see: the unpurchased luxury cars, the unbought watches, and the financial freedom to control your daily schedule.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: Money as a Lens for Self-Mastery',
        pageNumber: 1,
        content: `### 1.1 The Paradox of Spending Money to Show Money

When people say they want to be a millionaire, what they usually mean is "I want to spend a million dollars." But spending a million dollars is the literal opposite of being a millionaire.

Wealth is what you accumulate and retain. It is financial options, security, and independence.`
      },
      {
        id: 'ch-2',
        title: 'Chapter 2: Freedom vs. Display Wealth',
        pageNumber: 2,
        content: `### 2.1 The Highest Dividend Money Pays

The greatest intrinsic value of money is its ability to give you control over your time. Being able to wake up every morning and say "I can do whatever I want today" is the single highest dividend money pays.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-3',
    slug: 'money-habits-that-keep-you-poor',
    title: 'Money Habits That Keep You Poor',
    subtitle: 'Break Free From Subtle Cash Leaks and Build Perpetual Net Worth',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000003',
    category_name: 'Personal Finance',
    page_count: 180,
    published: true,
    featured: false,
    bestseller: false,
    rating: 4.8,
    review_count: 1705,
    cover_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/money-habits.pdf',
    short_description: 'Identify the 12 silent financial leaks quietly draining your bank account every single month.',
    description: `Money Habits That Keep You Poor by John AG Family is a eye-opening exposure of the subtle, invisible cash leaks draining high earners worldwide. Earning a massive salary does not guarantee wealth if your behavioral traps siphon off your capital.

### Plugging Invisible Cash Leaks
This publication systematically breaks down how prestige spending, high-interest consumer debt, unmonitored recurring expenses, and impulse liabilities destroy long-term net worth.

### Actionable Reset Frameworks:
1. **The Retention Rate Equation**: Optimize the percentage of gross revenue you keep and reinvest rather than focusing solely on gross income.
2. **Automated Wealth Funnels**: Direct cashflows into yield-generating assets automatically before lifestyle expenses take over.
3. **Liability Negotiations**: Learn how to restructure high-cost obligations and turn monthly drains into productive capital.
4. **90-Day Financial Reset**: Execute a structured 90-day protocol to audit expenses, eliminate debt traps, and build cash reserves.`,
    benefits_json: [
      'Identify and plug your top 5 hidden monthly cash leaks.',
      'Automate your savings and investment funnel with zero manual effort.',
      'Learn how to negotiate liabilities down and convert expenses into income assets.',
      'Establish a 90-day financial reset program.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Phantom Income Illusion', page: 10 },
      { id: 'ch-2', title: 'Chapter 2: High-Margin Consumer Traps', page: 50 },
      { id: 'ch-3', title: 'Chapter 3: Building Your Automated Wealth Funnel', page: 95 }
    ],
    preview_content: `### Chapter 1: The Phantom Income Illusion

Earning $100,000 while spending $98,000 leaves you with less financial security than earning $50,000 while investing $15,000. Net income is a vanity metric; capital retention rate is the true test of financial health.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Phantom Income Illusion',
        pageNumber: 1,
        content: `### 1.1 The Retention Rate Equation

Your financial health is dictated by your retention rate:
\`\`\`
Retention Rate = (Monthly Income - Monthly Expenses) / Monthly Income
\`\`\`

If your retention rate is below 20%, you are operating on fragile ground regardless of how large your salary check is.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-4',
    slug: 'gold-retirement-guide',
    title: 'The Gold & Retirement Guide',
    subtitle: 'Protecting Wealth Against Inflation, Currency Debasement & Crisis',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000003',
    category_name: 'Personal Finance',
    page_count: 230,
    published: true,
    featured: true,
    bestseller: false,
    rating: 4.9,
    review_count: 1712,
    cover_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/gold-retirement-guide.pdf',
    short_description: 'A bulletproof guide to allocating precious metals, Sovereign Gold Bonds, and inflation-hedged portfolios.',
    description: `The Gold & Retirement Guide by John AG Family is an essential strategic handbook for safeguarding lifetime savings against currency debasement, hyperinflation, and macroeconomic instability.

### Weather-Proofing Your Nest Egg
Fiat currency steadily loses purchasing power over time. Over a 30-year retirement window, even a 4% inflation rate degrades real purchasing power by over 70%. Gold and hard assets remain the ultimate monetary constants across human history.

### Portfolio Architecture Covered:
1. **Hard Asset Allocation Formulas**: Specific percentage breakdowns for physical gold, Sovereign Gold Bonds, real estate, and inflation-indexed bonds.
2. **Crisis Hedging Protocols**: Protect your wealth against bank bail-ins, market crashes, and sovereign debt devaluations.
3. **Tax-Efficient Storage & Custody**: Understand how to structure metal holdings safely and legally across international jurisdictions.
4. **Generational Asset Preservation**: Pass down unencumbered, inflation-hedged wealth to future generations without tax friction.`,
    benefits_json: [
      'Understand the historical performance of gold vs fiat currencies during hyperinflation.',
      'Optimal gold allocation formulas for conservative, balanced, and growth portfolios.',
      'Tax-efficient holding structures for precious metals and retirement accounts.',
      'Step-by-step crisis hedging strategies.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Anatomy of Inflation', page: 14 },
      { id: 'ch-2', title: 'Chapter 2: Physical Gold vs Digital & Sovereign Bonds', page: 62 },
      { id: 'ch-3', title: 'Chapter 3: Designing the Weather-Proof Retirement Portfolio', page: 120 }
    ],
    preview_content: `### Chapter 1: The Anatomy of Inflation

Fiat currency loses purchasing power by design. Over a 30-year retirement window, even a modest 5% annual inflation rate reduces your money's real value by over 75%. Gold remains the ultimate constant monetary constant over 5,000 years of human history.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Anatomy of Inflation',
        pageNumber: 1,
        content: `### 1.1 Gold as Monetary Constant

Gold is not a speculative growth stock; it is real money. Unlike central bank paper currency, gold cannot be printed at zero marginal cost. Holding a 10% to 15% gold position provides essential portfolio insurance against sovereign debt crises.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-5',
    slug: 'billionaire-mindset-john-ag-family',
    title: 'Billionaire Mindset',
    subtitle: 'Think Different. Decide Better. Build Your Freedom.',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000001',
    category_name: 'Wealth & Business',
    page_count: 260,
    published: true,
    featured: true,
    bestseller: false,
    rating: 5.0,
    review_count: 1788,
    cover_url: '/images/billionaire-mindset-john-ag.jpg',
    file_path: 'private/billionaire-mindset-john-ag.pdf',
    short_description: 'Think different, decide better, and build your freedom. Discover the principles where your income follows your thinking.',
    description: `Billionaire Mindset by John AG Family is an elite masterclass publication for modern entrepreneurs, visionaries, investors, and ambitious builders. Built upon the foundational axiom that "Your Income Follows Your Thinking", this comprehensive blueprint breaks down the exact non-linear mental models, strategic risk management frameworks, and permissionless leverage systems used by world-changing founders to create generational financial freedom.

### Why Most People Never Achieve Scale
The vast majority of individuals spend decades optimizing hard work within flawed, low-leverage mental models. They trade hours for dollars in a strictly linear system where income is capped by personal time limits. In contrast, self-made billionaires operate on an entirely different cognitive plane. They do not work harder; they operate with asymmetric leverage, capital allocation precision, and exponential thinking.

### What You Will Master in This Masterclass
1. **The Asymmetric Bet Principle**: Learn how to evaluate business, investment, and career decisions where your potential downside is strictly bounded (fixed loss), while your upside is uncapped (infinite compounding).
2. **Permissionless Digital Leverage**: Understand how to harness code, digital media, and automated platforms to reach millions of prospective customers globally with zero marginal cost of replication.
3. **High-Stakes Decision Engineering**: Eliminate reactive, emotionally-driven decisions using battle-tested mental frameworks that preserve mental clarity under extreme uncertainty.
4. **The Freedom Filter & Monopolistic Moats**: Construct defensible moats around your personal brand and business ventures, ensuring that every asset you build compounds your personal freedom and net worth automatically.

### Strategic Chapter Roadmap
- **Part I: The Cognitive Shift**: Transitioning from linear labor earnings to exponential compounding.
- **Part II: Asymmetric Risk Architecture**: How top 0.01% investors position themselves to win regardless of macro-economic volatility.
- **Part III: Building Permissionless Assets**: Converting ideas into scalable digital distribution networks.
- **Part IV: Systematizing Generational Wealth**: Insulating family wealth, legal structures, and long-term legacy planning.

Whether you are an established founder aiming to scale from 7 to 8 figures, or an aspiring investor looking to break free from traditional career constraints, Billionaire Mindset provides the exact non-linear playbook to transform your thinking and build perpetual financial independence.`,
    benefits_json: [
      'Unlock the 7 high-leverage thinking protocols used by top-tier wealth builders.',
      'Master risk management techniques that protect capital while preserving explosive upside.',
      'Learn how to transition from trading time for money to building scalable asset systems.',
      'Formulate a 5-year freedom architecture tailored to digital-native business models.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: Your Income Follows Your Thinking', page: 1 },
      { id: 'ch-2', title: 'Chapter 2: Deciding Better Under Uncertainty', page: 45 },
      { id: 'ch-3', title: 'Chapter 3: Building Unstoppable Freedom Systems', page: 110 },
      { id: 'ch-4', title: 'Chapter 4: Asymmetric Wealth Architecture', page: 175 }
    ],
    preview_content: `### Chapter 1: Your Income Follows Your Thinking

The physical world is a delayed reflection of your internal mental models. If you think linearly, your income remains linear. When you elevate your thinking to embrace leverage, ownership, and non-linear scale, your wealth naturally compounds.

> "Your income follows your thinking. Elevate your decisions, elevate your scale, and build true freedom."`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: Your Income Follows Your Thinking',
        pageNumber: 1,
        content: `### 1.1 The Primacy of Mindset in Wealth Creation

Every fortune, enterprise, and breakthrough begins as a mental decision. Most people spend decades optimizing execution while operating within flawed, low-leverage mental models.

#### Core Principles:
1. **Linear vs. Exponential Mindset**: Standard employment trades hours for dollars. Exponential thinking trades ownership for compounding cashflow.
2. **First-Principles Thinking**: Strip away conventional assumptions and evaluate problems down to fundamental truths.
3. **The Freedom Filter**: Evaluate every business opportunity by its ability to generate unencumbered time and cash.`
      },
      {
        id: 'ch-2',
        title: 'Chapter 2: Deciding Better Under Uncertainty',
        pageNumber: 2,
        content: `### 2.1 High-Stakes Decision Engineering

Decision quality under incomplete information is the single greatest multiplier of long-term net worth. Learn how to construct decision trees, minimize irreversible mistakes, and act with decisive speed.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-6',
    slug: 'the-unfair-advantage',
    title: 'The Smart Money Blueprint 🧠',
    subtitle: 'How Elite Startups Build Defensible Moats & Dominant Market Positioning',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000001',
    category_name: 'Wealth & Business',
    page_count: 225,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.9,
    review_count: 1620,
    cover_url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/unfair-advantage.pdf',
    short_description: 'Construct defensible economic moats, master pricing power, and command market dominance.',
    description: `The Unfair Advantage by John AG Family reveals how world-class enterprises engineer competitive moats that lock out competitors and deliver compounding free cash flows for decades.

### Engineering Defensible Moats
Competing on price is a race to the bottom. Real wealth is generated by capturing unfair advantages: proprietary distribution channels, network effects, high switching costs, and brand equity.

### Key Pillars Included:
1. **Network Effect Architecture**: Design feedback loops where every new user increases the value of your product for all existing users.
2. **Pricing Power Immunity**: Charge premium prices while increasing customer retention through indispensable value delivery.
3. **Monopolistic Positioning**: Avoid bloody red-ocean competition by creating brand new categories where you are the sole option.`,
    benefits_json: [
      'Master the 4 primary types of structural business moats.',
      'Learn how to command 50%+ profit margins without losing customers.',
      'Build proprietary distribution channels that competitors cannot replicate.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Fallacy of Perfect Competition', page: 10 },
      { id: 'ch-2', title: 'Chapter 2: Designing High Switching Costs', page: 55 },
      { id: 'ch-3', title: 'Chapter 3: Monopoly Pricing & Category Creation', page: 115 }
    ],
    preview_content: `### Chapter 1: The Fallacy of Perfect Competition

Competition is for losers. If you want to create enduring value, build a monopoly. Monopolies drive innovation because profits enable long-term vision.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Fallacy of Perfect Competition',
        pageNumber: 1,
        content: `### 1.1 The Definition of an Unfair Advantage

An unfair advantage is a structural business characteristic that cannot be easily copied or bought by competitors. Without an unfair advantage, your margins will inevitably compress to zero.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-7',
    slug: 'deep-focus-protocols',
    title: 'How to Build Wealth from Zero 🚀',
    subtitle: 'Eliminate Distractions, Achieve Flow State & Multiply Executive Output',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000004',
    category_name: 'Productivity & Leadership',
    page_count: 195,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.9,
    review_count: 1480,
    cover_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/deep-focus.pdf',
    short_description: 'Neuroscience-backed routines to unlock uninterrupted 4-hour cognitive flow blocks every single day.',
    description: `Deep Focus Protocols by John AG Family is the ultimate operating manual for high-performing executives, writers, programmers, and founders battling the attention economy.

### Mastering Uninterrupted Cognitive Flow
In an age of constant notification pinging and fragmented focus, the ability to concentrate deeply on hard problems for extended periods is becoming increasingly rare—and extraordinarily valuable.

### Tactical Frameworks:
1. **Flow Trigger Systematization**: Anchor environmental cues to trigger deep focus state within 5 minutes of sitting at your desk.
2. **Cognitive Energy Audits**: Structure your hardest strategic thinking during your peak circadian focus windows.
3. **Information Fasting**: Eliminate low-grade digital noise that drains working memory and willpower.`,
    benefits_json: [
      'Double your high-value output while reducing total working hours.',
      'Establish 4-hour uninterrupted deep work blocks daily.',
      'Eliminate brain fog, digital fatigue, and compulsive tab-switching.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Attention Economy War', page: 8 },
      { id: 'ch-2', title: 'Chapter 2: Neuroscience of the Flow State', page: 44 },
      { id: 'ch-3', title: 'Chapter 3: Designing the Distraction-Free Fortress', page: 90 }
    ],
    preview_content: `### Chapter 1: The Attention Economy War

High cognitive performers treat attention as their most sacred financial asset. If your attention is constantly hijacked, your strategic output will remain mediocre.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Attention Economy War',
        pageNumber: 1,
        content: `### 1.1 The Cost of Context Switching

Every time you glance at a notification, it takes up to 23 minutes to regain full cognitive focus on your primary task. Minimizing context switches is the single fastest way to 3x your productivity.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-8',
    slug: 'high-stakes-negotiation',
    title: 'The Art of High-Stakes Negotiation',
    subtitle: 'Mastering Power Dynamics, Deal Structuring & Leverage in Business',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000004',
    category_name: 'Productivity & Leadership',
    page_count: 240,
    published: true,
    featured: true,
    bestseller: false,
    rating: 5.0,
    review_count: 1590,
    cover_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format&fit=crop',
    file_path: 'private/high-stakes-negotiation.pdf',
    short_description: 'Command leverage, read counterpart psychology, and win non-linear deal terms in business negotiations.',
    description: `The Art of High-Stakes Negotiation by John AG Family is an indispensable masterclass on reading power dynamics, structuring multi-million dollar deals, and securing favorable terms without hostility.

### Commanding Leverage at the Table
Negotiation is not about aggression; it is about thorough preparation, emotional control, and understanding what the other party truly values beyond purchase price.

### Masterclass Playbook:
1. **BATNA Optimization**: Strengthen your Best Alternative to a Negotiated Agreement so you can walk away with complete confidence.
2. **Tactical Empathy**: Uncover hidden constraints, deadlines, and internal pressures influencing your counterpart's decisions.
3. **Asymmetric Terms**: Structure non-price concessions (such as equity upside, exclusivity, or favorable payment schedules) that double deal ROI.`,
    benefits_json: [
      'Learn how to walk into any negotiation with unshakeable poise.',
      'Master tactical empathy techniques that unlock hidden concessions.',
      'Structure win-win deal terms that protect your downside.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Psychology of Leverage', page: 12 },
      { id: 'ch-2', title: 'Chapter 2: Uncovering Hidden Constraints', page: 60 },
      { id: 'ch-3', title: 'Chapter 3: Structuring Non-Linear Deals', page: 130 }
    ],
    preview_content: `### Chapter 1: The Psychology of Leverage

He who cares less about the outcome of a deal holds the true power. Always enter a negotiation with a clear walk-away position.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Psychology of Leverage',
        pageNumber: 1,
        content: `### 1.1 The Walk-Away Power

The single most effective tool in any negotiation is your genuine willingness to walk away. If you need the deal to survive, you have already lost control of the outcome.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-9',
    slug: 'beginners-guide-to-investing',
    title: 'The Beginner’s Guide to Investing',
    subtitle: 'Master Stock Markets, Index Funds & Passive Wealth Accumulation',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000003',
    category_name: 'Personal Finance',
    page_count: 240,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.98,
    review_count: 1850,
    cover_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop',
    file_path: 'private/beginners-guide-to-investing.pdf',
    short_description: 'Master stock market fundamentals, index funds, compound interest, and risk management.',
    description: `The Beginner’s Guide to Investing by John AG Family is the ultimate foundational handbook for anyone looking to build wealth in stock markets and passive asset classes.

### The Power of Compound Growth
Investing is not gambling; it is systemic capital allocation. Learn how index funds, dollar-cost averaging, and dividend reinvestment build multi-million dollar nest eggs over time.

### Core Modules:
1. **Stock Market Foundations**: Understand equities, bonds, ETFs, and index funds with zero jargon.
2. **Dollar-Cost Averaging**: Automate your monthly investment funnel so market volatility works in your favor.
3. **Risk & Portfolio Construction**: Allocate capital safely according to your age, horizon, and financial goals.`,
    benefits_json: [
      'Understand stock market fundamentals with zero confusing financial jargon.',
      'Build a self-balancing index fund portfolio in under 30 minutes.',
      'Automate your monthly investment funnel for hands-free compounding.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Magic of Compound Interest', page: 10 },
      { id: 'ch-2', title: 'Chapter 2: Index Funds vs Individual Stock Selection', page: 55 },
      { id: 'ch-3', title: 'Chapter 3: Building Your Automated Portfolio', page: 120 }
    ],
    preview_content: `### Chapter 1: The Magic of Compound Interest

The best time to plant a tree was 20 years ago. The second best time is today. The sooner you begin investing, the faster compounding works on your behalf.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Magic of Compound Interest',
        pageNumber: 1,
        content: `### 1.1 The Rule of 72

To calculate how many years it takes for your investment to double, divide 72 by your annual rate of return. At an 8% return, your money doubles every 9 years.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-10',
    slug: 'how-to-build-wealth-from-zero',
    title: 'How to Build Wealth from Zero 🚀',
    subtitle: 'The Step-by-Step Blueprint to Financial Freedom & Cash Flow',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000001',
    category_name: 'Wealth & Business',
    page_count: 220,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.95,
    review_count: 1920,
    cover_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop',
    file_path: 'private/how-to-build-wealth-from-zero.pdf',
    short_description: 'Actionable step-by-step roadmap to go from zero capital to independent cashflow.',
    description: `How to Build Wealth from Zero 🚀 by John AG Family is a practical, inspiring guide for anyone starting with limited capital or starting from scratch.

### From Zero to Cash Flow Engine
You do not need an inheritance or massive startup capital to build wealth. By developing high-income digital skills and reinvesting initial profits, you build momentum.

### Strategic Roadmap:
1. **High-Income Skill Acquisition**: Master digital skills that command $100+/hour in modern remote markets.
2. **The Zero-Based Savings Filter**: Eliminate cash drains and redirect monthly surplus into yield assets.
3. **Transitioning to Assets**: Convert personal service income into scalable digital media and business equity.`,
    benefits_json: [
      'Master high-value digital skills that scale income rapidly.',
      'Eliminate financial anxiety with a structured 90-day cashflow plan.',
      'Learn how to re-invest your first $1,000 into high-ROI assets.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Zero Baseline Mindset', page: 8 },
      { id: 'ch-2', title: 'Chapter 2: High-Income Skill Acquisition', page: 48 },
      { id: 'ch-3', title: 'Chapter 3: Scaling Your First Income Engine', page: 110 }
    ],
    preview_content: `### Chapter 1: The Zero Baseline Mindset

Starting from zero is an advantage. You have no bloated overhead, no toxic financial habits to unlearn, and complete freedom to pivot quickly toward opportunity.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Zero Baseline Mindset',
        pageNumber: 1,
        content: `### 1.1 The Primacy of Cash Flow

When starting from scratch, cash flow is king. Focus 100% of your energy on high-margin cash generation before worrying about passive allocation.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-11',
    slug: 'the-smart-money-blueprint',
    title: 'The Smart Money Blueprint',
    subtitle: 'High-Yield Asset Allocation, Tax Strategies & Smart Capital Management',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000001',
    category_name: 'Wealth & Business',
    page_count: 250,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.92,
    review_count: 1640,
    cover_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop',
    file_path: 'private/smart-money-blueprint.pdf',
    short_description: 'Master institutional capital management, tax efficiency, and asymmetric portfolio design.',
    description: `The Smart Money Blueprint by John AG Family uncovers the sophisticated asset management strategies utilized by institutional wealth offices and private equity investors.

### Thinking Like Institutional Capital
Retail investors chase hype; smart money allocates according to asymmetric risk profiles, tax minimization, and economic cycle positioning.

### Masterclass Strategies:
1. **Asymmetric Portfolio Shields**: Hedge your capital against inflation while retaining full exposure to market upside.
2. **Tax-Efficient Structuring**: Structure income streams legally to maximize net take-home returns.
3. **Liquidity Management**: Maintain cash reserves to buy distressed quality assets during market panics.`,
    benefits_json: [
      'Learn how institutional investors allocate capital across asset classes.',
      'Minimize tax friction legally on investment gains.',
      'Protect portfolio purchasing power during inflationary cycles.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Psychology of Smart Capital', page: 12 },
      { id: 'ch-2', title: 'Chapter 2: Tax-Efficient Wealth Structures', page: 60 },
      { id: 'ch-3', title: 'Chapter 3: Asymmetric Asset Allocation Formulas', page: 130 }
    ],
    preview_content: `### Chapter 1: The Psychology of Smart Capital

Smart money buys when blood is in the streets and sells during speculative euphoria. Developing emotional detachment from market cycles is the hallmark of elite capital allocators.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Psychology of Smart Capital',
        pageNumber: 1,
        content: `### 1.1 The Cost of Tax Friction

A 20% annual investment gain reduced by 30% tax drag yields less long-term wealth than a 15% tax-sheltered return. Structure matters as much as returns.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-12',
    slug: '100k-wealth-blueprint',
    title: 'The $100K Wealth Blueprint — How to build your first $100,000.',
    subtitle: 'Accelerate Savings, High-Income Skills & Your First Milestone',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000003',
    category_name: 'Personal Finance',
    page_count: 230,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.99,
    review_count: 2100,
    cover_url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=600&auto=format&fit=crop',
    file_path: 'private/100k-wealth-blueprint.pdf',
    short_description: 'The definitive tactical guide to achieving your first $100,000 net worth milestone.',
    description: `The $100K Wealth Blueprint — How to build your first $100,000 by John AG Family is an intensive step-by-step masterclass focused on reaching the hardest, most transformative milestone in personal finance: your first $100,000.

### Why the First $100K Changes Everything
As Charlie Munger famously noted, getting your first $100,000 is a total grind, but once you achieve it, compound interest begins doing the heavy lifting for you.

### Tactical Milestone Action Plan:
1. **Aggressive Savings Engine**: Establish a 40%+ capital retention protocol to build liquidity rapidly.
2. **Income Multiplication**: Combine your core job/business with high-ticket freelance or digital product sales.
3. **The Compounding Pivot**: Transition your accumulated $100K into index funds and income-generating assets that work 24/7.`,
    benefits_json: [
      'Clear 12-month roadmap to achieve your first $100,000 net worth.',
      'Master high-retention budgeting that doesn’t compromise your quality of life.',
      'Transition from manual labor to passive compound interest.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: Why the First $100K is the Hardest', page: 8 },
      { id: 'ch-2', title: 'Chapter 2: Building the High-Retention Engine', page: 48 },
      { id: 'ch-3', title: 'Chapter 3: Reaching $100K and Beyond', page: 115 }
    ],
    preview_content: `### Chapter 1: Why the First $100K is the Hardest

The first $100,000 requires intense discipline and high effort. But once you cross this threshold, your money earns money, accelerating your journey to $500K and $1M exponentially.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: Why the First $100K is the Hardest',
        pageNumber: 1,
        content: `### 1.1 The Mathematics of the $100K Pivot

At $10,000 invested, a 10% annual return gives you $1,000. At $100,000 invested, that same 10% return gives you $10,000 - equivalent to months of hard manual savings.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'eb-13',
    slug: 'how-to-buy-bluetooth',
    title: 'How to Buy Bluetooth 🎧',
    subtitle: 'The Ultimate Buyer’s Guide to Wireless Audio, Codecs, Specs & Smart Purchasing',
    author: 'John AG Family',
    price: 49,
    currency: 'USD',
    category_id: '10000000-0000-0000-0000-000000000004',
    category_name: 'Productivity & Leadership',
    page_count: 185,
    published: true,
    featured: true,
    bestseller: true,
    rating: 4.95,
    review_count: 342,
    cover_url: '/images/how-to-buy-bluetooth.png',
    file_path: 'private/how-to-buy-bluetooth.pdf',
    short_description: 'Master wireless tech specs, Bluetooth 5.4 codecs (LDAC, aptX Lossless), active noise cancellation, and smart gear buying decisions.',
    description: `How to Buy Bluetooth 🎧 by John AG Family is the definitive buyer's handbook for navigating modern wireless audio technology, codecs, active noise cancellation, and audio gear purchasing.

### Stop Wasting Money on Overpriced Audio Gear
The market is flooded with marketing hype, fake battery claims, and inflated price tags. This masterclass breaks down the raw engineering specs so you can make informed decisions when purchasing Bluetooth headphones, earbuds, DACs, and home speakers.

### What You Will Learn in This Guide:
1. **Bluetooth Standards & Codecs**: Understand the real-world difference between AAC, SBC, aptX Adaptive, and Sony LDAC lossless audio.
2. **Active Noise Cancellation (ANC) Architecture**: Evaluate feedforward, feedback, and hybrid ANC drivers before spending top dollar.
3. **Battery Health & Repairability**: Learn how to maximize the lifespan of wireless lithium batteries and avoid gear that degrades within 12 months.
4. **The Ultimate Buyer's Decision Matrix**: Step-by-step checklist to match your listening habits (work, gaming, gym, travel, audiophile listening) to the exact right wireless model.`,
    benefits_json: [
      'Decode Bluetooth 5.0 to 5.4 specs, LE Audio, and LC3 codecs.',
      'Understand ANC performance, driver sizes, and frequency response curves.',
      'Avoid buying counterfeit wireless gear and overpriced brand traps.',
      'Select the perfect wireless audio gear tailored to your budget and needs.'
    ],
    toc_json: [
      { id: 'ch-1', title: 'Chapter 1: The Evolution of Wireless Audio Standards', page: 8 },
      { id: 'ch-2', title: 'Chapter 2: Codecs Demystified: LDAC, aptX Lossless & AAC', page: 42 },
      { id: 'ch-3', title: 'Chapter 3: Active Noise Cancellation & Ergonomics', page: 88 },
      { id: 'ch-4', title: 'Chapter 4: The Ultimate Bluetooth Buyer’s Checklist', page: 135 }
    ],
    preview_content: `### Chapter 1: The Evolution of Wireless Audio Standards

Wireless audio has evolved from muddy 128kbps mono streams to high-resolution 24-bit/96kHz lossless transmission over Bluetooth 5.4. Understanding how data bandwidth impacts audio quality is your first step to buying smart.`,
    chapters: [
      {
        id: 'ch-1',
        title: 'Chapter 1: The Evolution of Wireless Audio Standards',
        pageNumber: 1,
        content: `### 1.1 Understanding Bitrates and Bandwidth

Bluetooth audio transmission relies on compression algorithms (codecs) to send music from your phone to your headphones. Standard SBC streams at ~328 kbps, whereas Sony LDAC streams up to 990 kbps.

#### Key Specs to Compare Before Buying:
1. **Bluetooth Version**: Look for Bluetooth 5.2 or higher for Multipoint connectivity and Low Energy (LE) audio support.
2. **Supported Codecs**: Match your phone's hardware (iOS supports AAC; Android supports aptX & LDAC).
3. **Driver Configuration**: Dynamic vs balanced armature drivers and their frequency response curves.`
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'WELCOME10',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_amount: 10,
    used_count: 42,
    active: true,
    created_at: new Date().toISOString()
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    user_id: 'usr-us-1',
    user_name: 'Michael Vance (Austin, TX)',
    ebook_id: 'eb-5',
    ebook_title: 'Billionaire Mindset',
    rating: 5,
    review_text: 'John AG Family nailed this masterclass! The concept that "Your Income Follows Your Thinking" completely rewired how I allocate capital and structure my agency.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'rev-102',
    user_id: 'usr-us-2',
    user_name: 'Sarah Jenkins (New York, NY)',
    ebook_id: 'eb-5',
    ebook_title: 'Billionaire Mindset',
    rating: 5,
    review_text: 'Worth 10x the price. The decision-making frameworks under uncertainty helped us scale our SaaS without burning cash. Essential reading!',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-103',
    user_id: 'usr-us-3',
    user_name: 'Brandon Taylor (San Francisco, CA)',
    ebook_id: 'eb-5',
    ebook_title: 'Billionaire Mindset',
    rating: 5,
    review_text: 'Pure gold. The freedom filter chapter made me cut 3 low-margin projects immediately. Best $100 I spent all quarter.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'rev-104',
    user_id: 'usr-us-4',
    user_name: 'Christopher Hayes (Chicago, IL)',
    ebook_id: 'eb-1',
    ebook_title: 'Understand the Billionaire Mindset',
    rating: 5,
    review_text: 'Hands down the best mindset book on the market. John AG Family breaks down non-linear leverage better than any business school professor.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'rev-105',
    user_id: 'usr-us-5',
    user_name: 'Jessica Reynolds (Miami, FL)',
    ebook_id: 'eb-1',
    ebook_title: 'Understand the Billionaire Mindset',
    rating: 5,
    review_text: 'The asymmetric risk breakdown in Chapter 1 alone is worth thousands. Downloaded PDF and read it twice in one weekend.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'rev-106',
    user_id: 'usr-us-6',
    user_name: 'Ashley Brooks (Seattle, WA)',
    ebook_id: 'eb-2',
    ebook_title: 'The $100K Wealth Blueprint',
    rating: 5,
    review_text: 'A profound psychological dive into financial discipline. John AG Family masterfully connects emotional control to net worth growth.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 'rev-107',
    user_id: 'usr-us-7',
    user_name: 'Tyler Sullivan (Denver, CO)',
    ebook_id: 'eb-2',
    ebook_title: 'The $100K Wealth Blueprint',
    rating: 5,
    review_text: 'The chapter on status traps opened my eyes. Highly recommended for any young professional looking to build real freedom.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: 'rev-108',
    user_id: 'usr-us-8',
    user_name: 'Ethan Bennett (Boston, MA)',
    ebook_id: 'eb-3',
    ebook_title: 'Money Habits That Keep You Poor',
    rating: 5,
    review_text: 'Brutally honest and practical. Helped me identify 4 silent cash leaks that were eating $1,200/month of my disposable income.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'rev-109',
    user_id: 'usr-us-9',
    user_name: 'Lauren Crawford (Dallas, TX)',
    ebook_id: 'eb-4',
    ebook_title: 'The Gold & Retirement Guide',
    rating: 5,
    review_text: 'An indispensable guide to portfolio hedging against inflation. Clear formulas and zero fluff.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 9).toISOString()
  }
];
