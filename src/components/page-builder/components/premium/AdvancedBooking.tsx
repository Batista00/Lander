import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Component } from "@/types/landing";
import {
  CalendarIcon,
  Clock,
  Info,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

interface AdvancedBookingProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  image?: string;
}

const AdvancedBooking = ({ component, onEdit }: AdvancedBookingProps) => {
  const [date, setDate] = useState<Date>();
  const [service, setService] = useState<string>();
  const [time, setTime] = useState<string>();
  const [persons, setPersons] = useState<string>("1");

  const content = component.content as {
    title: string;
    subtitle: string;
    description: string;
    services: Service[];
    timeSlots: string[];
    maxPersons: number;
    image?: string;
    successMessage: string;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la reserva
    console.log({
      service,
      date,
      time,
      persons,
    });
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Formulario de Reserva */}
          <div className="lg:order-2">
            <div className="rounded-2xl bg-gray-50 p-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {content.title}
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                {content.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Selección de Servicio */}
                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Servicio
                  </label>
                  <Select
                    value={service}
                    onValueChange={setService}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {content.services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} - {s.duration} - {s.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selección de Fecha */}
                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha
                  </label>
                  <div className="flex items-center gap-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <input
                      type="date"
                      value={date ? format(date, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                    />
                  </div>
                </div>

                {/* Selección de Hora */}
                <div className="space-y-2">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hora
                  </label>
                  <Select
                    value={time}
                    onValueChange={setTime}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {content.timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Número de Personas */}
                <div className="space-y-2">
                  <label
                    htmlFor="persons"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de Personas
                  </label>
                  <Select
                    value={persons}
                    onValueChange={setPersons}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona número de personas" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: content.maxPersons }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "persona" : "personas"}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Reservar Ahora
                </Button>
              </form>
            </div>
          </div>

          {/* Información y Servicios */}
          <div className="lg:order-1">
            <div className="space-y-8">
              {content.services.map((service) => (
                <div
                  key={service.id}
                  className="flex gap-x-6 rounded-lg border p-6 hover:bg-gray-50 transition-colors"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-24 w-24 flex-none rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-gray-600">{service.description}</p>
                    <div className="mt-3 flex items-center gap-x-6">
                      <div className="flex items-center gap-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedBooking;

export const defaultAdvancedBookingContent = {
  title: "Agenda una Consultoría Estratégica",
  subtitle: "Transforma tu Negocio",
  description:
    "Reserva una sesión personalizada con nuestros expertos en transformación digital y descubre cómo podemos impulsar tu crecimiento.",
  services: [
    {
      id: "1",
      name: "Diagnóstico Digital",
      duration: "45 minutos",
      price: "Gratuito",
      description:
        "Evaluación completa de tu presencia digital, identificación de oportunidades y recomendaciones estratégicas iniciales.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Estrategia de Transformación",
      duration: "90 minutos",
      price: "$199",
      description:
        "Plan detallado de transformación digital, análisis competitivo y roadmap de implementación personalizado.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Workshop de Innovación",
      duration: "3 horas",
      price: "$499",
      description:
        "Sesión intensiva con tu equipo para definir iniciativas de innovación, priorizar proyectos y establecer KPIs.",
      image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  timeSlots: [
    "09:00",
    "10:30",
    "12:00",
    "14:00",
    "15:30",
    "17:00",
  ],
  maxPersons: 8,
  successMessage: "¡Reserva confirmada! Te hemos enviado un email con los detalles de tu sesión.",
};
