def johnsons_rule(jobs):
    """
    jobs: list of (t1, t2) for each job.
    Returns an optimal job sequence (list of indices 0..n-1).
    """
    n = len(jobs)
    # Split jobs into two sets
    set1 = []  # jobs with t1 <= t2
    set2 = []  # jobs with t1 > t2
    for idx, (t1, t2) in enumerate(jobs):
        if t1 <= t2:
            set1.append((t1, idx))
        else:
            set2.append((t2, idx))
    # Sort set1 by increasing t1
    set1.sort(key=lambda x: x[0])
    # Sort set2 by decreasing t2
    set2.sort(key=lambda x: x[0], reverse=True)
    # Create final sequence: jobs from set1 followed by jobs from set2
    sequence = [idx for _, idx in set1] + [idx for _, idx in set2]
    return sequence

# Example jobs (processing times on Machine1 and Machine2)
jobs = [(1, 5), (6, 3), (4, 8), (3, 6), (5, 2)]
seq = johnsons_rule(jobs)
print("Optimal sequence of job indices:", seq)
# Let's calculate the makespan of this sequence:
time_M1 = 0
time_M2 = 0
for job_idx in seq:
    t1, t2 = jobs[job_idx]
    # Machine 1 starts job as soon as previous job finished on M1
    start_M1 = time_M1
    finish_M1 = start_M1 + t1
    time_M1 = finish_M1
    # Machine 2 can only start after job is done on M1 and previous job finished on M2
    start_M2 = max(finish_M1, time_M2)
    finish_M2 = start_M2 + t2
    time_M2 = finish_M2
    print(f"Job{job_idx} -> Start on M1: {start_M1}, Finish M1: {finish_M1}; Start M2: {start_M2}, Finish M2: {finish_M2}")
print("Total makespan:", time_M2)
