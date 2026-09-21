-- ============================================================
-- 06 | Customer lifetime value (retrospective estimate)
-- Question: what has an average member generated in revenue so far?
-- Finding: ~$6,400 average CLV (billing-cycle spend x estimated
--          number of cycles paid). A retrospective measure, not a
--          forward-looking discounted projection -- see FINDINGS.md.
-- ============================================================

SELECT
    ROUND(AVG(avg_amount_paid), 2) AS avg_revenue_per_cycle,
    ROUND(AVG(tenure_days) / 30.0, 1) AS avg_cycles_paid,
    ROUND(AVG(avg_amount_paid) * (AVG(tenure_days) / 30.0), 2) AS estimated_clv
FROM members
WHERE avg_amount_paid IS NOT NULL
  AND tenure_days IS NOT NULL;
