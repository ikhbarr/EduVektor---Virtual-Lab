
import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useAuth } from '../context/AuthContext';
import { getUserDocument, updateUserCompletedTours } from '../services/firestoreService';

const WelcomeTour = ({ tourKey, steps }) => {
  const [run, setRun] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkTourStatus = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      if (currentUser) {
        const userData = await getUserDocument(currentUser.uid);
        const hasSeen = userData?.completedTours?.includes(tourKey);
        if (!hasSeen) {
          setRun(true);
        }
      } else {
        const hasSeenTour = localStorage.getItem(tourKey);
        if (!hasSeenTour) {
          setRun(true);
        }
      }
    };

    checkTourStatus();

  }, [tourKey, currentUser]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      if (currentUser) {
        updateUserCompletedTours(currentUser.uid, tourKey);
      } else {
        localStorage.setItem(tourKey, 'true');
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#007bff', 
        },
      }}
      locale={{
        back: 'Kembali',
        close: 'Tutup',
        last: 'Selesai',
        next: 'Lanjut',
        skip: 'Lewati',
      }}
    />
  );
};

export default WelcomeTour;

