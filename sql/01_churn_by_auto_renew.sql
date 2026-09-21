-- ============================================================
-- 01 | Churn rate by auto-renew status
-- Question: does enabling auto-renew reduce churn, and by how much?
-- Finding: 45.6% churn with auto-renew OFF vs 3.7% with it ON
--          -- a 12x difference, the single strongest predictor found.
-- ============================================================

SELECT
    is_auto_renew_flag,
    COUNT(*)    AS members,
    SUM(is_churn) AS churned,
    ROUND(AVG(is_churn) * 100, 1) AS churn_rate_pct
FROM members
GROUP BY is_auto_renew_flag
ORDER BY churn_rate_pct DESC;
