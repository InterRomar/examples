
export const updateOneHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    await connectToDatabase();

    const payload = JSON.parse(event.body);
    const patientAppointmentId = +event.pathParameters.patientAppointmentId;
    const mendService = new MendService();

    const item = await mendService.updateAppointment(patientAppointmentId, payload);

    const response = {
      statusCode: HTTP_STATUS_CODES.OK,
      body: JSON.stringify(item),
    };

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
