export const PatientRegionDetails = () => {
  const patientRegionDetails = useAppSelector(selectPatientRegionDetails);
  const loading = useAppSelector((state) =>
    selectRequests([Requests.getPatientRegionDetails], state)
  );

  return (
    <div>
      {loading ? (
        <div className="flex flex-col mt-5 space-y-5">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
      ) : (
        <>
          {patientRegionDetails?.map((patientRegionDetails) => {
            return (
              <div
                key={patientRegionDetails.region._id}
                className="flex card w-full p-8 rounded-[20px] mt-5"
              >
                <RegionBlock
                  title={patientRegionDetails.region.joint.name}
                  subtitle={patientRegionDetails.region.joint.side}
                  week={patientRegionDetails.week}
                  videoExamsQuantity={patientRegionDetails.examsCount}
                  lastExam={patientRegionDetails.lastExam || ""}
                  score={patientRegionDetails.outcomeScore}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
