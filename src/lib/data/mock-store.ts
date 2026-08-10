import { Ebook, Category, Order, Purchase, Review, Coupon, ReadingProgress, Bookmark, UserProfile } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Wealth & Business',
    slug: 'wealth-business',
    description: 'Master money, investing, strategic growth, and financial independence.',
    icon_name: 'TrendingUp',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Mindset & Psychology',
    slug: 'mindset-psychology',
    description: 'Rewire your mental models, conquer fears, and unlock elite performance.',
    icon_name: 'Brain',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Personal Finance',
    slug: 'personal-finance',
    description: 'Budgeting, wealth preservation, retirement planning, and debt elimination.',
    icon_name: 'Wallet',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-4',
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
    category_id: 'cat-1',
    category_name: 'Wealth & Business',
    page_count: 248,
    published: true,
    featured: true,
    bestseller: true,
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
    title: 'The Psychology of Wealth',
    subtitle: 'Mastering the Hidden Emotional Triggers Behind Money Decisions',
    author: 'John AG Family',
    price: 100,
    currency: 'USD',
    category_id: 'cat-2',
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
    category_id: 'cat-3',
    category_name: 'Personal Finance',
    page_count: 180,
    published: true,
    featured: false,
    bestseller: true,
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
    category_id: 'cat-3',
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
    category_id: 'cat-1',
    category_name: 'Wealth & Business',
    page_count: 260,
    published: true,
    featured: true,
    bestseller: true,
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
    ebook_title: 'The Psychology of Wealth',
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
    ebook_title: 'The Psychology of Wealth',
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
