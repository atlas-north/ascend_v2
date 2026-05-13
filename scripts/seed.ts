/**
 * Seed script — populates Payload CMS with demo content.
 * Run with: npm run seed
 *
 * Idempotent: existing slugs are skipped, not overwritten.
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env.local (or environment).
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import payload from 'payload'
import config  from '../src/payload.config'

/* ─── Lexical helpers ─────────────────────────────────────────────────────── */

function text(content: string, format = 0) {
  return { type: 'text', text: content, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function p(...segments: ReturnType<typeof text>[]) {
  return {
    type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
    children: segments,
  }
}

function h2(content: string) {
  return {
    type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr',
    children: [text(content)],
  }
}

function blockquote(content: string) {
  return {
    type: 'quote', format: '', indent: 0, version: 1, direction: 'ltr',
    children: [text(content)],
  }
}

function lexical(...nodes: object[]) {
  return {
    root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: nodes },
  }
}

/* ─── Seed data ───────────────────────────────────────────────────────────── */

const articles = [
  {
    title:       'Why most AI implementations fail before they start',
    slug:        'why-ai-implementations-fail',
    category:    'Strategy',
    teaser:      'Most businesses adopt AI tools without adapting their workflows. The tool fails. The workflow was the problem.',
    publishedAt: '2026-04-10T09:00:00.000Z',
    body: lexical(
      p(text('The failure rate of enterprise AI projects is not a technology problem. Language models work. Embeddings work. The tooling has never been more mature. What does not work is dropping a capable model into a broken workflow and expecting the model to repair the workflow as a side effect of completing tasks.')),
      p(text('When a business adopts a generic AI tool, it is usually solving the wrong problem. The tool is positioned as a productivity layer — a way to do the existing workflow faster. But the existing workflow was designed around human limitations: the need to context-switch, the cost of communication, the friction of moving data between systems. An AI agent operating within those same constraints will produce marginal gains at best.')),
      h2('The workflow is the product'),
      p(text('The businesses that achieve meaningful results from AI are the ones that treat the agent as a reason to redesign their workflows from first principles. What decisions are being made? What information do those decisions require? Where does that information currently live? What would the sequence look like if a human did not have to be the connector at each step?')),
      p(text('These are process questions, not technology questions. Answering them before selecting a tool is what separates implementations that compound over time from implementations that get quietly deprecated after three months.')),
      blockquote('Most AI projects fail in Discovery, not in deployment. The model is rarely the problem.'),
      p(text('The Discovery phase of every AtlasAscend engagement exists because of this pattern. Before any agent is designed, we produce a workflow audit — a complete map of how the business actually operates, not how it is supposed to operate. The delta between those two things is usually where the implementation dies.')),
    ),
  },
  {
    title:       'The case for 7-day deployment',
    slug:        'case-for-7-day-deployment',
    category:    'Platform',
    teaser:      'Speed is not a shortcut. It is a forcing function that eliminates scope creep before it starts.',
    publishedAt: '2026-03-28T09:00:00.000Z',
    body: lexical(
      p(text('Long implementation timelines do not produce better AI agents. They produce better-documented AI agents that never get used. The relationship between time spent and outcome quality in AI deployment follows a curve that plateaus well before most enterprise timelines end — and then reverses, as scope expands to fill the available calendar.')),
      p(text('The 7-day constraint was not designed as a marketing promise. It emerged from a consistent pattern across early AtlasAscend engagements: the workflows that required more than a week to implement were almost always workflows that had been over-engineered in the design phase. When the constraint was introduced, the design phase got sharper. Decisions that previously took three meetings took one. Scope that was aspirational got cut. What remained was what the client actually needed.')),
      h2('What the constraint forces'),
      p(text('Seven days requires a specific sequencing discipline. Discovery must happen in a single focused session — not spread across two weeks of calendar negotiation. The agent architecture must be locked at the end of Day 2, not held open for stakeholder review. Integration work runs in parallel with configuration, not after it. Deployment happens before the client has had time to add requirements they thought of on Day 4.')),
      p(text('This is uncomfortable for clients who are used to long software procurement cycles. It is also why those clients tend to be the most satisfied at the end of the process. They receive a working agent in a week, rather than a requirements document in three months.')),
      blockquote('Speed is a quality signal, not a quality compromise — if the process is designed around it from the start.'),
      p(text('The caveat is that the 7-day model only works if Discovery produces a genuinely accurate picture of the required scope. When it does, the build is focused. When it does not, the build expands. Which is why every AtlasAscend engagement starts with the same two-hour session, asking the same direct questions, before any architecture is touched.')),
    ),
  },
  {
    title:       'What autonomous really means',
    slug:        'what-autonomous-really-means',
    category:    'Intelligence',
    teaser:      'Autonomous does not mean unsupervised. It means the agent handles the sequence — you handle the exceptions.',
    publishedAt: '2026-03-14T09:00:00.000Z',
    body: lexical(
      p(text('The word autonomous is doing a lot of work in AI marketing right now, and most of it is misleading. An agent that asks for confirmation before every non-trivial action is not autonomous — it is a slightly faster human assistant. An agent that acts without any human oversight is not production-ready — it is a liability. Genuine autonomy sits between these two failure modes, and designing for it requires being specific about what the agent decides alone and what it escalates.')),
      p(text('The distinction that matters is between a decision the agent is authorised to make and a decision that requires human judgement. These boundaries are not universal — they depend on the business, the stakes, and the cost of errors. For a support agent, autonomously sending a refund under $100 might be appropriate. Autonomously issuing a credit note to a key account requires a human in the loop. Defining these boundaries is the core design work in any serious agent implementation.')),
      h2('Scope, not capability'),
      p(text('When an Atlas agent is designed, the OpenClaw configuration framework is used to define its operational scope explicitly. The agent is told — in structured terms, not natural language — which actions it can take without approval, which actions require escalation, and which actions it should never take regardless of instruction. This is not a prompt. It is an architecture decision that persists across every session and every user interaction.')),
      p(text('The result is an agent that is genuinely autonomous within its defined domain and reliably non-autonomous outside it. When it encounters a situation that falls outside scope, it escalates immediately — to the right person, via the right channel, with the relevant context already assembled. The human handles the exception; the agent handles the sequence.')),
      blockquote('An autonomous agent that never escalates is not well-designed. It is untested.'),
      p(text('This framing has a practical implication for how you should evaluate AI agents you are considering deploying. The question is not "how much can it do?" — it is "how clearly does it know what it should not do?" The latter is harder to build and harder to sell, which is why most vendors lead with the former.')),
    ),
  },
  {
    title:       'The orchestration layer nobody talks about',
    slug:        'orchestration-layer',
    category:    'Platform',
    teaser:      'Everyone discusses the model. Nobody discusses what coordinates the model across your actual business context.',
    publishedAt: '2026-02-27T09:00:00.000Z',
    body: lexical(
      p(text('AI product discussions are almost entirely focused on the model — which model is fastest, which scores highest on benchmarks, which is most cost-effective per token. These are reasonable questions for researchers. For businesses deploying agents, they are mostly the wrong questions. The model is a component. The orchestration layer is the product.')),
      p(text('An orchestration layer is what sits between the model and the business context. It decides which tools the model can call, in what order, with what constraints. It manages state across a multi-step task — remembering what has been done, what the current state is, what decisions have been made. It handles failures: what happens when a tool call returns an error, when an API is rate-limited, when a piece of expected data is absent. Without orchestration, a capable model is a capable model. With orchestration, it becomes a system.')),
      h2('Why this layer is invisible'),
      p(text('The orchestration layer is not glamorous. It does not show up in benchmark comparisons. It cannot be demonstrated in a five-minute product demo. Building it requires understanding the specific business context it will operate in, which means it cannot be productised in the way that a model or a prompt interface can. This is precisely why most AI products skip it, and precisely why most AI products produce marginal results.')),
      p(text('Atlas is, at its core, an orchestration framework. The model selection is a configuration choice that can be changed at any point. The OpenClaw layer that coordinates the model across business context, manages tool access, handles state, and defines escalation behaviour — that is the part that is specific to the business and that produces the results.')),
      blockquote('The model is the engine. Orchestration is the vehicle. Most vendors are selling engines without wheels.'),
      p(text('The practical question to ask any AI vendor is not "which model do you use?" It is "what happens when the model produces an output that requires a follow-up action, and that action fails, and the failure needs to be communicated to a specific person?" If the answer is unclear, the orchestration layer is absent or underdeveloped — and the agent will not survive contact with a real business workflow.')),
    ),
  },
  {
    title:       'Hosting your own AI: what it actually takes',
    slug:        'hosting-your-own-ai',
    category:    'Strategy',
    teaser:      'Self-hosting is not a technical decision. It is a data sovereignty decision.',
    publishedAt: '2026-02-12T09:00:00.000Z',
    body: lexical(
      p(text('The argument for self-hosting an AI agent is almost never about performance or cost. Managed hosting from a reputable provider will almost always be more reliable and less expensive than equivalent infrastructure managed in-house. The argument for self-hosting is about control: who can access the data the agent processes, under what legal jurisdiction, with what retention policies, and with what audit trail.')),
      p(text('These are not IT questions. They are governance questions. For businesses in regulated industries — legal, finance, healthcare — the answer to those questions may be mandated by compliance requirements. For businesses handling sensitive client data, the answer may be a board-level decision. For businesses in markets where data sovereignty legislation is evolving rapidly, the answer may need to be revisited annually. Self-hosting is the only option that allows those answers to be decided and enforced internally.')),
      h2('What you actually need'),
      p(text('Running an AI agent on your own infrastructure requires four things: a server with sufficient compute for the model you are running, a database for agent state and logs, an API gateway layer for external tool integrations, and a deployment process that is documented well enough for your team to maintain without the original implementer present. The last requirement is the one that most self-hosting projects underestimate.')),
      p(text('AtlasAscend self-hosted deployments are handed over via SSH with complete documentation covering the infrastructure architecture, the deployment process, the configuration file locations, and the monitoring setup. The goal is that your team — or any competent engineer you bring in — can operate and update the agent without AtlasAscend involvement. This is not how most managed AI vendors approach the relationship, which is the point.')),
      blockquote('A self-hosted agent you cannot maintain is not a self-hosted agent. It is a managed agent with extra steps.'),
      p(text('The right question before choosing a deployment model is not "can we self-host?" but "do we have the operational capability to maintain what we self-host?" If the answer is yes, self-hosting provides control that managed hosting cannot match. If the answer is no, managed hosting with strong contractual data protections is the more honest choice — and we will tell you that directly in the Discovery session.')),
    ),
  },
]

const cases = [
  {
    clientName:        'Nordic E-commerce Group',
    industry:          'E-commerce',
    headline:          'Order management fully automated',
    slug:              'nordic-ecommerce-group',
    resultMetric:      '18 hrs/week saved',
    tags:              [{ tag: 'automation' }],
    testimonialQuote:  'We were sceptical that an agent could handle the edge cases in our order flow. It handled them better than we did — and it flags the genuinely unusual ones for us to review.',
    testimonialAuthor: 'Head of Operations, Nordic E-commerce Group',
    body: lexical(
      p(text('Nordic E-commerce Group processes over 2,000 orders per week across three fulfilment partners. Before Atlas, a team of two was spending 18 hours every week on order triage, exception handling, and status communication — work that was entirely rule-based but too variable in its inputs for simple automation to handle.')),
      p(text('The Discovery session identified four core workflows: order routing by fulfilment partner, exception flagging for items out of stock, status email generation for delayed orders, and weekly reconciliation reporting. All four were mapped, designed, and integrated within the 7-day build window.')),
      h2('What the agent does'),
      p(text('Atlas monitors the order management system in real time, applies routing rules to new orders, flags exceptions with the relevant context already assembled, generates and dispatches status emails using the client\'s existing template system, and produces the weekly reconciliation report without human input.')),
      p(text('The two-person team that previously spent 18 hours on these tasks now spends approximately 45 minutes — reviewing the exceptions the agent has flagged and approving the weekly report before it goes to the finance team. The rest of their time has been reallocated to supplier relationship work that was previously deprioritised.')),
    ),
  },
  {
    clientName:        'Andersen Legal',
    industry:          'Legal',
    headline:          'Client intake handled end-to-end by Atlas',
    slug:              'andersen-legal',
    resultMetric:      '3× faster response time',
    tags:              [{ tag: 'integration' }],
    testimonialQuote:  'New clients now receive a substantive response within minutes of making contact. That used to take us two days. The agent handles the sequence; we handle the advice.',
    testimonialAuthor: 'Managing Partner, Andersen Legal',
    body: lexical(
      p(text('Andersen Legal handles a high volume of initial client enquiries across employment, commercial, and property law. Each new enquiry previously required a paralegal to read the submission, assign it to the relevant practice area, request any missing information, and send an acknowledgement — a sequence that took an average of 48 hours and was frequently longer during peak periods.')),
      p(text('The Atlas integration connected the firm\'s intake form, case management system, and email infrastructure. The agent reads new submissions, classifies them by practice area using the firm\'s own classification criteria, identifies missing information and sends structured requests for it, and generates an acknowledgement that includes a realistic timeline and the name of the fee earner who will handle the matter.')),
      h2('Integration with existing systems'),
      p(text('Andersen Legal\'s case management system uses a proprietary API that required custom integration work. This was completed during the Integration phase (Days 3–5) without disrupting any existing workflows. The agent operates as an additional user on the system, with read access to new submissions and write access to the intake fields it populates.')),
      p(text('Response time dropped from an average of 48 hours to under 20 minutes for standard enquiries. Complex enquiries that require a fee earner review are flagged immediately with a summary, reducing the time to first substantive response from 48 hours to under 4 hours.')),
    ),
  },
  {
    clientName:        'Velocity SaaS',
    industry:          'SaaS',
    headline:          'Churn signals caught before they escalate',
    slug:              'velocity-saas',
    resultMetric:      '22% churn reduction',
    tags:              [{ tag: 'intelligence' }],
    testimonialQuote:  'We knew we had a churn problem. We did not know we could see it coming two weeks in advance. Atlas changed that in the first month.',
    testimonialAuthor: 'CEO, Velocity SaaS',
    body: lexical(
      p(text('Velocity SaaS had a churn rate that was manageable but consistently higher than industry benchmarks for their product category. Their customer success team was reactive — addressing churn at the point of cancellation rather than at the point of risk. The data to identify at-risk accounts earlier was available in their product analytics and support systems, but nobody had time to analyse it systematically.')),
      p(text('The Atlas intelligence layer was configured to monitor a composite churn risk score built from four signals: login frequency decline, support ticket volume increase, feature adoption regression, and NPS score movement. The agent evaluates these signals daily across the entire customer base and surfaces accounts that cross a risk threshold — with the context needed for a customer success conversation already assembled.')),
      h2('From reactive to predictive'),
      p(text('In the first month of operation, the agent identified 34 accounts at risk that had not been flagged by the existing customer success process. Of those, 28 received a proactive outreach within 24 hours of the alert. 22 were retained through that outreach — a retention rate that directly contributed to the 22% reduction in monthly churn over the following quarter.')),
      p(text('The customer success team\'s workload did not increase. The agent handles the monitoring and the context assembly; the team handles the conversations. The shift was from spending time finding at-risk accounts to spending time with at-risk accounts.')),
    ),
  },
  {
    clientName:        'Meridian Operations',
    industry:          'Operations',
    headline:          'Weekly reporting from 4 hours to 4 minutes',
    slug:              'meridian-operations',
    resultMetric:      '98% time saved on reporting',
    tags:              [{ tag: 'automation' }],
    testimonialQuote:  'The report used to take half a Friday. Now it arrives in my inbox at 8am. Same quality, no human time.',
    testimonialAuthor: 'Operations Director, Meridian Operations',
    body: lexical(
      p(text('Meridian Operations produces a weekly performance report for its leadership team that covers operational KPIs across five business units. Before Atlas, the report was assembled manually by the Operations Director from five separate data sources — a process that consumed four hours every Friday morning and was prone to inconsistencies when data sources were updated mid-assembly.')),
      p(text('The Atlas automation pulls data from all five sources on a scheduled trigger every Friday at 7:30am, applies the formatting and calculation logic that was previously done manually, and dispatches the completed report to the leadership distribution list by 8:00am. The entire process takes approximately four minutes of compute time.')),
      h2('Data sources and integration'),
      p(text('The five data sources — a logistics platform, a financial reporting system, two proprietary operational databases, and a CRM — each required separate integration work during the build phase. Three had REST APIs; two required direct database queries via read-only credentials. The agent handles authentication, data retrieval, and error handling for all five independently, with a fallback notification to the Operations Director if any source is unavailable at the scheduled retrieval time.')),
      p(text('The report format is identical to the manually produced version. Leadership noticed no change in content or quality — only the absence of a status update from the Operations Director saying it would be thirty minutes late.')),
    ),
  },
  {
    clientName:        'Apex Finance',
    industry:          'Finance',
    headline:          'Invoice tracking and alerts — zero manual input',
    slug:              'apex-finance',
    resultMetric:      '0 missed invoices in 6 months',
    tags:              [{ tag: 'intelligence' }],
    testimonialQuote:  'We used to find out about overdue invoices when they were very overdue. Now we find out the day they become overdue. That is the entire difference.',
    testimonialAuthor: 'Finance Manager, Apex Finance',
    body: lexical(
      p(text('Apex Finance manages accounts receivable across a portfolio of client accounts, with invoice volumes that vary significantly month to month. The manual tracking process relied on a weekly reconciliation run that identified overdue invoices after the fact — by which point the average overdue period was already 12 days beyond the payment terms.')),
      p(text('The Atlas intelligence layer monitors the accounts receivable system in real time, tracking payment status against due dates for every open invoice. When an invoice reaches its due date without a corresponding payment, the agent generates a structured alert with the invoice details, the client contact, and the payment history — and routes it to the responsible account manager within the hour.')),
      h2('Alert design and escalation'),
      p(text('The alerting system has three escalation tiers: a Day 0 alert when an invoice becomes overdue, a Day 7 escalation to the senior account manager if no payment has been received, and a Day 14 escalation to the Finance Director with a recommended course of action. Each escalation includes the full communication history and any responses from the client, assembled automatically.')),
      p(text('In the six months since deployment, no invoice has reached Day 14 status without a resolution path in place. The average days-overdue at first contact dropped from 12 days to under 1 day. The Finance Manager estimates the cash flow improvement is worth more than the cost of the engagement on a monthly basis.')),
    ),
  },
  {
    clientName:        'Stackrise',
    industry:          'SaaS',
    headline:          'Multi-channel support agent live in 6 days',
    slug:              'stackrise',
    resultMetric:      '6-day deployment',
    tags:              [{ tag: 'integration' }],
    testimonialQuote:  'Six days. I kept waiting for something to go wrong. Nothing did. The agent was handling tickets on day seven.',
    testimonialAuthor: 'CTO, Stackrise',
    body: lexical(
      p(text('Stackrise is a developer tooling company with a support volume that spikes significantly around product releases. Their existing support process relied on a two-person team triaging and responding to tickets across three channels: email, an in-app widget, and a Slack community. Response times during peak periods regularly exceeded six hours, which was driving negative feedback in public channels.')),
      p(text('The brief was clear: a support agent that could handle first-line responses across all three channels within minutes of ticket creation, triage complex issues to the relevant engineer with context already assembled, and operate without reducing the quality of the responses their customers were used to.')),
      h2('Integration across three channels'),
      p(text('The three-channel integration was the primary technical complexity of the engagement. Email used a standard API integration with the existing helpdesk. The in-app widget required a webhook configuration and a custom response formatter. The Slack community integration used the Slack Events API with a scoped bot that monitored designated support channels without reading general conversation.')),
      p(text('All three integrations were complete by Day 5. The agent went live on Day 6 — one day ahead of the 7-day window — following a validation pass that included a simulated release-day ticket volume to confirm behaviour under load. The Stackrise CTO observed the validation session and approved deployment the same afternoon.')),
    ),
  },
]

const campaigns = [
  {
    title:          'E-commerce AI campaign',
    slug:           'ecommerce-ai',
    vertical:       'E-commerce',
    heroHeadline:   'Your e-commerce store. On autopilot.',
    heroSubheading: 'Custom AI agents that handle orders, customer queries, and reporting — live in 7 days.',
    painPoints: [
      {
        title:       'Manual order management',
        description: 'Your team spends hours each week on tasks an agent can handle in seconds. Every hour spent on order triage is an hour not spent on growth.',
      },
      {
        title:       'Slow customer response',
        description: 'Response times over 2 hours cost conversions. An agent responds instantly, every time — without requiring your team to be available around the clock.',
      },
      {
        title:       'Reporting takes half a day',
        description: 'Weekly performance reports should not require a human to assemble them. They should arrive in your inbox automatically, ready for the leadership meeting.',
      },
    ],
    ctaLabel:     'Book a free consultation',
    urgencyNote:  '2 onboarding slots available this month',
  },
  {
    title:          'Legal AI campaign',
    slug:           'legal-ai',
    vertical:       'Legal',
    heroHeadline:   'Your legal practice. Without the admin.',
    heroSubheading: 'AI agents that handle client intake, document triage, and follow-ups — so you focus on the work that matters.',
    painPoints: [
      {
        title:       'Client intake is manual',
        description: 'Every new client requires the same sequence of emails, forms, and follow-ups. Atlas handles the sequence end-to-end, with your firm\'s criteria and your firm\'s voice.',
      },
      {
        title:       'Documents pile up',
        description: 'Incoming documents need sorting, flagging, and routing. An agent does this before you open your inbox — so you start each day with context, not a backlog.',
      },
      {
        title:       'Follow-ups fall through',
        description: 'Missed follow-ups cost clients and cost matters. An agent tracks every open thread and escalates before deadlines — without you having to maintain the tracker.',
      },
    ],
    ctaLabel:    'Book a free consultation',
    urgencyNote: undefined,
  },
]

/* ─── Seed runner ─────────────────────────────────────────────────────────── */

async function slugExists(collection: string, slug: string): Promise<boolean> {
  const result = await payload.find({
    collection: collection as any,
    where:      { slug: { equals: slug } },
    limit:      1,
    depth:      0,
  })
  return result.totalDocs > 0
}

async function seedArticles() {
  console.log('\n📄 Seeding articles...')
  for (const article of articles) {
    if (await slugExists('articles', article.slug)) {
      console.log(`  ↳ skip  "${article.title}" (slug exists)`)
      continue
    }
    await payload.create({
      collection:    'articles',
      data: {
        title:       article.title,
        slug:        article.slug,
        status:      'published',
        publishedAt: article.publishedAt,
        category:    article.category,
        teaser:      article.teaser,
        body:        article.body,
      },
    })
    console.log(`  ✓ created "${article.title}"`)
  }
}

async function seedCases() {
  console.log('\n📁 Seeding cases...')
  for (const c of cases) {
    if (await slugExists('cases', c.slug)) {
      console.log(`  ↳ skip  "${c.clientName}" (slug exists)`)
      continue
    }
    await payload.create({
      collection: 'cases',
      data: {
        clientName:        c.clientName,
        industry:          c.industry,
        headline:          c.headline,
        slug:              c.slug,
        status:            'published',
        resultMetric:      c.resultMetric,
        tags:              c.tags,
        body:              c.body,
        testimonialQuote:  c.testimonialQuote,
        testimonialAuthor: c.testimonialAuthor,
      },
    })
    console.log(`  ✓ created "${c.clientName}"`)
  }
}

async function seedCampaigns() {
  console.log('\n📣 Seeding campaigns...')
  for (const campaign of campaigns) {
    if (await slugExists('campaigns', campaign.slug)) {
      console.log(`  ↳ skip  "${campaign.title}" (slug exists)`)
      continue
    }
    await payload.create({
      collection: 'campaigns',
      data: {
        title:          campaign.title,
        slug:           campaign.slug,
        status:         'published',
        vertical:       campaign.vertical,
        heroHeadline:   campaign.heroHeadline,
        heroSubheading: campaign.heroSubheading,
        painPoints:     campaign.painPoints,
        ctaLabel:       campaign.ctaLabel,
        urgencyNote:    campaign.urgencyNote,
      },
    })
    console.log(`  ✓ created "${campaign.title}"`)
  }
}

async function main() {
  if (!process.env.DATABASE_URI) {
    console.error('✗ DATABASE_URI is not set. Add it to .env.local and try again.')
    process.exit(1)
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error('✗ PAYLOAD_SECRET is not set. Add it to .env.local and try again.')
    process.exit(1)
  }

  console.log('Initialising Payload...')
  await payload.init({
    secret: process.env.PAYLOAD_SECRET as string,
    config,
    local:  true,
  })

  await seedArticles()
  await seedCases()
  await seedCampaigns()

  console.log('\n✓ Seed complete.\n')
  process.exit(0)
}

main().catch(err => {
  console.error('\n✗ Seed failed:', err)
  process.exit(1)
})
