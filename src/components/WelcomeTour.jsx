// src/components/WelcomeTour.jsx
import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const WelcomeTour = ({ tourKey, steps }) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Periksa apakah tur untuk halaman ini sudah pernah dilihat
    const hasSeenTour = localStorage.getItem(tourKey);
    if (!hasSeenTour) {
      
      setTimeout(() => {
        setRun(true);
      }, 500);
    }
  }, [tourKey]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      // Saat tur selesai atau dilewati, hentikan tur dan simpan statusnya
      setRun(false);
      localStorage.setItem(tourKey, 'true');
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
