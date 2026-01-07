export function setupBookingModal() {
  // Check if modal already exists
  if (document.getElementById('adminBookingModal')) return;

  const modalHtml = `
    <div id="adminBookingModal" class="fixed inset-0 bg-black/50 flex items-center justify-center hidden z-50">
      <div class="bg-surface rounded-xl p-6 max-w-md w-full shadow-xl transform transition-all scale-100 max-h-[90vh] overflow-y-auto relative">
        <!-- Toast Notification (Inside Modal or Global) -->
        <div id="modalToast" class="absolute top-4 right-4 bg-surface border border-border shadow-lg rounded-lg p-3 transform translate-x-full transition-transform duration-300 z-50 flex items-start max-w-xs hidden">
           <div class="flex-shrink-0 pt-0.5" id="modalToastIcon"></div>
           <div class="ml-3 w-0 flex-1">
             <p class="text-sm font-medium text-text-main" id="modalToastTitle"></p>
             <p class="mt-1 text-xs text-text-muted" id="modalToastDesc"></p>
           </div>
        </div>

        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-text-main">Book Appointment</h2>
            <p class="text-sm text-text-muted">with <span id="modalDoctorName" class="font-medium text-primary"></span></p>
          </div>
          <button id="closeModalBtn" class="text-text-muted hover:text-text-main">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form id="adminBookingForm" class="space-y-4">
          <input type="hidden" id="modalDoctorId" name="doctor_id">
          
          <div>
            <label class="block text-sm font-medium text-text-main mb-1">Patient Name</label>
            <input type="text" name="patientName" required class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-main mb-1">Age</label>
              <input type="number" name="age" required min="0" class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-main mb-1">Gender</label>
              <select name="gender" required class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm bg-white">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-main mb-1">Phone Number</label>
            <input type="tel" name="phone" required pattern="[0-9]{10}" class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm">
          </div>

          <div>
            <label class="block text-sm font-medium text-text-main mb-1">Reason</label>
            <textarea name="reason" rows="2" class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-text-main mb-1">Available Slots</label>
            <select name="preferred_slot" required class="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm bg-white">
               <option value="">Select a slot</option>
            </select>
          </div>

          <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm mt-2">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('adminBookingModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('adminBookingForm');

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Toast Function
  function showModalToast(message, type = 'success') {
    const toast = document.getElementById('modalToast');
    const title = document.getElementById('modalToastTitle');
    const desc = document.getElementById('modalToastDesc');
    const icon = document.getElementById('modalToastIcon');

    toast.classList.remove('hidden');
    // Small delay to allow transition
    setTimeout(() => toast.classList.remove('translate-x-full'), 10);

    desc.textContent = message;
    
    if (type === 'error') {
        title.textContent = 'Error';
        title.className = 'text-sm font-medium text-red-600';
        icon.innerHTML = `<svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else {
        title.textContent = 'Success';
        title.className = 'text-sm font-medium text-text-main';
        icon.innerHTML = `<svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    }

    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    const payload = {
      doctor_id: formData.get('doctor_id'),
      tenant_id: localStorage.getItem('selectedTenantId'),
      preferred_slot: formData.get('preferred_slot'), // Already ISO
      reason: formData.get('reason'),
      is_phone_booking: true,
      patient: {
        name: formData.get('patientName'),
        phone: formData.get('phone'),
        age: parseInt(formData.get('age')),
        gender: formData.get('gender')
      }
    };

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Booking...';

      const response = await fetch('/api/v1/appointments/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showModalToast('Appointment booked successfully!', 'success');
        setTimeout(() => {
             modal.classList.add('hidden');
             form.reset();
        }, 1500);
      } else {
        const error = await response.json();
        showModalToast('Booking failed: ' + (error.detail || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showModalToast('An error occurred', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Booking';
    }
  });
}

export async function openBookingModal(doctorId, doctorName) {
  setupBookingModal(); // Ensure modal exists
  
  const modal = document.getElementById('adminBookingModal');
  const nameSpan = document.getElementById('modalDoctorName');
  const idInput = document.getElementById('modalDoctorId');
  const slotSelect = document.querySelector('#adminBookingForm select[name="preferred_slot"]');
  
  nameSpan.textContent = doctorName;
  idInput.value = doctorId;
  
  // Fetch Slots
  try {
      slotSelect.innerHTML = '<option value="">Loading slots...</option>';
      
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const response = await fetch(`/api/v1/doctors/${doctorId}/slots?date=${dateStr}`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
      });
      
      if (response.ok) {
        const responseData = await response.json();
        slotSelect.innerHTML = '<option value="">Select a slot</option>';
        
        let hasSlots = false;
        
        // Handle different response structures
        let slotsArray = [];
        if (Array.isArray(responseData)) {
            slotsArray = responseData;
        } else if (responseData.daily_slots && Array.isArray(responseData.daily_slots)) {
            slotsArray = responseData.daily_slots;
        }

        if (slotsArray.length > 0) {
            slotsArray.forEach(dayData => {
                if (dayData.slots && Array.isArray(dayData.slots) && dayData.slots.length > 0) {
                    hasSlots = true;
                    const dateObj = new Date(dayData.date);
                    const dateStr = dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
                    
                    const group = document.createElement('optgroup');
                    group.label = dateStr;
                    
                    dayData.slots.forEach(slot => {
                        let slotValue, slotLabel;
                        
                        if (typeof slot === 'string') {
                            slotValue = slot;
                            slotLabel = new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        } else {
                            slotValue = slot.start_time;
                            slotLabel = new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }
                        
                        const option = document.createElement('option');
                        option.value = slotValue;
                        option.textContent = slotLabel;
                        group.appendChild(option);
                    });
                    
                    slotSelect.appendChild(group);
                }
            });
        }

        if (!hasSlots) {
            const option = document.createElement('option');
            option.disabled = true;
            option.textContent = "No slots available";
            slotSelect.appendChild(option);
        }
      } else {
        if (response.status === 401) {
            slotSelect.innerHTML = '<option value="">Session expired. Please login.</option>';
        } else {
            slotSelect.innerHTML = '<option value="">Failed to load slots</option>';
        }
      }
  } catch (e) {
      console.error(e);
      slotSelect.innerHTML = '<option value="">Error loading slots</option>';
  }
  
  modal.classList.remove('hidden');
}
