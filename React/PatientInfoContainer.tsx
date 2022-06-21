
export const PatientInfoContainer = () => {
  const patient = useAppSelector(selectCurrentPatient);
  const loading = useAppSelector((state) =>
    selectRequests([Requests.getPatient], state)
  );

  return (
    <div>
      {loading ? (
        <Skeleton height={180} />
      ) : (
        <PatientInfo
          firstName={patient?.profileInfo?.firstName}
          lastName={patient?.profileInfo?.lastName}
          uniqueId={patient?.profileInfo?.mrn}
          patientImage={patient?.profileInfo?.phoneNumber}
          dateOfBirth={patient?.profileInfo?.dateOfBirth}
          email={patient?.profileInfo?.email}
          gender={patient?.profileInfo?.gender}
          phone={patient?.profileInfo?.phoneNumber}
        />
      )}
    </div>
  );
};