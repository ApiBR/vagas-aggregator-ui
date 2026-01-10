import React from 'react';
import Joyride, { CallBackProps, STATUS, ACTIONS } from 'react-joyride';
import { useTranslation } from 'react-i18next';
import { useTour } from '../hooks/useTour';

export function Tour() {
  const { t } = useTranslation();
  const { isTourOpen, endTour, steps, stepIndex, setStepIndex } = useTour();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, type, index } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      endTour();
    } else if (action === ACTIONS.CLOSE) {
      endTour();
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={isTourOpen}
      stepIndex={stepIndex}
      scrollToFirstStep
      showProgress
      showSkipButton
      disableCloseOnEsc={false}
      disableOverlayClose={false}
      steps={steps}
      styles={{
        options: {
          primaryColor: '#2a9fd6',
          textColor: '#4a4a4a',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: '8px',
          fontSize: '14px',
        },
        buttonNext: {
          backgroundColor: '#2a9fd6',
          borderRadius: '4px',
          color: '#ffffff',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#4a4a4a',
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#4a4a4a',
        },
        buttonClose: {
          color: '#4a4a4a',
          top: 8,
          right: 8,
        },
        spotlight: {
          backgroundColor: 'transparent',
        },
      }}
      floaterProps={{
        disableAnimation: true,
      }}
      locale={{
        back: t('tour.back'),
        close: t('tour.close'),
        last: t('tour.finish'),
        next: t('tour.next'),
        skip: t('tour.skip'),
      }}
    />
  );
}