-- ============================================================
-- 03 | Churn rate by registration channel
-- Question: do some acquisition channels bring in higher-risk members?
-- Finding: Channel 4 churns at 22.9% vs Channel 7's 4.3%
--          (the largest channel by volume) -- a 5x+ spread,
--          pointing to an acquisition-quality issue.
-- ============================================================

SELECT
    registered_via,
    COUNT(*)    AS members,
    SUM(is_churn) AS churned,
    ROUND(AVG(is_churn) * 100, 1) AS churn_rate_pct
FROM members
WHERE registered_via IS NOT NULL
GROUP BY registered_via
ORDER BY churn_rate_pct DESC;
