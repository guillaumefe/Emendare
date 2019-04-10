import { IAmend } from '../../../../../interfaces'

/**
 * Return the right icon depending on the result of the vote
 * @param amend current amend
 */
export const getIconFromResult = (amend: IAmend) =>
  amend.conflicted ? 'fa-times' : amend.accepted ? 'fa-check' : 'fa-times'
/**
 * Return the right text color depending on the result of the vote
 * @param amend current Amend
 */
export const getColorTextFromResult = (amend: IAmend) =>
  amend.conflicted
    ? 'has-text-dark'
    : amend.accepted
    ? 'has-text-success'
    : 'has-text-danger'

/**
 * Return the right color depending on the result of the vote
 * @param amend current amend
 */
export const getColorFromResult = (amend: IAmend) =>
  amend.conflicted
    ? 'hsl(0, 0%, 21%)'
    : amend.accepted
    ? 'hsl(141, 71%, 48%)'
    : 'hsl(348, 100%, 61%)'

/**
 * Return the right text depending on the result of the vote
 * @param amend current amend
 */
export const getTextFromResult = (amend: IAmend) =>
  amend.conflicted
    ? "refusé à cause d'un conflit technique"
    : amend.accepted
    ? 'accepté par les participants'
    : 'refusé par les participants'

/**
 * Check if the current vote type is the hightest of all the votes type
 * @param vote result of a type of vote
 * @param results results of all votes
 */
export const isMaxVote = (vote: string, results: any, conflicted: boolean) => {
  if (conflicted) {
    return false
  }
  const votes: number[] = Object.keys(results)
    .map((key: string) => results[key])
    .sort()
  return votes.indexOf(results[vote]) === votes.length - 2
}
