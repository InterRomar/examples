class MendService {
  login = async (): Promise<string> => {
    try {
      const email = process.env.MEND_EMAIL;
      const password = process.env.MEND_PASSWORD;

      const res = await mendApi.login(email, password);

      const result = await mendApi.setOrganization(res.payload.orgs[0].id, res.token);
      
      return result.token;
    } catch (error) {
      console.error('MendService: login method error: ', error);
    }
  };

  updateAppointment = async (
    patientAppointmentId,
    payload: UpdateAppointmentPayload,
  ): Promise<any> => {
    try {
      const authToken = await this.login();

      const {
        startDate,
        endDate,
        symptoms,
      } = payload;

      const patientAppointment = await db.patientAppointment.getById(patientAppointmentId);
      const appointment = (await mendApi.getAppointment(authToken, patientAppointment.mendId))
        .payload
        ?.appointment;

      const updatingObject = {
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        symptoms: appointment.symptoms.map((item: any) => ({ content: item.content })),
      };

      if (symptoms) {
        updatingObject.symptoms = symptoms;
      }
      if (startDate) {
        updatingObject.startDate = dayjs.utc(startDate).toDate();
      }
      if (endDate) {
        updatingObject.endDate = dayjs.utc(endDate).toDate();
      }

      await mendApi.deleteAppointment(authToken, patientAppointment.mendId);

      const res = await mendApi.createAppointment(
        authToken,
        {
          providerId: appointment.providerId,
          appointmentTypeId: appointment.appointmentTypeId,
          primaryPatientId: appointment.primaryPatient.id,
          approved: 1, // TODO: maybe will be changed
          notify: 1, // TODO: maybe will be changed (required)

          startDate: updatingObject.startDate,
          endDate: updatingObject.endDate,
          symptoms: updatingObject.symptoms,
        },
      );

      if (!res?.payload?.appointment) {
        throw new Error('Appointment was not updated');
      }

      await db.patientAppointment.update(patientAppointmentId, {
        mendId: res.payload.appointment.id,
      });

      return res.payload.appointment;
    } catch (error) {
      console.error('MendService: updateAppointment method error: ', error);
      throw new Error(error);
    }
  }; 
}
