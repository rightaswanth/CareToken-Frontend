function w(){if(document.getElementById("adminBookingModal"))return;document.body.insertAdjacentHTML("beforeend",`
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
  `);const i=document.getElementById("adminBookingModal"),g=document.getElementById("closeModalBtn"),r=document.getElementById("adminBookingForm");g.addEventListener("click",()=>{i.classList.add("hidden")}),i.addEventListener("click",t=>{t.target===i&&i.classList.add("hidden")});function d(t,o="success"){const e=document.getElementById("modalToast"),s=document.getElementById("modalToastTitle"),a=document.getElementById("modalToastDesc"),l=document.getElementById("modalToastIcon");e.classList.remove("hidden"),setTimeout(()=>e.classList.remove("translate-x-full"),10),a.textContent=t,o==="error"?(s.textContent="Error",s.className="text-sm font-medium text-red-600",l.innerHTML='<svg class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'):(s.textContent="Success",s.className="text-sm font-medium text-text-main",l.innerHTML='<svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'),setTimeout(()=>{e.classList.add("translate-x-full"),setTimeout(()=>e.classList.add("hidden"),300)},3e3)}r.addEventListener("submit",async t=>{t.preventDefault();const o=r.querySelector('button[type="submit"]'),e=new FormData(r),s={doctor_id:e.get("doctor_id"),tenant_id:localStorage.getItem("selectedTenantId"),preferred_slot:e.get("preferred_slot"),reason:e.get("reason"),is_phone_booking:!0,patient:{name:e.get("patientName"),phone:e.get("phone"),age:parseInt(e.get("age")),gender:e.get("gender")}};try{o.disabled=!0,o.textContent="Booking...";const a=await fetch("/api/v1/appointments/admin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`},body:JSON.stringify(s)});if(a.ok)d("Appointment booked successfully!","success"),setTimeout(()=>{i.classList.add("hidden"),r.reset()},1500);else{const l=await a.json();d("Booking failed: "+(l.detail||"Unknown error"),"error")}}catch(a){console.error(a),d("An error occurred","error")}finally{o.disabled=!1,o.textContent="Confirm Booking"}})}async function T(p,i){w();const g=document.getElementById("adminBookingModal"),r=document.getElementById("modalDoctorName"),d=document.getElementById("modalDoctorId"),t=document.querySelector('#adminBookingForm select[name="preferred_slot"]');r.textContent=i,d.value=p;try{t.innerHTML='<option value="">Loading slots...</option>';const o=new Date,e=o.getFullYear(),s=String(o.getMonth()+1).padStart(2,"0"),a=String(o.getDate()).padStart(2,"0"),l=`${e}-${s}-${a}`,f=await fetch(`/api/v1/doctors/${p}/slots?date=${l}`,{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});if(f.ok){const m=await f.json();t.innerHTML='<option value="">Select a slot</option>';let y=!1,u=[];if(Array.isArray(m)?u=m:m.daily_slots&&Array.isArray(m.daily_slots)&&(u=m.daily_slots),u.length>0&&u.forEach(n=>{if(n.slots&&Array.isArray(n.slots)&&n.slots.length>0){y=!0;const k=new Date(n.date).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"}),x=document.createElement("optgroup");x.label=k,n.slots.forEach(c=>{let b,h;typeof c=="string"?(b=c,h=new Date(c).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):(b=c.start_time,h=new Date(c.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));const v=document.createElement("option");v.value=b,v.textContent=h,x.appendChild(v)}),t.appendChild(x)}}),!y){const n=document.createElement("option");n.disabled=!0,n.textContent="No slots available",t.appendChild(n)}}else f.status===401?t.innerHTML='<option value="">Session expired. Please login.</option>':t.innerHTML='<option value="">Failed to load slots</option>'}catch(o){console.error(o),t.innerHTML='<option value="">Error loading slots</option>'}g.classList.remove("hidden")}export{T as o};
