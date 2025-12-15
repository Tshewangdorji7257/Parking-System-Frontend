"use client"

import { Card } from "@/components/ui/card"
import { Map, MapPin, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ParkingMap() {
  const zones = [
    { 
      id: "A1", 
      name: "Main Entrance North",
      slots: 24, 
      occupied: 18, 
      occupancy: 75,
      location: "123 Main St, North Wing",
      coordinates: { x: 20, y: 20 }
    },
    { 
      id: "A2", 
      name: "Main Entrance South",
      slots: 24, 
      occupied: 12, 
      occupancy: 50,
      location: "123 Main St, South Wing",
      coordinates: { x: 20, y: 60 }
    },
    { 
      id: "B1", 
      name: "Building B East",
      slots: 32, 
      occupied: 8, 
      occupancy: 25,
      location: "Building B, East Side",
      coordinates: { x: 60, y: 20 }
    },
    { 
      id: "B2", 
      name: "Building B West",
      slots: 32, 
      occupied: 28, 
      occupancy: 88,
      location: "Building B, West Side",
      coordinates: { x: 60, y: 60 }
    },
    { 
      id: "C1", 
      name: "Underground",
      slots: 48, 
      occupied: 35, 
      occupancy: 73,
      location: "Building C, Basement",
      coordinates: { x: 40, y: 40 }
    },
    { 
      id: "C2", 
      name: "VIP Zone",
      slots: 16, 
      occupied: 12, 
      occupancy: 75,
      location: "Main Building",
      coordinates: { x: 40, y: 80 }
    },
  ]

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return "bg-red-500"
    if (occupancy >= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getOccupancyBorder = (occupancy: number) => {
    if (occupancy >= 80) return "border-red-500"
    if (occupancy >= 60) return "border-yellow-500"
    return "border-green-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Interactive Zone Map</h1>
          <p className="text-muted-foreground">Visual overview of all parking zones with real-time status</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-white border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Zones</p>
          <p className="text-3xl font-bold text-foreground">{zones.length}</p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Capacity</p>
          <p className="text-3xl font-bold text-foreground">{zones.reduce((sum, z) => sum + z.slots, 0)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-white border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg Occupancy</p>
          <p className="text-3xl font-bold text-primary">
            {Math.round(zones.reduce((sum, z) => sum + z.occupancy, 0) / zones.length)}%
          </p>
        </Card>
      </div>

      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" />
          Zone Layout Map
        </h2>

        {/* Map Visualization */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-dashed border-gray-300 mb-6" style={{ height: "500px" }}>
          {/* Grid background pattern */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
              backgroundSize: '10% 10%'
            }}
          ></div>

          {/* Zone markers */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
            >
              <div className={`relative ${getOccupancyColor(zone.occupancy)} rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 ${getOccupancyBorder(zone.occupancy)} group-hover:scale-125 transition-all duration-300`}>
                <span className="text-white font-bold text-sm">{zone.id}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                  <Card className="p-3 shadow-xl border-2 whitespace-nowrap">
                    <p className="font-bold text-sm mb-1">{zone.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      {zone.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold">{zone.occupied}/{zone.slots}</span>
                      <span className="text-muted-foreground">({zone.occupancy}% full)</span>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Pulse animation for high occupancy */}
              {zone.occupancy >= 80 && (
                <div className={`absolute inset-0 ${getOccupancyColor(zone.occupancy)} rounded-full animate-ping opacity-75`}></div>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-lg border">
            <p className="text-xs font-semibold mb-2 text-muted-foreground">Occupancy Status</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Low (&lt;60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium (60-80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High (&gt;80%)</span>
              </div>
            </div>
          </div>

          {/* Compass */}
          <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg border">
            <Navigation className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Zone Details Grid */}
        <div className="grid grid-cols-3 gap-4">
          {zones.map((zone) => (
            <Card key={zone.id} className={`border-2 ${getOccupancyBorder(zone.occupancy)} hover:shadow-lg transition-all p-4`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-foreground">Zone {zone.id}</p>
                  <p className="text-xs text-muted-foreground">{zone.name}</p>
                </div>
                <Badge className={`${getOccupancyColor(zone.occupancy)} text-white border-0`}>
                  {zone.occupancy}%
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                <span>{zone.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Occupied:</span>
                <span className="font-bold">{zone.occupied}/{zone.slots}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mt-2">
                <div
                  className={`h-2 ${getOccupancyColor(zone.occupancy)} rounded-full transition-all`}
                  style={{ width: `${zone.occupancy}%` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
