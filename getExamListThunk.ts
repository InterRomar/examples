export const getExamList =
  (patientId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const examRepository = ExamRepository.getInstance();
      const {
        patient: {
          limit,
          offset,
          sortConfig,
          jointFilterParams,
          typeFilterParams,
        },
      } = getState();

      const filterParamsQueryObject = convertFilterParamsToQueryObject([
        ...jointFilterParams,
        ...typeFilterParams,
      ]);
      const apiParams: CommonApiParams = {
        ...sortConfig,
        ...filterParamsQueryObject,
        limit,
        offset,
      };

      const response = await examRepository.getExams(patientId, apiParams);
      dispatch(setExamList(response.items));
      dispatch(setTotalExams(response.totalCount));

      // need to reset because of sorting flow
      dispatch(setLimit(PATIENTS_LIMIT));
    } catch (error) {
      console.log(error, 'ERROR FROM: getExamList Thunk');
    }
  };
