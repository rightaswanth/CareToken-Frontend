import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        clinic_login: resolve(__dirname, 'clinic-login.html'),
        register: resolve(__dirname, 'register.html'),
        select_city: resolve(__dirname, 'select-city.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        appointments: resolve(__dirname, 'appointments.html'),
        book_appointment: resolve(__dirname, 'book-appointment.html'),
        clinics: resolve(__dirname, 'clinics.html'),
        doctor_appointments: resolve(__dirname, 'doctor-appointments.html'),
        doctor_queue: resolve(__dirname, 'doctor-queue.html'),
        doctors: resolve(__dirname, 'doctors.html'),
        edit_doctor: resolve(__dirname, 'edit-doctor.html'),
        my_bookings: resolve(__dirname, 'my-bookings.html'),
        patient_doctors: resolve(__dirname, 'patient-doctors.html'),
        patients: resolve(__dirname, 'patients.html'),
        settings: resolve(__dirname, 'settings.html'),
        add_doctor: resolve(__dirname, 'add-doctor.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://13.232.247.165',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
