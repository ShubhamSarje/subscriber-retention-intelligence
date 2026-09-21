-- ============================================================
-- 05 | Revenue at risk by predicted-risk tier
-- Question: how much revenue sits on members flagged as high-risk
--           who haven't churned yet?
-- Finding: 488 members (High + Very High risk tiers) represent
--          $75,964 in exposed revenue -- a concrete, prioritized
--          retention target list.
-- ============================================================

SELECT
    CASE
        WHEN churn_probability >= 0.7 THEN 'A. Very High Risk (70%+)'
        WHEN churn_probability >= 0.5 THEN 'B. High Risk (50-70%)'
        WHEN churn_probability >= 0.3 THEN 'C. Moderate Risk (30-50%)'
        ELSE 'D. Low Risk (<30%)'
    END AS risk_tier,
    COUNT(*)    AS members,
    SUM(avg_amount_paid) AS total_revenue,
    ROUND(AVG(churn_probability) * 100, 1) AS avg_risk_pct
FROM members
WHERE is_churn = 0
  AND avg_amount_paid IS NOT NULL
GROUP BY 1
ORDER BY 1;
