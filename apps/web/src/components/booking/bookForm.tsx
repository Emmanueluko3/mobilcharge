import React, { useState, useEffect } from "react";
import { Button } from "../common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faCar, faBatteryFull, faLocationDot, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import WebMap from "../Map";
import { useQuery } from "@apollo/client/react";
import { GET_VEHICLES } from "../../api/queries";

const BookForm: React.FC<{ isLoading: boolean; onSubmit: (data: any) => void; booking_type: string }> = ({ isLoading, onSubmit, booking_type }) => {
  const { t } = useTranslation();
  const STEPS = [t("Location"), t("Vehicle"), t("Goal"), t("Confirm")];
  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [form, setForm] = useState({
    location: "", lat: 45.5017, lng: -73.5673,
    vehicleId: "", car_make: "",
    battery_level: "20", battery_target: "80",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    isEmergency: booking_type === "Emergency",
  });

  const { data: vehiclesData } = useQuery<any>(GET_VEHICLES, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (vehiclesData?.myVehicles) {
      setVehicles(vehiclesData.myVehicles);
    }
  }, [vehiclesData]);

  useEffect(() => {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(p => setForm(f => ({ ...f, lat: p.coords.latitude, lng: p.coords.longitude })));
  }, []);

  const update = (obj: any) => setForm(f => ({ ...f, ...obj }));

  const handleNextStep = () => {
    if (step === 1 && !form.location) {
      return Swal.fire(t("Error"), t("Please pick a location on the map."), "error");
    }
    if (step === 2 && !form.vehicleId) {
      return Swal.fire(t("Error"), t("Please select a vehicle."), "error");
    }
    if (step === 3) {
      const current = parseInt(form.battery_level);
      const target = parseInt(form.battery_target);
      if (isNaN(current) || isNaN(target) || current >= target) {
        return Swal.fire(t("Error"), t("Target battery must be higher than current battery."), "error");
      }
    }
    setStep(s => s + 1);
  };

  const Step1 = () => (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black mb-4">{t("Where is your vehicle?")}</h2>
      <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex gap-4 mb-8">
        <FontAwesomeIcon icon={faLocationDot} className="text-primary text-xl mt-1" />
        <p className="text-primary-800 font-medium">{form.location || t("Click on map to pin location")}</p>
      </div>
      <Button type="button" onClick={handleNextStep} className="w-full py-4 rounded-2xl font-bold">{t("Next")}</Button>
    </div>
  );

  const Step2 = () => (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black mb-4">{t("Select Vehicle")}</h2>
      <div className="space-y-3 mb-8">
        {vehicles.map(v => (
          <button key={v.id} type="button" onClick={() => update({ vehicleId: v.id, car_make: `${v.brand} ${v.model}` })} className={`w-full p-4 rounded-xl border-2 text-left ${form.vehicleId === v.id ? 'border-primary bg-primary-50' : 'border-gray-100'}`}>
            <FontAwesomeIcon icon={faCar} className="mr-2" /> {v.brand} {v.model}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>{t("Back")}</Button>
        <Button type="button" onClick={handleNextStep} className="flex-1">{t("Next")}</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 bg-white rounded-[2rem] shadow-2xl border border-gray-100 min-h-[70vh]">
      <div className="flex-1 max-w-md">
        <div className="flex justify-between mb-12">
          {STEPS.map((s, i) => <div key={s} className={`w-1/5 h-1.5 rounded-full ${step > i ? 'bg-primary' : 'bg-gray-200'}`} />)}
        </div>
        
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && (
          <div className="animate-fadeIn space-y-6">
            <h2 className="text-3xl font-black">{t("Charge Status")}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-bold">{t("Current (%)")}</label><input type="number" value={form.battery_level} onChange={e => update({ battery_level: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl" /></div>
              <div><label className="text-sm font-bold">{t("Goal (%)")}</label><input type="number" value={form.battery_target} onChange={e => update({ battery_target: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl" /></div>
            </div>
            <div className="flex gap-4"><Button variant="outline" onClick={() => setStep(2)}>{t("Back")}</Button><Button type="button" onClick={handleNextStep} className="flex-1">{t("Next")}</Button></div>
          </div>
        )}
        {step === 4 && (
          <div className="animate-fadeIn space-y-6">
            <h2 className="text-3xl font-black">{t("Confirm & Book")}</h2>
            <div className="bg-gray-50 p-6 rounded-2xl space-y-3 font-medium">
              <div className="flex justify-between"><span>{t("Vehicle")}</span><span className="text-primary">{form.car_make}</span></div>
              <div className="flex justify-between"><span>{t("Charge")}</span><span className="text-primary">{form.battery_level}% → {form.battery_target}%</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl"><span>{t("Price")}</span><span>$45.00</span></div>
            </div>
            <div className="flex gap-4"><Button variant="outline" onClick={() => setStep(3)}>{t("Back")}</Button><Button type="submit" isLoading={isLoading} onClick={() => onSubmit(form)} className="flex-1">{t("Confirm")}</Button></div>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-[400px] rounded-[2rem] overflow-hidden border border-gray-100">
        <WebMap center={{ lat: form.lat, lng: form.lng }} zoom={15} onClick={e => e.latLng && update({ lat: e.latLng.lat(), lng: e.latLng.lng(), location: `Lat: ${e.latLng.lat().toFixed(4)}` })} markers={[{ id: 'p', position: { lat: form.lat, lng: form.lng } }]} />
      </div>
    </div>
  );
};

export default BookForm;
