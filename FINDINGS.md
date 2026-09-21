# Findings — Customer Churn & Retention Analysis

**Dataset:** KKBox Churn Prediction (WSDM Cup) — real, anonymized subscriber data from KKBox, a subscription music streaming service. Sampled to 30,000 members (stratified, preserving the real 8.99% churn rate).

**Note on scope:** KKBox is based in Asia; the retention mechanics analyzed here are universal to any subscription business — the same dynamics apply to Spotify, Netflix, or a Canadian telecom's streaming add-on.

---

## Headline

- **$646,818** already lost to churn in this period.
- A further **$75,964** in revenue sits on **488 members** the model flags as high-risk who haven't left yet — a concrete, prioritized retention target list, not a postmortem.
- The model correctly separates churners from stayers: average predicted churn probability is **51.5%** for members who actually churned vs. **4.8%** for those who stayed — a 10x separation.

## What actually drives churn

- **Auto-renew is the single strongest predictor.** Members without auto-renew churn at **45.6%**; members with it churn at just **3.7%** — a 12x difference.
- **Prior cancellation history is nearly as strong.** Members who have cancelled before churn at **59.5%**; those who never have churn at **7.3%** — an 8x difference.
- **Engagement volume does not predict churn.** Average daily listening time and skip ratio are nearly identical between churners and stayers. But **engagement consistency does** — "active days" (how often a member shows up, not how much they listen once there) ranks as the model's 3rd most important feature. The finding is precise: it's not *how much* someone listens, it's *whether they keep coming back at all*.
- **Tenure does not predict churn.** Churn rate stays flat (8.2%–10.1%) across all tenure cohorts, from under a year to six-plus years. Retention strategy should be behavior-based (auto-renew, cancel history), not tenure-based.
- **Demographic completeness is a counterintuitive signal.** Members who filled out their profile (age, gender) churn at roughly double the rate of those who didn't (13.1% vs 6.4%). This is flagged as a genuine, unexplained finding — not claimed as causal.

## Where the risk concentrates

- **488 members (1.7% of the base) sit in the High or Very High Risk tiers**, representing $75,964 in exposed revenue.
- Risk is not evenly distributed by acquisition channel. Registration Channel 4 churns at **22.9%** — more than 5x Channel 7's **4.3%**, which is also the largest channel by volume. This points to an acquisition-quality issue, not a random pattern.
- This pattern held up under interactive testing in the dashboard: filtering to Channel 7 shows a dashboard dominated by low-risk, green outcomes with zero Very High Risk members; filtering to Channel 4 shows a materially worse mix across every KPI.

## The model

- Logistic regression, 15 engineered features, evaluated on a held-out 20% test set.
- On the class that matters (Churned): **75% precision, 58% recall.**
- Deliberately not optimized for raw accuracy: a model predicting "nobody churns" would score ~94% accuracy on this data while catching zero at-risk members. Precision and recall on the churned class are the metrics that matter for a retention use case — missing a churner costs a customer; a false alarm costs a phone call.
- Feature importance from the model independently confirmed the findings above: auto-renew and cancel history dominate, active-days ranks third, raw listening volume is near-zero.

## Recoverable value

- **CLV estimate:** an average member has generated roughly **$6,410–$6,869** in revenue over their relationship with the company so far (two methods used — see Method note below on the small discrepancy between them).
- Prioritizing outreach to the 488 high-risk members, starting with the highest-value/highest-risk segment, is the single most concrete, dollar-quantified action this analysis supports.

## Data quality and cleaning

Real subscriber data arrives with real gaps, and how those gaps are handled shapes every downstream number.

- **~11.6% of sampled members had no matching billing record**, and a further share had no engagement-log activity in the snapshot window. Rather than dropping these rows, they were kept and their absence documented as a real finding, not hidden.
- **Over half of members had missing or invalid demographic data** (age recorded as 0, or gender left blank). Investigation showed this wasn't random: ~93% of missing cases were missing *both* age and gender together, consistent with members who simply skipped profile setup rather than a data-entry error. This became a deliberate engineered feature (`has_demo_info`) rather than something silently imputed away — and it turned out to be predictive (see above).
- **A small anomaly in billing data** (32 members showing a slightly negative "discount," i.e. paying marginally more than list price on average) was investigated rather than dismissed: all 32 were high-frequency transactors (13–45 billing events), so the pattern is a natural averaging effect across many cycles with minor price variation, not a data error.

## Query reference

| # | Query | What it answers |
|---|---|---|
| 1 | Churn by auto-renew status | Does auto-renew reduce churn, and by how much? |
| 2 | Churn by prior cancellation | Does a cancellation history predict future churn? |
| 3 | Churn by registration channel | Do some acquisition channels bring in higher-risk members? |
| 4 | Churn by tenure cohort | Does how long someone has been a member predict churn? |
| 5 | Revenue at risk by risk tier | How much revenue sits on members flagged as high-risk who haven't churned? |
| 6 | Customer lifetime value | What has an average member generated in revenue so far? |

## Method note — two CLV calculations, two honest numbers

The SQL-derived CLV ($6,410) and the DAX-derived CLV ($6,869) differ by about 7%. This is not an error — they're two different, both-valid calculation approaches:

- **SQL version:** averaged spend and averaged tenure separately, then multiplied the two averages together.
- **DAX version (`AVERAGEX`):** computed spend × tenure for each individual member first, then averaged those per-member results.

The row-level (DAX) approach is more statistically correct when the two underlying variables are correlated, which they likely are here. Reported both for transparency.

## Exceptions and limitations

- **Scope:** analysis uses a stratified 30,000-member sample of the full ~1M-member dataset, and a "recent slice" (`_v2` files) of transactions and engagement logs rather than full historical data. Some sampled members lack a matching transaction or engagement record — a real gap in the source data, not an artifact of sampling, and it's disclosed rather than hidden.
- **CLV is retrospective, not forward-looking.** It measures value generated so far, not a discounted projection of future value. A production CLV model would incorporate future retention probability and a discount rate.
- **The demographic-completeness finding is reported, not explained.** Why profile completion correlates with higher churn is a genuine open question this analysis surfaces but does not answer.
- **Revenue-at-risk figures should be read as directional prioritization, not a precise guarantee** — average revenue is mildly higher in the flagged risk tiers than in the low-risk tier, likely because pricing-related fields were also model inputs.
- **Some channels don't span all tenure cohorts.** When the dashboard is filtered to a single, smaller registration channel, the tenure-cohort chart may show only 2–3 of the 4 tenure bands (rather than being an error, this correctly reflects that not every channel has members across every tenure range).

## Deliverables

- **Python/Colab:** data acquisition, cleaning, feature engineering, and the classification model.
- **SQL/Supabase:** structured analysis — segment churn rates, cohort retention, revenue-at-risk, CLV.
- **Power BI:** an interactive dashboard ("Subscriber Retention Intelligence") — 11 visuals, one live slicer, fully dynamic across every panel, including a hero bubble chart mapping risk tiers by revenue exposure and member count.
