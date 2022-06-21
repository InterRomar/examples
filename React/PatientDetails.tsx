const PatientDetails = () => {
  const dispatch = useAppDispatch();
  const match = useRouteMatch<{ id: string }>();

  useEffect(() => {
    dispatch(initPatientDetailsPage(match.params.id));
  }, [match.params.id]);
  return (
    <div className="container max-w-[1024px] m-auto px-8 pt-[30px]">
      <PatientInfoContainer />
      <PatientRegionDetails />

      <div className="w-full card mt-5 rounded-[20px] px-4 pb-7 pt-4">
        <h2 className="text-xl ml-4">Video Exams</h2>
        <VideoExamTable />
      </div>
    </div>
  );
};

