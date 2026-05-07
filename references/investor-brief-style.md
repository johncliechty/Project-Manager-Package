# Investor brief style

The rubric for `briefs/investor-brief-current.md`. Audience: a smart investor who is **not technical**. They invest in lots of things; they don't know your stack; they will skim before they read.

## What good looks like

A good brief:

1. Tells the reader what the project does, in language a non-engineer can repeat to a friend.
2. Tells the reader what changed *this week*, in concrete terms.
3. Tells the reader honestly what's not working yet.
4. Surfaces the questions a thoughtful skeptic would ask, with the team's current best answer.

A bad brief:

1. Leads with the technology stack.
2. Uses jargon without defining it.
3. Lists everything done since project start (the reader doesn't have time).
4. Hides the things that aren't working.
5. Sells.

## Voice

- Plain English. If you can't say it without a technical term, find a metaphor.
- First-person plural ("we"), even if the team is one person. It's how investors talk.
- Past tense for what's done, present tense for what's underway, future tense for what's planned.
- Confident but honest. "We don't know yet" is an acceptable sentence. "We're confident this will work" without evidence is not.

## Structure (this is the template)

The template is in `templates/INVESTOR-BRIEF.md`. The sections are:

1. **One sentence pitch.** ≤25 words.
2. **What it does (plain language).** 2–4 sentences. Lead with the user-visible thing.
3. **Why now.** Two sentences. What changed in the world that makes this project newly possible or newly necessary.
4. **What's working today.** Bullets of capabilities a user could actually exercise.
5. **What we shipped this week.** Past tense, concrete. Pulled from `logs/sessions/` over the last 7 days.
6. **What we're working on this week.** Present tense, concrete. Mark at-risk items.
7. **Key decisions made recently.** From `logs/decisions/` over the last 14 days. Three max.
8. **Open questions.** What a thoughtful skeptic would ask, with our current best answer. **Be honest.** Investors who care can tell when this section is dressed up.
9. **What would make this fail.** Two or three specific failure modes, with what we'd do.
10. **Team and capacity.** Who is on it, at what hours-per-week. Solo? Say solo.
11. **Budget and burn.** Monthly run-rate. If small, say so. If you don't know, say so — that's a real signal.
12. **What we'd want from a collaborator/investor.** Specific. "Someone who has shipped a Postgres-backed agent runtime" beats "help".

## Anti-patterns to avoid

- **Vapor metrics.** "10x improvement" with no baseline. "Significant" with no number.
- **Stack name-dropping.** Listing seven libraries doesn't make the project sound impressive; it makes the writer sound junior.
- **Hedging without resolution.** "We may or may not pursue this depending on factors." Either pursue or don't.
- **Present-tense for things that don't exist.** "Our system handles X" when the X-handling code hasn't been written.
- **Burying the lead.** If the headline news is "we shipped a working prototype", that's the first sentence. Not the eighth.

## The smell test

Before posting, read the brief and ask:

1. If a friend who isn't technical read this, would they correctly summarize the project to someone else?
2. Did I avoid the temptation to make things sound more polished than they are?
3. Did I tell the reader something they couldn't get by skimming the README?

If any of those is "no", revise.
