import React, { useContext } from 'react'

// Components
import {
  Icon,
  Collapse,
  Button,
  StopWatch,
  CountDown,
  DiffPreview,
  DataContext,
  CardLayout,
  ResultFooterCard,
  Divider
} from '../../../components'

// Interfaces
import { IUser, IResponse, IText, IAmend } from '../../../../../interfaces'

// Services
import { Time } from '../../../services'

interface IAmendEventCardProps {
  /** Related event */
  target: IAmend
  /** user data */
  user: IUser | null
  measure?: any
  /** Index of the card */
  index?: number
}

const isTooLongPatch = (patch: string | null) =>
  patch !== null && patch.length > 1500

export const AmendEventCard = ({
  target,
  user,
  measure
}: IAmendEventCardProps) => {
  const { get } = useContext(DataContext)
  const text: IResponse<IText> = get('text')(target.text)

  React.useEffect(() => {
    if (measure && target && isTooLongPatch(target.patch)) {
      measure()
    }
  }, [measure, target, user])

  return (
    <CardLayout>
      <CardLayout.Icon>
        <Icon
          type={'light'}
          name="fa-box-ballot"
          className="fa-2x has-text-primary is-large"
        />
      </CardLayout.Icon>
      <CardLayout.Description>
        <div>
          <p style={{ margin: 0 }}>
            <strong>Vote en cours</strong>
            {' - '}
            <small style={{ wordSpacing: 'normal' }}>
              <StopWatch date={target.created} />
            </small>
          </p>
          <div style={{ marginTop: '0.5em' }}>
            {target.closed ? (
              <span className="has-text-weight-light is-italic">
                Amendement terminé.
              </span>
            ) : (
              <React.Fragment>
                <span className="has-text-weight-light">
                  Temps restant pour voter :{' '}
                </span>
                <CountDown
                  date={Time.addTimeToDate(
                    target.created,
                    target.rules.delayMax
                  )}
                  className="has-text-weight-semibold"
                />
              </React.Fragment>
            )}
          </div>
          <p style={{ marginTop: '0.5em' }}>
            <span className="has-text-weight-semibold">
              Titre : {target.name}
            </span>
            <br />
            Description : {target.description}
          </p>
        </div>
      </CardLayout.Description>
      {text && text.data && target && (
        <CardLayout.Detail>
          <Collapse isOpen={!isTooLongPatch(target.patch)}>
            <Collapse.Trigger style={{ marginLeft: '60px' }} onClick={measure}>
              {(on: boolean) =>
                on ? (
                  <Button
                    style={{
                      background: 'none',
                      margin: '0.5rem 0 0.5rem 0',
                      padding: 0
                    }}
                    className="no-focus-outlined is-text"
                  >
                    Réduire les modifications proposées
                  </Button>
                ) : (
                  <Button
                    style={{
                      background: 'none',
                      margin: '0.5rem 0 0.5rem 0',
                      padding: 0
                    }}
                    className="no-focus-outlined has-text-info is-text"
                  >
                    Afficher les modifications proposées
                  </Button>
                )
              }
            </Collapse.Trigger>
            <Collapse.Detail style={{ marginTop: '0.5rem', padding: '1rem' }}>
              <Divider content="Modifications proposées" />
              <DiffPreview amend={target} text={text.data} measure={measure} />
            </Collapse.Detail>
          </Collapse>
        </CardLayout.Detail>
      )}
      <CardLayout.Footer>
        <div className="card-event__footer">
          <ResultFooterCard target={target} user={user} />
        </div>
      </CardLayout.Footer>
    </CardLayout>
  )
}
