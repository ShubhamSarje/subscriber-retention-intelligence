-- ============================================================
-- 02 | Churn rate by prior cancellation history
-- Question: does a past cancellation predict future churn?
-- Finding: 59.5% churn among members who cancelled before,
--          vs 7.3% for those who never have -- an 8x difference.
-- ============================================================

SELECT
    any_cancel_flag,
    COUNT(*)    AS members,
    SUM(is_churn) AS churned,
    ROUND(AVG(is_churn) * 100, 1) AS churn_rate_pct
FROM members
GROUP BY any_cancel_flag
ORDER BY churn_rate_pct DESC;
