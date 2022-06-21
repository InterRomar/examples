type Props = {
  firstName: string;
  lastName: string;
  uniqueId: string;
  patientImage: string;
  dateOfBirth: string;
  email?: string;
  gender?: string;
  phone?: string;
};

export const PatientInfo = memo(
  ({
    firstName,
    lastName,
    uniqueId,
    patientImage,
    dateOfBirth,
    email,
    gender,
    phone,
  }: Props) => {
    return (
      <div className="w-full flex card rounded-[20px] pt-7 justify-between pb-7 px-8 md:flex-col md:space-y-8">
        <div className="flex space-x-7 sm:flex-col sm:space-x-0 sm:space-y-4">
          <div className="w-[100px] h-[100px] rounded-full bg-grayDark overflow-hidden shrink-0">
            <img src={patientImage} alt="avatar" />
          </div>
          <div className="flex flex-col items-start min-h-[125px]">
            <h4 className="text-grayDark">Patient Details</h4>
            <p className="text-[38px] font-black">
              {firstName} {lastName}
            </p>
            <Button
              title="Push to EHR"
              onClick={() => {}}
              classNames="mt-5"
              type={ButtonType.outline}
            />
          </div>
        </div>

        <div className="flex md:min-h-[100px] sm:flex-col ">
          <div className="flex flex-col justify-between pr-10 border-r border-r-border sm:border-none">
            <p>
              <strong>DOB: </strong>
              {formatTimeFromUtc(dateOfBirth)}
            </p>
            <p>
              <strong>Age: </strong>
              {getYearsFromUtc(dateOfBirth)}
            </p>
            <p>
              <strong>Gender: </strong> {gender}
            </p>
          </div>

          <div className="flex flex-col justify-between pl-10 sm:pl-0">
            <p>
              <strong>Patient ID: </strong>
              {uniqueId}
            </p>
            <p>
              <strong>Email: </strong>
              {email}
            </p>
            <p>
              <strong>Phone: </strong>
              {phone}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
