import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Step } from 'react-joyride';

export function useTour() {
  const { t } = useTranslation();
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: '.navbar-logo',
      content: t('tour.welcome'),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.navbar-navigation',
      content: t('tour.navigation'),
      placement: 'bottom',
    },
    {
      target: '.theme-controls',
      content: t('tour.themeControls'),
      placement: 'bottom',
    },
    {
      target: '.language-selector',
      content: t('tour.language'),
      placement: 'bottom',
    },
    {
      target: '.filters-section',
      content: t('tour.filters'),
      placement: 'bottom',
    },
    {
      target: '.share-button',
      content: t('tour.share'),
      placement: 'bottom',
    },
  ];

  const startTour = useCallback(() => {
    setIsTourOpen(true);
    setStepIndex(0);
  }, []);

  const endTour = useCallback(() => {
    setIsTourOpen(false);
    setStepIndex(0);
  }, []);

  return {
    isTourOpen,
    stepIndex,
    setStepIndex,
    startTour,
    endTour,
    steps,
  };
}