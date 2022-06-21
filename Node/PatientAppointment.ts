import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import BaseEntity from '../BaseEntity';
import Patient from './Patient';

@Entity({ name: 'patientAppointment' })
class PatientAppointment extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'patient_appointment_id' })
    patientAppointmentId: number;

  @Column({ type: 'int', name: 'mend_id', nullable: false })
    mendId: number;

  @Column({ type: 'timestamp', name: 'date', nullable: false })
    date: Date;

  @Column({ type: 'int', nullable: true, name: 'patient_id' })
    patientId: number;

  @ManyToOne(() => Patient, (patient) => patient.patientId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
    patient: Patient;
}

export default PatientAppointment;
