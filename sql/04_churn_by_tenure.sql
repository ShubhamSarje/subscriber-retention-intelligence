-- ============================================================
-- 04 | Churn rate by tenure cohort
-- Question: does how long someone has been a member predict churn?
-- Finding: churn stays flat (8.2%-10.1%) across every tenure band --
--          no new-member cliff, no long-term fatigue. Tenure does
--          NOT predict churn; retention strategy should be
--          behavior-based, not tenure-based.
-- ============================================================

SELECT
    CASE
        WHEN tenure_days < 365  THEN 'A. Under 1 year'
        WHEN tenure_days < 1095 THEN 'B. 1-3 years'
        WHEN tenure_days < 2190 THEN 'C. 3-6 years'
        ELSE 'D. 6+ years'
    END AS tenure_cohort,
    COUNT(*)    AS members,
    SUM(is_churn) AS churned,
    ROUND(AVG(is_churn) * 100, 1) AS churn_rate_pct
FROM members
WHERE tenure_days IS NOT NULL
GROUP BY 1
ORDER BY 1;
