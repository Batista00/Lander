import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { MapPin, Navigation, Search, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MapsProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const Maps: React.FC<MapsProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Nuestra Ubicación',
    description = 'Encuéntranos fácilmente',
    apiKey = '',
    center = { lat: -34.603722, lng: -58.381592 },
    zoom = 15,
    markers = [
      {
        position: { lat: -34.603722, lng: -58.381592 },
        title: 'Oficina Principal',
        description: 'Nuestra sede central'
      }
    ],
    style = 'default', // 'default' | 'silver' | 'retro' | 'dark'
    controls = {
      zoom: true,
      streetView: true,
      fullscreen: true,
      search: true
    },
    height = '400px'
  } = component.content;

  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!apiKey) return;

    // Cargar el script de Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Estilos del mapa según el tema seleccionado
    const mapStyles: { [key: string]: any } = {
      default: [],
      silver: [
        {
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#616161" }]
        }
      ],
      retro: [
        {
          elementType: "geometry",
          stylers: [{ color: "#ebe3cd" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#523735" }]
        }
      ],
      dark: [
        {
          elementType: "geometry",
          stylers: [{ color: "#212121" }]
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#757575" }]
        }
      ]
    };

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: mapStyles[style],
      streetViewControl: controls.streetView,
      zoomControl: controls.zoom,
      fullscreenControl: controls.fullscreen,
      mapTypeControl: false
    });

    // Agregar marcadores
    markers.forEach(marker => {
      const markerInstance = new window.google.maps.Marker({
        position: marker.position,
        map: mapInstance,
        title: marker.title,
        animation: window.google.maps.Animation.DROP
      });

      // Info window para cada marcador
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${marker.title}</h3>
            <p class="text-sm">${marker.description}</p>
          </div>
        `
      });

      markerInstance.addListener('click', () => {
        infoWindow.open(mapInstance, markerInstance);
      });
    });

    setMap(mapInstance);

    // Configurar búsqueda si está habilitada
    if (controls.search) {
      const searchBox = new window.google.maps.places.SearchBox(
        document.getElementById('map-search')
      );

      mapInstance.addListener('bounds_changed', () => {
        searchBox.setBounds(mapInstance.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) return;

          new window.google.maps.Marker({
            map: mapInstance,
            title: place.name,
            position: place.geometry.location
          });

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        mapInstance.fitBounds(bounds);
      });
    }
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleMyLocation = () => {
    if (!map) return;

    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          new window.google.maps.Marker({
            position: pos,
            map,
            title: 'Tu ubicación'
          });

          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          console.error('Error: The Geolocation service failed.');
        }
      );
    }
  };

  return (
    <div
      className={cn(
        'w-full',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-border">
          {/* Controles del mapa */}
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
            {controls.search && (
              <Input
                id="map-search"
                placeholder="Buscar ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-background/80 backdrop-blur-sm"
              />
            )}
          </div>

          {/* Controles adicionales */}
          <div className="absolute top-20 right-4 z-10 flex flex-col gap-2">
            {controls.zoom && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleZoomIn}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleZoomOut}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              variant="secondary"
              size="icon"
              onClick={handleMyLocation}
              disabled={isLoading}
              className="bg-background/80 backdrop-blur-sm"
            >
              {isLoading ? (
                <div className="animate-spin">
                  <Navigation className="h-4 w-4" />
                </div>
              ) : (
                <Navigation className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Contenedor del mapa */}
          <div
            ref={mapRef}
            style={{ height }}
            className="w-full bg-muted"
          />

          {!apiKey && mode === 'edit' && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center p-4">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold">Se requiere una API Key de Google Maps</p>
                <p className="text-sm text-muted-foreground">
                  Configura tu API Key en las opciones del componente
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
