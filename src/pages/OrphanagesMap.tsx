import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";


import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  })

  useEffect(() => {
    navigator.geolocation.watchPosition(
      function(position) {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: 20,
        })
      },
      function(error) {
        console.log(error)
      }, {
        enableHighAccuracy:true,
      }
    )
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarkerImg} alt="Happy"/>
          </Link>

          <h2>Escolha um orfanato</h2>
          <p>Muitas crianças estão esperando a sua visita :0</p>
        </header>

        <footer>
          <strong>Campo Grande</strong>
          <span>Mato Grosso do Sul</span>
        </footer>
      </aside>

      <Map 
        center={[currentPosition.latitude, currentPosition.longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id} 
              icon={mapIcon}
              position={[orphanage.latitude,orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}

export default OrphanagesMap